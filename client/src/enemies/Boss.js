// Multi-Phase Boss Battles with cooperative mechanics and phase transitions

export class Boss {
  constructor(level, x, y) {
    this.level = level;
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;

    this.vx = 0;
    this.vy = 0;
    this.facing = -1;
    this.isDead = false;
    this.hurtTimer = 0;
    this.animTime = 0;

    this.attackTimer = 2.0;
    this.attackState = 'idle'; // 'idle', 'telegraph', 'attacking', 'recovering'
    this.stateTimer = 0;
    this.projectiles = [];

    this.initBossData();
  }

  initBossData() {
    switch (this.level) {
      case 1:
        this.name = 'Forest Guardian';
        this.width = 64;
        this.height = 84;
        this.maxHp = 350;
        this.hp = 350;
        this.damage = 18;
        this.speed = 50;
        this.primaryColor = '#15803d';
        this.glowColor = '#86efac';
        break;
      case 2:
        this.name = 'Crystal Beast';
        this.width = 72;
        this.height = 80;
        this.maxHp = 450;
        this.hp = 450;
        this.damage = 22;
        this.speed = 65;
        this.primaryColor = '#0284c7';
        this.glowColor = '#67e8f9';
        break;
      case 3:
        this.name = 'Ancient Guardian';
        this.width = 76;
        this.height = 92;
        this.maxHp = 580;
        this.hp = 580;
        this.damage = 26;
        this.speed = 55;
        this.primaryColor = '#b45309';
        this.glowColor = '#fde047';
        break;
      case 4:
        this.name = 'Shadow Warrior';
        this.width = 60;
        this.height = 84;
        this.maxHp = 700;
        this.hp = 700;
        this.damage = 30;
        this.speed = 95;
        this.primaryColor = '#475569';
        this.glowColor = '#f43f5e';
        break;
      case 5:
        this.name = 'The Dark King';
        this.width = 80;
        this.height = 96;
        this.maxHp = 950;
        this.hp = 950;
        this.damage = 35;
        this.speed = 80;
        this.primaryColor = '#581c87';
        this.glowColor = '#c084fc';
        break;
      default:
        this.name = 'Ancient Titan';
        this.width = 70;
        this.height = 85;
        this.maxHp = 400;
        this.hp = 400;
        this.damage = 20;
        this.speed = 60;
        this.primaryColor = '#6b21a8';
        this.glowColor = '#e9d5ff';
    }
  }

  get phase() {
    const pct = this.hp / this.maxHp;
    if (pct > 0.66) return 1;
    if (pct > 0.33) return 2;
    return 3; // Enraged
  }

  takeDamage(amount) {
    if (this.isDead || this.hurtTimer > 0) return 0;

    const actual = Math.min(this.hp, amount);
    this.hp -= actual;
    this.hurtTimer = 0.2;

    if (this.hp <= 0) {
      this.isDead = true;
      this.attackState = 'dead';
    }
    return actual;
  }

