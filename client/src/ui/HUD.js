// In-game HUD Controller

export class HUD {
  constructor() {
    this.gameHudEl = document.getElementById('game-hud');
    this.p1HudEl = document.getElementById('hud-p1');
    this.p2HudEl = document.getElementById('hud-p2');

    // P1 Elements
    this.p1Name = document.getElementById('p1-name-display');
    this.p1Class = document.getElementById('p1-class-display');
    this.p1HpBar = document.getElementById('p1-hp-bar');
    this.p1HpText = document.getElementById('p1-hp-text');
    this.p1MpBar = document.getElementById('p1-mp-bar');
    this.p1MpText = document.getElementById('p1-mp-text');

    // P2 Elements
    this.p2Name = document.getElementById('p2-name-display');
    this.p2Class = document.getElementById('p2-class-display');
    this.p2HpBar = document.getElementById('p2-hp-bar');
    this.p2HpText = document.getElementById('p2-hp-text');
    this.p2MpBar = document.getElementById('p2-mp-bar');
    this.p2MpText = document.getElementById('p2-mp-text');

    // Boss Elements
    this.bossBarContainer = document.getElementById('boss-bar-container');
    this.bossName = document.getElementById('boss-name');
    this.bossPhase = document.getElementById('boss-phase');
    this.bossHpBar = document.getElementById('boss-hp-bar');

    // Stat Elements
    this.levelTitle = document.getElementById('level-title-display');
    this.coinCount = document.getElementById('coin-count');
    this.gemCount = document.getElementById('gem-count');

    this.toastContainer = document.getElementById('toast-container');
  }

  show() {
    if (this.gameHudEl) this.gameHudEl.classList.remove('hidden');
    const questEl = document.getElementById('quest-tracker');
    if (questEl) questEl.classList.remove('hidden');
  }

  hide() {
    if (this.gameHudEl) this.gameHudEl.classList.add('hidden');
    const questEl = document.getElementById('quest-tracker');
    if (questEl) questEl.classList.add('hidden');
  }

  updatePlayer1(player) {
    if (!player) return;
    if (this.p1Name) this.p1Name.textContent = player.name;
    if (this.p1Class) this.p1Class.textContent = player.characterClass;

    const hpPct = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
    if (this.p1HpBar) this.p1HpBar.style.width = `${hpPct}%`;
    if (this.p1HpText) this.p1HpText.textContent = `${Math.ceil(player.hp)} / ${player.maxHp}`;

    const mpPct = Math.max(0, Math.min(100, (player.mp / player.maxMp) * 100));
    if (this.p1MpBar) this.p1MpBar.style.width = `${mpPct}%`;
    if (this.p1MpText) this.p1MpText.textContent = `${Math.ceil(player.mp)} / ${player.maxMp}`;

    if (this.coinCount) this.coinCount.textContent = player.coins;
    if (this.gemCount) this.gemCount.textContent = player.gems;
  }

  updatePlayer2(partner) {
    if (!partner || !partner.connected) {
      if (this.p2HudEl) this.p2HudEl.classList.add('hidden');
      return;
    }

    if (this.p2HudEl) this.p2HudEl.classList.remove('hidden');
    if (this.p2Name) this.p2Name.textContent = partner.name;
    if (this.p2Class) this.p2Class.textContent = partner.characterClass;

    const hpPct = Math.max(0, Math.min(100, (partner.hp / partner.maxHp) * 100));
    if (this.p2HpBar) this.p2HpBar.style.width = `${hpPct}%`;
    if (this.p2HpText) this.p2HpText.textContent = `${Math.ceil(partner.hp)} / ${partner.maxHp}`;

    const mpPct = Math.max(0, Math.min(100, (partner.mp / partner.maxMp) * 100));
    if (this.p2MpBar) this.p2MpBar.style.width = `${mpPct}%`;
    if (this.p2MpText) this.p2MpText.textContent = `${Math.ceil(partner.mp)} / ${partner.maxMp}`;
  }

  setLevelInfo(name, stars = '⭐⭐⭐') {
    if (this.levelTitle) this.levelTitle.textContent = name;
  }

  updateBoss(boss) {
    if (!boss || boss.isDead) {
      if (this.bossBarContainer) this.bossBarContainer.classList.add('hidden');
      return;
    }

    if (this.bossBarContainer) this.bossBarContainer.classList.remove('hidden');
    if (this.bossName) this.bossName.textContent = boss.name;
    if (this.bossPhase) this.bossPhase.textContent = `Phase ${boss.phase}`;

    const hpPct = Math.max(0, Math.min(100, (boss.hp / boss.maxHp) * 100));
    if (this.bossHpBar) this.bossHpBar.style.width = `${hpPct}%`;
  }

  showToast(message) {
    if (!this.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}
