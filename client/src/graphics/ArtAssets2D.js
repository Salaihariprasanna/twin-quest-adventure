// ArtAssets2D.js
// Procedural Illustrated Asset & Texture Synthesizer
// Generates hand-painted, illustrated textures and sprites onto cached offscreen canvases.
// 100% self-contained, 0 external image dependencies, instant 60 FPS performance.

export class ArtAssets2D {
  static instance = null;

  static get() {
    if (!ArtAssets2D.instance) {
      ArtAssets2D.instance = new ArtAssets2D();
    }
    return ArtAssets2D.instance;
  }

  constructor() {
    this.cache = new Map();
    this.initPatterns();
  }

  // Pre-generate static texture patterns
  initPatterns() {
    this.cache.set('stone_forest', this.generateStoneTexture('#2c3e50', '#1a252f', '#27ae60'));
    this.cache.set('stone_cave', this.generateStoneTexture('#1e293b', '#0f172a', '#0284c7'));
    this.cache.set('stone_ruins', this.generateStoneTexture('#3e2723', '#271915', '#d97706'));
    this.cache.set('stone_mountain', this.generateStoneTexture('#18181b', '#09090b', '#6366f1'));
    this.cache.set('stone_castle', this.generateStoneTexture('#262626', '#171717', '#e11d48'));

    this.cache.set('wood_plank', this.generateWoodTexture());
    this.cache.set('grass_tufts', this.generateGrassTufts());
    this.cache.set('hanging_vines', this.generateHangingVines());
  }

  // --- 1. Hand-Painted Mossy Stone Block Texture ---
  generateStoneTexture(baseColor, darkColor, accentColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Base stone fill
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 128, 128);

    // Weathered stone brick lines & bevels
    ctx.strokeStyle = darkColor;
    ctx.lineWidth = 3;

    // Row 1
    ctx.strokeRect(2, 2, 60, 38);
    ctx.strokeRect(66, 2, 60, 38);
    // Row 2
    ctx.strokeRect(2, 44, 124, 38);
    // Row 3
    ctx.strokeRect(2, 86, 70, 38);
    ctx.strokeRect(76, 86, 50, 38);

    // Stone highlights & chiseled bevels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(3, 3, 58, 36);
    ctx.strokeRect(67, 3, 58, 36);
    ctx.strokeRect(3, 45, 122, 36);
    ctx.strokeRect(3, 87, 68, 36);
    ctx.strokeRect(77, 87, 48, 36);

    // Organic crack fissures
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(25, 10);
    ctx.lineTo(32, 22);
    ctx.lineTo(28, 34);
    ctx.moveTo(85, 52);
    ctx.lineTo(95, 62);
    ctx.lineTo(105, 58);
    ctx.stroke();

