import * as THREE from 'three';
import { ParticleSystem3D } from './ParticleSystem3D.js';
import { FloatingTextManager } from './FloatingText.js';
import { World3D } from '../maps/World3D.js';
import { LEVELS } from '../maps/LevelData.js';
import {
  Checkpoint3D,
  Switch3D,
  Door3D,
  Chest3D,
  MovingPlatform3D,
  Coin3D,
  ExitPortal3D
} from '../maps/InteractiveObjects3D.js';
import { Enemy3D } from '../enemies/Enemy3D.js';
import { Boss3D } from '../enemies/Boss3D.js';
import { Player3D } from '../characters/Player3D.js';
import { QuestManager } from '../quests/QuestManager.js';
import { HUD } from '../ui/HUD.js';

// Central 3D Game Engine (WebGL, Three.js, Real 3D Environment and Characters)
export class GameEngine3D {
  constructor(canvas, inputManager, audioManager, networkManager) {
    this.canvas = canvas;
    this.input = inputManager;
    this.audio = audioManager;
    this.network = networkManager;

    // 1. Three.js Scene, Camera, and Renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 300);
    this.camera.position.set(10, 18, 24);
    this.camera.rotation.x = -0.15; // slight downward angle

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. Subsystems
    this.particles = new ParticleSystem3D(this.scene);
    this.floatingTexts = new FloatingTextManager();
    this.world3D = new World3D(this.scene);
    this.questManager = new QuestManager();
    this.hud = new HUD();

    // 3. Players & Entities
    this.localPlayer = null;
    this.partner = null;
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
    this.killsThisLevel = 0;

    // Camera Shake in 3D
    this.shakeIntensity = 0;
    this.shakeTimer = 0;

    this.setupResize();
    this.loadSaveData();
  }

  setupResize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  loadSaveData() {
    try {
      const saved = localStorage.getItem('twin_quest_save');
      this.saveData = saved ? JSON.parse(saved) : { unlockedLevel: 1, totalCoins: 0 };
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
      console.warn('Could not save:', e);
    }
  }

  startSoloGame(heroClass = 'warrior', playerName = 'Hero') {
    this.network.isMultiplayer = false;
    if (this.partner) {
      this.partner.destroy();
      this.partner = null;
    }
    if (this.localPlayer) this.localPlayer.destroy();

    this.localPlayer = new Player3D('local', playerName, heroClass, true, this.scene);
    this.loadLevel(1);
    this.startLoop();
    this.hud.show();
  }

  startMultiplayerGame(snapshot, localPlayerNum) {
    this.network.isMultiplayer = true;

    const p1Data = snapshot.players.find(p => p.playerNum === 1);
    const p2Data = snapshot.players.find(p => p.playerNum === 2);

    if (this.localPlayer) this.localPlayer.destroy();
    if (this.partner) this.partner.destroy();

    if (localPlayerNum === 1) {
      this.localPlayer = new Player3D('p1', p1Data.name, p1Data.characterClass, true, this.scene);
      this.partner = new Player3D('p2', p2Data ? p2Data.name : 'Partner', p2Data ? p2Data.characterClass : 'archer', false, this.scene);
    } else {
      this.localPlayer = new Player3D('p2', p2Data.name, p2Data.characterClass, true, this.scene);
      this.partner = new Player3D('p1', p1Data.name, p1Data.characterClass, false, this.scene);
    }

    this.loadLevel(snapshot.currentLevel || 1);
    this.startLoop();
    this.hud.show();
  }

