// Quest Management and Progress Tracking

export class QuestManager {
  constructor() {
    this.quests = [];
    this.completedCount = 0;
  }

  loadQuests(levelQuests) {
    this.quests = levelQuests.map(q => ({
      ...q,
      current: 0,
      completed: false
    }));
    this.completedCount = 0;
    this.renderHUD();
  }

  progressQuest(type, amount = 1, audio = null, floatingTexts = null, player = null) {
    let anyCompleted = false;

    for (const q of this.quests) {
      if (q.completed) continue;
      if (q.type === type) {
        q.current = Math.min(q.required, q.current + amount);
        if (q.current >= q.required) {
          q.completed = true;
          this.completedCount++;
          anyCompleted = true;

          if (audio) audio.playVictory();
          if (floatingTexts && player) {
            floatingTexts.add('🎉 QUEST COMPLETE!', player.x + player.width / 2, player.y - 30, {
              color: '#facc15',
              fontSize: 16,
              duration: 1.2
            });
            floatingTexts.add('+100 XP  +50 COINS', player.x + player.width / 2, player.y - 12, {
              color: '#4ade80',
              fontSize: 13,
              duration: 1.2
            });
          }
          if (player) {
            player.coins += 50;
            player.score += 100;
          }
        }
      }
    }

    if (anyCompleted || amount > 0) {
      this.renderHUD();
    }

    return anyCompleted;
  }

  isAllCompleted() {
    return this.quests.length > 0 && this.quests.every(q => q.completed);
  }

  renderHUD() {
    const listEl = document.getElementById('quest-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    for (const q of this.quests) {
      const li = document.createElement('li');
      li.className = `quest-item ${q.completed ? 'completed' : ''}`;

      const icon = q.completed ? '✅' : '☐';
      const progressText = q.required > 1 ? ` (${q.current}/${q.required})` : '';

      li.innerHTML = `
        <span class="quest-check">${icon}</span>
        <span class="quest-text">${q.title}${progressText}</span>
      `;
      listEl.appendChild(li);
    }
  }
}
