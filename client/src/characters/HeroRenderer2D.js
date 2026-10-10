// HeroRenderer2D.js
// Renders rich, hand-painted 2D animated characters inspired by Oddmar / Rayman Legends.
// Features expressive skeletal kinematics, squash & stretch, dynamic cape/hair physics,
// animated weapon slash trails, double-jump somersaults, and painterly shading.

export class HeroRenderer2D {
  static instance = null;

  static get() {
    if (!HeroRenderer2D.instance) {
      HeroRenderer2D.instance = new HeroRenderer2D();
    }
    return HeroRenderer2D.instance;
  }

  // Render a player character with full expressive state animations
  renderHero(ctx, player) {
    if (player.hurtTimer > 0 && Math.floor(player.animTime * 24) % 2 === 0) {
      // Invulnerability flicker
      return;
    }

    ctx.save();
    ctx.translate(Math.round(player.x + player.width / 2), Math.round(player.y + player.height / 2));
    ctx.scale(player.facing, 1);

    // Dynamic Kinematics: Squash & Stretch
    let scaleX = 1;
    let scaleY = 1;
    let offsetY = 0;
    let torsoTilt = 0;

    const state = player.state;
    const animTime = player.animTime;

    if (state === 'jump') {
      // Ascending stretch
      scaleX = 0.86;
      scaleY = 1.18;
      offsetY = -2;
      torsoTilt = -0.1;
    } else if (state === 'fall') {
      // Descending posture
      scaleX = 0.92;
      scaleY = 1.1;
      torsoTilt = 0.08;
    } else if (state === 'run') {
      // Running cycle weight shift
      scaleX = 1.05;
      scaleY = 0.96;
      offsetY = Math.abs(Math.sin(animTime * 12)) * 3;
      torsoTilt = 0.18; // Lean forward into sprint
    } else if (state === 'attack') {
      // Heavy strike forward thrust
      scaleX = 1.18;
      scaleY = 0.88;
      torsoTilt = 0.25;
    } else if (state === 'hurt') {
      // Pain recoil
      scaleX = 0.88;
      scaleY = 1.14;
      torsoTilt = -0.3;
    } else {
      // Idle rhythmic breathing
      scaleY = 1 + Math.sin(animTime * 4) * 0.04;
      scaleX = 1 - Math.sin(animTime * 4) * 0.03;
      offsetY = Math.sin(animTime * 4) * 1.5;
    }

    // Double jump 360-degree somersault spin
    if (state === 'jump' && !player.canDoubleJump) {
      const flipAngle = (animTime * 14) % (Math.PI * 2);
      ctx.rotate(flipAngle);
    }

    ctx.scale(scaleX, scaleY);
    ctx.translate(0, offsetY);

    // Draw Character Layers based on selected class
    if (player.characterClass === 'warrior') {
      this.drawVikingWarrior(ctx, player, torsoTilt, animTime);
    } else if (player.characterClass === 'archer') {
      this.drawWoodlandArcher(ctx, player, torsoTilt, animTime);
    } else if (player.characterClass === 'mage') {
      this.drawArcaneMage(ctx, player, torsoTilt, animTime);
    } else {
      this.drawShadowRogue(ctx, player, torsoTilt, animTime);
    }

    ctx.restore();

    // Render Weapon Slash VFX in world space
    this.renderAttackVFX(ctx, player);
  }

