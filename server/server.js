import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { RoomManager } from './rooms/RoomManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  pingInterval: 10000,
  pingTimeout: 5000
});

const roomManager = new RoomManager();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    game: 'Twin Quest: Lost Kingdom',
    activeRooms: roomManager.rooms.size,
    uptime: process.uptime()
  });
});

// Serve frontend build if dist exists
const distPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send(`
      <div style="font-family:sans-serif; text-align:center; padding: 50px;">
        <h1>⚔️ Twin Quest: Lost Kingdom Server is Running!</h1>
        <p>Building client bundle... Please refresh in a few moments.</p>
      </div>
    `);
  }
});

// Socket.io Real-time Multiplayer Handling
io.on('connection', (socket) => {
  console.log(`[Socket] New client connected: ${socket.id}`);

  // Heartbeat / ping-pong for latency measurement
  socket.on('latency-ping', (clientTimestamp, callback) => {
    if (typeof callback === 'function') {
      callback(clientTimestamp, Date.now());
    }
  });

  // 1. Create Room
  socket.on('create-room', (data, callback) => {
    try {
      const { playerName = 'Player 1', characterClass = 'warrior' } = data || {};
      const room = roomManager.createRoom(socket.id, playerName, characterClass);
      socket.join(room.code);

      console.log(`[Room] Created room ${room.code} by ${playerName} (${socket.id})`);

      const response = {
        success: true,
        roomCode: room.code,
        playerNum: 1,
        snapshot: room.getSnapshot()
      };

      if (typeof callback === 'function') callback(response);
    } catch (err) {
      console.error('[Room] Create room error:', err);
      if (typeof callback === 'function') callback({ success: false, reason: 'Failed to create room' });
    }
  });

  // 2. Join Room
  socket.on('join-room', (data, callback) => {
    try {
      const { code, playerName = 'Player 2', characterClass = 'archer' } = data || {};
      const result = roomManager.joinRoom(code, socket.id, playerName, characterClass);

      if (!result.success) {
        if (typeof callback === 'function') callback({ success: false, reason: result.reason });
        return;
      }

      const { room, reconnected, player } = result;
      socket.join(room.code);

      console.log(`[Room] ${playerName} joined room ${room.code} (reconnected: ${reconnected})`);

      const response = {
        success: true,
        roomCode: room.code,
        playerNum: player.playerNum,
        reconnected,
        snapshot: room.getSnapshot()
      };

      if (typeof callback === 'function') callback(response);

      // Notify the room of updated roster or reconnection
      io.to(room.code).emit('room-updated', room.getSnapshot());

      if (reconnected) {
        socket.to(room.code).emit('partner-reconnected', {
          socketId: socket.id,
          playerNum: player.playerNum,
          name: player.name
        });
      }
    } catch (err) {
      console.error('[Room] Join room error:', err);
      if (typeof callback === 'function') callback({ success: false, reason: 'Failed to join room' });
    }
  });

  // 3. Player Character Selection
  socket.on('select-class', (characterClass) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    room.setPlayerClass(socket.id, characterClass);
    io.to(room.code).emit('room-updated', room.getSnapshot());
  });

  // 4. Player Ready Toggle
  socket.on('toggle-ready', (isReady) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    room.setPlayerReady(socket.id, isReady);
    io.to(room.code).emit('room-updated', room.getSnapshot());
  });

  // 5. Start Game (host only)
  socket.on('start-game', () => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const player = room.getPlayer(socket.id);
    if (player && player.playerNum === 1) {
      room.gameStarted = true;
      console.log(`[Room] Starting game in room ${room.code}`);
      io.to(room.code).emit('game-started', room.getSnapshot());
    }
  });

  // 6. Fast Real-Time Movement & State Sync (Interpolated)
  socket.on('player-sync', (stateData) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room || !room.gameStarted) return;

    const player = room.getPlayer(socket.id);
    if (player) {
      player.x = stateData.x;
      player.y = stateData.y;
      player.hp = stateData.hp;
    }

    // Broadcast position/animation to partner
    socket.to(room.code).emit('partner-sync', {
      socketId: socket.id,
      playerNum: player ? player.playerNum : null,
      ...stateData,
      serverTime: Date.now()
    });
  });

  // 7. Player Combat Actions (Attacks, Abilities)
  socket.on('player-attack', (attackData) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    socket.to(room.code).emit('partner-attack', {
      socketId: socket.id,
      ...attackData
    });
  });

  // 8. Interactive Objects (Switches, Doors, Chests, Checkpoints)
  socket.on('trigger-switch', (data) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const { switchId, state } = data;
    room.levelState.switches[switchId] = state;
    room.touch();

    io.to(room.code).emit('switch-updated', { switchId, state });
  });

  socket.on('trigger-door', (data) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const { doorId, open } = data;
    room.levelState.doors[doorId] = open;
    room.touch();

    io.to(room.code).emit('door-updated', { doorId, open });
  });

  socket.on('open-chest', (data) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const { chestId, reward } = data;
    room.levelState.chests[chestId] = true;
    room.touch();

    io.to(room.code).emit('chest-opened', { chestId, reward });
  });

  socket.on('activate-checkpoint', (data) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const { checkpointId, x, y } = data;
    room.levelState.checkpoints[checkpointId] = true;
    room.levelState.activeCheckpoint = { x, y };
    room.touch();

    io.to(room.code).emit('checkpoint-activated', { checkpointId, x, y });
  });

  // 9. Enemy & Boss State Sync
  socket.on('enemy-damage', (data) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const { enemyId, damage, newHp, isDead, x, y } = data;
    room.levelState.enemies[enemyId] = { hp: newHp, dead: isDead, x, y };
    room.touch();

    socket.to(room.code).emit('enemy-damage-sync', {
      dealerId: socket.id,
      enemyId,
      damage,
      newHp,
      isDead,
      x,
      y
    });
  });

  socket.on('boss-damage', (data) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const { damage, newHp, phase, isDead } = data;
    room.levelState.boss = { hp: newHp, phase, dead: isDead };
    room.touch();

    socket.to(room.code).emit('boss-damage-sync', {
      dealerId: socket.id,
      damage,
      newHp,
      phase,
      isDead
    });
  });

  // 10. Quest Progress Sync
  socket.on('quest-update', (data) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const { questId, current, completed } = data;
    room.levelState.quests[questId] = { current, completed };
    room.touch();

    socket.to(room.code).emit('quest-updated', { questId, current, completed });
  });

  // 11. Level Transition
  socket.on('level-transition', (data) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    const { nextLevel } = data;
    room.currentLevel = nextLevel;
    // Reset transient level states for the new stage
    room.levelState.switches = {};
    room.levelState.doors = {};
    room.levelState.chests = {};
    room.levelState.checkpoints = {};
    room.levelState.enemies = {};
    room.levelState.boss = null;
    room.touch();

    io.to(room.code).emit('next-level', { level: nextLevel });
  });

  // 12. Player Chat / Emote / Ping
  socket.on('quick-emote', (emote) => {
    const room = roomManager.getRoomBySocket(socket.id);
    if (!room) return;

    socket.to(room.code).emit('partner-emote', {
      socketId: socket.id,
      emote
    });
  });

  // 13. Disconnect Handling (Reliable Reconnection Support)
  socket.on('disconnect', (reason) => {
    console.log(`[Socket] Client disconnected: ${socket.id} (${reason})`);
    const roomInfo = roomManager.leaveRoom(socket.id);

    if (roomInfo && roomInfo.room) {
      const { room, player } = roomInfo;
      // Notify remaining partner
      io.to(room.code).emit('partner-disconnected', {
        playerNum: player ? player.playerNum : null,
        name: player ? player.name : 'Partner',
        message: 'Partner connection lost. Waiting for reconnection...'
      });
      io.to(room.code).emit('room-updated', room.getSnapshot());
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`===============================================`);
  console.log(`🏰 Twin Quest: Lost Kingdom Server`);
  console.log(`🚀 Server listening on 0.0.0.0:${PORT}`);
  console.log(`✨ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});
