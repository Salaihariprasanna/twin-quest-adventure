import * as THREE from 'three';

// Real 3D Interactive Objects (Checkpoints, Levers, Doors, Chests, Moving Platforms, Coins)
export class Checkpoint3D {
  constructor(id, x, y, scene) {
    this.id = id;
    this.x = x / 20;
    this.y = (1000 - y) / 20;
    this.z = 0;
    this.active = false;
    this.scene = scene;
    this.animTime = 0;

    this.group = new THREE.Group();
    this.group.position.set(this.x, this.y, this.z);

    // Stone Base
    const baseGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.4, 8);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.2;
    this.group.add(base);

    // Floating 3D Crystal
    const crystalGeo = new THREE.OctahedronGeometry(0.55, 0);
    this.crystalMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      emissive: 0x475569,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8
    });
    this.crystal = new THREE.Mesh(crystalGeo, this.crystalMat);
    this.crystal.position.y = 1.3;
    this.group.add(this.crystal);

    // Point Light for Crystal Glow
    this.light = new THREE.PointLight(0x38bdf8, 0, 8);
    this.light.position.y = 1.3;
    this.group.add(this.light);

    if (this.scene) this.scene.add(this.group);
  }

  activate(audio, particles, floatingTexts) {
    if (this.active) return false;
    this.active = true;

    this.crystalMat.color.setHex(0x38bdf8);
    this.crystalMat.emissive.setHex(0x0284c7);
    this.crystalMat.emissiveIntensity = 1.2;
    this.light.intensity = 2.5;

    if (audio) audio.playCheckpoint();
    if (particles) particles.createCheckpointAura(this.x, this.y + 0.5);
    if (floatingTexts) {
      floatingTexts.add('✨ CHECKPOINT ACTIVATED', this.x * 20, (1000 - this.y * 20), {
        color: '#67e8f9',
        fontSize: 14
      });
    }
    return true;
  }

  update(dt) {
    this.animTime += dt;
    this.crystal.rotation.y += 1.8 * dt;
    this.crystal.rotation.x = Math.sin(this.animTime * 2) * 0.2;
    this.crystal.position.y = 1.3 + Math.sin(this.animTime * 3) * 0.15;
  }

  destroy() {
    if (this.scene && this.group) this.scene.remove(this.group);
  }
}

export class Switch3D {
  constructor(id, x, y, targetId, isPressurePlate = false, scene = null) {
    this.id = id;
    this.x = x / 20;
    this.y = (1000 - y) / 20;
    this.targetId = targetId;
    this.isPressurePlate = isPressurePlate;
    this.state = false;
    this.scene = scene;

    this.group = new THREE.Group();
    this.group.position.set(this.x, this.y, 0);

    if (this.isPressurePlate) {
      // 3D Pressure Plate
      const baseGeo = new THREE.BoxGeometry(1.6, 0.1, 1.4);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.05;
      this.group.add(base);

      const plateGeo = new THREE.BoxGeometry(1.3, 0.15, 1.1);
      this.plateMat = new THREE.MeshStandardMaterial({
        color: 0xeab308,
        emissive: 0xca8a04,
        emissiveIntensity: 0.3
      });
      this.plateMesh = new THREE.Mesh(plateGeo, this.plateMat);
      this.plateMesh.position.y = 0.15;
      this.group.add(this.plateMesh);
    } else {
      // 3D Mechanical Wall/Floor Lever
      const baseGeo = new THREE.BoxGeometry(0.8, 0.4, 0.6);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = 0.2;
      this.group.add(base);

      this.leverArm = new THREE.Group();
      this.leverArm.position.set(0, 0.3, 0);

      const stickGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9);
      const stickMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
      const stick = new THREE.Mesh(stickGeo, stickMat);
      stick.position.y = 0.45;
      this.leverArm.add(stick);

      const knobGeo = new THREE.SphereGeometry(0.16, 8, 8);
      this.knobMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xb91c1c });
      const knob = new THREE.Mesh(knobGeo, this.knobMat);
      knob.position.y = 0.9;
      this.leverArm.add(knob);

      this.leverArm.rotation.z = 0.6;
      this.group.add(this.leverArm);
    }

    if (this.scene) this.scene.add(this.group);
  }

  setState(val) {
    this.state = val;
    if (this.isPressurePlate && this.plateMesh) {
      this.plateMesh.position.y = val ? 0.06 : 0.15;
      this.plateMat.color.setHex(val ? 0x22c55e : 0xeab308);
      this.plateMat.emissive.setHex(val ? 0x15803d : 0xca8a04);
    } else if (this.leverArm) {
      this.leverArm.rotation.z = val ? -0.6 : 0.6;
      this.knobMat.color.setHex(val ? 0x22c55e : 0xef4444);
      this.knobMat.emissive.setHex(val ? 0x15803d : 0xb91c1c);
    }
  }

  destroy() {
    if (this.scene && this.group) this.scene.remove(this.group);
  }
}

