import * as THREE from 'three';

// Real 3D Monsters with Hierarchical Meshes and Dynamic Animations
export class Enemy3D {
  constructor(id, type, x, y, options = {}, scene = null) {
    this.id = id;
    this.type = type; // 'slime', 'bat', 'goblin', 'skeleton', 'dark_knight'
    this.x = x / 20; // convert 2D units to 3D space
    this.y = (1000 - y) / 20;
    this.z = 0;
    this.initialX = this.x;
    this.initialY = this.y;
    this.patrolDistance = (options.patrolDistance || 120) / 20;
    this.scene = scene;

    this.vx = 0;
    this.vy = 0;
    this.facing = 1;
    this.isDead = false;
    this.hurtTimer = 0;
    this.animTime = Math.random() * 5;

    this.initStats();
    this.create3DMesh();
  }

  initStats() {
    switch (this.type) {
      case 'slime':
        this.width = 1.2;
        this.height = 0.9;
        this.maxHp = 40;
        this.hp = 40;
        this.damage = 10;
        this.speed = 2.8;
        this.coins = 5;
        this.flying = false;
        break;
      case 'bat':
        this.width = 1.1;
        this.height = 0.8;
        this.maxHp = 30;
        this.hp = 30;
        this.damage = 12;
        this.speed = 4.2;
        this.coins = 6;
        this.flying = true;
        break;
      case 'goblin':
        this.width = 1.2;
        this.height = 1.6;
        this.maxHp = 60;
        this.hp = 60;
        this.damage = 15;
        this.speed = 3.6;
        this.coins = 10;
        this.flying = false;
        break;
      case 'skeleton':
        this.width = 1.1;
        this.height = 1.8;
        this.maxHp = 75;
        this.hp = 75;
        this.damage = 18;
        this.speed = 3.0;
        this.coins = 12;
        this.flying = false;
        break;
      case 'dark_knight':
        this.width = 1.4;
        this.height = 2.1;
        this.maxHp = 130;
        this.hp = 130;
        this.damage = 25;
        this.speed = 2.6;
        this.coins = 25;
        this.flying = false;
        break;
      default:
        this.width = 1.2;
        this.height = 1.2;
        this.maxHp = 50;
        this.hp = 50;
        this.damage = 10;
        this.speed = 2.5;
        this.coins = 5;
        this.flying = false;
    }
  }

  create3DMesh() {
    this.group = new THREE.Group();

    if (this.type === 'slime') {
      // 3D Jelly Slime
      const slimeGeo = new THREE.SphereGeometry(0.65, 12, 10);
      const slimeMat = new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        roughness: 0.1,
        transparent: true,
        opacity: 0.88,
        emissive: 0x15803d,
        emissiveIntensity: 0.2
      });
      this.mainMesh = new THREE.Mesh(slimeGeo, slimeMat);
      this.mainMesh.position.y = 0.5;
      this.group.add(this.mainMesh);