  loadLevel(levelIndex, syncNetwork = true) {
    this.currentLevel = levelIndex;
    this.levelData = LEVELS[levelIndex] || LEVELS[1];
    this.killsThisLevel = 0;

    // Clear old 3D level objects
    this.clearCurrentLevel();

    // 1. Build 3D Scenery, Lighting, Platforms & Hazards
    this.world3D.setupLighting(this.levelData.theme);
    this.world3D.buildPlatforms(this.levelData.platforms, this.levelData.theme);
    this.world3D.buildHazards(this.levelData.hazards);
    this.world3D.buildScenery(this.levelData.worldWidth, this.levelData.theme);

    // Save platform data for physics
    this.platforms = this.levelData.platforms.map(p => ({
      x: p.x / 20,
      y: (1000 - p.y) / 20,
      width: p.width / 20,
      height: p.height / 20
    }));

    // 2. Build 3D Interactive Objects
    this.movingPlatforms = (this.levelData.movingPlatforms || []).map(
      mp => new MovingPlatform3D(mp.id, mp.x, mp.y, mp.width, mp.height, mp.dx, mp.dy, mp.speed, this.scene)
    );

    this.coins = this.levelData.coins.map(c => new Coin3D(c.id, c.x, c.y, this.scene));
    this.checkpoints = this.levelData.checkpoints.map(cp => new Checkpoint3D(cp.id, cp.x, cp.y, this.scene));
    this.switches = this.levelData.switches.map(sw => new Switch3D(sw.id, sw.x, sw.y, sw.targetId, sw.isPressurePlate, this.scene));
    this.doors = this.levelData.doors.map(d => new Door3D(d.id, d.x, d.y, d.width, d.height, this.scene));
    this.chests = this.levelData.chests.map(ch => new Chest3D(ch.id, ch.x, ch.y, ch.tier, this.scene));

    // 3. Build 3D Enemies & Boss
    this.enemies = this.levelData.enemies.map(e => new Enemy3D(e.id, e.type, e.x, e.y, {}, this.scene));
    if (this.levelData.boss) {
      this.boss = new Boss3D(this.levelData.boss.level, this.levelData.boss.x, this.levelData.boss.y, this.scene);
    } else {
      this.boss = null;
    }

    if (this.levelData.exitPortal) {
      this.exitPortal = new ExitPortal3D(this.levelData.exitPortal.x, this.levelData.exitPortal.y, this.scene);
    }

    // 4. Position 3D Players at Spawn
    const spawnX = this.levelData.spawnPoint.x / 20;
    const spawnY = (1000 - this.levelData.spawnPoint.y) / 20;

    if (this.localPlayer) {
      this.localPlayer.x = spawnX;
      this.localPlayer.y = spawnY;
      this.localPlayer.checkpoint = { x: spawnX, y: spawnY };
      this.localPlayer.vx = 0;
      this.localPlayer.vy = 0;
      this.localPlayer.isDead = false;
    }
    if (this.partner) {
      this.partner.x = spawnX + 1.5;
      this.partner.y = spawnY;
      this.partner.checkpoint = { x: spawnX + 1.5, y: spawnY };
      this.partner.targetX = spawnX + 1.5;
      this.partner.targetY = spawnY;
    }

    // Quests & HUD
    this.questManager.loadQuests(this.levelData.quests || []);
    this.audio.startMusic(levelIndex);
    this.hud.setLevelInfo(`Level ${levelIndex}: ${this.levelData.name}`);
    this.hud.showToast(`Entered ${this.levelData.name}!`);

    if (syncNetwork && this.network.isMultiplayer && this.network.isHost) {
      this.network.sendLevelTransition(levelIndex);
    }
  }

  clearCurrentLevel() {
    this.world3D.clear();
    this.particles.clear();
    for (const mp of this.movingPlatforms) mp.destroy();
    for (const c of this.coins) c.destroy();
    for (const cp of this.checkpoints) cp.destroy();
    for (const sw of this.switches) sw.destroy();
    for (const d of this.doors) d.destroy();
    for (const ch of this.chests) ch.destroy();
    for (const e of this.enemies) e.destroy();
    if (this.boss) this.boss.destroy();
    if (this.exitPortal) this.exitPortal.destroy();

    this.movingPlatforms = [];
    this.coins = [];
    this.checkpoints = [];
    this.switches = [];
    this.doors = [];
    this.chests = [];
    this.enemies = [];
    this.boss = null;
    this.exitPortal = null;
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

    if (this.input.consumePause()) {
      this.togglePause();
    }

    this.particles.update(dt);
    this.floatingTexts.update(dt);

    for (const mp of this.movingPlatforms) mp.update(dt);
    for (const d of this.doors) d.update(dt);
    for (const cp of this.checkpoints) cp.update(dt);
    for (const c of this.coins) c.update(dt);
    if (this.exitPortal) {
      this.exitPortal.update(dt);
      if (this.boss && this.boss.isDead) this.exitPortal.active = true;
    }

    // Update Local 3D Player
    if (this.localPlayer) {
      this.localPlayer.update(dt, this.input, this.audio, this.particles, this.floatingTexts);
      this.applyPlayer3DPhysics(this.localPlayer, dt);

      if (this.localPlayer.isDead) {
        const modalGameOver = document.getElementById('modal-gameover');
        if (modalGameOver && modalGameOver.classList.contains('hidden')) {
          modalGameOver.classList.remove('hidden');
          this.audio.playGameOver();
        }
      }

      if (this.network.isMultiplayer) {
        // Send scaled coordinates to partner
        this.network.sendPlayerSync({
          x: this.localPlayer.x * 20,
          y: (1000 - this.localPlayer.y * 20),
          vx: this.localPlayer.vx * 20,
          vy: -this.localPlayer.vy * 20,
          facing: this.localPlayer.facing,
          state: this.localPlayer.state,
          hp: this.localPlayer.hp
        });
      }
    }

    // Update Partner 3D Player
    if (this.partner && this.partner.connected) {
      this.partner.update(dt, null, this.audio, this.particles, this.floatingTexts);
    }

    // Update 3D Enemies
    for (const enemy of this.enemies) {
      enemy.update(dt, players);
      if (!enemy.flying) this.applyGround3DCollision(enemy, dt);
    }

    // Update 3D Boss
    if (this.boss && !this.boss.isDead) {
      this.boss.update(dt, players, this.audio, this.particles, this);
      this.applyGround3DCollision(this.boss, dt);
      this.hud.updateBoss(this.boss);
    }

    // Interactivity, Combat, Collectibles
    this.handle3DInteractions();
    this.handle3DCombat();
    this.handle3DWorldCollisions();

    // 3D Camera Follow & Lerp
    this.update3DCamera(dt);

    // Update HUD
    this.hud.updatePlayer1(this.localPlayer);
    if (this.partner) this.hud.updatePlayer2(this.partner);
  }

