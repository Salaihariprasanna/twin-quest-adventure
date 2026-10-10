// EnvironmentRenderer2D.js
// Renders a high-fidelity hand-painted 2D world inspired by Oddmar / Rayman Legends / Ori.
// Features: 7-layer parallax, volumetric god rays, hand-painted stone/wood terrain,
// hanging moss & vines, swaying grass tufts, atmospheric fireflies, floating spores,
// foreground depth-of-field foliage, and dynamic warm radial torchlight.

import { ArtAssets2D } from './ArtAssets2D.js';

export class EnvironmentRenderer2D {
  constructor() {
    this.art = ArtAssets2D.get();
    this.time = 0;

    // Atmospheric particles (Fireflies, spores, falling leaves)
    this.ambientParticles = [];
    this.initAmbientParticles(60);
  }

  initAmbientParticles(count) {
    this.ambientParticles = [];
    for (let i = 0; i < count; i++) {
      this.ambientParticles.push({
        x: Math.random() * 4000,
        y: Math.random() * 1000,
        size: Math.random() * 3 + 1.2,
        speedX: (Math.random() - 0.5) * 20 - 10,
        speedY: (Math.random() - 0.5) * 15,
        phase: Math.random() * Math.PI * 2,
        type: i % 4 === 0 ? 'leaf' : (i % 3 === 0 ? 'spore' : 'firefly')
      });
    }
  }

  update(dt) {
    this.time += dt;

    // Update ambient particles
    for (const p of this.ambientParticles) {
      p.phase += dt * 2.5;
      p.x += p.speedX * dt;
      p.y += (p.speedY + Math.sin(p.phase) * 12) * dt;

      // Wrap around world boundaries
      if (p.x < 0) p.x += 4000;
      if (p.x > 4000) p.x -= 4000;
      if (p.y < 0) p.y += 1000;
      if (p.y > 1000) p.y -= 1000;
    }
  }

  // --- Parallax Background Layers (Rendered BEFORE Playfield) ---
  renderBackground(ctx, camera, theme, worldWidth, worldHeight) {
    const camX = camera.x;
    const camY = camera.y;
    const vw = camera.viewportWidth;
    const vh = camera.viewportHeight;

    ctx.save();

    // 1. Painted Sky & Celestial Horizon
    this.renderSky(ctx, camX, camY, vw, vh, theme);

    // 2. Volumetric God-Rays (Luminous light shafts through canopy)
    this.renderGodRays(ctx, camX, camY, vw, vh, theme);

    // 3. Layer 1: Far Mountain Silhouettes (Scroll factor 0.08)
    this.renderFarMountains(ctx, camX * 0.08, camY * 0.05, vw, vh, theme);

    // 4. Layer 2: Deep Midground (Twisted ancient trees, castle spires) (Scroll factor 0.22)
    this.renderDeepMidground(ctx, camX * 0.22, camY * 0.12, vw, vh, theme);

    // 5. Layer 3: Near Midground (Ancient stone arches, overgrown pillars) (Scroll factor 0.45)
    this.renderNearMidground(ctx, camX * 0.45, camY * 0.25, vw, vh, theme);

    ctx.restore();
  }

