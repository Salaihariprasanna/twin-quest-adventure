import { CHARACTER_CLASSES } from './CharacterClasses.js';

export class Player {
  constructor(id, name, characterClass = 'warrior', isLocal = true) {
    this.id = id;
    this.name = name;
    this.characterClass = characterClass;
    this.isLocal = isLocal;
    this.connected = true;

    this.stats = CHARACTER_CLASSES[characterClass] || CHARACTER_CLASSES.warrior;

    // Dimensions
    this.width = 30;
    this.height = 46;

    // Position & Physics
    this.x = 100;
    this.y = 350;
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

    // Timers & Cooldowns
    this.attackCooldown = 0;
    this.skillCooldown = 0;
    this.attackAnimTimer = 0;
    this.skillAnimTimer = 0;
    this.hurtTimer = 0;
    this.isDead = false;

    // Checkpoint
    this.checkpoint = { x: 100, y: 350 };

    // Animation frames
    this.animTime = 0;
    this.state = 'idle'; // idle, run, jump, fall, attack, skill, hurt, dead

    // Network Interpolation (for remote partner)
    this.targetX = this.x;
    this.targetY = this.y;
    this.targetFacing = this.facing;
    this.targetState = 'idle';

    // Projectiles spawned by this player
    this.projectiles = [];
  }

  setClass(newClass) {
    if (!CHARACTER_CLASSES[newClass]) return;
    this.characterClass = newClass;
    this.stats = CHARACTER_CLASSES[newClass];
    this.hp = Math.min(this.hp, this.stats.maxHp);
    this.maxHp = this.stats.maxHp;
  }

  respawn() {
    this.x = this.checkpoint.x;
    this.y = this.checkpoint.y;
    this.vx = 0;
    this.vy = 0;
    this.hp = this.maxHp;
    this.mp = this.maxMp;
    this.isDead = false;
    this.hurtTimer = 0.5; // brief invulnerability
    this.state = 'idle';
  }

  takeDamage(amount, sourceX = 0) {
    if (this.isDead || this.hurtTimer > 0 || this.isDashing) return false;

    this.hp = Math.max(0, this.hp - amount);
    this.hurtTimer = 0.6; // Invulnerability frames

    // Knockback
    const knockDir = this.x < sourceX ? -1 : 1;
    this.vx = knockDir * 180;
    this.vy = -160;

    if (this.hp <= 0) {
      this.isDead = true;
      this.state = 'dead';
    } else {
      this.state = 'hurt';
    }
    return true;
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }

  update(dt, inputManager, audioManager, particles, floatingTexts) {
    this.animTime += dt;

    // Cooldown reductions
    if (this.attackCooldown > 0) this.attackCooldown -= dt;
    if (this.skillCooldown > 0) this.skillCooldown -= dt;
    if (this.dashCooldown > 0) this.dashCooldown -= dt;
    if (this.hurtTimer > 0) this.hurtTimer -= dt;
    if (this.attackAnimTimer > 0) this.attackAnimTimer -= dt;
    if (this.skillAnimTimer > 0) this.skillAnimTimer -= dt;

    // Passive mana regeneration
    if (this.mp < this.maxMp) {
      this.mp = Math.min(this.maxMp, this.mp + 12 * dt);
    }

    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) {
        this.projectiles.splice(i, 1);
      }
    }

    if (this.isDead) {
      this.state = 'dead';
      return;
    }

    if (this.isLocal && inputManager) {
      this.handleLocalInput(dt, inputManager, audioManager, particles, floatingTexts);
    } else {
      // Remote partner interpolation
      this.x += (this.targetX - this.x) * Math.min(1, 15 * dt);
      this.y += (this.targetY - this.y) * Math.min(1, 15 * dt);
      this.facing = this.targetFacing;
      this.state = this.targetState;
    }
  }

  handleLocalInput(dt, input, audio, particles, floatingTexts) {
    const keys = input.keys;

    // Dash Action
    if (input.consumeDash() && this.dashCooldown <= 0) {
      this.isDashing = true;
      this.dashTimer = 0.2;
      this.dashCooldown = 0.9;
      this.vx = this.facing * this.stats.speed * 2.4;
      this.vy = 0;
      if (audio) audio.playDash();
      if (particles) particles.createDust(this.x + this.width / 2, this.y + this.height);
    }

    if (this.isDashing) {
      this.dashTimer -= dt;
      if (this.dashTimer <= 0) {
        this.isDashing = false;
      }
      return; // Dash locks standard movement briefly
    }

    // Horizontal Movement
    let moveDir = 0;
    if (keys.left) moveDir -= 1;
    if (keys.right) moveDir += 1;

    if (moveDir !== 0) {
      this.vx = moveDir * this.stats.speed;
      this.facing = moveDir;
      if (this.isGrounded && Math.random() < 0.15 && particles) {
        particles.createDust(this.x + this.width / 2, this.y + this.height);
      }
    } else {
      // Friction / deceleration
      this.vx *= Math.pow(0.001, dt);
      if (Math.abs(this.vx) < 5) this.vx = 0;
    }

    // Jump / Double Jump
    if (input.consumeJump()) {
      if (this.isGrounded) {
        this.vy = -this.stats.jumpForce;
        this.isGrounded = false;
        this.canDoubleJump = true;
        if (audio) audio.playJump();
        if (particles) particles.createDust(this.x + this.width / 2, this.y + this.height);
      } else if (this.canDoubleJump) {
        this.vy = -this.stats.jumpForce * 0.92;
        this.canDoubleJump = false;
        if (audio) audio.playDoubleJump();
        if (particles) particles.createMagicBurst(this.x + this.width / 2, this.y + this.height, this.stats.color);
      }
    }

    // Primary Attack
    if (input.consumeAttack() && this.attackCooldown <= 0) {
      this.performAttack(audio, particles);
    }

    // Special Skill
    if (input.consumeSkill() && this.skillCooldown <= 0 && this.mp >= this.stats.skillCost) {
      this.performSkill(audio, particles, floatingTexts);
    }

    // Determine visual state
    if (this.attackAnimTimer > 0) {
      this.state = 'attack';
    } else if (this.skillAnimTimer > 0) {
      this.state = 'skill';
    } else if (!this.isGrounded) {
      this.state = this.vy < 0 ? 'jump' : 'fall';
    } else if (Math.abs(this.vx) > 10) {
      this.state = 'run';
    } else {
      this.state = 'idle';
    }
  }

  performAttack(audio, particles) {
    this.attackCooldown = this.stats.attackCooldown;
    this.attackAnimTimer = 0.22;
    this.state = 'attack';

    if (audio) audio.playAttack();

    // Ranged vs Melee
    if (this.characterClass === 'archer') {
      this.projectiles.push({
        x: this.x + (this.facing === 1 ? this.width + 4 : -12),
        y: this.y + this.height / 2 - 4,
        vx: this.facing * 520,
        vy: 0,
        width: 14,
        height: 6,
        damage: this.stats.attackDmg,
        type: 'arrow',
        life: 1.2,
        color: '#facc15'
      });
    } else if (this.characterClass === 'mage') {
      this.projectiles.push({
        x: this.x + (this.facing === 1 ? this.width + 4 : -12),
        y: this.y + this.height / 2 - 4,
        vx: this.facing * 440,
        vy: 0,
        width: 12,
        height: 12,
        damage: this.stats.attackDmg,
        type: 'arcane_spark',
        life: 1.0,
        color: '#c084fc'
      });
    }

    if (particles) {
      particles.emit({
        x: this.x + (this.facing === 1 ? this.width + 8 : -8),
        y: this.y + this.height / 2,
        count: 6,
        color: this.stats.color,
        size: 3,
        speed: 100,
        life: 0.2,
        shape: 'sparkle'
      });
    }
  }

  performSkill(audio, particles, floatingTexts) {
    this.mp -= this.stats.skillCost;
    this.skillCooldown = this.stats.skillCooldown;
    this.skillAnimTimer = 0.35;
    this.state = 'skill';

    if (audio) audio.playMagic();
    if (floatingTexts) {
      floatingTexts.add(this.stats.skillName, this.x + this.width / 2, this.y - 12, { color: '#facc15', fontSize: 13 });
    }

    if (this.characterClass === 'warrior') {
      // Whirlwind cleave
      if (particles) {
        particles.createMagicBurst(this.x + this.width / 2, this.y + this.height / 2, '#38bdf8');
      }
    } else if (this.characterClass === 'archer') {
      // Piercing Power Shot
      this.projectiles.push({
        x: this.x + (this.facing === 1 ? this.width + 4 : -16),
        y: this.y + this.height / 2 - 8,
        vx: this.facing * 640,
        vy: 0,
        width: 24,
        height: 10,
        damage: this.stats.attackDmg * 2.2,
        type: 'piercing_arrow',
        life: 1.5,
        color: '#4ade80'
      });
    } else if (this.characterClass === 'mage') {
      // Arcane Meteor Orb
      this.projectiles.push({
        x: this.x + (this.facing === 1 ? this.width + 6 : -16),
        y: this.y + this.height / 2 - 10,
        vx: this.facing * 380,
        vy: 0,
        width: 20,
        height: 20,
        damage: this.stats.attackDmg * 2.5,
        type: 'meteor',
        life: 1.4,
        color: '#f43f5e'
      });
    } else if (this.characterClass === 'rogue') {
      // Shadow Dash
      this.isDashing = true;
      this.dashTimer = 0.28;
      this.vx = this.facing * this.stats.speed * 3.0;
      if (particles) {
        particles.createMagicBurst(this.x + this.width / 2, this.y + this.height / 2, '#f43f5e');
      }
    }
  }

  getAttackHitbox() {
    if (this.attackAnimTimer <= 0 && this.skillAnimTimer <= 0) return null;

    if (this.characterClass === 'warrior') {
      const isSkill = this.skillAnimTimer > 0;
      const reach = isSkill ? 70 : 50;
      return {
        x: isSkill ? this.x - 20 : (this.facing === 1 ? this.x + this.width : this.x - reach),
        y: this.y - 10,
        width: isSkill ? this.width + 40 : reach,
        height: this.height + 20,
        damage: isSkill ? 45 : this.stats.attackDmg
      };
    } else if (this.characterClass === 'rogue') {
      const isSkill = this.skillAnimTimer > 0;
      const reach = isSkill ? 60 : 42;
      return {
        x: this.facing === 1 ? this.x + this.width : this.x - reach,
        y: this.y,
        width: reach,
        height: this.height,
        damage: isSkill ? 40 : this.stats.attackDmg
      };
    }
    return null;
  }

  // --- Procedural 2D Cartoon Character Rendering ---
  render(ctx) {
    if (this.hurtTimer > 0 && Math.floor(this.animTime * 20) % 2 === 0) {
      // Invulnerability flicker
      return;
    }

    ctx.save();
    ctx.translate(Math.round(this.x + this.width / 2), Math.round(this.y + this.height / 2));
    ctx.scale(this.facing, 1);

    const bob = Math.sin(this.animTime * 10) * (this.state === 'run' ? 3 : 1);
    const legSwing = Math.sin(this.animTime * 14) * (this.state === 'run' ? 10 : 0);

    // Cape / Back accessory
    ctx.fillStyle = this.stats.capeColor;
    ctx.beginPath();
    ctx.moveTo(-10, -10 + bob);
    ctx.lineTo(-16 - (this.state === 'run' ? 8 : 2), 16 + bob);
    ctx.lineTo(-4, 16 + bob);
    ctx.closePath();
    ctx.fill();

    // Legs
    ctx.fillStyle = this.stats.secondaryColor;
    // Left leg
    ctx.fillRect(-8 + legSwing * 0.4, 10 + bob, 6, 13);
    // Right leg
    ctx.fillRect(2 - legSwing * 0.4, 10 + bob, 6, 13);

    // Boots
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-9 + legSwing * 0.4, 20 + bob, 8, 4);
    ctx.fillRect(1 - legSwing * 0.4, 20 + bob, 8, 4);

    // Body / Armor
    ctx.fillStyle = this.stats.color;
    ctx.beginPath();
    ctx.roundRect(-10, -8 + bob, 20, 20, 4);
    ctx.fill();

    // Belt
    ctx.fillStyle = '#b45309';
    ctx.fillRect(-10, 8 + bob, 20, 4);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-3, 8 + bob, 6, 4);

    // Head
    ctx.fillStyle = '#fed7aa'; // Skin tone
    ctx.beginPath();
    ctx.arc(0, -14 + bob, 11, 0, Math.PI * 2);
    ctx.fill();

    // Hair / Helmet
    ctx.fillStyle = this.stats.secondaryColor;
    ctx.beginPath();
    ctx.arc(0, -17 + bob, 12, Math.PI, Math.PI * 2);
    ctx.fill();

    // Eye
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(4, -14 + bob, 2, 0, Math.PI * 2);
    ctx.fill();

    // Weapon / Action Render
    this.renderWeapon(ctx, bob);

    ctx.restore();

    // Render Projectiles
    this.renderProjectiles(ctx);

    // Name tag & HP mini bar above head
    this.renderOverheadInfo(ctx);
  }

  renderWeapon(ctx, bob) {
    if (this.characterClass === 'warrior') {
      // Steel Sword
      ctx.save();
      ctx.translate(8, 0 + bob);
      const slashAngle = this.attackAnimTimer > 0 ? (0.22 - this.attackAnimTimer) * 12 : 0;
      ctx.rotate(slashAngle);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(0, -18, 5, 20); // Blade
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(1, -18, 2, 20); // Highlight
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-4, 0, 13, 3); // Guard
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 3, 5, 6); // Hilt
      ctx.restore();
    } else if (this.characterClass === 'archer') {
      // Wooden Bow
      ctx.save();
      ctx.translate(10, 0 + bob);
      ctx.strokeStyle = '#92400e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 14, -Math.PI / 2.2, Math.PI / 2.2);
      ctx.stroke();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(3, -12);
      ctx.lineTo(3, 12);
      ctx.stroke();
      ctx.restore();
    } else if (this.characterClass === 'mage') {
      // Magic Staff with glowing crystal
      ctx.save();
      ctx.translate(10, -2 + bob);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, -16, 4, 30);
      ctx.fillStyle = '#c084fc';
      ctx.beginPath();
      ctx.arc(2, -18, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (this.characterClass === 'rogue') {
      // Twin Daggers
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(8, 2 + bob, 12, 4);
      ctx.fillRect(4, 8 + bob, 10, 4);
    }
  }

  renderProjectiles(ctx) {
    for (const p of this.projectiles) {
      ctx.save();
      ctx.fillStyle = p.color;
      if (p.type === 'arrow' || p.type === 'piercing_arrow') {
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(p.x + (p.vx > 0 ? p.width - 3 : 0), p.y - 1, 3, p.height + 2);
      } else {
        // Arcane orbs
        ctx.beginPath();
        ctx.arc(p.x + p.width / 2, p.y + p.height / 2, p.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x + p.width / 2, p.y + p.height / 2, p.width / 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  renderOverheadInfo(ctx) {
    ctx.save();
    const centerX = this.x + this.width / 2;
    const topY = this.y - 12;

    // Small Player Name Tag
    ctx.font = 'bold 11px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.5;
    ctx.strokeText(this.name, centerX, topY - 6);
    ctx.fillText(this.name, centerX, topY - 6);

    // Mini HP Bar
    const barWidth = 32;
    const barHeight = 4;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(centerX - barWidth / 2, topY - 4, barWidth, barHeight);

    const hpPct = Math.max(0, this.hp / this.maxHp);
    ctx.fillStyle = this.isLocal ? '#22c55e' : '#38bdf8';
    ctx.fillRect(centerX - barWidth / 2, topY - 4, barWidth * hpPct, barHeight);

    ctx.restore();
  }
}
