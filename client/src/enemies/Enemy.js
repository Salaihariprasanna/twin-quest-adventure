// Base Enemy Class and standard monster variants
import { IllustratedEnemyRenderer } from './IllustratedEnemies.js';

export class Enemy {
  constructor(id, type, x, y, options = {}) {
    this.id = id;
    this.type = type; // 'slime', 'goblin', 'bat', 'skeleton', 'dark_knight'
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
    this.patrolDistance = options.patrolDistance || 120;

    this.vx = 0;
    this.vy = 0;
    this.facing = 1;
    this.isDead = false;
    this.hurtTimer = 0;
    this.animTime = Math.random() * 5;

    // Config according to enemy type
    this.initStats();
  }

  initStats() {
    switch (this.type) {
      case 'slime':
        this.width = 28;
        this.height = 20;
        this.maxHp = 40;
        this.hp = 40;
        this.damage = 10;
        this.speed = 60;
        this.coins = 5;
        this.color = '#22c55e';
        this.flying = false;
        break;
      case 'bat':
        this.width = 26;
        this.height = 20;
        this.maxHp = 30;
        this.hp = 30;
        this.damage = 12;
        this.speed = 90;
        this.coins = 6;
        this.color = '#a855f7';
        this.flying = true;
        break;
      case 'goblin':
        this.width = 28;
        this.height = 38;
        this.maxHp = 60;
        this.hp = 60;
        this.damage = 15;
        this.speed = 85;
        this.coins = 10;
        this.color = '#84cc16';
        this.flying = false;
        break;
      case 'skeleton':
        this.width = 28;
        this.height = 42;
        this.maxHp = 75;
        this.hp = 75;
        this.damage = 18;
        this.speed = 70;
        this.coins = 12;
        this.color = '#e2e8f0';
        this.flying = false;
        break;
      case 'dark_knight':
        this.width = 34;
        this.height = 48;
        this.maxHp = 130;
        this.hp = 130;
        this.damage = 25;
        this.speed = 65;
        this.coins = 25;
        this.color = '#334155';
        this.flying = false;
        break;
      default:
        this.width = 28;
        this.height = 28;
        this.maxHp = 50;
        this.hp = 50;
        this.damage = 10;
        this.speed = 60;
        this.coins = 5;
        this.color = '#ef4444';
        this.flying = false;
    }
  }

  takeDamage(amount, sourceX) {
    if (this.isDead || this.hurtTimer > 0) return 0;

    const actualDmg = Math.min(this.hp, amount);
    this.hp -= actualDmg;
    this.hurtTimer = 0.25;

    // Recoil knockback
    const dir = this.x < sourceX ? -1 : 1;
    this.vx = dir * 140;
    if (!this.flying) this.vy = -120;

    if (this.hp <= 0) {
      this.isDead = true;
    }
    return actualDmg;
  }

  update(dt, players) {
    if (this.isDead) return;

    this.animTime += dt;
    if (this.hurtTimer > 0) this.hurtTimer -= dt;

    // AI Targeting: find nearest active player
    let target = null;
    let minDist = 320; // Aggro range

    for (const p of players) {
      if (p && !p.isDead && p.connected) {
        const dist = Math.hypot(p.x - this.x, p.y - this.y);
        if (dist < minDist) {
          minDist = dist;
          target = p;
        }
      }
    }

    if (this.flying) {
      // Sinusoidal bat flight or aggro dive
      if (target) {
        const dx = target.x - this.x;
        const dy = (target.y - 10) - this.y;
        const angle = Math.atan2(dy, dx);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.facing = dx > 0 ? 1 : -1;
      } else {
        // Patrol around initial point
        this.vx = Math.sin(this.animTime * 1.5) * this.speed * 0.7;
        this.vy = Math.cos(this.animTime * 3) * 30;
        this.facing = this.vx > 0 ? 1 : -1;
      }
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    } else {
      // Ground AI
      if (target) {
        const dir = target.x > this.x ? 1 : -1;
        this.vx = dir * this.speed;
        this.facing = dir;
      } else {
        // Patrol back and forth
        if (this.x > this.initialX + this.patrolDistance) {
          this.facing = -1;
        } else if (this.x < this.initialX - this.patrolDistance) {
          this.facing = 1;
        }
        this.vx = this.facing * (this.speed * 0.6);
      }
    }
  }

  render(ctx) {
    IllustratedEnemyRenderer.get().renderEnemy(ctx, this);
  }


  renderSlime(ctx) {
    const squish = Math.sin(this.animTime * 8) * 3;
    ctx.fillStyle = this.hurtTimer > 0 ? '#ffffff' : this.color;
    ctx.beginPath();
    ctx.ellipse(0, 4, 14 + squish, 10 - squish, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(4, 2, 2, 0, Math.PI * 2);
    ctx.arc(9, 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  renderBat(ctx) {
    const wingFlap = Math.sin(this.animTime * 18) * 8;
    ctx.fillStyle = this.hurtTimer > 0 ? '#ffffff' : this.color;

    // Wings
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(-14, -6 + wingFlap);
    ctx.lineTo(-6, 4);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(4, 0);
    ctx.lineTo(14, -6 + wingFlap);
    ctx.lineTo(6, 4);
    ctx.closePath();
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    // Red eyes
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(2, -2, 2, 2);
  }

  renderGoblin(ctx) {
    ctx.fillStyle = this.hurtTimer > 0 ? '#ffffff' : this.color;
    // Body & head
    ctx.fillRect(-10, -10, 20, 20);
    ctx.beginPath();
    ctx.arc(0, -12, 8, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.beginPath();
    ctx.moveTo(-8, -14);
    ctx.lineTo(-14, -18);
    ctx.lineTo(-6, -10);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(2, -14, 3, 3);

    // Wooden Club
    ctx.fillStyle = '#78350f';
    ctx.fillRect(8, -8, 5, 16);
  }

  renderSkeleton(ctx) {
    ctx.fillStyle = this.hurtTimer > 0 ? '#ffffff' : '#e2e8f0';
    // Skull
    ctx.beginPath();
    ctx.arc(0, -14, 7, 0, Math.PI * 2);
    ctx.fill();
    // Ribcage & bones
    ctx.fillRect(-6, -7, 12, 14);
    ctx.fillRect(-4, 7, 3, 12);
    ctx.fillRect(1, 7, 3, 12);

    // Eye sockets
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(1, -16, 2, 3);

    // Bone spear
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(6, -18, 2, 34);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(5, -22, 4, 6);
  }

  renderDarkKnight(ctx) {
    ctx.fillStyle = this.hurtTimer > 0 ? '#ffffff' : '#334155';
    // Armored body
    ctx.fillRect(-12, -14, 24, 26);
    // Helmet
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-10, -22, 20, 10);
    // Glowing red visor
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(2, -18, 7, 2);
    // Greatsword
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(10, -20, 4, 32);
    // Shield
    ctx.fillStyle = '#475569';
    ctx.fillRect(-14, -10, 6, 18);
  }
}