  applyPlayer3DPhysics(player, dt) {
    if (player.isDashing) {
      player.x += player.vx * dt;
      return;
    }

    const gravity = -35;
    player.vy += gravity * dt;
    player.x += player.vx * dt;
    player.y += player.vy * dt;

    player.isGrounded = false;

    // Platform collisions
    for (const p of this.platforms) {
      const topY = p.y;
      const botY = p.y - p.height;

      if (player.x > p.x && player.x < p.x + p.width) {
        if (player.vy <= 0 && player.y <= topY && player.y - player.vy * dt >= topY - 0.4) {
          player.y = topY;
          player.vy = 0;
          player.isGrounded = true;
          player.canDoubleJump = true;
        }
      }
    }

    // Moving Platform Collisions
    for (const mp of this.movingPlatforms) {
      if (player.x >= mp.x && player.x <= mp.x + mp.w) {
        if (player.vy <= 0 && Math.abs(player.y - mp.y) < 0.5) {
          player.y = mp.y;
          player.vy = 0;
          player.isGrounded = true;
          player.canDoubleJump = true;
        }
      }
    }

    // Abyss Fall Check
    if (player.y < 0) {
      player.takeDamage(30);
      player.x = player.checkpoint.x;
      player.y = player.checkpoint.y;
      player.vx = 0;
      player.vy = 0;
      this.particles.createHitSparks(player.x, player.y);
    }
  }

  applyGround3DCollision(entity, dt) {
    const gravity = -30;
    entity.vy += gravity * dt;
    entity.x += entity.vx * dt;
    entity.y += entity.vy * dt;

    for (const p of this.platforms) {
      const topY = p.y;
      if (entity.x >= p.x && entity.x <= p.x + p.width) {
        if (entity.vy <= 0 && entity.y <= topY && entity.y - entity.vy * dt >= topY - 0.5) {
          entity.y = topY;
          entity.vy = 0;
        }
      }
    }
  }

  handle3DInteractions() {
    const p1 = this.localPlayer;
    if (!p1) return;

    const wantInteract = this.input.consumeInteract();

    // 1. Pressure Plates & Levers
    for (const sw of this.switches) {
      if (sw.isPressurePlate) {
        const onP1 = Math.abs(p1.x - sw.x) < 0.9 && Math.abs(p1.y - sw.y) < 0.4;
        const onP2 = this.partner && Math.abs(this.partner.x - sw.x) < 0.9 && Math.abs(this.partner.y - sw.y) < 0.4;
        const shouldActive = onP1 || onP2;

        if (sw.state !== shouldActive) {
          sw.setState(shouldActive);
          this.audio.playSwitch();
          this.updateLinkedDoor(sw.targetId);
          if (this.network.isMultiplayer) this.network.sendSwitchTrigger(sw.id, shouldActive);
          if (shouldActive) this.questManager.progressQuest('switch', 1, this.audio, this.floatingTexts, p1);
        }
      } else if (wantInteract) {
        if (Math.hypot(p1.x - sw.x, p1.y - sw.y) < 2.4) {
          sw.setState(!sw.state);
          this.audio.playSwitch();
          this.updateLinkedDoor(sw.targetId);
          if (this.network.isMultiplayer) this.network.sendSwitchTrigger(sw.id, sw.state);
          this.questManager.progressQuest('switch', 1, this.audio, this.floatingTexts, p1);
        }
      }
    }

    // 2. Chests
    if (wantInteract) {
      for (const ch of this.chests) {
        if (!ch.opened && Math.hypot(p1.x - ch.x, p1.y - ch.y) < 2.6) {
          const reward = ch.open(this.audio, this.particles, this.floatingTexts);
          if (reward) {
            p1.coins += reward.coins;
            p1.gems += reward.gems;
            if (this.network.isMultiplayer) this.network.sendChestOpened(ch.id, reward);
          }
        }
      }

      // 3. Exit Portal
      if (this.exitPortal && this.exitPortal.active) {
        if (Math.hypot(p1.x - this.exitPortal.x, p1.y - this.exitPortal.y) < 3.0) {
          this.triggerVictory();
        }
      }
    }
  }

