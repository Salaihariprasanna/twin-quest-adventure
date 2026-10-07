// Floating feedback labels for combat damage, coins, and quest announcements

export class FloatingTextManager {
  constructor() {
    this.texts = [];
  }

  add(text, x, y, options = {}) {
    const {
      color = '#ffffff',
      fontSize = 16,
      duration = 0.8,
      isCrit = false,
      vy = -60
    } = options;

    this.texts.push({
      text,
      x: x + (Math.random() * 20 - 10),
      y,
      color,
      fontSize: isCrit ? fontSize * 1.3 : fontSize,
      duration,
      maxDuration: duration,
      vy: isCrit ? vy * 1.3 : vy,
      isCrit
    });
  }

  update(dt) {
    for (let i = this.texts.length - 1; i >= 0; i--) {
      const t = this.texts[i];
      t.duration -= dt;
      if (t.duration <= 0) {
        this.texts.splice(i, 1);
        continue;
      }
      t.y += t.vy * dt;
    }
  }

  render(ctx) {
    for (let i = 0; i < this.texts.length; i++) {
      const t = this.texts[i];
      const alpha = Math.max(0, t.duration / t.maxDuration);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `bold ${t.fontSize}px 'Nunito', sans-serif`;
      ctx.textAlign = 'center';

      // Outline
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#000000';
      ctx.strokeText(t.text, t.x, t.y);

      ctx.fillStyle = t.color;
      ctx.fillText(t.text, t.x, t.y);

      ctx.restore();
    }
  }
}
