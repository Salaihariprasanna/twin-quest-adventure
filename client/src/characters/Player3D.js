import * as THREE from 'three';
import { CHARACTER_CLASSES } from './CharacterClasses.js';

// Fully Rigged 3D Character with Hierarchical Animation and 3D Weapons
export class Player3D {
  constructor(id, name, characterClass = 'warrior', isLocal = true, scene = null) {
    this.id = id;
    this.name = name;
    this.characterClass = characterClass;
    this.isLocal = isLocal;
    this.connected = true;
    this.scene = scene;

    this.stats = CHARACTER_CLASSES[characterClass] || CHARACTER_CLASSES.warrior;

    // Physics (2.5D units: 1 unit ~ 20 pixels)
    this.x = 4;
    this.y = 8;
    this.z = 0;
    this.vx = 0;
    this.vy = 0;
    this.facing = 1; // 1: Right, -1: Left
    this.isGrounded = false;

    // Movement mechanics
    this.canDoubleJump = true;
    this.isDashing = false;
    this.dashTimer = 0;
    this.dashCooldown = 0;

    // Stats
    this.hp = this.stats.maxHp;
    this.maxHp = this.stats.maxHp;
    this.mp = this.stats.maxMp;
    this.maxMp = this.stats.maxMp;
    this.coins = 0;
    this.gems = 0;
    this.score = 0;

    // Timers
    this.attackCooldown = 0;
    this.skillCooldown = 0;
    this.attackAnimTimer = 0;
    this.skillAnimTimer = 0;
    this.hurtTimer = 0;
    this.isDead = false;

    this.checkpoint = { x: 4, y: 8 };
    this.animTime = 0;
    this.state = 'idle';

    // Interpolation for multiplayer partner
    this.targetX = this.x;
    this.targetY = this.y;
    this.targetFacing = this.facing;
    this.targetState = 'idle';

    // 3D Meshes & Rigging
    this.projectiles = [];
    this.createMeshHierarchy();
  }