  // ==========================================
  // 1. VIKING WARRIOR (Gunnar the Bear-Heart)
  // ==========================================
  drawVikingWarrior(ctx, player, tilt, time) {
    const isRunning = player.state === 'run';
    const legPhase = isRunning ? Math.sin(time * 14) : 0;
    const capeWave = Math.sin(time * 8) * (isRunning ? 14 : 4);

    // --- 1. Flowing Woolen Cloak (Back) ---
    ctx.save();
    ctx.fillStyle = '#991b1b'; // Deep Crimson
    ctx.beginPath();
    ctx.moveTo(-8, -12);
    ctx.lineTo(-24 - (isRunning ? 12 : 2) + capeWave * 0.3, 18 + capeWave);
    ctx.lineTo(-6, 20);
    ctx.closePath();
    ctx.fill();

    // Cloak shadow fold
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.moveTo(-10, -10);
    ctx.lineTo(-18 - (isRunning ? 8 : 2), 19);
    ctx.lineTo(-7, 19);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // --- 2. Legs & Fur Boots ---
    // Back Leg
    this.drawBoot(ctx, -6 - legPhase * 8, 12, legPhase * 0.3);
    // Front Leg
    this.drawBoot(ctx, 4 + legPhase * 8, 12, -legPhase * 0.3);

    // --- 3. Torso & Leather Brigandine ---
    ctx.save();
    ctx.rotate(tilt);

    // Body armor
    const armorGrad = ctx.createLinearGradient(-12, -10, 12, 12);
    armorGrad.addColorStop(0, '#78350f');
    armorGrad.addColorStop(1, '#451a03');
    ctx.fillStyle = armorGrad;
    ctx.beginPath();
    ctx.roundRect(-12, -10, 24, 22, [6, 6, 2, 2]);
    ctx.fill();

    // Iron studs & belt buckle
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(-5, -2, 2, 0, Math.PI * 2);
    ctx.arc(5, -2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Heavy leather belt with gold buckle
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-12, 7, 24, 5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-3, 6, 6, 7);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(-1, 8, 2, 3);

    // Fur Pauldrons (Shoulders)
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.ellipse(-12, -12, 7, 5, -0.2, 0, Math.PI * 2);
    ctx.ellipse(10, -12, 7, 5, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // --- 4. Viking Head & Braided Beard ---
    // Skin Tone
    ctx.fillStyle = '#fbcfe8';
    ctx.beginPath();
    ctx.arc(0, -18, 11, 0, Math.PI * 2);
    ctx.fill();

    // Braided Ginger Beard
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.moveTo(-10, -18);
    ctx.quadraticCurveTo(-12, 0, 0, 8); // Beard tip
    ctx.quadraticCurveTo(12, 0, 10, -18);
    ctx.closePath();
    ctx.fill();

    // Iron Beard Rings
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-3, 2, 6, 2.5);

    // Expressive Determined Eyes
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(4, -18, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(4.8, -18.6, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Iron Helmet with Brass Browband
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.arc(0, -22, 12, Math.PI, Math.PI * 2);
    ctx.fill();

    // Brass Browband
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-12, -23, 24, 4);

    // Curving Horned Crest
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(-11, -22);
    ctx.quadraticCurveTo(-22, -34, -14, -40);
    ctx.quadraticCurveTo(-16, -30, -9, -24);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(11, -22);
    ctx.quadraticCurveTo(22, -34, 14, -40);
    ctx.quadraticCurveTo(16, -30, 9, -24);
    ctx.closePath();
    ctx.fill();

    // --- 5. Shield (Left Arm) ---
    ctx.save();
    ctx.translate(-8, 0);
    // Round wooden shield
    ctx.fillStyle = '#0284c7'; // Clan blue
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    // Iron rim
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    // Iron center boss
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- 6. Nordic Runic Broadsword (Right Arm) ---
    this.drawVikingSword(ctx, player);

    ctx.restore();
  }

  drawBoot(ctx, x, y, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    // Leather leg
    ctx.fillStyle = '#451a03';
    ctx.fillRect(-4, 0, 8, 12);
    // Fur boot cuff
    ctx.fillStyle = '#d97706';
    ctx.fillRect(-5, 6, 10, 4);
    // Boot foot
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(-4, 10, 11, 6, [2, 4, 2, 2]);
    ctx.fill();
    ctx.restore();
  }

  drawVikingSword(ctx, player) {
    ctx.save();
    ctx.translate(10, 2);

    const isAttacking = player.attackAnimTimer > 0;
    const swordAngle = isAttacking ? (0.25 - player.attackAnimTimer) * 16 - 0.5 : -0.4;
    ctx.rotate(swordAngle);

    // Crossguard
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2, -6, 14, 3.5);

    // Steel Blade
    const bladeGrad = ctx.createLinearGradient(0, -28, 6, 0);
    bladeGrad.addColorStop(0, '#f8fafc');
    bladeGrad.addColorStop(0.5, '#cbd5e1');
    bladeGrad.addColorStop(1, '#94a3b8');
    ctx.fillStyle = bladeGrad;
    ctx.beginPath();
    ctx.moveTo(3, -6);
    ctx.lineTo(1, -30);
    ctx.lineTo(5, -34); // Tip
    ctx.lineTo(9, -30);
    ctx.lineTo(7, -6);
    ctx.closePath();
    ctx.fill();

    // Glowing Runic Groove
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(5, -8);
    ctx.lineTo(5, -28);
    ctx.stroke();

    ctx.restore();
  }

  // ==========================================
  // 2. WOODLAND ARCHER (Ayla Swiftwind)
  // ==========================================
  drawWoodlandArcher(ctx, player, tilt, time) {
    const isRunning = player.state === 'run';
    const legPhase = isRunning ? Math.sin(time * 14) : 0;

    // Green Hooded Cloak
    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.moveTo(-6, -12);
    ctx.lineTo(-20, 18);
    ctx.lineTo(-4, 18);
    ctx.closePath();
    ctx.fill();

    // Boots
    this.drawBoot(ctx, -5 - legPhase * 8, 12, legPhase * 0.3);
    this.drawBoot(ctx, 3 + legPhase * 8, 12, -legPhase * 0.3);

    // Slender Leather Armor
    ctx.save();
    ctx.rotate(tilt);
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.roundRect(-9, -10, 18, 22, [5, 5, 2, 2]);
    ctx.fill();

    // Quiver on Back
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-12, -18, 6, 20);
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(-9, -20, 2, 0, Math.PI * 2);
    ctx.arc(-7, -21, 2, 0, Math.PI * 2);
    ctx.fill();