  update(dt, players, audio, particles, camera) {
    if (this.isDead) return;

    this.animTime += dt;
    if (this.hurtTimer > 0) this.hurtTimer -= dt;

    // Update Boss Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) {
        this.projectiles.splice(i, 1);
      }
    }

    // Find closest player for facing and tracking
    let target = null;
    let minDist = 9999;
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

    // Attack state machine
    this.stateTimer -= dt;
    if (this.stateTimer <= 0) {
      if (this.attackState === 'idle') {
        // Start telegraph warning
        this.attackState = 'telegraph';
        this.stateTimer = this.phase === 3 ? 0.45 : 0.8;
      } else if (this.attackState === 'telegraph') {
        // Execute attack!
        this.attackState = 'attacking';
        this.stateTimer = 0.5;
        this.executePhaseAttack(target, audio, particles, camera);
      } else {
        // Recover
        this.attackState = 'idle';
        this.stateTimer = this.phase === 3 ? 1.0 : 1.8;
      }
    }

    // Phase movement
    if (this.attackState === 'idle') {
      if (target) {
        const dir = target.x > this.x ? 1 : -1;
        this.vx = dir * this.speed * (this.phase === 3 ? 1.5 : 1.0);
      }
    } else {
      this.vx = 0;
    }
  }

  executePhaseAttack(target, audio, particles, camera) {
    if (audio) audio.playBossRoar();
    if (camera) camera.shake(7, 0.35);

    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    if (this.phase === 1) {
      // Ground shockwave or directional burst
      this.projectiles.push({
        x: centerX + this.facing * (this.width / 2 + 5),
        y: this.y + this.height - 20,
        vx: this.facing * 280,
        vy: 0,
        width: 28,
        height: 20,
        damage: this.damage,
        color: this.glowColor,
        life: 1.8
      });
    } else if (this.phase === 2) {
      // Dual/Tri-directional projectile barrage
      const angles = [-0.3, 0, 0.3];
      angles.forEach((angle) => {
        const baseAngle = this.facing === 1 ? 0 : Math.PI;
        const totalAngle = baseAngle + angle;
        this.projectiles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(totalAngle) * 320,
          vy: Math.sin(totalAngle) * 320,
          width: 22,
          height: 22,
          damage: this.damage * 1.1,
          color: this.glowColor,
          life: 2.2
        });
      });
    } else {
      // Phase 3 ENRAGED: 5-way cataclysm nova + ground slam
      for (let i = 0; i < 5; i++) {
        const angle = (Math.PI * 2 / 5) * i;
        this.projectiles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * 300,
          vy: Math.sin(angle) * 300,
          width: 24,
          height: 24,
          damage: this.damage * 1.3,
          color: '#ef4444',
          life: 2.5
        });
      }
      if (particles) {
        particles.createDefeatExplosion(centerX, centerY);
      }
    }
  }

  render(ctx) {
    if (this.isDead) return;

    ctx.save();
    ctx.translate(Math.round(this.x + this.width / 2), Math.round(this.y + this.height / 2));
    ctx.scale(this.facing, 1);

    const bob = Math.sin(this.animTime * 5) * 3;

    // Telegraph / Enraged Warning Aura
    if (this.attackState === 'telegraph' || this.phase === 3) {
      ctx.save();
      ctx.strokeStyle = this.phase === 3 ? '#ef4444' : this.glowColor;
      ctx.lineWidth = 4 + Math.sin(this.animTime * 15) * 2;
      ctx.strokeRect(-this.width / 2 - 4, -this.height / 2 - 4 + bob, this.width + 8, this.height + 8);
      ctx.restore();
    }

    // Boss Body
    ctx.fillStyle = this.hurtTimer > 0 ? '#ffffff' : this.primaryColor;
    ctx.beginPath();
    ctx.roundRect(-this.width / 2, -this.height / 2 + bob, this.width, this.height, 12);
    ctx.fill();

    // Crown / Horns
    ctx.fillStyle = this.glowColor;
    ctx.beginPath();
    ctx.moveTo(-20, -this.height / 2 + bob);
    ctx.lineTo(-28, -this.height / 2 - 16 + bob);
    ctx.lineTo(-12, -this.height / 2 + bob);
    ctx.lineTo(0, -this.height / 2 - 20 + bob);
    ctx.lineTo(12, -this.height / 2 + bob);
    ctx.lineTo(28, -this.height / 2 - 16 + bob);
    ctx.lineTo(20, -this.height / 2 + bob);
    ctx.fill();

    // Boss Eyes (Glowing)
    ctx.fillStyle = this.phase === 3 ? '#ef4444' : '#fef08a';
    ctx.beginPath();
    ctx.arc(10, -18 + bob, 6, 0, Math.PI * 2);
    ctx.arc(24, -18 + bob, 5, 0, Math.PI * 2);
    ctx.fill();

    // Core / Weak Point on chest
    ctx.fillStyle = this.glowColor;
    ctx.beginPath();
    ctx.arc(0, 10 + bob, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Render Boss Projectiles
    for (const p of this.projectiles) {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.width / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}