      // Slime Eyes
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
      const eyeGeo = new THREE.SphereGeometry(0.1, 6, 6);
      const e1 = new THREE.Mesh(eyeGeo, eyeMat);
      e1.position.set(0.25, 0.55, 0.5);
      const e2 = new THREE.Mesh(eyeGeo, eyeMat);
      e2.position.set(-0.25, 0.55, 0.5);
      this.group.add(e1);
      this.group.add(e2);
    } else if (this.type === 'bat') {
      // 3D Winged Bat
      const bodyGeo = new THREE.SphereGeometry(0.35, 8, 8);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.4 });
      this.mainMesh = new THREE.Mesh(bodyGeo, bodyMat);
      this.group.add(this.mainMesh);

      // Flapping Wings
      const wingGeo = new THREE.BoxGeometry(0.7, 0.05, 0.35);
      const wingMat = new THREE.MeshStandardMaterial({ color: 0x6b21a8 });
      this.wingL = new THREE.Mesh(wingGeo, wingMat);
      this.wingL.position.set(-0.45, 0.1, 0);
      this.mainMesh.add(this.wingL);

      this.wingR = new THREE.Mesh(wingGeo, wingMat);
      this.wingR.position.set(0.45, 0.1, 0);
      this.mainMesh.add(this.wingR);

      // Red Eyes
      const redEyeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const eyeGeo = new THREE.SphereGeometry(0.06, 6, 6);
      const e1 = new THREE.Mesh(eyeGeo, redEyeMat);
      e1.position.set(0.14, 0.08, 0.3);
      const e2 = new THREE.Mesh(eyeGeo, redEyeMat);
      e2.position.set(-0.14, 0.08, 0.3);
      this.mainMesh.add(e1);
      this.mainMesh.add(e2);
    } else if (this.type === 'goblin') {
      // 3D Goblin
      const gobMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.6 });
      const bodyGeo = new THREE.BoxGeometry(0.7, 0.8, 0.5);
      this.mainMesh = new THREE.Mesh(bodyGeo, gobMat);
      this.mainMesh.position.y = 0.8;
      this.group.add(this.mainMesh);

      const headGeo = new THREE.SphereGeometry(0.4, 8, 8);
      const head = new THREE.Mesh(headGeo, gobMat);
      head.position.y = 0.6;
      this.mainMesh.add(head);

      // Wooden club
      const clubGeo = new THREE.CylinderGeometry(0.12, 0.06, 0.9);
      const clubMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
      const club = new THREE.Mesh(clubGeo, clubMat);
      club.position.set(0.5, 0.2, 0.2);
      this.mainMesh.add(club);
    } else if (this.type === 'skeleton') {
      // 3D Skeleton
      const boneMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
      const ribGeo = new THREE.BoxGeometry(0.65, 0.9, 0.35);
      this.mainMesh = new THREE.Mesh(ribGeo, boneMat);
      this.mainMesh.position.y = 0.9;
      this.group.add(this.mainMesh);

      const skullGeo = new THREE.BoxGeometry(0.45, 0.45, 0.45);
      const skull = new THREE.Mesh(skullGeo, boneMat);
      skull.position.y = 0.7;
      this.mainMesh.add(skull);

      // Bone spear
      const spearGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8);
      const spear = new THREE.Mesh(spearGeo, boneMat);
      spear.position.set(0.5, 0.2, 0.2);
      this.mainMesh.add(spear);
    } else {
      // 3D Dark Knight
      const armorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
      const bodyGeo = new THREE.BoxGeometry(0.95, 1.2, 0.6);
      this.mainMesh = new THREE.Mesh(bodyGeo, armorMat);
      this.mainMesh.position.y = 1.0;
      this.group.add(this.mainMesh);

      // Helmet & glowing red visor
      const helmGeo = new THREE.BoxGeometry(0.6, 0.6, 0.6);
      const helm = new THREE.Mesh(helmGeo, armorMat);
      helm.position.y = 0.85;
      this.mainMesh.add(helm);

      const visorGeo = new THREE.BoxGeometry(0.4, 0.08, 0.1);
      const visorMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      visor.position.set(0, 0, 0.32);
      helm.add(visor);

      // 3D Greatsword
      const swordGeo = new THREE.BoxGeometry(0.15, 1.6, 0.05);
      const swordMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
      const sword = new THREE.Mesh(swordGeo, swordMat);
      sword.position.set(0.6, 0.2, 0.3);
      this.mainMesh.add(sword);
    }

    if (this.scene) {
      this.scene.add(this.group);
    }
  }

  takeDamage(amount, sourceX) {
    if (this.isDead || this.hurtTimer > 0) return 0;

    const actual = Math.min(this.hp, amount);
    this.hp -= actual;
    this.hurtTimer = 0.25;

    const dir = this.x < sourceX ? -1 : 1;
    this.vx = dir * 5;
    if (!this.flying) this.vy = 4;

    if (this.hp <= 0) {
      this.isDead = true;
      if (this.group) this.group.visible = false;
    }
    return actual;
  }

  update(dt, players) {
    if (this.isDead) return;

    this.animTime += dt;
    if (this.hurtTimer > 0) this.hurtTimer -= dt;

    let target = null;
    let minDist = 14;

    for (const p of players) {
      if (p && !p.isDead && p.connected) {
        const d = Math.hypot(p.x - this.x, p.y - this.y);
        if (d < minDist) {
          minDist = d;
          target = p;
        }
      }
    }

    if (this.flying) {
      if (target) {
        const dx = target.x - this.x;
        const dy = (target.y + 0.5) - this.y;
        const angle = Math.atan2(dy, dx);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.facing = dx > 0 ? 1 : -1;
      } else {
        this.vx = Math.sin(this.animTime * 1.5) * this.speed * 0.7;
        this.vy = Math.cos(this.animTime * 3) * 1.5;
        this.facing = this.vx > 0 ? 1 : -1;
      }
      this.x += this.vx * dt;
      this.y += this.vy * dt;

      // Animate bat wings
      if (this.wingL && this.wingR) {
        const flap = Math.sin(this.animTime * 20) * 0.8;
        this.wingL.rotation.z = flap;
        this.wingR.rotation.z = -flap;
      }
    } else {
      // Ground AI
      if (target) {
        const dir = target.x > this.x ? 1 : -1;
        this.vx = dir * this.speed;
        this.facing = dir;
      } else {
        if (this.x > this.initialX + this.patrolDistance) this.facing = -1;
        else if (this.x < this.initialX - this.patrolDistance) this.facing = 1;
        this.vx = this.facing * (this.speed * 0.6);
      }
    }

    // 3D Slime squish / bounce animation
    if (this.type === 'slime' && this.mainMesh) {
      const squish = Math.sin(this.animTime * 8) * 0.15;
      this.mainMesh.scale.set(1 + squish, 1 - squish, 1 + squish);
    }

    // Update 3D Mesh Position & Rotation
    if (this.group) {
      this.group.position.set(this.x, this.y, this.z);
      const targetRotY = this.facing === 1 ? Math.PI / 2 : -Math.PI / 2;
      this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, targetRotY, 12 * dt);
    }
  }

  destroy() {
    if (this.scene && this.group) {
      this.scene.remove(this.group);
    }
  }
}
