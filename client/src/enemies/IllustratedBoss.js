// IllustratedBoss.js
// Renders the Ancient Forest Colossus / Stone Golem with hand-painted granite textures,
// glowing embedded runes, floating boulder fists, attack charge telegraphs, and enraged phase transitions.

export class IllustratedBossRenderer {
  static instance = null;

  static get() {
    if (!IllustratedBossRenderer.instance) {
      IllustratedBossRenderer.instance = new IllustratedBossRenderer();
    }
    return IllustratedBossRenderer.instance;
  }

  renderBoss(ctx, boss) {
    if (boss.isDead) return;

    // Hit flash
    if (boss.hurtTimer > 0 && Math.floor(boss.animTime * 20) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(Math.round(boss.x + boss.width / 2), Math.round(boss.y + boss.height / 2));
    ctx.scale(boss.facing, 1);

    const time = boss.animTime;
    const isEnraged = boss.phase >= 2 || (boss.hp / boss.maxHp) <= 0.5;
    const runeColor = isEnraged ? '#ef4444' : '#38bdf8';
    const runeGlow = isEnraged ? 'rgba(239, 68, 68, 0.5)' : 'rgba(56, 189, 248, 0.45)';

    // Breathing / Hovering float
    const floatY = Math.sin(time * 3) * 4;

    // --- 1. Ancient Stone Back Plate / Shoulders ---
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(-38, -42 + floatY, 76, 30, [12, 12, 4, 4]);
    ctx.fill();

    // Floating Shoulder Boulder Pauldrons
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(-42, -32 + floatY, 18, 0, Math.PI * 2);
    ctx.arc(42, -32 + floatY, 18, 0, Math.PI * 2);
    ctx.fill();

    // Shoulder bevel highlights
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-42, -32 + floatY, 16, Math.PI * 0.8, Math.PI * 1.8);
    ctx.arc(42, -32 + floatY, 16, Math.PI * 0.8, Math.PI * 1.8);
    ctx.stroke();

    // --- 2. Heavy Carved Granite Torso ---
    const torsoGrad = ctx.createLinearGradient(-30, -30, 30, 40);
    torsoGrad.addColorStop(0, '#475569');
    torsoGrad.addColorStop(0.5, '#334155');
    torsoGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = torsoGrad;
    ctx.beginPath();
    ctx.roundRect(-32, -30 + floatY, 64, 65, [10, 10, 8, 8]);
    ctx.fill();

    // Moss overhang on stone shoulders
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.ellipse(-20, -30 + floatY, 14, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(20, -30 + floatY, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // --- 3. Glowing Carved Celtic/Nordic Runes on Chest ---
    ctx.save();
    ctx.shadowColor = runeColor;
    ctx.shadowBlur = isEnraged ? 20 : 12;
    ctx.strokeStyle = runeColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Runic Chest Glyph
    ctx.beginPath();
    ctx.moveTo(0, -18 + floatY); ctx.lineTo(0, 16 + floatY); // Center stem
    ctx.moveTo(0, -8 + floatY); ctx.lineTo(-14, 2 + floatY); // Left arm
    ctx.moveTo(0, -8 + floatY); ctx.lineTo(14, 2 + floatY);  // Right arm
    ctx.moveTo(-14, 2 + floatY); ctx.lineTo(0, 16 + floatY); // Diamond bottom
    ctx.moveTo(14, 2 + floatY); ctx.lineTo(0, 16 + floatY);
    ctx.stroke();

    // Heart core pulse
    const corePulse = 0.6 + Math.sin(time * (isEnraged ? 8 : 4)) * 0.35;
    ctx.fillStyle = runeColor;
    ctx.globalAlpha = corePulse;
    ctx.beginPath();
    ctx.arc(0, -4 + floatY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- 4. Colossus Head & Glowing Visor Eyes ---
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(-18, -52 + floatY, 36, 24, [8, 8, 4, 4]);
    ctx.fill();

    // Eye slits
    ctx.save();
    ctx.shadowColor = runeColor;
    ctx.shadowBlur = 15;
    ctx.fillStyle = runeColor;
    ctx.beginPath();
    ctx.roundRect(-12, -45 + floatY, 8, 5, 2);
    ctx.roundRect(4, -45 + floatY, 8, 5, 2);
    ctx.fill();
    ctx.restore();

    // --- 5. Massive Articulated Boulder Fists ---
    // Calculate attack slam kinematics
    const isAttacking = boss.attackTimer > 0;
    const fistLiftY = isAttacking ? -30 + Math.sin(time * 16) * 6 : Math.sin(time * 3 + 1) * 6;
    const fistOffsetX = isAttacking ? 36 : 44;

    // Left Fist (Shield/Idle)
    this.drawStoneFist(ctx, -fistOffsetX, floatY + 12 - fistLiftY * 0.3, runeColor, isEnraged);

    // Right Fist (Slammer)
    this.drawStoneFist(ctx, fistOffsetX, floatY + 12 + fistLiftY, runeColor, isEnraged);

    ctx.restore();

    // Ground Shockwave VFX during smash
    if (isAttacking && boss.attackTimer > 0.3) {
      this.renderSmashShockwave(ctx, boss, runeColor);
    }
  }

  drawStoneFist(ctx, x, y, runeColor, isEnraged) {
    ctx.save();
    ctx.translate(x, y);

    // Fist body
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.roundRect(-16, -14, 32, 28, [8, 8, 8, 8]);
    ctx.fill();

    // Stone Knuckle plates
    ctx.fillStyle = '#475569';
    ctx.fillRect(-12, 6, 7, 7);
    ctx.fillRect(-3, 6, 7, 7);
    ctx.fillRect(6, 6, 7, 7);

    // Runic groove on back of fist
    ctx.strokeStyle = runeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 4);
    ctx.stroke();

    ctx.restore();
  }

  renderSmashShockwave(ctx, boss, color) {
    ctx.save();
    const shockX = boss.x + boss.width / 2 + (boss.facing * 40);
    const shockY = boss.y + boss.height;

    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(shockX, shockY, 50, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Ground debris sparks
    ctx.fillStyle = '#fed7aa';
    for (let i = 0; i < 6; i++) {
      const ang = (i * Math.PI) / 3;
      const px = shockX + Math.cos(ang) * 45;
      const py = shockY - Math.abs(Math.sin(ang)) * 25;
      ctx.fillRect(px, py, 3, 3);
    }

    ctx.restore();
  }
}
