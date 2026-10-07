// Renders parallax background layers, terrain platforms, hazards, torches, and collectibles

export class TileRenderer {
  constructor() {
    this.animTime = 0;
  }

  update(dt) {
    this.animTime += dt;
  }

  // Layered Parallax Background
  renderParallaxBackground(ctx, camera, theme, worldWidth, worldHeight) {
    const camX = camera.x;
    const camY = camera.y;
    const viewW = camera.viewportWidth;
    const viewH = camera.viewportHeight;

    ctx.save();

    if (theme === 'forest') {
      // 1. Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, viewH);
      skyGrad.addColorStop(0, '#0f172a');
      skyGrad.addColorStop(0.5, '#1e293b');
      skyGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(camX, camY, viewW, viewH);

      // 2. Far Mountain Silhouettes (Scroll factor 0.15)
      ctx.fillStyle = '#062d27';
      this.drawMountainLayer(ctx, camX * 0.15, camY, viewW, viewH, 220);

      // 3. Mid Forest Trees (Scroll factor 0.35)
      ctx.fillStyle = '#064e3b';
      this.drawTreeLayer(ctx, camX * 0.35, camY, viewW, viewH, 160);

    } else if (theme === 'cave') {
      // Crystal Cave
      const caveGrad = ctx.createLinearGradient(0, 0, 0, viewH);
      caveGrad.addColorStop(0, '#090d16');
      caveGrad.addColorStop(0.5, '#0f172a');
      caveGrad.addColorStop(1, '#082f49');
      ctx.fillStyle = caveGrad;
      ctx.fillRect(camX, camY, viewW, viewH);

      // Stalactites & Rock Pillars (Scroll factor 0.25)
      ctx.fillStyle = '#0c1a2e';
      this.drawCavePillars(ctx, camX * 0.25, camY, viewW, viewH);

    } else if (theme === 'ruins') {
      // Forgotten Ruins
      const ruinGrad = ctx.createLinearGradient(0, 0, 0, viewH);
      ruinGrad.addColorStop(0, '#1c1917');
      ruinGrad.addColorStop(0.6, '#292524');
      ruinGrad.addColorStop(1, '#451a03');
      ctx.fillStyle = ruinGrad;
      ctx.fillRect(camX, camY, viewW, viewH);

      // Ancient Pillars & Broken Arches
      ctx.fillStyle = '#1c1917';
      this.drawAncientPillars(ctx, camX * 0.3, camY, viewW, viewH);

    } else if (theme === 'mountain') {
      // Shadow Mountains
      const mtnGrad = ctx.createLinearGradient(0, 0, 0, viewH);
      mtnGrad.addColorStop(0, '#020617');
      mtnGrad.addColorStop(0.5, '#1e1b4b');
      mtnGrad.addColorStop(1, '#311042');
      ctx.fillStyle = mtnGrad;
      ctx.fillRect(camX, camY, viewW, viewH);

      ctx.fillStyle = '#090514';
      this.drawMountainLayer(ctx, camX * 0.2, camY, viewW, viewH, 280);

    } else {
      // Lost Kingdom Castle
      const castleGrad = ctx.createLinearGradient(0, 0, 0, viewH);
      castleGrad.addColorStop(0, '#09090b');
      castleGrad.addColorStop(0.6, '#18181b');
      castleGrad.addColorStop(1, '#27272a');
      ctx.fillStyle = castleGrad;
      ctx.fillRect(camX, camY, viewW, viewH);

      ctx.fillStyle = '#18181b';
      this.drawCastleParapets(ctx, camX * 0.25, camY, viewW, viewH);
    }

    ctx.restore();
  }

  drawMountainLayer(ctx, offsetX, camY, viewW, viewH, baseHeight) {
    ctx.beginPath();
    const step = 140;
    const startX = Math.floor(offsetX / step) * step - 200;
    const endX = startX + viewW + 400;

    ctx.moveTo(startX, camY + viewH);
    for (let x = startX; x <= endX; x += step) {
      const peak = Math.sin(x * 0.008) * 70 + (viewH - baseHeight);
      ctx.lineTo(x - offsetX, camY + peak);
    }
    ctx.lineTo(endX - offsetX, camY + viewH);
    ctx.closePath();
    ctx.fill();
  }

