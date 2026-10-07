import * as THREE from 'three';

// Real 3D Multi-Phase Bosses with 3D Telegraphs and Shockwaves
export class Boss3D {
  constructor(level, x, y, scene = null) {
    this.level = level;
    this.x = x / 20;
    this.y = (1000 - y) / 20;
    this.z = 0;
    this.initialX = this.x;
    this.initialY = this.y;
    this.scene = scene;

    this.vx = 0;
    this.vy = 0;
    this.facing = -1;
    this.isDead = false;
    this.hurtTimer = 0;
    this.animTime = 0;

    this.attackState = 'idle';
    this.stateTimer = 1.8;
    this.projectiles = [];

    this.initBossData();
    this.create3DMesh();
  }

  initBossData() {
    switch (this.level) {
      case 1:
        this.name = 'Forest Guardian';
        this.width = 3.2;
        this.height = 4.2;
        this.maxHp = 350;
        this.hp = 350;
        this.damage = 18;
        this.speed = 2.4;
        this.color = 0x15803d;
        this.glowColor = 0x86efac;
        break;
      case 2:
        this.name = 'Crystal Beast';
        this.width = 3.6;
        this.height = 3.8;
        this.maxHp = 450;
        this.hp = 450;
        this.damage = 22;
        this.speed = 3.0;
        this.color = 0x0284c7;
        this.glowColor = 0x67e8f9;
        break;
      case 3:
        this.name = 'Ancient Guardian';
        this.width = 3.8;
        this.height = 4.6;
        this.maxHp = 580;
        this.hp = 580;
        this.damage = 26;
        this.speed = 2.6;
        this.color = 0xb45309;
        this.glowColor = 0xfde047;
        break;
      case 4:
        this.name = 'Shadow Warrior';
        this.width = 3.0;
        this.height = 4.2;
        this.maxHp = 700;
        this.hp = 700;
        this.damage = 30;
        this.speed = 4.4;
        this.color = 0x334155;
        this.glowColor = 0xf43f5e;
        break;
      case 5:
        this.name = 'The Dark King';
        this.width = 4.0;
        this.height = 4.8;
        this.maxHp = 950;
        this.hp = 950;
        this.damage = 35;
        this.speed = 3.8;
        this.color = 0x581c87;
        this.glowColor = 0xc084fc;
        break;
      default:
        this.name = 'Ancient Titan';
        this.width = 3.5;
        this.height = 4.0;
        this.maxHp = 400;
        this.hp = 400;
        this.damage = 20;
        this.speed = 2.8;
        this.color = 0x6b21a8;
        this.glowColor = 0xe9d5ff;
    }
  }

  get phase() {
    const pct = this.hp / this.maxHp;
    if (pct > 0.66) return 1;
    if (pct > 0.33) return 2;
    return 3;
  }

  create3DMesh() {
    this.group = new THREE.Group();

    // 1. Massive 3D Body
    const bodyGeo = new THREE.BoxGeometry(this.width * 0.7, this.height * 0.65, 1.6);
    this.bodyMat = new THREE.MeshStandardMaterial({
      color: this.color,
      roughness: 0.4,
      metalness: 0.5
    });
    this.body = new THREE.Mesh(bodyGeo, this.bodyMat);
    this.body.position.y = this.height * 0.5;
    this.body.castShadow = true;
    this.group.add(this.body);

    // 2. Boss Head
    const headGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const head = new THREE.Mesh(headGeo, this.bodyMat);
    head.position.y = this.height * 0.45;
    this.body.add(head);

    // Glowing Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: this.glowColor });
    const eyeGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(0.35, 0.2, 0.65);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(-0.35, 0.2, 0.65);
    head.add(leftEye);
    head.add(rightEye);

    // 3. Glowing Core / Weak Point on chest
    const coreGeo = new THREE.SphereGeometry(0.5, 12, 12);
    this.coreMat = new THREE.MeshStandardMaterial({
      color: this.glowColor,
      emissive: this.glowColor,
      emissiveIntensity: 0.8
    });
    this.core = new THREE.Mesh(coreGeo, this.coreMat);
    this.core.position.set(0, 0, 0.85);
    this.body.add(this.core);

    // 4. Horns / Crown
    const hornGeo = new THREE.ConeGeometry(0.3, 1.2, 6);
    const hornL = new THREE.Mesh(hornGeo, this.coreMat);
    hornL.position.set(-0.55, 0.85, 0);
    hornL.rotation.z = -0.35;
    head.add(hornL);

    const hornR = new THREE.Mesh(hornGeo, this.coreMat);
    hornR.position.set(0.55, 0.85, 0);
    hornR.rotation.z = 0.35;
    head.add(hornR);

    // 5. Heavy 3D Arms
    const armGeo = new THREE.BoxGeometry(0.65, 1.8, 0.65);
    this.armL = new THREE.Mesh(armGeo, this.bodyMat);
    this.armL.position.set(-this.width * 0.45, 0.1, 0);
    this.body.add(this.armL);

    this.armR = new THREE.Mesh(armGeo, this.bodyMat);
    this.armR.position.set(this.width * 0.45, 0.1, 0);
    this.body.add(this.armR);

    if (this.scene) {
      this.scene.add(this.group);
    }
  }

