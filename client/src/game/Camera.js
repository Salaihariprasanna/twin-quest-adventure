// Smooth Lerping 2D Camera with Screen Shake & Co-op Tracking

export class Camera {
  constructor(viewportWidth, viewportHeight) {
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;

    // Bounds of the world
    this.worldWidth = 3200;
    this.worldHeight = 1200;

    // Shake
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.shakeTimer = 0;
  }

  resize(w, h) {
    this.viewportWidth = w;
    this.viewportHeight = h;
  }

  setWorldBounds(w, h) {
    this.worldWidth = w;
    this.worldHeight = h;
  }

  shake(intensity = 6, duration = 0.25) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
    this.shakeTimer = duration;
  }

  update(dt, player1, player2 = null) {
    if (!player1) return;

    if (player2 && player2.connected && Math.abs(player1.x - player2.x) < 1400) {
      // Co-op mode: center between both heroes
      this.targetX = (player1.x + player2.x) / 2 - this.viewportWidth / 2;
      this.targetY = (player1.y + player2.y) / 2 - this.viewportHeight / 2;
    } else {
      // Solo mode: follow main hero
      this.targetX = player1.x - this.viewportWidth / 2;
      this.targetY = player1.y - this.viewportHeight / 2;
    }

    // Clamp within world bounds
    const maxX = Math.max(0, this.worldWidth - this.viewportWidth);
    const maxY = Math.max(0, this.worldHeight - this.viewportHeight);
    this.targetX = Math.max(0, Math.min(maxX, this.targetX));
    this.targetY = Math.max(0, Math.min(maxY, this.targetY));

    // Smooth Lerp
    const lerpSpeed = 7 * dt;
    this.x += (this.targetX - this.x) * Math.min(1, lerpSpeed);
    this.y += (this.targetY - this.y) * Math.min(1, lerpSpeed);

    // Update screen shake
    if (this.shakeTimer > 0) {
      this.shakeTimer -= dt;
      const progress = this.shakeTimer / this.shakeDuration;
      const currentIntensity = this.shakeIntensity * progress;
      this.offsetX = (Math.random() * 2 - 1) * currentIntensity;
      this.offsetY = (Math.random() * 2 - 1) * currentIntensity;
    } else {
      this.offsetX = 0;
      this.offsetY = 0;
    }
  }

  apply(ctx) {
    ctx.save();
    ctx.translate(-Math.round(this.x + this.offsetX), -Math.round(this.y + this.offsetY));
  }

  restore(ctx) {
    ctx.restore();
  }
}
