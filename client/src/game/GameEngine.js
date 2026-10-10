// Central Game Engine coordinating physics, levels, combat, co-op puzzles, and rendering

import { Camera } from './Camera.js';
import { ParticleSystem } from './ParticleSystem.js';
import { FloatingTextManager } from './FloatingText.js';
import { TileRenderer } from '../maps/TileRenderer.js';
import { LEVELS } from '../maps/LevelData.js';
import { Checkpoint, Switch, Door, Chest, MovingPlatform, ExitPortal } from '../maps/InteractiveObjects.js';
import { Enemy } from '../enemies/Enemy.js';
import { Boss } from '../enemies/Boss.js';
import { Player } from '../characters/Player.js';
import { QuestManager } from '../quests/QuestManager.js';
import { HUD } from '../ui/HUD.js';

export class GameEngine {
  constructor(canvas, inputManager, audioManager, networkManager) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.input = inputManager;
    this.audio = audioManager;
    this.network = networkManager;

    this.camera = new Camera(window.innerWidth, window.innerHeight);
    this.particles = new ParticleSystem();
    this.floatingTexts = new FloatingTextManager();
    this.tileRenderer = new TileRenderer();
    this.questManager = new QuestManager();
    this.hud = new HUD();

    // Players
    this.localPlayer = null;
    this.partner = null;

    // Current Level Elements
    this.currentLevel = 1;
    this.levelData = null;
    this.platforms = [];
    this.movingPlatforms = [];
    this.hazards = [];
    this.coins = [];
    this.checkpoints = [];
    this.switches = [];
    this.doors = [];
    this.chests = [];
    this.enemies = [];
    this.boss = null;
    this.exitPortal = null;

    this.isPaused = false;
    this.isRunning = false;
    this.lastTime = 0;

    // Stats
    this.killsThisLevel = 0;

