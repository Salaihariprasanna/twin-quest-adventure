// TileRenderer.js
// High-fidelity illustrated terrain and parallax renderer for 2D platform adventure.
// Integrates EnvironmentRenderer2D and ArtAssets2D for rich painterly environments.

import { EnvironmentRenderer2D } from '../graphics/EnvironmentRenderer2D.js';
import { ArtAssets2D } from '../graphics/ArtAssets2D.js';

export class TileRenderer {
  constructor() {
    this.env = new EnvironmentRenderer2D();
    this.art = ArtAssets2D.get();
    this.animTime = 0;
  }

  update(dt) {
    this.animTime += dt;
    this.env.update(dt);
  }

  // Multi-plane parallax background
  renderParallaxBackground(ctx, camera, theme, worldWidth, worldHeight) {
    this.env.renderBackground(ctx, camera, theme, worldWidth, worldHeight);
  }

  // Hand-painted terrain platforms with moss and wood
  renderPlatforms(ctx, platforms, theme) {
    this.env.renderPlatforms(ctx, platforms, theme);
  }

  // Foreground depth-of-field foliage, fireflies, vignette
  renderForeground(ctx, camera, theme) {
    this.env.renderForeground(ctx, camera, theme);
  }

  // Hazard Spikes (Barbed iron and obsidian stakes)
  renderHazards(ctx, hazards) {
    for (const h of hazards) {
      ctx.save();
      const spikeW = 16;
      const count = Math.floor(h.width / spikeW);

      for (let i = 0; i < count; i++) {
        const sx = h.x + i * spikeW;

        // Dark iron spike
        const spikeGrad = ctx.createLinearGradient(sx, h.y + h.height, sx + spikeW, h.y);
        spikeGrad.addColorStop(0, '#1e293b');
        spikeGrad.addColorStop(0.6, '#334155');
        spikeGrad.addColorStop(1, '#94a3b8');
        ctx.fillStyle = spikeGrad;

        ctx.beginPath();
        ctx.moveTo(sx, h.y + h.height);
        ctx.lineTo(sx + spikeW / 2, h.y);
        ctx.lineTo(sx + spikeW, h.y + h.height);
        ctx.closePath();
        ctx.fill();

        // Barbed hook edge
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(sx + spikeW / 2, h.y);
        ctx.lineTo(sx + spikeW, h.y + h.height);
        ctx.stroke();

        // Red venom/danger sheen at tip
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(sx + spikeW / 2, h.y + 4, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // Spinning Stamped Golden Coins
  renderCoins(ctx, coins) {
    for (const c of coins) {
      if (c.collected) continue;
      this.art.drawCoin(ctx, c.x + 8, c.y + 8, this.animTime + (c.x % 10));
    }
  }

  // Medieval Wall Torches with dynamic flame physics
  renderTorches(ctx, torches = []) {
    for (const t of torches) {
      this.art.drawTorch(ctx, t.x + 4, t.y + 6, this.animTime);
    }
  }
}
