import { GameRoom } from './GameRoom.js';

export class RoomManager {
  constructor() {
    this.rooms = new Map(); // code -> GameRoom
    this.socketToRoom = new Map(); // socketId -> code

    // Clean up abandoned rooms periodically (every 60s)
    setInterval(() => this.cleanupRooms(), 60000);
  }

  // Generates 6-character clean readable room code (no 0/O, 1/I)
  generateCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    let attempts = 0;
    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      attempts++;
    } while (this.rooms.has(code) && attempts < 100);
    return code;
  }

  createRoom(socketId, playerName, characterClass) {
    // If socket was already in a room, leave it
    this.leaveRoom(socketId);

    const code = this.generateCode();
    const room = new GameRoom(code, socketId, playerName, characterClass);
    this.rooms.set(code, room);
    this.socketToRoom.set(socketId, code);
    return room;
  }

  joinRoom(code, socketId, playerName, characterClass) {
    const upperCode = (code || '').trim().toUpperCase();
    const room = this.rooms.get(upperCode);
    if (!room) {
      return { success: false, reason: 'Room code not found' };
    }

    const res = room.addPlayer(socketId, playerName, characterClass);
    if (res.success) {
      this.socketToRoom.set(socketId, upperCode);
      return { success: true, room, reconnected: res.reconnected, player: res.player };
    }
    return res;
  }

  getRoomBySocket(socketId) {
    const code = this.socketToRoom.get(socketId);
    if (!code) return null;
    return this.rooms.get(code) || null;
  }

  getRoom(code) {
    if (!code) return null;
    return this.rooms.get(code.toUpperCase()) || null;
  }

  leaveRoom(socketId) {
    const code = this.socketToRoom.get(socketId);
    if (!code) return null;

    this.socketToRoom.delete(socketId);
    const room = this.rooms.get(code);
    if (room) {
      const player = room.handleDisconnect(socketId);
      if (room.isEmpty()) {
        // Schedule deletion if nobody reconnects within 2 minutes
        setTimeout(() => {
          if (room.isEmpty()) {
            this.rooms.delete(code);
            console.log(`[RoomManager] Room ${code} destroyed after inactivity.`);
          }
        }, 120000);
      }
      return { room, player };
    }
    return null;
  }

  cleanupRooms() {
    const now = Date.now();
    for (const [code, room] of this.rooms.entries()) {
      // If room inactive for > 1 hour or empty for > 5 minutes
      if (now - room.lastActivity > 3600000 || (room.isEmpty() && now - room.lastActivity > 300000)) {
        this.rooms.delete(code);
        console.log(`[RoomManager] Cleaned up inactive room ${code}`);
      }
    }
  }
}
