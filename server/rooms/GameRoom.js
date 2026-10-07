export class GameRoom {
  constructor(code, hostId, hostName = 'Player 1', hostClass = 'warrior') {
    this.code = code.toUpperCase();
    this.createdAt = Date.now();
    this.lastActivity = Date.now();

    // Players: { socketId, id (1 or 2), name, class, ready, connected, disconnectTime, x, y, hp, maxHp }
    this.players = new Map();
    this.players.set(hostId, {
      socketId: hostId,
      playerNum: 1,
      name: hostName,
      characterClass: hostClass,
      ready: true,
      connected: true,
      disconnectTime: null,
      x: 100,
      y: 400,
      hp: 100,
      maxHp: 100
    });

    this.currentLevel = 1;
    this.gameStarted = false;

    // Synchronized Level State
    this.levelState = {
      switches: {},      // switchId: boolean
      doors: {},         // doorId: boolean (open/closed)
      chests: {},        // chestId: boolean (opened/closed)
      checkpoints: {},   // checkpointId: boolean
      activeCheckpoint: { x: 100, y: 400 },
      enemies: {},       // enemyId: { hp, dead, x, y }
      boss: null,        // { id, hp, maxHp, phase, dead }
      quests: {},        // questId: { current, completed }
      puzzleState: {}    // generic puzzle synchronization
    };

    this.reconnectTimeout = null;
  }

  touch() {
    this.lastActivity = Date.now();
  }

  addPlayer(socketId, name = 'Player 2', characterClass = 'archer') {
    if (this.players.size >= 2 && ![...this.players.values()].some(p => !p.connected)) {
      return { success: false, reason: 'Room is full' };
    }

    // Check if an existing disconnected player is reconnecting
    for (const [oldSocketId, player] of this.players.entries()) {
      if (!player.connected) {
        // Reconnection match
        this.players.delete(oldSocketId);
        player.socketId = socketId;
        player.connected = true;
        player.disconnectTime = null;
        this.players.set(socketId, player);
        this.touch();
        return { success: true, reconnected: true, player };
      }
    }

    if (this.players.size >= 2) {
      return { success: false, reason: 'Room is full' };
    }

    const playerNum = 2;
    const player = {
      socketId,
      playerNum,
      name,
      characterClass,
      ready: false,
      connected: true,
      disconnectTime: null,
      x: 140,
      y: 400,
      hp: 100,
      maxHp: 100
    };

    this.players.set(socketId, player);
    this.touch();
    return { success: true, reconnected: false, player };
  }

  getPlayer(socketId) {
    return this.players.get(socketId);
  }

  setPlayerReady(socketId, ready) {
    const p = this.players.get(socketId);
    if (p) {
      p.ready = ready;
      this.touch();
    }
  }

  setPlayerClass(socketId, characterClass) {
    const p = this.players.get(socketId);
    if (p) {
      p.characterClass = characterClass;
      this.touch();
    }
  }

  allReady() {
    if (this.players.size < 2) return false;
    for (const p of this.players.values()) {
      if (!p.ready) return false;
    }
    return true;
  }

  handleDisconnect(socketId) {
    const player = this.players.get(socketId);
    if (player) {
      player.connected = false;
      player.disconnectTime = Date.now();
      this.touch();
      return player;
    }
    return null;
  }

  isEmpty() {
    for (const p of this.players.values()) {
      if (p.connected) return false;
    }
    return true;
  }

  getSnapshot() {
    const playerList = [];
    for (const p of this.players.values()) {
      playerList.push({
        socketId: p.socketId,
        playerNum: p.playerNum,
        name: p.name,
        characterClass: p.characterClass,
        ready: p.ready,
        connected: p.connected,
        x: p.x,
        y: p.y,
        hp: p.hp,
        maxHp: p.maxHp
      });
    }

    return {
      code: this.code,
      currentLevel: this.currentLevel,
      gameStarted: this.gameStarted,
      players: playerList,
      levelState: this.levelState
    };
  }
}
