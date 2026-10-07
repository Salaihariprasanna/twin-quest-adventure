// Lightweight and efficient particle system for visual juice

export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(options) {
    const {
      x,
      y,
      count = 8,
      color = '#f59e0b',
      colors = null,
      size = 3,
      speed = 120,
      life = 0.5,
      gravity = 250,
      shape = 'circle', // 'circle', 'square', 'sparkle', 'leaf'
      spread = Math.PI * 2
    } = options;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * spread;
      const spd = (Math.random() * 0.7 + 0.3) * speed;
      const pColor = colors ? colors[Math.floor(Math.random() * colors.length)] : color;

      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color: pColor,
        size: Math.max(1, (Math.random() * 0.6 + 0.7) * size),
        initialSize: size,
        life,
        maxLife: life,
        gravity,
        shape,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() * 2 - 1) * 8
      });
    }
  }

  // Preset effects
  createHitSparks(x, y, color = '#fef08a') {
    this.emit({
      x,
      y,
      count: 10,
      color,
      size: 3,
      speed: 180,
      life: 0.25,
      gravity: 300,
      shape: 'sparkle'
    });
  }

  createDust(x, y) {
    this.emit({
      x,
      y,
      count: 5,
      color: 'rgba(203, 213, 225, 0.6)',
      size: 4,
      speed: 50,
      life: 0.3,
      gravity: -30,
      shape: 'circle'
    });
  }

  createCoinSparkle(x, y) {
    this.emit({
      x,
      y,
      count: 8,
      colors: ['#fef08a', '#f59e0b', '#fbbf24'],
      size: 3.5,
      speed: 100,
      life: 0.45,
      gravity: 80,
      shape: 'sparkle'
    });
  }

  createMagicBurst(x, y, color = '#60a5fa') {
    this.emit({
      x,
      y,
      count: 14,
      colors: [color, '#ffffff', '#c084fc'],
      size: 4,
      speed: 160,
      life: 0.5,
      gravity: 50,
      shape: 'circle'
    });
  }

  createCheckpointAura(x, y) {
    this.emit({
      x,
      y: y + 20,
      count: 20,
      colors: ['#38bdf8', '#818cf8', '#67e8f9', '#ffffff'],
      size: 4,
      speed: 120,
      life: 0.8,
      gravity: -100,
      shape: 'sparkle'
    });
  }

  createDefeatExplosion(x, y) {
    this.emit({
      x,
      y,
      count: 25,
      colors: ['#f87171', '#fb923c', '#facc15', '#ffffff'],
      size: 5,
      speed: 240,
      life: 0.7,
      gravity: 400,
      shape: 'circle'
    });
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      p.vy += p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rotation += p.rotSpeed * dt;
    }
  }

  render(ctx) {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const alpha = Math.max(0, p.life / p.maxLife);
      const curSize = p.size * alpha;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, curSize, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'sparkle') {
        ctx.beginPath();
        ctx.moveTo(0, -curSize * 1.5);
        ctx.lineTo(curSize * 0.5, 0);
        ctx.lineTo(0, curSize * 1.5);
        ctx.lineTo(-curSize * 0.5, 0);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.fillRect(-curSize / 2, -curSize / 2, curSize, curSize);
      }

      ctx.restore();
    }
  }
}