    // Subtle stone noise speckles & moss specks
    for (let i = 0; i < 40; i++) {
      const rx = (i * 29) % 124 + 2;
      const ry = (i * 47) % 124 + 2;
      const r = (i % 3) + 1;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)';
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas;
  }

  // --- 2. Seasoned Timber / Wood Texture ---
  generateWoodTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Rich dark oak base
    const grad = ctx.createLinearGradient(0, 0, 0, 32);
    grad.addColorStop(0, '#78350f');
    grad.addColorStop(0.3, '#92400e');
    grad.addColorStop(0.8, '#5c2b09');
    grad.addColorStop(1, '#451a03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 120, 32);

    // Horizontal wood grain lines
    ctx.strokeStyle = 'rgba(69, 26, 3, 0.7)';
    ctx.lineWidth = 1;
    for (let y = 4; y < 30; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < 120; x += 15) {
        ctx.quadraticCurveTo(x + 7, y + ((x % 3) - 1) * 1.5, x + 15, y);
      }
      ctx.stroke();
    }

    // Top highlight rim
    ctx.fillStyle = 'rgba(254, 215, 170, 0.25)';
    ctx.fillRect(0, 0, 120, 2);

    // Bottom shadow rim
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 30, 120, 2);

    // Iron bolt studs
    const bolts = [12, 108];
    for (const bx of bolts) {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(bx, 16, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(bx - 1, 15, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas;
  }

  // --- 3. Grass Tufts & Wildflowers ---
  generateGrassTufts() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 24;
    const ctx = canvas.getContext('2d');

    // Lush blades
    const blades = [
      { x: 6, h: 14, tilt: -3, col: '#16a34a' },
      { x: 10, h: 18, tilt: -1, col: '#22c55e' },
      { x: 14, h: 15, tilt: 2, col: '#15803d' },
      { x: 18, h: 20, tilt: 4, col: '#4ade80' },
      { x: 28, h: 16, tilt: -2, col: '#16a34a' },
      { x: 33, h: 21, tilt: 1, col: '#22c55e' },
      { x: 38, h: 17, tilt: 3, col: '#15803d' },
      { x: 48, h: 19, tilt: -2, col: '#22c55e' },
      { x: 53, h: 15, tilt: 2, col: '#16a34a' }
    ];

    for (const b of blades) {
      ctx.strokeStyle = b.col;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(b.x, 24);
      ctx.quadraticCurveTo(b.x + b.tilt * 0.5, 24 - b.h * 0.6, b.x + b.tilt, 24 - b.h);
      ctx.stroke();
    }

    // Tiny blooming wildflowers (amber & cyan)
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(18 + 4, 24 - 20, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(33 + 1, 24 - 21, 2.5, 0, Math.PI * 2);
    ctx.fill();

    return canvas;
  }

  // --- 4. Hanging Mossy Vines ---
  generateHangingVines() {
    const canvas = document.createElement('canvas');
    canvas.width = 48;
    canvas.height = 72;
    const ctx = canvas.getContext('2d');

    // Main vine stems
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(14, 0);
    ctx.bezierCurveTo(8, 20, 22, 40, 16, 68);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(34, 0);
    ctx.bezierCurveTo(40, 16, 28, 36, 32, 54);
    ctx.stroke();

    // Leaf clusters
    const leaves = [
      { x: 10, y: 15, r: 4, col: '#22c55e' },
      { x: 16, y: 26, r: 5, col: '#4ade80' },
      { x: 12, y: 38, r: 4, col: '#16a34a' },
      { x: 18, y: 52, r: 5, col: '#22c55e' },
      { x: 16, y: 68, r: 3, col: '#86efac' },
      { x: 38, y: 12, r: 4, col: '#22c55e' },
      { x: 31, y: 24, r: 5, col: '#16a34a' },
      { x: 34, y: 40, r: 4, col: '#4ade80' },
      { x: 32, y: 54, r: 3, col: '#86efac' }
    ];

    for (const lf of leaves) {
      ctx.fillStyle = lf.col;
      ctx.beginPath();
      ctx.ellipse(lf.x, lf.y, lf.r, lf.r * 1.5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas;
  }

  // --- 5. Animated Medieval Wall Torch ---
  drawTorch(ctx, x, y, time) {
    ctx.save();
    ctx.translate(x, y);

    // Wall bracket
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, 0, 6, 22);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-6, 20, 12, 4);

    // Torch head bowl
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(-7, 0);
    ctx.lineTo(7, 0);
    ctx.lineTo(4, 7);
    ctx.lineTo(-4, 7);
    ctx.closePath();
    ctx.fill();

    // Flame flicker physics
    const flick1 = Math.sin(time * 12 + x * 0.1) * 2;
    const flick2 = Math.cos(time * 16 + y * 0.1) * 3;

    // Ambient radial light glow
    const lightGlow = ctx.createRadialGradient(0, -6, 2, 0, -6, 50);
    lightGlow.addColorStop(0, 'rgba(251, 146, 60, 0.45)');
    lightGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.18)');
    lightGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = lightGlow;
    ctx.beginPath();
    ctx.arc(0, -6, 50, 0, Math.PI * 2);
    ctx.fill();

    // Outer flame (Orange)
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.moveTo(-6, 0);
    ctx.quadraticCurveTo(-7 + flick1, -12, 0 + flick2, -22);
    ctx.quadraticCurveTo(7 + flick1, -12, 6, 0);
    ctx.closePath();
    ctx.fill();

    // Inner core (Yellow-White)
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.quadraticCurveTo(-4, -7, 0 + flick1 * 0.5, -14);
    ctx.quadraticCurveTo(4, -7, 3, 0);
    ctx.closePath();
    ctx.fill();

    // Floating spark embers
    const spark1Y = (-time * 30 + (x % 30)) % 25;
    const spark2Y = (-time * 26 + (y % 20)) % 20;
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(flick1 * 2, -22 - spark1Y, 2, 2);
    ctx.fillRect(flick2 * 1.5, -18 - spark2Y, 1.5, 1.5);

    ctx.restore();
  }

  // --- 6. Ancient Runic Checkpoint Obelisk ---
  drawCheckpoint(ctx, x, y, active, time) {
    ctx.save();
    ctx.translate(x, y);

    // Carved stone pedestal
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-22, 20, 44, 10);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-26, 26, 52, 6);

    // Weathered obelisk pillar
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(-14, 20);
    ctx.lineTo(-8, -35);
    ctx.lineTo(0, -48); // Pointed tip
    ctx.lineTo(8, -35);
    ctx.lineTo(14, 20);
    ctx.closePath();
    ctx.fill();

    // Stone highlights
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-13, 19);
    ctx.lineTo(-7, -34);
    ctx.lineTo(0, -46);
    ctx.stroke();

    // Hovering Levitating Crystal
    const hoverY = -62 + Math.sin(time * 3.5) * 4;
    const glowColor = active ? '#38bdf8' : '#64748b';
    const runeColor = active ? '#7dd3fc' : '#475569';

    if (active) {
      // Radiant aura
      const aura = ctx.createRadialGradient(0, hoverY, 4, 0, hoverY, 40);
      aura.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
      aura.addColorStop(0.6, 'rgba(14, 165, 233, 0.2)');
      aura.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, hoverY, 40, 0, Math.PI * 2);
      ctx.fill();
    }

    // Faceted hovering crystal
    ctx.fillStyle = glowColor;
    ctx.beginPath();
    ctx.moveTo(0, hoverY - 14);
    ctx.lineTo(8, hoverY);
    ctx.lineTo(0, hoverY + 14);
    ctx.lineTo(-8, hoverY);
    ctx.closePath();
    ctx.fill();

    // Crystal facet highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, hoverY - 14);
    ctx.lineTo(0, hoverY + 14);
    ctx.lineTo(-8, hoverY);
    ctx.closePath();
    ctx.fill();

    // Carved Runic Inscriptions on Pillar (pulse when active)
    ctx.strokeStyle = runeColor;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    const pulseAlpha = active ? (0.6 + Math.sin(time * 4) * 0.4) : 0.3;
    ctx.globalAlpha = pulseAlpha;

    // Nordic / Elder Runes
    ctx.beginPath();
    // Rune 1 (Algiz / Protection)
    ctx.moveTo(0, -18); ctx.lineTo(0, -6);
    ctx.moveTo(0, -14); ctx.lineTo(-4, -18);
    ctx.moveTo(0, -14); ctx.lineTo(4, -18);
    // Rune 2 (Othala / Heritage)
    ctx.moveTo(0, 0); ctx.lineTo(-4, 6); ctx.lineTo(0, 12); ctx.lineTo(4, 6); ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  // --- 7. Illustrated Fantasy Treasure Chest ---
  drawChest(ctx, x, y, isOpen, tier) {
    ctx.save();
    ctx.translate(x, y);

    const metalColor = tier === 'rare' ? '#fbbf24' : '#94a3b8';
    const metalShine = tier === 'rare' ? '#fef08a' : '#f1f5f9';

    // Base box body
    const bodyGrad = ctx.createLinearGradient(0, 0, 0, 20);
    bodyGrad.addColorStop(0, '#78350f');
    bodyGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.roundRect(-16, 4, 32, 18, [0, 0, 4, 4]);
    ctx.fill();

    // Reinforced metal corner brackets
    ctx.fillStyle = metalColor;
    ctx.fillRect(-16, 4, 4, 18);
    ctx.fillRect(12, 4, 4, 18);
    ctx.fillRect(-16, 20, 32, 3);

    // Front lock clasp
    ctx.fillStyle = metalColor;
    ctx.fillRect(-4, 6, 8, 8);
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, 10, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Lid (Open or Closed)
    if (isOpen) {
      // Open lid angled back
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.moveTo(-16, 4);
      ctx.lineTo(-14, -12);
      ctx.lineTo(14, -12);
      ctx.lineTo(16, 4);
      ctx.closePath();
      ctx.fill();

      // Golden interior treasure glow
      const treasureGlow = ctx.createRadialGradient(0, 2, 2, 0, 2, 28);
      treasureGlow.addColorStop(0, 'rgba(250, 204, 21, 0.9)');
      treasureGlow.addColorStop(0.5, 'rgba(234, 179, 8, 0.4)');
      treasureGlow.addColorStop(1, 'rgba(234, 179, 8, 0)');
      ctx.fillStyle = treasureGlow;
      ctx.beginPath();
      ctx.arc(0, 2, 28, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Curved closed lid
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.ellipse(0, 4, 16, 9, 0, Math.PI, 0);
      ctx.closePath();
      ctx.fill();

      // Top metal strap
      ctx.fillStyle = metalColor;
      ctx.fillRect(-16, 3, 32, 2);
      ctx.fillRect(-14, -3, 3, 7);
      ctx.fillRect(11, -3, 3, 7);

      // Gold highlight sheen
      ctx.fillStyle = metalShine;
      ctx.fillRect(-10, -2, 20, 1.5);
    }

    ctx.restore();
  }

  // --- 8. Spinning Stamped Gold Coin ---
  drawCoin(ctx, x, y, time) {
    ctx.save();
    ctx.translate(x, y);

    // 3D perspective spin scale
    const spin = Math.cos(time * 5);
    const scaleX = Math.abs(spin);
    if (scaleX < 0.1) {
      ctx.restore();
      return;
    }

    ctx.scale(scaleX, 1);

    // Golden coin rim
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.fill();

    // Face gradient
    const coinGrad = ctx.createLinearGradient(-7, -7, 7, 7);
    coinGrad.addColorStop(0, '#fef08a');
    coinGrad.addColorStop(0.4, '#eab308');
    coinGrad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = coinGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Stamped Royal Crown / Star Emblem
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(-3, 3);
    ctx.lineTo(-4, -2);
    ctx.lineTo(-1, 0);
    ctx.lineTo(0, -3);
    ctx.lineTo(1, 0);
    ctx.lineTo(4, -2);
    ctx.lineTo(3, 3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // --- 9. Swirling Ancient Exit Portal ---
  drawPortal(ctx, x, y, time) {
    ctx.save();
    ctx.translate(x, y);

    // Outer mystical energy aura
    const portalGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, 48);
    portalGrad.addColorStop(0, 'rgba(168, 85, 247, 0.85)');
    portalGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.45)');
    portalGrad.addColorStop(0.8, 'rgba(56, 189, 248, 0.2)');
    portalGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = portalGrad;
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.fill();

    // Rotating vortex rings
    for (let r = 0; r < 3; r++) {
      ctx.save();
      const rot = (time * (1.8 - r * 0.4) * (r % 2 === 0 ? 1 : -1));
      ctx.rotate(rot);

      ctx.strokeStyle = r === 0 ? '#c084fc' : (r === 1 ? '#818cf8' : '#38bdf8');
      ctx.lineWidth = 3 - r * 0.6;
      ctx.beginPath();
      const radius = 32 - r * 9;
      ctx.ellipse(0, 0, radius, radius * 0.7, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbiting starlight motes
      for (let s = 0; s < 4; s++) {
        const ang = (s * Math.PI) / 2;
        const sx = Math.cos(ang) * radius;
        const sy = Math.sin(ang) * (radius * 0.7);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(sx, sy, 2.2 - r * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Portal glowing core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