    // Hood & Face
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -17, 10, 0, Math.PI * 2);
    ctx.fill();

    // Green Hood
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.arc(0, -19, 12, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();

    // Keen Eye
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(4, -17, 2, 0, Math.PI * 2);
    ctx.fill();

    // Recurve Longbow
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(14, 0, 22, -Math.PI * 0.35, Math.PI * 0.35);
    ctx.stroke();

    // Glowing Bowstring
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(14 + Math.cos(-Math.PI * 0.35) * 22, Math.sin(-Math.PI * 0.35) * 22);
    ctx.lineTo(14 + Math.cos(Math.PI * 0.35) * 22, Math.sin(Math.PI * 0.35) * 22);
    ctx.stroke();

    ctx.restore();
  }

  // ==========================================
  // 3. ARCANE MAGE (Eldrin the Runecaster)
  // ==========================================
  drawArcaneMage(ctx, player, tilt, time) {
    const isRunning = player.state === 'run';
    const legPhase = isRunning ? Math.sin(time * 14) : 0;

    // Billowing Star Robes
    const robeGrad = ctx.createLinearGradient(-12, -15, 12, 22);
    robeGrad.addColorStop(0, '#581c87');
    robeGrad.addColorStop(1, '#3b0764');
    ctx.fillStyle = robeGrad;
    ctx.beginPath();
    ctx.moveTo(-10, -12);
    ctx.lineTo(-18 - (isRunning ? 10 : 2), 22);
    ctx.lineTo(14, 22);
    ctx.lineTo(8, -12);
    ctx.closePath();
    ctx.fill();

    // Gold embroidered hem
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-18 - (isRunning ? 10 : 2), 20);
    ctx.lineTo(14, 20);
    ctx.stroke();

    // Mystic Hood & Glowing Eyes
    ctx.save();
    ctx.rotate(tilt);
    ctx.fillStyle = '#6b21a8';
    ctx.beginPath();
    ctx.arc(0, -18, 12, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Cyan Eyes
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(3, -17, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Elderwood Staff with Levitating Arcane Orb
    ctx.fillStyle = '#78350f';
    ctx.fillRect(10, -25, 4, 46);

    // Glowing Crystal Orb
    const orbGlow = ctx.createRadialGradient(12, -28, 2, 12, -28, 18);
    orbGlow.addColorStop(0, '#c084fc');
    orbGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.4)');
    orbGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.fillStyle = orbGlow;
    ctx.beginPath();
    ctx.arc(12, -28, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f3e8ff';
    ctx.beginPath();
    ctx.arc(12, -28, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // ==========================================
  // 4. SHADOW ROGUE (Kaelen Shadowblade)
  // ==========================================
  drawShadowRogue(ctx, player, tilt, time) {
    const isRunning = player.state === 'run';
    const legPhase = isRunning ? Math.sin(time * 14) : 0;

    // Dark Cowl & Cape
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-8, -12);
    ctx.lineTo(-20, 18);
    ctx.lineTo(-4, 18);
    ctx.closePath();
    ctx.fill();

    // Boots
    this.drawBoot(ctx, -5 - legPhase * 8, 12, legPhase * 0.3);
    this.drawBoot(ctx, 3 + legPhase * 8, 12, -legPhase * 0.3);

    // Masked Face
    ctx.save();
    ctx.rotate(tilt);
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(-9, -10, 18, 22, [5, 5, 2, 2]);
    ctx.fill();

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(0, -17, 10, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Crimson Eyes
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(4, -17, 2, 0, Math.PI * 2);
    ctx.fill();

    // Dual Daggers
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(10, 0); ctx.lineTo(18, -14); ctx.lineTo(12, -18); ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // --- Luminous Blade Slash VFX ---
  renderAttackVFX(ctx, player) {
    if (player.attackAnimTimer <= 0) return;

    ctx.save();
    ctx.translate(Math.round(player.x + player.width / 2), Math.round(player.y + player.height / 2));
    ctx.scale(player.facing, 1);

    const progress = 1 - (player.attackAnimTimer / 0.22); // 0 to 1
    const arcRadius = 42;

    // Glowing Slash Arc
    const startAng = -Math.PI * 0.5 + progress * 0.5;
    const endAng = Math.PI * 0.45;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(10, -6, arcRadius, startAng, endAng);
    ctx.stroke();

    // Outer Aura Trail (Cyan/Amber)
    ctx.strokeStyle = player.characterClass === 'warrior' ? 'rgba(56, 189, 248, 0.65)' : 'rgba(244, 63, 94, 0.65)';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(10, -6, arcRadius, startAng - 0.2, endAng);
    ctx.stroke();

    // Blade Tip Spark
    const sparkX = 10 + Math.cos(endAng) * arcRadius;
    const sparkY = -6 + Math.sin(endAng) * arcRadius;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(sparkX, sparkY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