export class Door3D {
  constructor(id, x, y, width = 24, height = 80, scene = null) {
    this.id = id;
    this.x = x / 20;
    this.y = (1000 - (y + height)) / 20;
    this.w = width / 20;
    this.h = height / 20;
    this.isOpen = false;
    this.currentOpenHeight = 0;
    this.scene = scene;

    this.group = new THREE.Group();
    this.group.position.set(this.x + this.w / 2, this.y, 0);

    // Frame
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
    const postGeo = new THREE.BoxGeometry(0.3, this.h, 0.8);
    const postL = new THREE.Mesh(postGeo, frameMat);
    postL.position.set(-this.w / 2 - 0.15, this.h / 2, 0);
    const postR = new THREE.Mesh(postGeo, frameMat);
    postR.position.set(this.w / 2 + 0.15, this.h / 2, 0);
    this.group.add(postL);
    this.group.add(postR);

    // Sliding Portcullis Gate
    const gateGeo = new THREE.BoxGeometry(this.w, this.h, 0.3);
    const gateMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.4 });
    this.gateMesh = new THREE.Mesh(gateGeo, gateMat);
    this.gateMesh.position.y = this.h / 2;
    this.group.add(this.gateMesh);

    if (this.scene) this.scene.add(this.group);
  }

  update(dt) {
    const target = this.isOpen ? this.h : 0;
    this.currentOpenHeight = THREE.MathUtils.lerp(this.currentOpenHeight, target, 8 * dt);
    if (this.gateMesh) {
      this.gateMesh.position.y = this.h / 2 + this.currentOpenHeight;
    }
  }

  getSolidRect() {
    if (this.isOpen && this.currentOpenHeight >= this.h - 0.2) return null;
    return {
      x: this.x,
      y: this.y + this.currentOpenHeight,
      width: this.w,
      height: Math.max(0, this.h - this.currentOpenHeight)
    };
  }

  destroy() {
    if (this.scene && this.group) this.scene.remove(this.group);
  }
}

export class Chest3D {
  constructor(id, x, y, tier = 'common', scene = null) {
    this.id = id;
    this.x = x / 20;
    this.y = (1000 - y) / 20;
    this.tier = tier;
    this.opened = false;
    this.scene = scene;

    this.group = new THREE.Group();
    this.group.position.set(this.x, this.y, 0);

    // 3D Chest Base
    const baseGeo = new THREE.BoxGeometry(1.2, 0.7, 0.9);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 });
    const base = new THREE.Mesh(baseGeo, woodMat);
    base.position.y = 0.35;
    this.group.add(base);

    // Metallic trim color
    let trimColor = 0x94a3b8;
    if (tier === 'rare') trimColor = 0x0284c7;
    else if (tier === 'epic') trimColor = 0xa855f7;
    else if (tier === 'legendary') trimColor = 0xf59e0b;

    // Hinged Lid
    this.lidGroup = new THREE.Group();
    this.lidGroup.position.set(0, 0.7, -0.45);

    const lidGeo = new THREE.CylinderGeometry(0.45, 0.45, 1.2, 8, 1, false, 0, Math.PI);
    const trimMat = new THREE.MeshStandardMaterial({ color: trimColor, metalness: 0.8, roughness: 0.3 });
    const lid = new THREE.Mesh(lidGeo, trimMat);
    lid.rotation.z = Math.PI / 2;
    lid.position.set(0, 0, 0.45);
    this.lidGroup.add(lid);

    this.group.add(this.lidGroup);

    if (this.scene) this.scene.add(this.group);
  }

  open(audio, particles, floatingTexts) {
    if (this.opened) return null;
    this.opened = true;

    // Physical 3D Lid Open Rotation
    this.lidGroup.rotation.x = -Math.PI / 1.7;

    if (audio) audio.playChest();

    let reward = { coins: 50, gems: 0, text: '🪙 +50 Coins' };
    if (this.tier === 'rare') reward = { coins: 80, gems: 2, text: '💎 Rare Treasure!' };
    else if (this.tier === 'epic') reward = { coins: 150, gems: 5, text: '⚔️ Epic Relic Found!' };
    else if (this.tier === 'legendary') reward = { coins: 300, gems: 10, text: '👑 Legendary Artifact!' };

    if (particles) particles.createCoinSparkle(this.x, this.y + 0.5);
    if (floatingTexts) {
      floatingTexts.add(reward.text, this.x * 20, (1000 - this.y * 20), { color: '#fbbf24', fontSize: 14 });
    }
    return reward;
  }

  destroy() {
    if (this.scene && this.group) this.scene.remove(this.group);
  }
}