  drawTreeLayer(ctx, offsetX, camY, viewW, viewH, baseHeight) {
    const step = 80;
    const startX = Math.floor(offsetX / step) * step - 160;
    const endX = startX + viewW + 300;

    for (let x = startX; x <= endX; x += step) {
      const screenX = x - offsetX;
      const groundY = camY + viewH - baseHeight + Math.sin(x * 0.01) * 30;

      // Tree trunk
      ctx.fillRect(screenX + 16, groundY - 50, 8, 50);

      // Canopy
      ctx.beginPath();
      ctx.arc(screenX + 20, groundY - 60, 24, 0, Math.PI * 2);
      ctx.arc(screenX + 10, groundY - 45, 18, 0, Math.PI * 2);
      ctx.arc(screenX + 30, groundY - 45, 18, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawCavePillars(ctx, offsetX, camY, viewW, viewH) {
    const step = 180;
    const startX = Math.floor(offsetX / step) * step - 200;
    const endX = startX + viewW + 300;

    for (let x = startX; x <= endX; x += step) {
      const screenX = x - offsetX;
      // Stalactite from ceiling
      ctx.beginPath();
      ctx.moveTo(screenX, camY);
      ctx.lineTo(screenX + 25, camY + 120 + Math.sin(x) * 40);
      ctx.lineTo(screenX + 50, camY);
      ctx.fill();

      // Stalagmite from floor
      ctx.beginPath();
      ctx.moveTo(screenX + 40, camY + viewH);
      ctx.lineTo(screenX + 65, camY + viewH - (90 + Math.cos(x) * 30));
      ctx.lineTo(screenX + 90, camY + viewH);
      ctx.fill();
    }
  }

  drawAncientPillars(ctx, offsetX, camY, viewW, viewH) {
    const step = 220;
    const startX = Math.floor(offsetX / step) * step - 200;
    const endX = startX + viewW + 300;

    for (let x = startX; x <= endX; x += step) {
      const screenX = x - offsetX;
      // Pillar
      ctx.fillRect(screenX, camY + viewH - 260, 30, 260);
      // Pillar capital
      ctx.fillRect(screenX - 8, camY + viewH - 275, 46, 15);
    }
  }

  drawCastleParapets(ctx, offsetX, camY, viewW, viewH) {
    const step = 200;
    const startX = Math.floor(offsetX / step) * step - 200;
    const endX = startX + viewW + 300;

    for (let x = startX; x <= endX; x += step) {
      const screenX = x - offsetX;
      // Castle tower wall
      ctx.fillRect(screenX, camY + viewH - 320, 60, 320);
      // Crenellations
      ctx.fillRect(screenX - 4, camY + viewH - 340, 16, 20);
      ctx.fillRect(screenX + 24, camY + viewH - 340, 16, 20);
      ctx.fillRect(screenX + 48, camY + viewH - 340, 16, 20);
    }
  }

  // Terrain Platforms
  renderPlatforms(ctx, platforms, theme) {
    for (const p of platforms) {
      ctx.save();

      // Platform body color
      let bodyColor = '#1e293b';
      let topColor = '#22c55e'; // Grass default

      if (theme === 'cave') {
        bodyColor = '#0f172a';
        topColor = '#0284c7';
      } else if (theme === 'ruins') {
        bodyColor = '#292524';
        topColor = '#b45309';
      } else if (theme === 'mountain') {
        bodyColor = '#1e1b4b';
        topColor = '#475569';
      } else if (theme === 'castle') {
        bodyColor = '#18181b';
        topColor = '#64748b';
      }

      // Draw Main Block
      ctx.fillStyle = bodyColor;
      ctx.fillRect(p.x, p.y, p.width, p.height);

      // Top Trim (Grass / Stone rim)
      ctx.fillStyle = topColor;
      ctx.fillRect(p.x, p.y, p.width, 6);

      // Decorative edge highlights
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(p.x, p.y, p.width, 2);

      // Bottom shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(p.x, p.y + p.height - 4, p.width, 4);

      ctx.restore();
    }
  }

  // Hazard Spikes
  renderHazards(ctx, hazards) {
    for (const h of hazards) {
      ctx.save();
      const spikeW = 16;
      const count = Math.floor(h.width / spikeW);

      ctx.fillStyle = '#64748b';
      for (let i = 0; i < count; i++) {
        const sx = h.x + i * spikeW;
        ctx.beginPath();
        ctx.moveTo(sx, h.y + h.height);
        ctx.lineTo(sx + spikeW / 2, h.y);
        ctx.lineTo(sx + spikeW, h.y + h.height);
        ctx.closePath();
        ctx.fill();

        // Gleam
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(sx + spikeW / 2 - 1, h.y + 4, 2, 4);
        ctx.fillStyle = '#64748b';
      }
      ctx.restore();
    }
  }

  // Spinning Animated Coins
  renderCoins(ctx, coins) {
    for (const c of coins) {
      if (c.collected) continue;

      ctx.save();
      const bob = Math.sin(this.animTime * 5 + c.x) * 3;
      const scaleX = Math.abs(Math.sin(this.animTime * 4 + c.x));

      ctx.translate(c.x + 8, c.y + 8 + bob);
      ctx.scale(Math.max(0.15, scaleX), 1);

      // Outer gold rim
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      // Inner highlight
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Wall Torches with dynamic flame flicker
  renderTorches(ctx, torches = []) {
    for (const t of torches) {
      ctx.save();
      // Bracket
      ctx.fillStyle = '#475569';
      ctx.fillRect(t.x, t.y + 6, 8, 12);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(t.x + 2, t.y, 4, 8);

      // Flame
      const flicker = Math.sin(this.animTime * 12 + t.x) * 2;
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(t.x + 4, t.y - 4 + flicker, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(t.x + 4, t.y - 4 + flicker, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }
}