  // --- 1. Painted Sky Horizon ---
  renderSky(ctx, camX, camY, vw, vh, theme) {
    const skyGrad = ctx.createLinearGradient(0, camY, 0, camY + vh);

    if (theme === 'forest') {
      // Twilight enchanted forest sky
      skyGrad.addColorStop(0, '#091522');
      skyGrad.addColorStop(0.4, '#102d3f');
      skyGrad.addColorStop(0.75, '#1e484a');
      skyGrad.addColorStop(1, '#064e3b');
    } else if (theme === 'cave') {
      // Bioluminescent crystalline deep caverns
      skyGrad.addColorStop(0, '#030712');
      skyGrad.addColorStop(0.45, '#0b1329');
      skyGrad.addColorStop(0.8, '#0f2744');
      skyGrad.addColorStop(1, '#0369a1');
    } else if (theme === 'ruins') {
      // Golden twilight over forgotten ruins
      skyGrad.addColorStop(0, '#1c1917');
      skyGrad.addColorStop(0.45, '#451a03');
      skyGrad.addColorStop(0.75, '#78350f');
      skyGrad.addColorStop(1, '#d97706');
    } else if (theme === 'mountain') {
      // Stormy astral peaks
      skyGrad.addColorStop(0, '#020617');
      skyGrad.addColorStop(0.4, '#1e1b4b');
      skyGrad.addColorStop(0.75, '#431407');
      skyGrad.addColorStop(1, '#6b21a8');
    } else {
      // Royal Lost Kingdom Citadel
      skyGrad.addColorStop(0, '#0a0a0c');
      skyGrad.addColorStop(0.4, '#1e293b');
      skyGrad.addColorStop(0.8, '#3b0764');
      skyGrad.addColorStop(1, '#831843');
    }

    ctx.fillStyle = skyGrad;
    ctx.fillRect(camX, camY, vw, vh);

    // Radiant Celestial Moon / Sun
    const celestialX = camX + vw * 0.75;
    const celestialY = camY + vh * 0.25;

    const moonGlow = ctx.createRadialGradient(celestialX, celestialY, 15, celestialX, celestialY, 120);
    moonGlow.addColorStop(0, 'rgba(254, 243, 199, 0.9)');
    moonGlow.addColorStop(0.3, 'rgba(253, 224, 71, 0.25)');
    moonGlow.addColorStop(1, 'rgba(253, 224, 71, 0)');
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(celestialX, celestialY, 120, 0, Math.PI * 2);
    ctx.fill();

    // Solid moon disc
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(celestialX, celestialY, 28, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- 2. Volumetric God Rays ---
  renderGodRays(ctx, camX, camY, vw, vh, theme) {
    if (theme === 'cave') return; // Caverns have crystals instead

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const rayCount = 5;
    for (let i = 0; i < rayCount; i++) {
      const rayOffset = (i * 260 + Math.sin(this.time * 0.3 + i) * 40);
      const startX = camX + rayOffset;
      const pulse = 0.08 + Math.sin(this.time * 0.8 + i * 1.5) * 0.03;

      const grad = ctx.createLinearGradient(startX, camY, startX + 280, camY + vh);
      grad.addColorStop(0, `rgba(254, 240, 138, ${pulse * 1.6})`);
      grad.addColorStop(0.6, `rgba(250, 204, 21, ${pulse * 0.8})`);
      grad.addColorStop(1, 'rgba(250, 204, 21, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(startX, camY);
      ctx.lineTo(startX + 80, camY);
      ctx.lineTo(startX + 360, camY + vh);
      ctx.lineTo(startX + 180, camY + vh);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  // --- 3. Layer 1: Far Mountain Silhouettes ---
  renderFarMountains(ctx, offsetX, offsetY, vw, vh, theme) {
    ctx.save();
    const color = theme === 'forest' ? '#0b2626' : (theme === 'cave' ? '#09152b' : '#271714');
    ctx.fillStyle = color;

    ctx.beginPath();
    const step = 180;
    const startX = Math.floor(offsetX / step) * step - 200;
    const endX = startX + vw + 400;

    ctx.moveTo(startX - offsetX, vh + 100);
    for (let x = startX; x <= endX; x += step) {
      const peakHeight = Math.sin(x * 0.005) * 80 + Math.cos(x * 0.012) * 50 + 260;
      const screenX = x - offsetX;
      ctx.lineTo(screenX, vh - peakHeight - offsetY);
    }
    ctx.lineTo(endX - offsetX, vh + 100);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // --- 4. Layer 2: Deep Midground (Ancient Trees / Ruins) ---
  renderDeepMidground(ctx, offsetX, offsetY, vw, vh, theme) {
    ctx.save();
    const color = theme === 'forest' ? '#06382b' : (theme === 'cave' ? '#0d2238' : '#3d1d11');
    ctx.fillStyle = color;

    const step = 260;
    const startX = Math.floor(offsetX / step) * step - 300;
    const endX = startX + vw + 500;

    for (let x = startX; x <= endX; x += step) {
      const screenX = x - offsetX;
      const baseY = vh - offsetY;

      if (theme === 'forest') {
        // Giant Gnarled Oak Trunk & Canopy
        ctx.beginPath();
        // Trunk
        ctx.moveTo(screenX - 25, baseY);
        ctx.quadraticCurveTo(screenX - 15, baseY - 140, screenX - 35, baseY - 240);
        ctx.lineTo(screenX + 35, baseY - 240);
        ctx.quadraticCurveTo(screenX + 15, baseY - 140, screenX + 25, baseY);
        ctx.closePath();
        ctx.fill();

        // Lush Crown Canopy
        ctx.beginPath();
        ctx.arc(screenX, baseY - 260, 90, 0, Math.PI * 2);
        ctx.arc(screenX - 55, baseY - 230, 65, 0, Math.PI * 2);
        ctx.arc(screenX + 55, baseY - 230, 65, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Ruin Columns & Castle Spires
        ctx.fillRect(screenX - 20, baseY - 280, 40, 280);
        ctx.beginPath();
        ctx.moveTo(screenX - 30, baseY - 280);
        ctx.lineTo(screenX, baseY - 330);
        ctx.lineTo(screenX + 30, baseY - 280);
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // --- 5. Layer 3: Near Midground (Mossy Archways & Pillars) ---
  renderNearMidground(ctx, offsetX, offsetY, vw, vh, theme) {
    ctx.save();
    const color = theme === 'forest' ? '#0a4d38' : (theme === 'cave' ? '#13324f' : '#572b15');
    ctx.fillStyle = color;

    const step = 380;
    const startX = Math.floor(offsetX / step) * step - 400;
    const endX = startX + vw + 500;

    for (let x = startX; x <= endX; x += step) {
      const screenX = x - offsetX;
      const baseY = vh - offsetY;

      // Ancient stone archway
      ctx.fillRect(screenX - 45, baseY - 180, 24, 180);
      ctx.fillRect(screenX + 21, baseY - 180, 24, 180);

      // Arch top curve
      ctx.beginPath();
      ctx.arc(screenX, baseY - 170, 45, Math.PI, 0, false);
      ctx.lineTo(screenX + 45, baseY - 195);
      ctx.arc(screenX, baseY - 170, 55, 0, Math.PI, true);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }

  // --- Playfield Terrain: Hand-Painted Illustrated Platforms ---
  renderPlatforms(ctx, platforms, theme) {
    const stonePattern = this.art.cache.get(`stone_${theme}`) || this.art.cache.get('stone_forest');
    const woodPattern = this.art.cache.get('wood_plank');
    const grassTufts = this.art.cache.get('grass_tufts');
    const hangingVines = this.art.cache.get('hanging_vines');

    for (const p of platforms) {
      ctx.save();

      const isWoodenBridge = p.height <= 30 && p.width < 300;

      if (isWoodenBridge) {
        // --- Wooden Rope Bridge / Planks ---
        // Fill repeated wood plank pattern
        const woodPat = ctx.createPattern(woodPattern, 'repeat-x');
        ctx.fillStyle = woodPat;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillRect(0, 0, p.width, p.height);
        ctx.restore();

        // Bridge side rope suspension
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - 12);
        ctx.quadraticCurveTo(p.x + p.width / 2, p.y - 2, p.x + p.width, p.y - 12);
        ctx.stroke();

        // Vertical rope ties
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.5;
        for (let rx = p.x + 20; rx < p.x + p.width; rx += 35) {
          ctx.beginPath();
          ctx.moveTo(rx, p.y - 8);
          ctx.lineTo(rx, p.y + 4);
          ctx.stroke();
        }

      } else {
        // --- Mossy Illustrated Stone Block ---
        // 1. Draw Textured Stone Interior
        const stonePat = ctx.createPattern(stonePattern, 'repeat');
        ctx.fillStyle = stonePat;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.beginPath();
        ctx.roundRect(0, 0, p.width, p.height, [6, 6, 2, 2]);
        ctx.fill();
        ctx.restore();

        // 2. Deep Ambient Occlusion Inner Shadow
        const innerShadow = ctx.createLinearGradient(p.x, p.y, p.x, p.y + 30);
        innerShadow.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
        innerShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = innerShadow;
        ctx.fillRect(p.x, p.y + p.height - 25, p.width, 25);

        // 3. Lush Moss Overhang & Fringes on top surface
        const mossGrad = ctx.createLinearGradient(p.x, p.y, p.x, p.y + 16);
        mossGrad.addColorStop(0, '#4ade80');
        mossGrad.addColorStop(0.3, '#22c55e');
        mossGrad.addColorStop(0.7, '#16a34a');
        mossGrad.addColorStop(1, '#14532d');

        ctx.fillStyle = mossGrad;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.width, p.y);
        ctx.lineTo(p.x + p.width, p.y + 7);

        // Natural wavy organic moss drips
        for (let mx = p.x + p.width; mx >= p.x; mx -= 24) {
          const dripLen = Math.sin(mx * 0.1) * 5 + 8;
          ctx.quadraticCurveTo(mx - 12, p.y + dripLen, mx - 24, p.y + 6);
        }
        ctx.closePath();
        ctx.fill();

        // 4. Swaying Grass Tufts along top platform rim
        if (theme === 'forest') {
          for (let gx = p.x + 8; gx < p.x + p.width - 40; gx += 52) {
            ctx.drawImage(grassTufts, gx, p.y - 18);
          }
        }

        // 5. Hanging Vines Draping Below Large Platforms
        if (theme === 'forest' && p.height > 60) {
          for (let vx = p.x + 40; vx < p.x + p.width - 60; vx += 140) {
            ctx.drawImage(hangingVines, vx, p.y + 8);
          }
        }
      }

      ctx.restore();
    }
  }

  // --- Foreground Layer: Depth-of-Field Blur & Living Atmosphere ---
  renderForeground(ctx, camera, theme) {
    const camX = camera.x;
    const camY = camera.y;
    const vw = camera.viewportWidth;
    const vh = camera.viewportHeight;

    ctx.save();

    // 1. Living Atmospheric Particles (Fireflies, Spores, Leaves) translated to screen space
    this.renderAtmosphereParticles(ctx, camX, camY, vw, vh);

    // 2. Cinematic Foreground Foliage (Depth of field, moving slightly faster: factor 1.25)
    if (theme === 'forest') {
      this.renderForegroundFoliage(ctx, camX * 1.25, camY * 1.15, vw, vh);
    }

    // 3. Cinematic Vignette (Subtle edge shading framing the game)
    this.renderCinematicVignette(ctx, vw, vh);

    ctx.restore();
  }

  // --- Fireflies, Glowing Spores & Falling Leaves ---
  renderAtmosphereParticles(ctx, camX, camY, vw, vh) {
    for (const p of this.ambientParticles) {
      const screenX = p.x - camX;
      const screenY = p.y - camY;

      if (screenX < -50 || screenX > vw + 50 || screenY < -50 || screenY > vh + 50) {
        continue;
      }

      if (p.type === 'firefly') {
        // Glowing bioluminescent firefly
        const pulse = 0.5 + Math.sin(p.phase) * 0.45;
        ctx.save();
        ctx.globalAlpha = pulse;

        // Radial glow
        const glow = ctx.createRadialGradient(screenX, screenY, 1, screenX, screenY, p.size * 6);
        glow.addColorStop(0, '#fef08a');
        glow.addColorStop(0.5, 'rgba(163, 230, 53, 0.4)');
        glow.addColorStop(1, 'rgba(163, 230, 53, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      } else if (p.type === 'leaf') {
        // Tumbling golden autumn leaf
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(p.phase * 0.5);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 2, p.size * 1.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        // Drifting mystic spore
        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // --- Foreground Foliage (Simulating high-end camera lens depth-of-field) ---
  renderForegroundFoliage(ctx, offsetX, offsetY, vw, vh) {
    ctx.save();
    ctx.fillStyle = '#062d22'; // Dark silhouette near lens

    // Giant dangling fern leaves in top-left camera corner
    const leafX1 = -((offsetX * 0.3) % 200) - 40;
    ctx.beginPath();
    ctx.ellipse(leafX1 + 100, -20, 180, 90, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Giant dangling leaf in top-right
    const leafX2 = vw + ((offsetX * 0.3) % 200) + 40;
    ctx.beginPath();
    ctx.ellipse(leafX2 - 100, -20, 200, 100, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- Cinematic Vignette ---
  renderCinematicVignette(ctx, vw, vh) {
    const cx = vw / 2;
    const cy = vh / 2;
    const maxRadius = Math.max(vw, vh) * 0.75;

    const vig = ctx.createRadialGradient(cx, cy, maxRadius * 0.45, cx, cy, maxRadius);
    vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vig.addColorStop(1, 'rgba(0, 0, 0, 0.42)');

    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, vw, vh);
  }
}