  takeDamage(amount) {
    if (this.isDead || this.hurtTimer > 0) return 0;

    const actual = Math.min(this.hp, amount);
    this.hp -= actual;
    this.hurtTimer = 0.22;

    if (this.hp <= 0) {
      this.isDead = true;
      if (this.group) this.group.visible = false;
    }
    return actual;
  }

  update(dt, players, audio, particles, camera) {
    if (this.isDead) return;

    this.animTime += dt;
    if (this.hurtTimer > 0) this.hurtTimer -= dt;

    // Update 3D Boss Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.mesh) p.mesh.position.set(p.x, p.y, p.z);
      if (p.life <= 0) {
        if (this.scene && p.mesh) this.scene.remove(p.mesh);
        this.projectiles.splice(i, 1);
      }
    }

    // Find nearest player
    let target = null;
    let minDist = 999;
    for (const p of players) {
      if (p && !p.isDead && p.connected) {
        const d = Math.hypot(p.x - this.x, p.y - this.y);
        if (d < minDist) {
          minDist = d;
          target = p;
        }
      }
    }

    if (target) {
      this.facing = target.x > this.x ? 1 : -1;
    }

    // State machine
    this.stateTimer -= dt;
    if (this.stateTimer <= 0) {
      if (this.attackState === 'idle') {
        this.attackState = 'telegraph';
        this.stateTimer = this.phase === 3 ? 0.45 : 0.8;
      } else if (this.attackState === 'telegraph') {
        this.attackState = 'attacking';
        this.stateTimer = 0.5;
        this.executePhaseAttack(target, audio, particles, camera);
      } else {
        this.attackState = 'idle';
        this.stateTimer = this.phase === 3 ? 1.0 : 1.8;
      }
    }

    // Boss movement
    if (this.attackState === 'idle') {
      if (target) {
        const dir = target.x > this.x ? 1 : -1;
        this.vx = dir * this.speed * (this.phase === 3 ? 1.4 : 1.0);
      }
    } else {
      this.vx = 0;
    }

    // 3D Visual animation
    if (this.group) {
      this.group.position.set(this.x, this.y, this.z);
      const targetRotY = this.facing === 1 ? Math.PI / 2 : -Math.PI / 2;
      this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, targetRotY, 10 * dt);

      // Core pulsing
      const pulse = 0.8 + Math.sin(this.animTime * (this.phase === 3 ? 15 : 6)) * 0.4;
      this.coreMat.emissiveIntensity = pulse;

      // Telegraph attack raise arms
      if (this.attackState === 'telegraph') {
        this.armL.rotation.x = -Math.PI / 1.4;
        this.armR.rotation.x = -Math.PI / 1.4;
      } else {
        this.armL.rotation.x = 0;
        this.armR.rotation.x = 0;
      }
    }
  }

  executePhaseAttack(target, audio, particles, camera) {
    if (audio) audio.playBossRoar();
    if (camera) camera.shake(8, 0.4);

    const spawnX = this.x + this.facing * 1.5;
    const spawnY = this.y + 1.2;

    if (this.phase === 1) {
      // 3D Shockwave orb
      this.spawn3DShockwave(spawnX, spawnY, this.facing * 14, 0, this.damage);
    } else if (this.phase === 2) {
      // Dual directional 3D spikes
      [-0.25, 0, 0.25].forEach((angle) => {
        const base = this.facing === 1 ? 0 : Math.PI;
        const total = base + angle;
        this.spawn3DShockwave(spawnX, spawnY, Math.cos(total) * 16, Math.sin(total) * 16, this.damage * 1.1);
      });
    } else {
      // Phase 3 ENRAGED: 5-way cataclysm
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i;
        this.spawn3DShockwave(this.x, spawnY, Math.cos(angle) * 14, Math.sin(angle) * 14, this.damage * 1.3, 0xef4444);
      }
      if (particles) particles.createDefeatExplosion(this.x, this.y + 2);
    }
  }

  spawn3DShockwave(x, y, vx, vy, dmg, color = null) {
    const orbColor = color || this.glowColor;
    const geo = new THREE.DodecahedronGeometry(0.5, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: orbColor,
      emissive: orbColor,
      emissiveIntensity: 0.9
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, 0);

    if (this.scene) this.scene.add(mesh);

    this.projectiles.push({
      mesh,
      x,
      y,
      z: 0,
      vx,
      vy,
      width: 1.0,
      height: 1.0,
      damage: dmg,
      life: 2.0
    });
  }

  destroy() {
    if (this.scene && this.group) {
      this.scene.remove(this.group);
    }
    for (const p of this.projectiles) {
      if (this.scene && p.mesh) this.scene.remove(p.mesh);
    }
    this.projectiles = [];
  }
}
