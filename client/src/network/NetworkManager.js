// Socket.io Network Client with reliable reconnection and state synchronization
import { io } from 'socket.io-client';

export class NetworkManager {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.socket = null;
    this.roomCode = null;
    this.playerNum = null;
    this.isHost = false;
    this.isMultiplayer = false;

    this.connected = false;
    this.reconnecting = false;
    this.ping = 0;

    // Sync throttling: ~25 packets/sec is optimal for smooth platformer co-op without network flooding
    this.lastSyncTime = 0;
    this.syncInterval = 1000 / 25;

    this.statusBadgeEl = document.getElementById('network-badge');
    this.netLabelEl = document.getElementById('net-label');
    this.netDotEl = this.statusBadgeEl ? this.statusBadgeEl.querySelector('.net-dot') : null;
    this.reconnectBannerEl = document.getElementById('reconnect-banner');
  }

  init() {
    // If running in development with Vite proxy or production unified server
    const serverUrl = window.location.port === '5173' ? 'http://localhost:3000' : window.location.origin;

    this.socket = io(serverUrl, {
      reconnection: true,
      reconnectionAttempts: 20,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      transports: ['websocket', 'polling']
    });

    this.setupSocketEvents();
    this.startPingHeartbeat();
  }

  setupSocketEvents() {
    this.socket.on('connect', () => {
      this.connected = true;
      this.reconnecting = false;
      this.updateStatusBadge('online', this.isMultiplayer ? 'Connected' : 'Solo');
      if (this.reconnectBannerEl) this.reconnectBannerEl.classList.add('hidden');
      console.log('[Net] Connected to multiplayer server.');
    });

    this.socket.on('disconnect', (reason) => {
      this.connected = false;
      this.reconnecting = true;
      this.updateStatusBadge('reconnecting', 'Reconnecting...');
      console.warn(`[Net] Disconnected: ${reason}`);
    });

    this.socket.on('connect_error', () => {
      this.updateStatusBadge('offline', 'Offline');
    });

    // Partner Movement & Animation Sync
    this.socket.on('partner-sync', (data) => {
      if (this.gameEngine && this.gameEngine.partner) {
        const partner = this.gameEngine.partner;
        partner.targetX = data.x;
        partner.targetY = data.y;
        partner.vx = data.vx || 0;
        partner.vy = data.vy || 0;
        partner.targetFacing = data.facing;
        partner.targetState = data.state;
        partner.hp = data.hp;
      }
    });

    // Partner Combat Attacks
    this.socket.on('partner-attack', (data) => {
      if (this.gameEngine && this.gameEngine.partner) {
        const partner = this.gameEngine.partner;
        partner.facing = data.facing;
        partner.performAttack(this.gameEngine.audio, this.gameEngine.particles);
      }
    });

    // Interactive State Sync
    this.socket.on('switch-updated', ({ switchId, state }) => {
      if (this.gameEngine) this.gameEngine.applySwitchSync(switchId, state);
    });

    this.socket.on('door-updated', ({ doorId, open }) => {
      if (this.gameEngine) this.gameEngine.applyDoorSync(doorId, open);
    });

    this.socket.on('chest-opened', ({ chestId, reward }) => {
      if (this.gameEngine) this.gameEngine.applyChestSync(chestId, reward);
    });

    this.socket.on('checkpoint-activated', ({ checkpointId, x, y }) => {
      if (this.gameEngine) this.gameEngine.applyCheckpointSync(checkpointId, x, y);
    });

    this.socket.on('enemy-damage-sync', (data) => {
      if (this.gameEngine) this.gameEngine.applyEnemyDamageSync(data);
    });

    this.socket.on('boss-damage-sync', (data) => {
      if (this.gameEngine) this.gameEngine.applyBossDamageSync(data);
    });

    this.socket.on('next-level', ({ level }) => {
      if (this.gameEngine) this.gameEngine.loadLevel(level, false);
    });

    // Graceful Disconnect / Reconnect Notifications
    this.socket.on('partner-disconnected', (data) => {
      if (this.reconnectBannerEl) {
        this.reconnectBannerEl.classList.remove('hidden');
        document.getElementById('reconnect-title').textContent = `${data.name || 'Partner'} Disconnected`;
        document.getElementById('reconnect-subtitle').textContent = 'Waiting for partner to reconnect... (You can continue playing)';
      }
    });

    this.socket.on('partner-reconnected', (data) => {
      if (this.reconnectBannerEl) {
        this.reconnectBannerEl.classList.add('hidden');
      }
      if (this.gameEngine) {
        this.gameEngine.showToast(`✨ ${data.name || 'Partner'} has reconnected!`);
      }
    });
  }

  startPingHeartbeat() {
    setInterval(() => {
      if (this.socket && this.connected) {
        const start = Date.now();
        this.socket.emit('latency-ping', start, () => {
          this.ping = Date.now() - start;
          if (this.isMultiplayer) {
            this.updateStatusBadge('online', `${this.ping}ms`);
          }
        });
      }
    }, 4000);
  }

  updateStatusBadge(statusClass, labelText) {
    if (this.netDotEl) {
      this.netDotEl.className = `net-dot ${statusClass}`;
    }
    if (this.netLabelEl) {
      this.netLabelEl.textContent = labelText;
    }
  }

  createRoom(playerName, characterClass, callback) {
    this.isMultiplayer = true;
    this.isHost = true;
    this.socket.emit('create-room', { playerName, characterClass }, (res) => {
      if (res && res.success) {
        this.roomCode = res.roomCode;
        this.playerNum = 1;
      }
      if (callback) callback(res);
    });
  }

  joinRoom(code, playerName, characterClass, callback) {
    this.isMultiplayer = true;
    this.isHost = false;
    this.socket.emit('join-room', { code, playerName, characterClass }, (res) => {
      if (res && res.success) {
        this.roomCode = res.roomCode;
        this.playerNum = res.playerNum;
      }
      if (callback) callback(res);
    });
  }

  sendClassSelection(characterClass) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('select-class', characterClass);
    }
  }

  sendReadyToggle(isReady) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('toggle-ready', isReady);
    }
  }

  sendStartGame() {
    if (this.socket && this.isMultiplayer && this.isHost) {
      this.socket.emit('start-game');
    }
  }

  // Real-time synchronization
  sendPlayerSync(player) {
    if (!this.socket || !this.isMultiplayer || !this.connected) return;

    const now = performance.now();
    if (now - this.lastSyncTime < this.syncInterval) return;
    this.lastSyncTime = now;

    this.socket.emit('player-sync', {
      x: Math.round(player.x),
      y: Math.round(player.y),
      vx: Math.round(player.vx),
      vy: Math.round(player.vy),
      facing: player.facing,
      state: player.state,
      hp: player.hp
    });
  }

  sendPlayerAttack(attackData) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('player-attack', attackData);
    }
  }

  sendSwitchTrigger(switchId, state) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('trigger-switch', { switchId, state });
    }
  }

  sendDoorTrigger(doorId, open) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('trigger-door', { doorId, open });
    }
  }

  sendChestOpened(chestId, reward) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('open-chest', { chestId, reward });
    }
  }

  sendCheckpointActivated(checkpointId, x, y) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('activate-checkpoint', { checkpointId, x, y });
    }
  }

  sendEnemyDamage(enemyId, damage, newHp, isDead, x, y) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('enemy-damage', { enemyId, damage, newHp, isDead, x, y });
    }
  }

  sendBossDamage(damage, newHp, phase, isDead) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('boss-damage', { damage, newHp, phase, isDead });
    }
  }

  sendLevelTransition(nextLevel) {
    if (this.socket && this.isMultiplayer) {
      this.socket.emit('level-transition', { nextLevel });
    }
  }
}
