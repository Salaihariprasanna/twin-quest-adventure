// IllustratedEnemies.js
// Renders hand-painted, expressive 2D adventure enemies (Moss Goblins, Spore Crawlers, Crystal Bats)
// Completely replaces flat geometric vector shapes with rich illustrated characters.

export class IllustratedEnemyRenderer {
  static instance = null;

  static get() {
    if (!IllustratedEnemyRenderer.instance) {
      IllustratedEnemyRenderer.instance = new IllustratedEnemyRenderer();
    }
    return IllustratedEnemyRenderer.instance;
  }

  renderEnemy(ctx, enemy) {
    if (enemy.isDead) return;

    // Hit flash
    if (enemy.hurtTimer > 0 && Math.floor(enemy.animTime * 24) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(Math.round(enemy.x + enemy.width / 2), Math.round(enemy.y + enemy.height / 2));
    ctx.scale(enemy.facing, 1);

    if (enemy.type === 'goblin') {
      this.drawMossGoblin(ctx, enemy);
    } else if (enemy.type === 'bat') {
      this.drawCrystalBat(ctx, enemy);
    } else {
      this.drawSporeCrawler(ctx, enemy);
    }

    ctx.restore();

    // Health bar above head
    this.renderHealthBar(ctx, enemy);
  }

  // --- 1. Moss Goblin / Forest Gnoll ---
  drawMossGoblin(ctx, enemy) {
    const time = enemy.animTime;
    const isMoving = Math.abs(enemy.vx) > 5;
    const step = isMoving ? Math.sin(time * 12) : 0;
    const breathe = Math.sin(time * 5) * 1.5;

    // Little Feet
    ctx.fillStyle = '#14532d'; // Dark Forest Green
    ctx.beginPath();
    ctx.roundRect(-10 + step * 6, 12, 8, 6, 3);
    ctx.roundRect(2 - step * 6, 12, 8, 6, 3);
    ctx.fill();

    // Hunchbacked Body & Leather Vest
    const bodyGrad = ctx.createLinearGradient(-12, -8, 12, 12);
    bodyGrad.addColorStop(0, '#16a34a');
    bodyGrad.addColorStop(1, '#15803d');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(0, 2 + breathe, 14, 12, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Leather loincloth
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-8, 6 + breathe, 16, 7);

    // Goblin Head
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(2, -8 + breathe, 10, 0, Math.PI * 2);
    ctx.fill();

    // Long Pointed Ears
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.moveTo(-6, -10 + breathe);
    ctx.lineTo(-18, -16 + breathe);
    ctx.lineTo(-6, -6 + breathe);
    ctx.closePath();
    ctx.fill();

    // Predatory Yellow Eyes
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(6, -9 + breathe, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(6.8, -9 + breathe, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Knotted Wooden Club
    ctx.save();
    ctx.translate(10, 0 + breathe);
    const clubAngle = enemy.attackCooldown > 1.2 ? -0.8 : 0.2; // Telegraph swing
    ctx.rotate(clubAngle);

    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.moveTo(-2, 8);
    ctx.lineTo(2, 8);
    ctx.lineTo(6, -18); // Thick top
    ctx.lineTo(-4, -18);
    ctx.closePath();
    ctx.fill();

    // Club iron spikes
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(5, -12, 2, 0, Math.PI * 2);
    ctx.arc(-3, -15, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // --- 2. Bioluminescent Spore Crawler ---
  drawSporeCrawler(ctx, enemy) {
    const time = enemy.animTime;
    const pulse = 1 + Math.sin(time * 6) * 0.08;
    const crawl = Math.sin(time * 14);

    // Insectoid Spore Legs
    ctx.strokeStyle = '#065f46';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    // Left legs
    ctx.moveTo(-6, 4); ctx.lineTo(-14, 10 + crawl * 3); ctx.lineTo(-18, 16);
    ctx.moveTo(-2, 4); ctx.lineTo(-8, 12 - crawl * 3); ctx.lineTo(-12, 16);
    // Right legs
    ctx.moveTo(6, 4); ctx.lineTo(14, 10 - crawl * 3); ctx.lineTo(18, 16);
    ctx.moveTo(2, 4); ctx.lineTo(8, 12 + crawl * 3); ctx.lineTo(12, 16);
    ctx.stroke();

    // Large Pulsing Mushroom Cap
    ctx.save();
    ctx.scale(pulse, pulse);

    const capGrad = ctx.createLinearGradient(-16, -14, 16, 2);
    capGrad.addColorStop(0, '#0284c7');
    capGrad.addColorStop(0.5, '#0ea5e9');
    capGrad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = capGrad;
    ctx.beginPath();
    ctx.ellipse(0, -4, 16, 12, 0, Math.PI, 0);
    ctx.closePath();
    ctx.fill();

    // Cap Underside Gills
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(-14, -4, 28, 4);

    // Glowing Bioluminescent Spots
    ctx.fillStyle = '#a7f3d0';
    ctx.beginPath();
    ctx.arc(-8, -10, 3, 0, Math.PI * 2);
    ctx.arc(4, -12, 3.5, 0, Math.PI * 2);
    ctx.arc(10, -7, 2, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Spore Dust Puffs
    const sporeAlpha = 0.4 + Math.sin(time * 8) * 0.3;
    ctx.fillStyle = `rgba(167, 243, 208, ${sporeAlpha})`;
    ctx.beginPath();
    ctx.arc(Math.sin(time * 4) * 8, -18, 2.5, 0, Math.PI * 2);
    ctx.arc(-6, -22, 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- 3. Cavern Crystal Bat ---
  drawCrystalBat(ctx, enemy) {
    const time = enemy.animTime;
    const flap = Math.sin(time * 16); // Fast wing flap

    // Obsidian Bat Body
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Ruby Eyes
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(3, -4, 2, 0, Math.PI * 2);
    ctx.fill();

    // Flapping Crystal-Tipped Wings
    ctx.fillStyle = '#312e81';
    ctx.beginPath();
    // Left Wing
    ctx.moveTo(-4, -2);
    ctx.lineTo(-24, -12 + flap * 12);
    ctx.lineTo(-14, 4 + flap * 4);
    ctx.closePath();
    ctx.fill();

    // Right Wing
    ctx.beginPath();
    ctx.moveTo(4, -2);
    ctx.lineTo(24, -12 + flap * 12);
    ctx.lineTo(14, 4 + flap * 4);
    ctx.closePath();
    ctx.fill();

    // Crystal Wing Tips
    ctx.fillStyle = '#c084fc';
    ctx.beginPath();
    ctx.arc(-24, -12 + flap * 12, 2.5, 0, Math.PI * 2);
    ctx.arc(24, -12 + flap * 12, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- Overhead Mini Health Bar ---
  renderHealthBar(ctx, enemy) {
    if (enemy.hp >= enemy.maxHp) return;

    const hpPct = Math.max(0, enemy.hp / enemy.maxHp);
    const barW = 32;
    const barH = 4;
    const barX = enemy.x + (enemy.width - barW) / 2;
    const barY = enemy.y - 12;

    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);

    // HP Fill
    ctx.fillStyle = hpPct > 0.4 ? '#22c55e' : '#ef4444';
    ctx.fillRect(barX, barY, barW * hpPct, barH);
  }
}