  createMeshHierarchy() {
    this.group = new THREE.Group();

    // Material colors based on class
    const mainColor = new THREE.Color(this.stats.color);
    const secColor = new THREE.Color(this.stats.secondaryColor);
    const skinColor = new THREE.Color(0xfbbf24);

    const mainMat = new THREE.MeshStandardMaterial({
      color: mainColor,
      roughness: 0.35,
      metalness: this.characterClass === 'warrior' ? 0.7 : 0.2
    });
    const secMat = new THREE.MeshStandardMaterial({ color: secColor, roughness: 0.5 });
    const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.8 });

    // 1. Torso
    const torsoGeo = new THREE.BoxGeometry(0.9, 1.1, 0.6);
    this.torso = new THREE.Mesh(torsoGeo, mainMat);
    this.torso.position.y = 1.1;
    this.torso.castShadow = true;
    this.group.add(this.torso);

    // Belt
    const beltGeo = new THREE.BoxGeometry(0.95, 0.2, 0.65);
    const beltMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.4 });
    const belt = new THREE.Mesh(beltGeo, beltMat);
    belt.position.y = -0.4;
    this.torso.add(belt);

    // 2. Head
    const headGeo = new THREE.SphereGeometry(0.48, 12, 12);
    this.head = new THREE.Mesh(headGeo, skinMat);
    this.head.position.y = 0.95;
    this.head.castShadow = true;
    this.torso.add(this.head);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const eyeGeo = new THREE.SphereGeometry(0.08, 6, 6);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(0.18, 0.05, 0.42);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(-0.18, 0.05, 0.42);
    this.head.add(leftEye);
    this.head.add(rightEye);

    // Helmet / Hair
    const hairGeo = new THREE.SphereGeometry(0.52, 10, 10, 0, Math.PI * 2, 0, Math.PI / 1.7);
    const hair = new THREE.Mesh(hairGeo, secMat);
    hair.rotation.x = -Math.PI / 8;
    this.head.add(hair);

    // 3. 3D Billowing Cape
    const capeGeo = new THREE.PlaneGeometry(0.85, 1.3, 4, 4);
    const capeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.stats.capeColor),
      side: THREE.DoubleSide,
      roughness: 0.6
    });
    this.cape = new THREE.Mesh(capeGeo, capeMat);
    this.cape.position.set(0, 0.35, -0.35);
    this.cape.rotation.x = Math.PI / 12;
    this.torso.add(this.cape);

    // 4. Arms
    const armGeo = new THREE.BoxGeometry(0.28, 0.8, 0.28);
    this.leftArm = new THREE.Mesh(armGeo, mainMat);
    this.leftArm.position.set(-0.65, 0.1, 0);
    this.torso.add(this.leftArm);

    this.rightArm = new THREE.Mesh(armGeo, mainMat);
    this.rightArm.position.set(0.65, 0.1, 0);
    this.torso.add(this.rightArm);

    // 5. 3D Weapon Attached to Hand
    this.weaponGroup = new THREE.Group();
    this.build3DWeapon(this.weaponGroup);
    this.weaponGroup.position.set(0, -0.35, 0.25);
    this.rightArm.add(this.weaponGroup);

    // 6. Legs
    const legGeo = new THREE.BoxGeometry(0.32, 0.9, 0.32);
    this.leftLeg = new THREE.Mesh(legGeo, secMat);
    this.leftLeg.position.set(-0.25, 0.45, 0);
    this.leftLeg.castShadow = true;
    this.group.add(this.leftLeg);

    this.rightLeg = new THREE.Mesh(legGeo, secMat);
    this.rightLeg.position.set(0.25, 0.45, 0);
    this.rightLeg.castShadow = true;
    this.group.add(this.rightLeg);

    if (this.scene) {
      this.scene.add(this.group);
    }
  }

  build3DWeapon(group) {
    if (this.characterClass === 'warrior') {
      // 3D Greatsword
      const bladeGeo = new THREE.BoxGeometry(0.18, 1.4, 0.05);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.y = 0.6;
      group.add(blade);

      const guardGeo = new THREE.BoxGeometry(0.6, 0.1, 0.12);
      const guardMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.3 });
      const guard = new THREE.Mesh(guardGeo, guardMat);
      group.add(guard);

      const hiltGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.4);
      const hiltMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });
      const hilt = new THREE.Mesh(hiltGeo, hiltMat);
      hilt.position.y = -0.25;
      group.add(hilt);
    } else if (this.characterClass === 'archer') {
      // 3D Recurve Bow
      const bowGeo = new THREE.TorusGeometry(0.55, 0.05, 8, 16, Math.PI);
      const bowMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.6 });
      const bow = new THREE.Mesh(bowGeo, bowMat);
      bow.rotation.y = Math.PI / 2;
      group.add(bow);
    } else if (this.characterClass === 'mage') {
      // 3D Wizard Staff with Glowing Orb
      const staffGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.6);
      const staffMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 });
      const staff = new THREE.Mesh(staffGeo, staffMat);
      group.add(staff);

      const orbGeo = new THREE.SphereGeometry(0.2, 12, 12);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0xa855f7,
        emissiveIntensity: 0.8,
        roughness: 0.1
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.y = 0.85;
      group.add(orb);
    } else {
      // 3D Rogue Daggers
      const daggerGeo = new THREE.BoxGeometry(0.12, 0.7, 0.04);
      const daggerMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
      const d1 = new THREE.Mesh(daggerGeo, daggerMat);
      d1.position.y = 0.25;
      group.add(d1);
    }
  }

  takeDamage(amount, sourceX = 0) {
    if (this.isDead || this.hurtTimer > 0 || this.isDashing) return false;

    this.hp = Math.max(0, this.hp - amount);
    this.hurtTimer = 0.55;

    const knockDir = this.x < sourceX ? -1 : 1;
    this.vx = knockDir * 6;
    this.vy = 5;

    if (this.hp <= 0) {
      this.isDead = true;
      this.state = 'dead';
    } else {
      this.state = 'hurt';
    }
    return true;
  }

  respawn() {
    this.x = this.checkpoint.x;
    this.y = this.checkpoint.y;
    this.vx = 0;
    this.vy = 0;
    this.hp = this.maxHp;
    this.mp = this.maxMp;
    this.isDead = false;
    this.hurtTimer = 0.5;
    this.state = 'idle';
  }

  update(dt, input, audio, particles, floatingTexts) {
    this.animTime += dt;

    if (this.attackCooldown > 0) this.attackCooldown -= dt;
    if (this.skillCooldown > 0) this.skillCooldown -= dt;
    if (this.dashCooldown > 0) this.dashCooldown -= dt;
    if (this.hurtTimer > 0) this.hurtTimer -= dt;
    if (this.attackAnimTimer > 0) this.attackAnimTimer -= dt;
    if (this.skillAnimTimer > 0) this.skillAnimTimer -= dt;

    if (this.mp < this.maxMp) {
      this.mp = Math.min(this.maxMp, this.mp + 12 * dt);
    }

    // Update 3D Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.mesh) {
        p.mesh.position.set(p.x, p.y, p.z);
      }
      if (p.life <= 0) {
        if (this.scene && p.mesh) this.scene.remove(p.mesh);
        this.projectiles.splice(i, 1);
      }
    }

    if (this.isDead) {
      this.state = 'dead';
      this.animate3DDead(dt);
      return;
    }

    if (this.isLocal && input) {
      this.handleLocalInput(dt, input, audio, particles, floatingTexts);
    } else {
      // Remote partner smooth interpolation
      this.x += (this.targetX - this.x) * Math.min(1, 15 * dt);
      this.y += (this.targetY - this.y) * Math.min(1, 15 * dt);
      this.facing = this.targetFacing;
      this.state = this.targetState;
    }

    // Apply 3D transforms & bone hierarchy animation
    this.animate3DMesh(dt);
  }

  handleLocalInput(dt, input, audio, particles, floatingTexts) {
    const keys = input.keys;

    // Dash
    if (input.consumeDash() && this.dashCooldown <= 0) {
      this.isDashing = true;
      this.dashTimer = 0.22;
      this.dashCooldown = 0.9;
      this.vx = this.facing * (this.stats.speed / 18) * 2.2;
      this.vy = 0;
      if (audio) audio.playDash();
      if (particles) particles.createDust(this.x, this.y);
    }

    if (this.isDashing) {
      this.dashTimer -= dt;
      if (this.dashTimer <= 0) this.isDashing = false;
      return;
    }

    // Horizontal Walk/Run
    let moveDir = 0;
    if (keys.left) moveDir -= 1;
    if (keys.right) moveDir += 1;

    const baseSpeed = this.stats.speed / 20; // 3D units / sec
    if (moveDir !== 0) {
      this.vx = moveDir * baseSpeed;
      this.facing = moveDir;
      if (this.isGrounded && Math.random() < 0.2 && particles) {
        particles.createDust(this.x, this.y);
      }
    } else {
      this.vx *= Math.pow(0.001, dt);
      if (Math.abs(this.vx) < 0.1) this.vx = 0;
    }

    // Jump / Double Jump
    const jumpPower = this.stats.jumpForce / 28;
    if (input.consumeJump()) {
      if (this.isGrounded) {
        this.vy = jumpPower;
        this.isGrounded = false;
        this.canDoubleJump = true;
        if (audio) audio.playJump();
        if (particles) particles.createDust(this.x, this.y);
      } else if (this.canDoubleJump) {
        this.vy = jumpPower * 0.92;
        this.canDoubleJump = false;
        if (audio) audio.playDoubleJump();
        if (particles) particles.createMagicBurst(this.x, this.y, this.stats.color);
      }
    }

    // Attacks
    if (input.consumeAttack() && this.attackCooldown <= 0) {
      this.performAttack(audio, particles);
    }
    if (input.consumeSkill() && this.skillCooldown <= 0 && this.mp >= this.stats.skillCost) {
      this.performSkill(audio, particles, floatingTexts);
    }

    // Set state
    if (this.attackAnimTimer > 0) this.state = 'attack';
    else if (this.skillAnimTimer > 0) this.state = 'skill';
    else if (!this.isGrounded) this.state = this.vy > 0 ? 'jump' : 'fall';
    else if (Math.abs(this.vx) > 0.2) this.state = 'run';
    else this.state = 'idle';
  }

  performAttack(audio, particles) {
    this.attackCooldown = this.stats.attackCooldown;
    this.attackAnimTimer = 0.25;
    this.state = 'attack';

    if (audio) audio.playAttack();

    if (this.characterClass === 'archer') {
      this.spawn3DArrow(this.facing * 18, 0, this.stats.attackDmg);
    } else if (this.characterClass === 'mage') {
      this.spawn3DOrb(this.facing * 15, 0, this.stats.attackDmg, 0xc084fc);
    }

    if (particles) {
      particles.emit({
        x: this.x + this.facing * 0.8,
        y: this.y + 0.8,
        count: 8,
        color: new THREE.Color(this.stats.color).getHex()
      });
    }
  }

  performSkill(audio, particles, floatingTexts) {
    this.mp -= this.stats.skillCost;
    this.skillCooldown = this.stats.skillCooldown;
    this.skillAnimTimer = 0.38;
    this.state = 'skill';

    if (audio) audio.playMagic();
    if (floatingTexts) {
      floatingTexts.add(this.stats.skillName, (this.x * 20), (1000 - this.y * 20), { color: '#facc15', fontSize: 13 });
    }

    if (this.characterClass === 'warrior') {
      if (particles) particles.createMagicBurst(this.x, this.y + 1, 0x38bdf8);
    } else if (this.characterClass === 'archer') {
      this.spawn3DArrow(this.facing * 24, 0, this.stats.attackDmg * 2.2, true);
    } else if (this.characterClass === 'mage') {
      this.spawn3DOrb(this.facing * 12, 0, this.stats.attackDmg * 2.5, 0xf43f5e, 0.45);
    } else if (this.characterClass === 'rogue') {
      this.isDashing = true;
      this.dashTimer = 0.3;
      this.vx = this.facing * (this.stats.speed / 18) * 3;
      if (particles) particles.createMagicBurst(this.x, this.y + 1, 0xf43f5e);
    }
  }

  spawn3DArrow(vx, vy, dmg, isPiercing = false) {
    const arrowGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8);
    const arrowMat = new THREE.MeshStandardMaterial({ color: isPiercing ? 0x4ade80 : 0xfacc15, emissive: 0x22c55e });
    const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat);
    arrowMesh.rotation.z = Math.PI / 2;
    arrowMesh.position.set(this.x + this.facing * 0.8, this.y + 1, 0);

    if (this.scene) this.scene.add(arrowMesh);

    this.projectiles.push({
      mesh: arrowMesh,
      x: this.x + this.facing * 0.8,
      y: this.y + 1,
      z: 0,
      vx,
      vy,
      width: 0.8,
      height: 0.2,
      damage: dmg,
      life: 1.5,
      type: isPiercing ? 'piercing_arrow' : 'arrow'
    });
  }

  spawn3DOrb(vx, vy, dmg, colorHex, size = 0.3) {
    const orbGeo = new THREE.SphereGeometry(size, 10, 10);
    const orbMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.9
    });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    orbMesh.position.set(this.x + this.facing * 0.8, this.y + 1, 0);

    if (this.scene) this.scene.add(orbMesh);

    this.projectiles.push({
      mesh: orbMesh,
      x: this.x + this.facing * 0.8,
      y: this.y + 1,
      z: 0,
      vx,
      vy,
      width: size * 2,
      height: size * 2,
      damage: dmg,
      life: 1.5,
      type: 'magic'
    });
  }

  getAttackHitbox() {
    if (this.attackAnimTimer <= 0 && this.skillAnimTimer <= 0) return null;

    const reach = this.skillAnimTimer > 0 ? 2.5 : 1.8;
    return {
      x: this.facing === 1 ? this.x + 0.4 : this.x - reach,
      y: this.y,
      width: reach,
      height: 2.0,
      damage: this.skillAnimTimer > 0 ? 45 : this.stats.attackDmg
    };
  }

  animate3DMesh(dt) {
    if (!this.group) return;

    // Position group
    this.group.position.set(this.x, this.y, this.z);

    // Turn facing direction smoothly
    const targetRotY = this.facing === 1 ? Math.PI / 2 : -Math.PI / 2;
    this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, targetRotY, 15 * dt);

    const runSpeed = 12;
    const legSwing = Math.sin(this.animTime * runSpeed) * 0.6;
    const armSwing = Math.cos(this.animTime * runSpeed) * 0.6;

    if (this.state === 'run') {
      this.leftLeg.rotation.x = legSwing;
      this.rightLeg.rotation.x = -legSwing;
      this.leftArm.rotation.x = -armSwing;
      this.rightArm.rotation.x = armSwing;
      this.torso.position.y = 1.1 + Math.abs(Math.sin(this.animTime * runSpeed)) * 0.1;
      this.cape.rotation.x = Math.PI / 4 + Math.sin(this.animTime * runSpeed) * 0.15;
    } else if (this.state === 'jump' || this.state === 'fall') {
      this.leftLeg.rotation.x = 0.3;
      this.rightLeg.rotation.x = -0.3;
      this.leftArm.rotation.x = 0.8;
      this.rightArm.rotation.x = 0.8;
      this.cape.rotation.x = Math.PI / 3;
    } else if (this.state === 'attack') {
      // 3D Sword Slash or Bow draw
      const progress = 1 - (this.attackAnimTimer / this.stats.attackCooldown);
      this.rightArm.rotation.x = -Math.PI / 2 + Math.sin(progress * Math.PI) * 1.6;
      this.rightArm.rotation.z = Math.sin(progress * Math.PI) * 0.5;
    } else {
      // Idle breathing
      const breath = Math.sin(this.animTime * 3) * 0.05;
      this.torso.position.y = 1.1 + breath;
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.leftArm.rotation.x = 0;
      this.rightArm.rotation.x = 0;
      this.cape.rotation.x = Math.PI / 12 + breath * 0.5;
    }

    // Hurt flicker
    if (this.hurtTimer > 0) {
      this.group.visible = Math.floor(this.animTime * 30) % 2 === 0;
    } else {
      this.group.visible = true;
    }
  }

  animate3DDead(dt) {
    if (this.group) {
      this.group.rotation.z = THREE.MathUtils.lerp(this.group.rotation.z, Math.PI / 2, 8 * dt);
      this.group.position.y = THREE.MathUtils.lerp(this.group.position.y, this.y, 8 * dt);
    }
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