  updateLinkedDoor(targetDoorId) {
    const door = this.doors.find(d => d.id === targetDoorId);
    if (!door) return;

    const linkedSwitches = this.switches.filter(sw => sw.targetId === targetDoorId);
    const requiredActive = this.network.isMultiplayer ? linkedSwitches.length : 1;
    const activeCount = linkedSwitches.filter(sw => sw.state).length;

    const open = activeCount >= requiredActive;
    if (door.isOpen !== open) {
      door.isOpen = open;
      this.audio.playDoor();
      if (this.network.isMultiplayer) this.network.sendDoorTrigger(door.id, open);
    }
  }

  handle3DCombat() {
    const p1 = this.localPlayer;
    if (!p1 || p1.isDead) return;

    // Melee Hitbox
    const hitbox = p1.getAttackHitbox();
    if (hitbox) {
      for (const enemy of this.enemies) {
        if (!enemy.isDead && Math.hypot(p1.x - enemy.x, p1.y - enemy.y) < hitbox.width) {
          const dealt = enemy.takeDamage(hitbox.damage, p1.x);
          if (dealt > 0) {
            this.audio.playHit();
            this.particles.createHitSparks(enemy.x, enemy.y + 0.5);
            if (enemy.isDead) this.onEnemyKilled(enemy);
            if (this.network.isMultiplayer) {
              this.network.sendEnemyDamage(enemy.id, dealt, enemy.hp, enemy.isDead, enemy.x * 20, enemy.y * 20);
            }
          }
        }
      }

      if (this.boss && !this.boss.isDead && Math.hypot(p1.x - this.boss.x, p1.y - this.boss.y) < hitbox.width + 1.2) {
        const dealt = this.boss.takeDamage(hitbox.damage);
        if (dealt > 0) {
          this.audio.playHit();
          this.particles.createHitSparks(this.boss.x, this.boss.y + 1.5);
          if (this.boss.isDead) this.onBossKilled();
          if (this.network.isMultiplayer) {
            this.network.sendBossDamage(dealt, this.boss.hp, this.boss.phase, this.boss.isDead);
          }
        }
      }
    }

    // Player Projectiles
    for (let i = p1.projectiles.length - 1; i >= 0; i--) {
      const proj = p1.projectiles[i];
      let hit = false;

      for (const enemy of this.enemies) {
        if (!enemy.isDead && Math.hypot(proj.x - enemy.x, proj.y - enemy.y) < 1.2) {
          hit = true;
          const dealt = enemy.takeDamage(proj.damage, p1.x);
          this.audio.playHit();
          this.particles.createHitSparks(enemy.x, enemy.y + 0.5);
          if (enemy.isDead) this.onEnemyKilled(enemy);
          break;
        }
      }

      if (!hit && this.boss && !this.boss.isDead && Math.hypot(proj.x - this.boss.x, proj.y - this.boss.y) < 2.0) {
        hit = true;
        const dealt = this.boss.takeDamage(proj.damage);
        this.audio.playHit();
        this.particles.createHitSparks(this.boss.x, this.boss.y + 1.5);
        if (this.boss.isDead) this.onBossKilled();
      }

      if (hit && proj.type !== 'piercing_arrow') {
        if (proj.mesh) this.scene.remove(proj.mesh);
        p1.projectiles.splice(i, 1);
      }
    }

    // Enemy Contact Damage
    for (const enemy of this.enemies) {
      if (!enemy.isDead && Math.hypot(p1.x - enemy.x, p1.y - enemy.y) < 1.2) {
        if (p1.takeDamage(enemy.damage, enemy.x)) {
          this.audio.playHit();
          this.shake(5, 0.2);
        }
      }
    }

    // Boss Projectiles & Contact
    if (this.boss && !this.boss.isDead) {
      if (Math.hypot(p1.x - this.boss.x, p1.y - this.boss.y) < 2.2) {
        if (p1.takeDamage(this.boss.damage, this.boss.x)) {
          this.audio.playHit();
          this.shake(7, 0.25);
        }
      }

      for (let i = this.boss.projectiles.length - 1; i >= 0; i--) {
        const bp = this.boss.projectiles[i];
        if (Math.hypot(p1.x - bp.x, p1.y - bp.y) < 1.2) {
          if (p1.takeDamage(bp.damage, bp.x)) {
            this.audio.playHit();
            this.shake(7, 0.25);
          }
          if (bp.mesh) this.scene.remove(bp.mesh);
          this.boss.projectiles.splice(i, 1);
        }
      }
    }
  }

