// Interactive elements: Checkpoints, Levers, Pressure Plates, Doors, Chests, Moving & Crumbling Platforms

export class Checkpoint {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 54;
    this.active = false;
    this.animTime = 0;
  }

  activate(audio, particles, floatingTexts) {
    if (this.active) return false;
    this.active = true;
    if (audio) audio.playCheckpoint();
    if (particles) particles.createCheckpointAura(this.x + this.width / 2, this.y);
    if (floatingTexts) {
      floatingTexts.add('✨ CHECKPOINT ACTIVATED', this.x + this.width / 2, this.y - 20, {
        color: '#67e8f9',
        fontSize: 14
      });
    }
    return true;
  }

  update(dt) {
    this.animTime += dt;
  }

  render(ctx) {
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    const floatOffset = Math.sin(this.animTime * 4) * 4;

    ctx.save();
    // Stone Pedestal
    ctx.fillStyle = '#475569';
    ctx.fillRect(this.x + 4, this.y + 36, 28, 18);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(this.x, this.y + 48, 36, 6);

    // Glowing Crystal
    const glow = this.active ? '#38bdf8' : '#94a3b8';
    ctx.fillStyle = glow;

    if (this.active) {
      // Glow aura
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 16 + Math.sin(this.animTime * 6) * 6;
    }

    ctx.beginPath();
    ctx.moveTo(cx, this.y + 8 + floatOffset);
    ctx.lineTo(cx + 12, this.y + 24 + floatOffset);
    ctx.lineTo(cx, this.y + 34 + floatOffset);
    ctx.lineTo(cx - 12, this.y + 24 + floatOffset);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

export class Switch {
  constructor(id, x, y, targetId, isPressurePlate = false) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.targetId = targetId;
    this.isPressurePlate = isPressurePlate;
    this.width = isPressurePlate ? 36 : 24;
    this.height = isPressurePlate ? 10 : 32;
    this.state = false; // true = activated
  }

  setState(val) {
    this.state = val;
  }

  render(ctx) {
    ctx.save();
    if (this.isPressurePlate) {
      // Pressure Plate
      ctx.fillStyle = this.state ? '#22c55e' : '#eab308';
      const plateH = this.state ? 4 : 8;
      ctx.fillRect(this.x, this.y + (8 - plateH), this.width, plateH);
      ctx.fillStyle = '#475569';
      ctx.fillRect(this.x - 4, this.y + 8, this.width + 8, 4);
    } else {
      // Wall/Floor Lever
      ctx.fillStyle = '#475569';
      ctx.fillRect(this.x + 6, this.y + 20, 12, 12);

      // Handle
      ctx.strokeStyle = this.state ? '#22c55e' : '#cbd5e1';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(this.x + 12, this.y + 22);
      ctx.lineTo(this.state ? this.x + 22 : this.x + 2, this.y + 6);
      ctx.stroke();

      // Lever knob
      ctx.fillStyle = this.state ? '#4ade80' : '#ef4444';
      ctx.beginPath();
      ctx.arc(this.state ? this.x + 22 : this.x + 2, this.y + 6, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

export class Door {
  constructor(id, x, y, width = 24, height = 80) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isOpen = false;
    this.currentOpenHeight = 0; // animated
  }

  update(dt) {
    const target = this.isOpen ? this.height : 0;
    this.currentOpenHeight += (target - this.currentOpenHeight) * Math.min(1, 8 * dt);
  }

  getSolidRect() {
    if (this.isOpen && this.currentOpenHeight >= this.height - 4) return null;
    return {
      x: this.x,
      y: this.y + this.currentOpenHeight,
      width: this.width,
      height: Math.max(0, this.height - this.currentOpenHeight)
    };
  }

  render(ctx) {
    ctx.save();
    // Door frame
    ctx.fillStyle = '#334155';
    ctx.fillRect(this.x - 4, this.y, 4, this.height);
    ctx.fillRect(this.x + this.width, this.y, 4, this.height);

    // Sliding gate
    const remainingH = Math.max(0, this.height - this.currentOpenHeight);
    if (remainingH > 0) {
      ctx.fillStyle = '#64748b';
      ctx.fillRect(this.x, this.y + this.currentOpenHeight, this.width, remainingH);

      // Portcullis iron bars
      ctx.fillStyle = '#1e293b';
      for (let i = this.x + 4; i < this.x + this.width; i += 6) {
        ctx.fillRect(i, this.y + this.currentOpenHeight, 2, remainingH);
      }
    }
    ctx.restore();
  }
}

export class Chest {
  constructor(id, x, y, tier = 'common') {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = 34;
    this.height = 28;
    this.tier = tier; // 'common', 'rare', 'epic', 'legendary'
    this.opened = false;
  }

  open(audio, particles, floatingTexts) {
    if (this.opened) return null;
    this.opened = true;

    if (audio) audio.playChest();

    let reward = { coins: 50, gems: 0, text: '🪙 +50 Coins' };
    if (this.tier === 'rare') {
      reward = { coins: 80, gems: 2, text: '💎 Rare Treasure!' };
    } else if (this.tier === 'epic') {
      reward = { coins: 150, gems: 5, text: '⚔️ Epic Relic Found!' };
    } else if (this.tier === 'legendary') {
      reward = { coins: 300, gems: 10, text: '👑 Legendary Artifact!' };
    }

    if (particles) particles.createCoinSparkle(this.x + this.width / 2, this.y);
    if (floatingTexts) {
      floatingTexts.add(reward.text, this.x + this.width / 2, this.y - 18, {
        color: '#fbbf24',
        fontSize: 14
      });
    }

    return reward;
  }

  render(ctx) {
    ctx.save();
    // Chest base
    ctx.fillStyle = '#78350f';
    ctx.fillRect(this.x, this.y + 10, this.width, 18);

    // Metal Trim
    ctx.fillStyle = this.tier === 'legendary' ? '#f59e0b' : (this.tier === 'epic' ? '#a855f7' : '#94a3b8');
    ctx.fillRect(this.x, this.y + 10, 4, 18);
    ctx.fillRect(this.x + this.width - 4, this.y + 10, 4, 18);
    ctx.fillRect(this.x + this.width / 2 - 3, this.y + 12, 6, 8); // Lock

    // Lid
    if (this.opened) {
      ctx.fillStyle = '#92400e';
      ctx.fillRect(this.x - 2, this.y + 2, this.width + 4, 8);
    } else {
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.roundRect(this.x - 2, this.y, this.width + 4, 12, [6, 6, 0, 0]);
      ctx.fill();
    }
    ctx.restore();
  }
}

export class MovingPlatform {
  constructor(id, x, y, width, height, dx = 160, dy = 0, speed = 60) {
    this.id = id;
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.time = 0;
  }

  update(dt) {
    this.time += dt * (this.speed / 100);
    const wave = (Math.sin(this.time) + 1) / 2; // 0 to 1
    this.x = this.startX + this.dx * wave;
    this.y = this.startY + this.dy * wave;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.width, this.height, 6);
    ctx.fill();

    // Glowing strip
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(this.x + 4, this.y + 2, this.width - 8, 3);
    ctx.restore();
  }
}

export class ExitPortal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 48;
    this.height = 70;
    this.animTime = 0;
    this.active = false;
  }

  update(dt) {
    this.animTime += dt;
  }

  render(ctx) {
    ctx.save();
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;

    // Stone Archway
    ctx.fillStyle = '#475569';
    ctx.fillRect(this.x, this.y, 10, this.height);
    ctx.fillRect(this.x + this.width - 10, this.y, 10, this.height);
    ctx.fillRect(this.x, this.y, this.width, 12);

    // Swirling Portal Energy
    if (this.active) {
      const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, 26);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.5, '#6366f1');
      gradient.addColorStop(1, '#a855f7');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 4, 16, 26, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 4, 14, 24, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