    this.setupResize();
    this.loadSaveData();
  }

  setupResize() {
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.camera.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
    resize();
  }

  loadSaveData() {
    try {
      const saved = localStorage.getItem('twin_quest_save');
      if (saved) {
        this.saveData = JSON.parse(saved);
      } else {
        this.saveData = { unlockedLevel: 1, totalCoins: 0 };
      }
    } catch {
      this.saveData = { unlockedLevel: 1, totalCoins: 0 };
    }
  }

  saveProgress() {
    if (!this.localPlayer) return;
    try {
      this.saveData.totalCoins = this.localPlayer.coins;
      this.saveData.unlockedLevel = Math.max(this.saveData.unlockedLevel || 1, this.currentLevel);
      localStorage.setItem('twin_quest_save', JSON.stringify(this.saveData));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  startSoloGame(heroClass = 'warrior', playerName = 'Hero') {
    this.network.isMultiplayer = false;
    this.partner = null;

    this.localPlayer = new Player('local', playerName, heroClass, true);
    this.loadLevel(1);
    this.startLoop();
    this.hud.show();
  }

  startMultiplayerGame(snapshot, localPlayerNum) {
    this.network.isMultiplayer = true;

    const p1Data = snapshot.players.find(p => p.playerNum === 1);
    const p2Data = snapshot.players.find(p => p.playerNum === 2);

    if (localPlayerNum === 1) {
      this.localPlayer = new Player('p1', p1Data.name, p1Data.characterClass, true);
      this.partner = new Player('p2', p2Data ? p2Data.name : 'Partner', p2Data ? p2Data.characterClass : 'archer', false);
    } else {
      this.localPlayer = new Player('p2', p2Data.name, p2Data.characterClass, true);
      this.partner = new Player('p1', p1Data.name, p1Data.characterClass, false);
    }

    this.loadLevel(snapshot.currentLevel || 1);
    this.startLoop();
    this.hud.show();
  }

  loadLevel(levelIndex, syncNetwork = true) {
    this.currentLevel = levelIndex;
    this.levelData = LEVELS[levelIndex] || LEVELS[1];
    this.camera.setWorldBounds(this.levelData.worldWidth, this.levelData.worldHeight);
    this.killsThisLevel = 0;

    // Load platforms & static shapes
    this.platforms = [...this.levelData.platforms];
    this.hazards = [...this.levelData.hazards];

    // Load Moving Platforms
    this.movingPlatforms = (this.levelData.movingPlatforms || []).map(
      mp => new MovingPlatform(mp.id, mp.x, mp.y, mp.width, mp.height, mp.dx, mp.dy, mp.speed)
    );

    // Collectible Coins
    this.coins = this.levelData.coins.map(c => ({ ...c, collected: false }));

    // Interactive Objects
    this.checkpoints = this.levelData.checkpoints.map(cp => new Checkpoint(cp.id, cp.x, cp.y));
    this.switches = this.levelData.switches.map(sw => new Switch(sw.id, sw.x, sw.y, sw.targetId, sw.isPressurePlate));
    this.doors = this.levelData.doors.map(d => new Door(d.id, d.x, d.y, d.width, d.height));
    this.chests = this.levelData.chests.map(ch => new Chest(ch.id, ch.x, ch.y, ch.tier));

    // Enemies
    this.enemies = this.levelData.enemies.map(e => new Enemy(e.id, e.type, e.x, e.y));

    // Boss
    if (this.levelData.boss) {
      this.boss = new Boss(this.levelData.boss.level, this.levelData.boss.x, this.levelData.boss.y);
    } else {
      this.boss = null;
    }

    // Exit Portal
    if (this.levelData.exitPortal) {
      this.exitPortal = new ExitPortal(this.levelData.exitPortal.x, this.levelData.exitPortal.y);
    }

    // Place Players at Spawn Point
    const sp = this.levelData.spawnPoint;
    if (this.localPlayer) {
      this.localPlayer.x = sp.x;
      this.localPlayer.y = sp.y;
      this.localPlayer.checkpoint = { x: sp.x, y: sp.y };
      this.localPlayer.vx = 0;
      this.localPlayer.vy = 0;
      this.localPlayer.isDead = false;
    }
    if (this.partner) {
      this.partner.x = sp.x + 40;
      this.partner.y = sp.y;
      this.partner.checkpoint = { x: sp.x + 40, y: sp.y };
      this.partner.targetX = sp.x + 40;
      this.partner.targetY = sp.y;
    }

    // Load Level Quests
    this.questManager.loadQuests(this.levelData.quests || []);

    // Audio & HUD
    this.audio.startMusic(levelIndex);
    this.hud.setLevelInfo(`Level ${levelIndex}: ${this.levelData.name}`);
    this.hud.showToast(`Entered ${this.levelData.name}!`);

    if (syncNetwork && this.network.isMultiplayer && this.network.isHost) {
      this.network.sendLevelTransition(levelIndex);
    }
  }

  startLoop() {
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  gameLoop(currentTime) {
    if (!this.isRunning) return;

    const dt = Math.min(0.05, (currentTime - this.lastTime) / 1000);
    this.lastTime = currentTime;

    if (!this.isPaused) {
      this.update(dt);
    }
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  update(dt) {
    const players = [this.localPlayer, this.partner].filter(Boolean);

    // Check pause key
    if (this.input.consumePause()) {
      this.togglePause();
    }

    // Update Particles, Float Texts, and TileRenderer
    this.particles.update(dt);
    this.floatingTexts.update(dt);
    this.tileRenderer.update(dt);

    // Update Moving Platforms
    for (const mp of this.movingPlatforms) {
      mp.update(dt);
    }

    // Update Doors
    for (const d of this.doors) {
      d.update(dt);
    }

    // Update Checkpoints & Exit Portal
    for (const cp of this.checkpoints) {
      cp.update(dt);
    }
    if (this.exitPortal) {
      this.exitPortal.update(dt);
      if (this.boss && this.boss.isDead) {
        this.exitPortal.active = true;
      }
    }

    // Update Local Player
    if (this.localPlayer) {
      this.localPlayer.update(dt, this.input, this.audio, this.particles, this.floatingTexts);
      this.applyPlayerPhysics(this.localPlayer, dt);

      // Check player death for game over prompt
      if (this.localPlayer.isDead) {
        const modalGameOver = document.getElementById('modal-gameover');
        if (modalGameOver && modalGameOver.classList.contains('hidden')) {
          modalGameOver.classList.remove('hidden');
          this.audio.playGameOver();
        }
      }

      // Realtime Network Sync
      if (this.network.isMultiplayer) {
        this.network.sendPlayerSync(this.localPlayer);
      }
    }

    // Update Partner Player (Interpolated)
    if (this.partner && this.partner.connected) {
      this.partner.update(dt, null, this.audio, this.particles, this.floatingTexts);
    }

    // Update Enemies
    for (const enemy of this.enemies) {
      enemy.update(dt, players);
      if (!enemy.flying) {
        this.applyGroundCollision(enemy, dt);
      }
    }

    // Update Boss
    if (this.boss && !this.boss.isDead) {
      this.boss.update(dt, players, this.audio, this.particles, this.camera);
      this.applyGroundCollision(this.boss, dt);
      this.hud.updateBoss(this.boss);
    }

    // Cooperative Interactions & Triggers
    this.handleInteractions();

    // Combat Hits & Projectiles
    this.handleCombatCollisions();

    // Collectibles & Checkpoints
    this.handleWorldCollisions();

    // Camera follow
    this.camera.update(dt, this.localPlayer, this.partner);

    // Update HUD
    this.hud.updatePlayer1(this.localPlayer);
    if (this.partner) {
      this.hud.updatePlayer2(this.partner);
    }
  }

  applyPlayerPhysics(player, dt) {
    if (player.isDashing) {
      player.x += player.vx * dt;
      return;
    }

    // Gravity
    const gravity = 980;
    player.vy += gravity * dt;

    // Movement integration
    player.x += player.vx * dt;
    player.y += player.vy * dt;

    // Platform collisions
    player.isGrounded = false;

    // Solid doors
    const colliders = [...this.platforms];
    for (const d of this.doors) {
      const solidD = d.getSolidRect();
      if (solidD) colliders.push(solidD);
    }

    for (const p of colliders) {
      if (
        player.x < p.x + p.width &&
        player.x + player.width > p.x &&
        player.y < p.y + p.height &&
        player.y + player.height > p.y
      ) {
        // Landing on top
        if (player.vy >= 0 && player.y + player.height - player.vy * dt <= p.y + 12) {
          player.y = p.y - player.height;
          player.vy = 0;
          player.isGrounded = true;
          player.canDoubleJump = true;
        } else if (player.vy < 0 && player.y - player.vy * dt >= p.y + p.height - 12) {
          // Hitting ceiling
          player.y = p.y + p.height;
          player.vy = 0;
        } else if (player.vx > 0) {
          player.x = p.x - player.width;
          player.vx = 0;
        } else if (player.vx < 0) {
          player.x = p.x + p.width;
          player.vx = 0;
        }
      }
    }

    // Moving Platform Collisions & Attachment
    for (const mp of this.movingPlatforms) {
      if (
        player.x < mp.x + mp.width &&
        player.x + player.width > mp.x &&
        player.y + player.height >= mp.y &&
        player.y + player.height <= mp.y + 18 &&
        player.vy >= 0
      ) {
        player.y = mp.y - player.height;
        player.vy = 0;
        player.isGrounded = true;
        player.canDoubleJump = true;
      }
    }

    // World Floor / Chasm check
    if (player.y > this.levelData.worldHeight - 40) {
      player.takeDamage(30);
      player.x = player.checkpoint.x;
      player.y = player.checkpoint.y;
      player.vx = 0;
      player.vy = 0;
      this.particles.createHitSparks(player.x, player.y);
      this.floatingTexts.add('Fell into Abyss!', player.x + player.width / 2, player.y - 10, { color: '#ef4444' });
    }
  }

  applyGroundCollision(entity, dt) {
    const gravity = 900;
    entity.vy += gravity * dt;
    entity.x += entity.vx * dt;
    entity.y += entity.vy * dt;

    for (const p of this.platforms) {
      if (
        entity.x < p.x + p.width &&
        entity.x + entity.width > p.x &&
        entity.y < p.y + p.height &&
        entity.y + entity.height > p.y
      ) {
        if (entity.vy >= 0 && entity.y + entity.height - entity.vy * dt <= p.y + 14) {
          entity.y = p.y - entity.height;
          entity.vy = 0;
        } else if (entity.vx > 0) {
          entity.x = p.x - entity.width;
          entity.vx = -entity.vx;
          entity.facing = -1;
        } else if (entity.vx < 0) {
          entity.x = p.x + p.width;
          entity.vx = -entity.vx;
          entity.facing = 1;
        }
      }
    }
  }

  handleInteractions() {
    const p1 = this.localPlayer;
    if (!p1) return;

    const wantInteract = this.input.consumeInteract();

    // 1. Pressure Plates (Stepping on them)
    for (const sw of this.switches) {
      if (sw.isPressurePlate) {
        // Active if any player is on top of it
        const onPlateP1 = p1.x + p1.width > sw.x && p1.x < sw.x + sw.width && Math.abs((p1.y + p1.height) - (sw.y + sw.height)) < 12;
        const onPlateP2 = this.partner && (this.partner.x + this.partner.width > sw.x && this.partner.x < sw.x + sw.width && Math.abs((this.partner.y + this.partner.height) - (sw.y + sw.height)) < 12);

        const shouldActivate = onPlateP1 || onPlateP2;
        if (sw.state !== shouldActivate) {
          sw.setState(shouldActivate);
          this.audio.playSwitch();
          this.updateLinkedDoor(sw.targetId);
          if (this.network.isMultiplayer) {
            this.network.sendSwitchTrigger(sw.id, shouldActivate);
          }
          if (shouldActivate) {
            this.questManager.progressQuest('switch', 1, this.audio, this.floatingTexts, p1);
          }
        }
      } else if (wantInteract) {
        // Standard wall/floor lever
        const dist = Math.hypot((p1.x + p1.width / 2) - (sw.x + sw.width / 2), (p1.y + p1.height / 2) - (sw.y + sw.height / 2));
        if (dist < 48) {
          sw.setState(!sw.state);
          this.audio.playSwitch();
          this.updateLinkedDoor(sw.targetId);
          if (this.network.isMultiplayer) {
            this.network.sendSwitchTrigger(sw.id, sw.state);
          }
          this.questManager.progressQuest('switch', 1, this.audio, this.floatingTexts, p1);
        }
      }
    }

    // 2. Chests
    if (wantInteract) {
      for (const ch of this.chests) {
        if (!ch.opened) {
          const dist = Math.hypot((p1.x + p1.width / 2) - (ch.x + ch.width / 2), (p1.y + p1.height / 2) - (ch.y + ch.height / 2));
          if (dist < 52) {
            const reward = ch.open(this.audio, this.particles, this.floatingTexts);
            if (reward) {
              p1.coins += reward.coins;
              p1.gems += reward.gems;
              if (this.network.isMultiplayer) {
                this.network.sendChestOpened(ch.id, reward);
              }
            }
          }
        }
      }

      // 3. Exit Portal
      if (this.exitPortal && this.exitPortal.active) {
        const dist = Math.hypot((p1.x + p1.width / 2) - (this.exitPortal.x + this.exitPortal.width / 2), (p1.y + p1.height / 2) - (this.exitPortal.y + this.exitPortal.height / 2));
        if (dist < 60) {
          this.triggerVictory();
        }
      }
    }
  }

  updateLinkedDoor(targetDoorId) {
    const door = this.doors.find(d => d.id === targetDoorId);
    if (!door) return;

    // Check if this door requires multiple switches (e.g. Dual Levers in Level 3/5)
    const linkedSwitches = this.switches.filter(sw => sw.targetId === targetDoorId);
    // In single player, 1 active switch is enough to unlock. In co-op, both can be required!
    const requiredActive = this.network.isMultiplayer ? linkedSwitches.length : 1;
    const activeCount = linkedSwitches.filter(sw => sw.state).length;

    const open = activeCount >= requiredActive;
    if (door.isOpen !== open) {
      door.isOpen = open;
      this.audio.playDoor();
      if (this.network.isMultiplayer) {
        this.network.sendDoorTrigger(door.id, open);
      }
    }
  }

  handleCombatCollisions() {
    const p1 = this.localPlayer;
    if (!p1 || p1.isDead) return;

    // 1. Local Player Melee Attack
    const attackHitbox = p1.getAttackHitbox();
    if (attackHitbox) {
      // Check enemies
      for (const enemy of this.enemies) {
        if (!enemy.isDead && this.checkAABB(attackHitbox, enemy)) {
          const dealt = enemy.takeDamage(attackHitbox.damage, p1.x);
          if (dealt > 0) {
            this.audio.playHit();
            this.particles.createHitSparks(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
            this.floatingTexts.add(`-${dealt}`, enemy.x + enemy.width / 2, enemy.y - 10, { color: '#f87171' });

            if (enemy.isDead) {
              this.onEnemyKilled(enemy);
            }
            if (this.network.isMultiplayer) {
              this.network.sendEnemyDamage(enemy.id, dealt, enemy.hp, enemy.isDead, enemy.x, enemy.y);
            }
          }
        }
      }

      // Check Boss
      if (this.boss && !this.boss.isDead && this.checkAABB(attackHitbox, this.boss)) {
        const dealt = this.boss.takeDamage(attackHitbox.damage);
        if (dealt > 0) {
          this.audio.playHit();
          this.particles.createHitSparks(this.boss.x + this.boss.width / 2, this.boss.y + this.boss.height / 2);
          this.floatingTexts.add(`CRIT! -${dealt}`, this.boss.x + this.boss.width / 2, this.boss.y - 16, { color: '#fbbf24', isCrit: true });

          if (this.boss.isDead) {
            this.onBossKilled();
          }
          if (this.network.isMultiplayer) {
            this.network.sendBossDamage(dealt, this.boss.hp, this.boss.phase, this.boss.isDead);
          }
        }
      }
    }

    // 2. Player Projectiles
    for (let i = p1.projectiles.length - 1; i >= 0; i--) {
      const proj = p1.projectiles[i];

      // Against enemies
      let hit = false;
      for (const enemy of this.enemies) {
        if (!enemy.isDead && this.checkAABB(proj, enemy)) {
          hit = true;
          const dealt = enemy.takeDamage(proj.damage, p1.x);
          this.audio.playHit();
          this.particles.createHitSparks(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
          this.floatingTexts.add(`-${dealt}`, enemy.x + enemy.width / 2, enemy.y - 10, { color: '#f87171' });

          if (enemy.isDead) this.onEnemyKilled(enemy);
          if (this.network.isMultiplayer) {
            this.network.sendEnemyDamage(enemy.id, dealt, enemy.hp, enemy.isDead, enemy.x, enemy.y);
          }
          break;
        }
      }

      // Against Boss
      if (!hit && this.boss && !this.boss.isDead && this.checkAABB(proj, this.boss)) {
        hit = true;
        const dealt = this.boss.takeDamage(proj.damage);
        this.audio.playHit();
        this.particles.createHitSparks(this.boss.x + this.boss.width / 2, this.boss.y + this.boss.height / 2);
        this.floatingTexts.add(`-${dealt}`, this.boss.x + this.boss.width / 2, this.boss.y - 16, { color: '#fbbf24' });

        if (this.boss.isDead) this.onBossKilled();
        if (this.network.isMultiplayer) {
          this.network.sendBossDamage(dealt, this.boss.hp, this.boss.phase, this.boss.isDead);
        }
      }

      if (hit && proj.type !== 'piercing_arrow') {
        p1.projectiles.splice(i, 1);
      }
    }

    // 3. Enemy Contact Damage to Player
    for (const enemy of this.enemies) {
      if (!enemy.isDead && this.checkAABB(p1, enemy)) {
        if (p1.takeDamage(enemy.damage, enemy.x)) {
          this.audio.playHit();
          this.camera.shake(5, 0.2);
          this.floatingTexts.add(`-${enemy.damage}`, p1.x + p1.width / 2, p1.y - 10, { color: '#ef4444' });
        }
      }
    }

    // 4. Boss Contact & Boss Projectile Damage to Player
    if (this.boss && !this.boss.isDead) {
      if (this.checkAABB(p1, this.boss)) {
        if (p1.takeDamage(this.boss.damage, this.boss.x)) {
          this.audio.playHit();
          this.camera.shake(7, 0.25);
          this.floatingTexts.add(`-${this.boss.damage}`, p1.x + p1.width / 2, p1.y - 10, { color: '#ef4444' });
        }
      }

      for (let i = this.boss.projectiles.length - 1; i >= 0; i--) {
        const bp = this.boss.projectiles[i];
        if (this.checkAABB(p1, bp)) {
          if (p1.takeDamage(bp.damage, bp.x)) {
            this.audio.playHit();
            this.camera.shake(8, 0.3);
            this.floatingTexts.add(`-${bp.damage}`, p1.x + p1.width / 2, p1.y - 10, { color: '#ef4444' });
          }
          this.boss.projectiles.splice(i, 1);
        }
      }
    }
  }

  onEnemyKilled(enemy) {
    this.killsThisLevel++;
    this.particles.createDefeatExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
    this.floatingTexts.add(`+${enemy.coins} COINS`, enemy.x + enemy.width / 2, enemy.y - 16, { color: '#facc15' });

    if (this.localPlayer) {
      this.localPlayer.coins += enemy.coins;
      this.localPlayer.score += enemy.coins * 10;
    }

    this.questManager.progressQuest('kills', 1, this.audio, this.floatingTexts, this.localPlayer);
  }

  onBossKilled() {
    this.audio.playVictory();
    this.camera.shake(12, 0.8);
    this.particles.createDefeatExplosion(this.boss.x + this.boss.width / 2, this.boss.y + this.boss.height / 2);

    this.floatingTexts.add('🏆 BOSS DEFEATED!', this.boss.x + this.boss.width / 2, this.boss.y - 30, {
      color: '#facc15',
      fontSize: 20,
      duration: 2.0
    });

    if (this.localPlayer) {
      this.localPlayer.coins += 200;
      this.localPlayer.gems += 5;
    }

    if (this.exitPortal) {
      this.exitPortal.active = true;
    }

    this.questManager.progressQuest('boss', 1, this.audio, this.floatingTexts, this.localPlayer);
    this.hud.updateBoss(null);
  }

  handleWorldCollisions() {
    const p1 = this.localPlayer;
    if (!p1) return;

    // 1. Coins Collection
    for (const c of this.coins) {
      if (!c.collected) {
        const dist = Math.hypot((p1.x + p1.width / 2) - (c.x + 8), (p1.y + p1.height / 2) - (c.y + 8));
        if (dist < 28) {
          c.collected = true;
          p1.coins += 10;
          this.audio.playCoin();
          this.particles.createCoinSparkle(c.x + 8, c.y + 8);
          this.floatingTexts.add('+10', c.x + 8, c.y - 8, { color: '#facc15', fontSize: 13 });
          this.questManager.progressQuest('coins', 1, this.audio, this.floatingTexts, p1);
        }
      }
    }

    // 2. Checkpoints
    for (const cp of this.checkpoints) {
      if (!cp.active) {
        const dist = Math.hypot((p1.x + p1.width / 2) - (cp.x + cp.width / 2), (p1.y + p1.height / 2) - (cp.y + cp.height / 2));
        if (dist < 42) {
          cp.activate(this.audio, this.particles, this.floatingTexts);
          p1.checkpoint = { x: cp.x, y: cp.y };
          if (this.network.isMultiplayer) {
            this.network.sendCheckpointActivated(cp.id, cp.x, cp.y);
          }
        }
      }
    }

    // 3. Spikes Hazard
    for (const h of this.hazards) {
      if (this.checkAABB(p1, h)) {
        if (p1.takeDamage(25, h.x + h.width / 2)) {
          this.audio.playHit();
          this.camera.shake(6, 0.2);
          this.floatingTexts.add('-25 (Spikes!)', p1.x + p1.width / 2, p1.y - 10, { color: '#ef4444' });
        }
      }
    }
  }

  triggerVictory() {
    this.isPaused = true;
    this.saveProgress();

    const victoryModal = document.getElementById('modal-victory');
    if (victoryModal) {
      document.getElementById('v-coins').textContent = this.localPlayer ? this.localPlayer.coins : 0;
      document.getElementById('v-kills').textContent = this.killsThisLevel;
      document.getElementById('v-boss').textContent = this.boss && this.boss.isDead ? 'Defeated! 🏆' : 'Skipped';
      victoryModal.classList.remove('hidden');
    }
    this.audio.playVictory();
  }

  nextLevel() {
    const modal = document.getElementById('modal-victory');
    if (modal) modal.classList.add('hidden');
    this.isPaused = false;

    const nextLvl = this.currentLevel >= 5 ? 1 : this.currentLevel + 1;
    this.loadLevel(nextLvl);
  }

  respawnPlayer() {
    const modal = document.getElementById('modal-gameover');
    if (modal) modal.classList.add('hidden');

    if (this.localPlayer) {
      this.localPlayer.respawn();
      this.particles.createCheckpointAura(this.localPlayer.x, this.localPlayer.y);
      this.floatingTexts.add('✨ RESPAWNED', this.localPlayer.x + this.localPlayer.width / 2, this.localPlayer.y - 10, { color: '#22c55e' });
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const settingsModal = document.getElementById('modal-settings');
    const resumeBtn = document.getElementById('btn-resume-game');
    const quitBtn = document.getElementById('btn-quit-to-menu');
    const settingsTitle = document.getElementById('settings-title');

    if (this.isPaused) {
      if (settingsTitle) settingsTitle.textContent = '⏸️ Game Paused';
      if (resumeBtn) resumeBtn.classList.remove('hidden');
      if (quitBtn) quitBtn.classList.remove('hidden');
      if (settingsModal) settingsModal.classList.remove('hidden');
    } else {
      if (settingsModal) settingsModal.classList.add('hidden');
    }
  }

  showToast(msg) {
    this.hud.showToast(msg);
  }

  // Network Sync Handlers
  applySwitchSync(switchId, state) {
    const sw = this.switches.find(s => s.id === switchId);
    if (sw) {
      sw.setState(state);
      this.updateLinkedDoor(sw.targetId);
    }
  }

  applyDoorSync(doorId, open) {
    const d = this.doors.find(dr => dr.id === doorId);
    if (d) d.isOpen = open;
  }

  applyChestSync(chestId, reward) {
    const ch = this.chests.find(c => c.id === chestId);
    if (ch && !ch.opened) {
      ch.open(this.audio, this.particles, this.floatingTexts);
    }
  }

  applyCheckpointSync(checkpointId, x, y) {
    const cp = this.checkpoints.find(c => c.id === checkpointId);
    if (cp && !cp.active) {
      cp.activate(this.audio, this.particles, this.floatingTexts);
    }
  }

  applyEnemyDamageSync(data) {
    const enemy = this.enemies.find(e => e.id === data.enemyId);
    if (enemy) {
      enemy.hp = data.newHp;
      if (data.isDead && !enemy.isDead) {
        enemy.isDead = true;
        this.onEnemyKilled(enemy);
      }
    }
  }

  applyBossDamageSync(data) {
    if (this.boss) {
      this.boss.hp = data.newHp;
      if (data.isDead && !this.boss.isDead) {
        this.boss.isDead = true;
        this.onBossKilled();
      }
    }
  }

  checkAABB(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  // Master Render Pass
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.levelData) return;

    // 1. Parallax Layers
    this.tileRenderer.renderParallaxBackground(
      this.ctx,
      this.camera,
      this.levelData.theme,
      this.levelData.worldWidth,
      this.levelData.worldHeight
    );

    // Apply Camera Transform
    this.camera.apply(this.ctx);

    // 2. Interactive World Elements
    for (const d of this.doors) d.render(this.ctx);
    for (const cp of this.checkpoints) cp.render(this.ctx);
    for (const sw of this.switches) sw.render(this.ctx);
    for (const ch of this.chests) ch.render(this.ctx);
    if (this.exitPortal) this.exitPortal.render(this.ctx);

    // 3. Terrain Platforms & Hazards
    this.tileRenderer.renderPlatforms(this.ctx, this.platforms, this.levelData.theme);
    for (const mp of this.movingPlatforms) mp.render(this.ctx);
    this.tileRenderer.renderHazards(this.ctx, this.hazards);
    this.tileRenderer.renderCoins(this.ctx, this.coins);

    // 4. Enemies & Boss
    for (const enemy of this.enemies) enemy.render(this.ctx);
    if (this.boss) this.boss.render(this.ctx);

    // 5. Heroes (Player 1 & Partner)
    if (this.partner && this.partner.connected) this.partner.render(this.ctx);
    if (this.localPlayer) this.localPlayer.render(this.ctx);

    // 6. Particles & Floating Damage Numbers
    this.particles.render(this.ctx);
    this.floatingTexts.render(this.ctx);

    // Restore Camera
    this.camera.restore(this.ctx);

    // 7. Foreground Layer (Depth-of-field foliage, fireflies, atmosphere, cinematic vignette)
    this.tileRenderer.renderForeground(this.ctx, this.camera, this.levelData.theme);
  }

}