  onEnemyKilled(enemy) {
    this.killsThisLevel++;
    this.particles.createDefeatExplosion(enemy.x, enemy.y + 0.8);
    if (this.localPlayer) {
      this.localPlayer.coins += enemy.coins;
      this.localPlayer.score += enemy.coins * 10;
    }
    this.questManager.progressQuest('kills', 1, this.audio, this.floatingTexts, this.localPlayer);
  }

  onBossKilled() {
    this.audio.playVictory();
    this.shake(14, 0.8);
    this.particles.createDefeatExplosion(this.boss.x, this.boss.y + 2);
    if (this.localPlayer) {
      this.localPlayer.coins += 200;
      this.localPlayer.gems += 5;
    }
    if (this.exitPortal) this.exitPortal.active = true;
    this.questManager.progressQuest('boss', 1, this.audio, this.floatingTexts, this.localPlayer);
    this.hud.updateBoss(null);
  }

  handle3DWorldCollisions() {
    const p1 = this.localPlayer;
    if (!p1) return;

    // Coins
    for (const c of this.coins) {
      if (!c.collected && Math.hypot(p1.x - c.x, p1.y - c.y) < 1.4) {
        c.collect();
        p1.coins += 10;
        this.audio.playCoin();
        this.particles.createCoinSparkle(c.x, c.y);
        this.questManager.progressQuest('coins', 1, this.audio, this.floatingTexts, p1);
      }
    }

    // Checkpoints
    for (const cp of this.checkpoints) {
      if (!cp.active && Math.hypot(p1.x - cp.x, p1.y - cp.y) < 2.0) {
        cp.activate(this.audio, this.particles, this.floatingTexts);
        p1.checkpoint = { x: cp.x, y: cp.y };
        if (this.network.isMultiplayer) {
          this.network.sendCheckpointActivated(cp.id, cp.x * 20, (1000 - cp.y * 20));
        }
      }
    }
  }

  update3DCamera(dt) {
    if (!this.localPlayer) return;

    let targetX = this.localPlayer.x;
    let targetY = this.localPlayer.y + 2.5;

    if (this.partner && this.partner.connected) {
      targetX = (this.localPlayer.x + this.partner.x) / 2;
      targetY = (this.localPlayer.y + this.partner.y) / 2 + 2.5;
    }

    // Smooth camera tracking
    this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetX, 7 * dt);
    this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetY, 7 * dt);

    // Screen Shake
    if (this.shakeTimer > 0) {
      this.shakeTimer -= dt;
      const intensity = this.shakeIntensity * (this.shakeTimer / 0.3);
      this.camera.position.x += (Math.random() - 0.5) * intensity;
      this.camera.position.y += (Math.random() - 0.5) * intensity;
    }
  }

  shake(intensity = 6, duration = 0.25) {
    this.shakeIntensity = intensity * 0.15;
    this.shakeTimer = duration;
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
    const next = this.currentLevel >= 5 ? 1 : this.currentLevel + 1;
    this.loadLevel(next);
  }

  respawnPlayer() {
    const modal = document.getElementById('modal-gameover');
    if (modal) modal.classList.add('hidden');
    if (this.localPlayer) {
      this.localPlayer.respawn();
      this.particles.createCheckpointAura(this.localPlayer.x, this.localPlayer.y);
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
    if (ch && !ch.opened) ch.open(this.audio, this.particles, this.floatingTexts);
  }

  applyCheckpointSync(checkpointId) {
    const cp = this.checkpoints.find(c => c.id === checkpointId);
    if (cp && !cp.active) cp.activate(this.audio, this.particles, this.floatingTexts);
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

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