export class MovingPlatform3D {
  constructor(id, x, y, width, height, dx = 160, dy = 0, speed = 60, scene = null) {
    this.id = id;
    this.startX = x / 20;
    this.startY = (1000 - y) / 20;
    this.x = this.startX;
    this.y = this.startY;
    this.w = width / 20;
    this.h = height / 20;
    this.dx = dx / 20;
    this.dy = -dy / 20;
    this.speed = speed;
    this.time = 0;
    this.scene = scene;

    const geo = new THREE.BoxGeometry(this.w, this.h, 2.0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.5,
      roughness: 0.5
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(this.x + this.w / 2, this.y - this.h / 2, 0);

    if (this.scene) this.scene.add(this.mesh);
  }

  update(dt) {
    this.time += dt * (this.speed / 50);
    const wave = (Math.sin(this.time) + 1) / 2;
    this.x = this.startX + this.dx * wave;
    this.y = this.startY + this.dy * wave;
    if (this.mesh) {
      this.mesh.position.set(this.x + this.w / 2, this.y - this.h / 2, 0);
    }
  }

  destroy() {
    if (this.scene && this.mesh) this.scene.remove(this.mesh);
  }
}

export class Coin3D {
  constructor(id, x, y, scene = null) {
    this.id = id;
    this.x = x / 20;
    this.y = (1000 - y) / 20;
    this.collected = false;
    this.scene = scene;
    this.animTime = Math.random() * 5;

    const geo = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 12);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0xd97706,
      emissiveIntensity: 0.3
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.rotation.x = Math.PI / 2;
    this.mesh.position.set(this.x, this.y, 0);

    if (this.scene) this.scene.add(this.mesh);
  }

  update(dt) {
    if (this.collected) return;
    this.animTime += dt;
    this.mesh.rotation.z += 3.5 * dt;
    this.mesh.position.y = this.y + Math.sin(this.animTime * 4) * 0.12;
  }

  collect() {
    this.collected = true;
    if (this.scene && this.mesh) this.mesh.visible = false;
  }

  destroy() {
    if (this.scene && this.mesh) this.scene.remove(this.mesh);
  }
}

export class ExitPortal3D {
  constructor(x, y, scene = null) {
    this.x = x / 20;
    this.y = (1000 - y) / 20;
    this.active = false;
    this.scene = scene;
    this.animTime = 0;

    this.group = new THREE.Group();
    this.group.position.set(this.x, this.y, 0);

    // 3D Ancient Stone Arch
    const archGeo = new THREE.TorusGeometry(1.6, 0.3, 8, 16, Math.PI);
    const archMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.y = 1.6;
    this.group.add(arch);

    // Swirling Portal Core
    const coreGeo = new THREE.CircleGeometry(1.3, 16);
    this.coreMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide
    });
    this.core = new THREE.Mesh(coreGeo, this.coreMat);
    this.core.position.y = 1.6;
    this.group.add(this.core);

    if (this.scene) this.scene.add(this.group);
  }

  update(dt) {
    this.animTime += dt;
    if (this.active) {
      this.coreMat.emissive.setHex(0xa855f7);
      this.coreMat.emissiveIntensity = 1.0 + Math.sin(this.animTime * 6) * 0.4;
      this.core.rotation.z += 2 * dt;
    }
  }

  destroy() {
    if (this.scene && this.group) this.scene.remove(this.group);
  }
}
