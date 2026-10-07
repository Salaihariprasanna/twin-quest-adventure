// Complete Level Layouts for all 5 adventure worlds

export const LEVELS = {
  1: {
    id: 1,
    name: 'Whispering Forest',
    subtitle: 'Tutorial & The Ancient Woods',
    worldWidth: 3200,
    worldHeight: 900,
    theme: 'forest',
    spawnPoint: { x: 80, y: 550 },
    platforms: [
      // Main Ground
      { x: 0, y: 650, width: 900, height: 250 },
      { x: 980, y: 650, width: 800, height: 250 },
      { x: 1860, y: 650, width: 1340, height: 250 },

      // Raised Exploration Platforms
      { x: 260, y: 520, width: 160, height: 24 },
      { x: 480, y: 430, width: 180, height: 24 },
      { x: 720, y: 500, width: 140, height: 24 },

      // Chasm step
      { x: 1100, y: 530, width: 150, height: 24 },
      { x: 1320, y: 440, width: 160, height: 24 },
      { x: 1540, y: 520, width: 150, height: 24 },

      // Pre-Boss climb
      { x: 1950, y: 540, width: 180, height: 24 },
      { x: 2200, y: 460, width: 200, height: 24 },
      { x: 2480, y: 550, width: 160, height: 24 }
    ],
    movingPlatforms: [
      { id: 'mp_1', x: 890, y: 580, width: 85, height: 20, dx: 0, dy: -120, speed: 50 }
    ],
    hazards: [
      // Chasm spikes
      { x: 900, y: 850, width: 80, height: 30, type: 'spikes' },
      { x: 1780, y: 850, width: 80, height: 30, type: 'spikes' }
    ],
    coins: [
      { id: 'c1', x: 280, y: 480 },
      { id: 'c2', x: 320, y: 480 },
      { id: 'c3', x: 500, y: 390 },
      { id: 'c4', x: 540, y: 390 },
      { id: 'c5', x: 580, y: 390 },
      { id: 'c6', x: 1140, y: 490 },
      { id: 'c7', x: 1350, y: 400 },
      { id: 'c8', x: 1400, y: 400 },
      { id: 'c9', x: 2000, y: 500 },
      { id: 'c10', x: 2250, y: 420 },
      { id: 'c11', x: 2300, y: 420 }
    ],
    checkpoints: [
      { id: 'cp_1_1', x: 1050, y: 596 },
      { id: 'cp_1_2', x: 2150, y: 596 }
    ],
    switches: [
      { id: 'sw_1_1', x: 740, y: 470, targetId: 'door_1_1', isPressurePlate: false }
    ],
    doors: [
      { id: 'door_1_1', x: 1720, y: 570, width: 24, height: 80 }
    ],
    chests: [
      { id: 'ch_1_1', x: 550, y: 402, tier: 'common' },
      { id: 'ch_1_2', x: 1440, y: 412, tier: 'rare' }
    ],
    enemies: [
      { id: 'e1', type: 'slime', x: 380, y: 620 },
      { id: 'e2', type: 'slime', x: 620, y: 620 },
      { id: 'e3', type: 'goblin', x: 1220, y: 610 },
      { id: 'e4', type: 'slime', x: 1480, y: 620 },
      { id: 'e5', type: 'goblin', x: 2050, y: 610 }
    ],
    boss: {
      level: 1,
      x: 2750,
      y: 566
    },
    exitPortal: { x: 3080, y: 580 },
    quests: [
      { id: 'q_coins', title: 'Collect 5 Forest Coins', required: 5, type: 'coins' },
      { id: 'q_enemies', title: 'Defeat 3 Woodland Creatures', required: 3, type: 'kills' },
      { id: 'q_boss', title: 'Defeat the Forest Guardian', required: 1, type: 'boss' }
    ]
  },

  2: {
    id: 2,
    name: 'Crystal Cave',
    subtitle: 'Underground Caverns & Moving Platforms',
    worldWidth: 3400,
    worldHeight: 950,
    theme: 'cave',
    spawnPoint: { x: 80, y: 600 },
    platforms: [
      { x: 0, y: 700, width: 700, height: 250 },
      { x: 860, y: 700, width: 900, height: 250 },
      { x: 1900, y: 700, width: 1500, height: 250 },

      // Cave Platforms
      { x: 240, y: 560, width: 150, height: 24 },
      { x: 440, y: 460, width: 170, height: 24 },
      { x: 960, y: 560, width: 160, height: 24 },
      { x: 1200, y: 460, width: 220, height: 24 },
      { x: 1500, y: 540, width: 160, height: 24 },

      { x: 2050, y: 560, width: 180, height: 24 },
      { x: 2320, y: 460, width: 200, height: 24 }
    ],
    movingPlatforms: [
      { id: 'mp_2_1', x: 710, y: 620, width: 90, height: 20, dx: 140, dy: 0, speed: 65 },
      { id: 'mp_2_2', x: 1770, y: 620, width: 90, height: 20, dx: 0, dy: -140, speed: 60 }
    ],
    hazards: [
      { x: 700, y: 900, width: 160, height: 30, type: 'spikes' },
      { x: 1760, y: 900, width: 140, height: 30, type: 'spikes' }
    ],
    coins: [
      { id: 'c2_1', x: 260, y: 520 },
      { id: 'c2_2', x: 460, y: 420 },
      { id: 'c2_3', x: 500, y: 420 },
      { id: 'c2_4', x: 1240, y: 420 },
      { id: 'c2_5', x: 1280, y: 420 },
      { id: 'c2_6', x: 2100, y: 520 },
      { id: 'c2_7', x: 2360, y: 420 }
    ],
    checkpoints: [
      { id: 'cp_2_1', x: 920, y: 646 },
      { id: 'cp_2_2', x: 2000, y: 646 }
    ],
    switches: [
      // Pressure Plate puzzle!
      { id: 'sw_2_1', x: 1260, y: 450, targetId: 'door_2_1', isPressurePlate: true }
    ],
    doors: [
      { id: 'door_2_1', x: 1660, y: 620, width: 24, height: 80 }
    ],
    chests: [
      { id: 'ch_2_1', x: 480, y: 432, tier: 'rare' },
      { id: 'ch_2_2', x: 1350, y: 432, tier: 'epic' }
    ],
    enemies: [
      { id: 'e2_1', type: 'bat', x: 350, y: 460 },
      { id: 'e2_2', type: 'skeleton', x: 520, y: 660 },
      { id: 'e2_3', type: 'bat', x: 1100, y: 480 },
      { id: 'e2_4', type: 'skeleton', x: 1360, y: 660 },
      { id: 'e2_5', type: 'bat', x: 2200, y: 460 }
    ],
    boss: {
      level: 2,
      x: 2900,
      y: 620
    },
    exitPortal: { x: 3260, y: 630 },
    quests: [
      { id: 'q_switch', title: 'Activate the Crystal Pressure Plate', required: 1, type: 'switch' },
      { id: 'q_enemies', title: 'Defeat 4 Cave Monsters', required: 4, type: 'kills' },
      { id: 'q_boss', title: 'Defeat the Crystal Beast', required: 1, type: 'boss' }
    ]
  },

  3: {
    id: 3,
    name: 'Forgotten Ruins',
    subtitle: 'Ancient Mechanisms & Traps',
    worldWidth: 3600,
    worldHeight: 950,
    theme: 'ruins',
    spawnPoint: { x: 80, y: 600 },
    platforms: [
      { x: 0, y: 700, width: 850, height: 250 },
      { x: 1000, y: 700, width: 1100, height: 250 },
      { x: 2250, y: 700, width: 1350, height: 250 },

      { x: 280, y: 540, width: 180, height: 24 },
      { x: 540, y: 440, width: 200, height: 24 },
      { x: 1120, y: 550, width: 180, height: 24 },
      { x: 1380, y: 430, width: 240, height: 24 },
      { x: 1700, y: 520, width: 180, height: 24 },

      { x: 2400, y: 560, width: 180, height: 24 },
      { x: 2680, y: 460, width: 220, height: 24 }
    ],
    movingPlatforms: [
      { id: 'mp_3_1', x: 860, y: 640, width: 100, height: 20, dx: 130, dy: 0, speed: 70 },
      { id: 'mp_3_2', x: 2110, y: 640, width: 100, height: 20, dx: 130, dy: 0, speed: 70 }
    ],
    hazards: [
      { x: 850, y: 900, width: 150, height: 30, type: 'spikes' },
      { x: 2100, y: 900, width: 150, height: 30, type: 'spikes' }
    ],
    coins: [
      { id: 'c3_1', x: 320, y: 500 },
      { id: 'c3_2', x: 560, y: 400 },
      { id: 'c3_3', x: 620, y: 400 },
      { id: 'c3_4', x: 1420, y: 390 },
      { id: 'c3_5', x: 1480, y: 390 },
      { id: 'c3_6', x: 2720, y: 420 }
    ],
    checkpoints: [
      { id: 'cp_3_1', x: 1050, y: 646 },
      { id: 'cp_3_2', x: 2320, y: 646 }
    ],
    switches: [
      // Dual Lever puzzle: one on lower platform, one on higher
      { id: 'sw_3_1', x: 580, y: 408, targetId: 'door_3_1', isPressurePlate: false },
      { id: 'sw_3_2', x: 1440, y: 398, targetId: 'door_3_1', isPressurePlate: false }
    ],
    doors: [
      { id: 'door_3_1', x: 1980, y: 620, width: 24, height: 80 }
    ],
    chests: [
      { id: 'ch_3_1', x: 660, y: 412, tier: 'epic' },
      { id: 'ch_3_2', x: 1550, y: 402, tier: 'legendary' }
    ],
    enemies: [
      { id: 'e3_1', type: 'skeleton', x: 420, y: 660 },
      { id: 'e3_2', type: 'dark_knight', x: 680, y: 650 },
      { id: 'e3_3', type: 'skeleton', x: 1250, y: 660 },
      { id: 'e3_4', type: 'dark_knight', x: 1600, y: 650 },
      { id: 'e3_5', type: 'bat', x: 2500, y: 480 }
    ],
    boss: {
      level: 3,
      x: 3050,
      y: 608
    },
    exitPortal: { x: 3450, y: 630 },
    quests: [
      { id: 'q_levers', title: 'Unlock the Ruin Gate', required: 1, type: 'switch' },
      { id: 'q_enemies', title: 'Defeat Ancient Defenders', required: 4, type: 'kills' },
      { id: 'q_boss', title: 'Defeat the Ancient Guardian', required: 1, type: 'boss' }
    ]
  },

  4: {
    id: 4,
    name: 'Shadow Mountains',
    subtitle: 'Hazard Chasms & Dark Knights',
    worldWidth: 3600,
    worldHeight: 1000,
    theme: 'mountain',
    spawnPoint: { x: 80, y: 650 },
    platforms: [
      { x: 0, y: 750, width: 750, height: 250 },
      { x: 950, y: 750, width: 1050, height: 250 },
      { x: 2200, y: 750, width: 1400, height: 250 },

      // High Mountain Platforms
      { x: 220, y: 600, width: 160, height: 24 },
      { x: 450, y: 480, width: 180, height: 24 },
      { x: 680, y: 380, width: 160, height: 24 },

      { x: 1100, y: 580, width: 180, height: 24 },
      { x: 1350, y: 450, width: 220, height: 24 },
      { x: 1650, y: 560, width: 180, height: 24 },

      { x: 2350, y: 590, width: 180, height: 24 },
      { x: 2650, y: 460, width: 220, height: 24 }
    ],
    movingPlatforms: [
      { id: 'mp_4_1', x: 760, y: 670, width: 90, height: 20, dx: 180, dy: 0, speed: 75 },
      { id: 'mp_4_2', x: 2010, y: 670, width: 90, height: 20, dx: 0, dy: -180, speed: 70 }
    ],
    hazards: [
      { x: 750, y: 950, width: 200, height: 30, type: 'spikes' },
      { x: 2000, y: 950, width: 200, height: 30, type: 'spikes' }
    ],
    coins: [
      { id: 'c4_1', x: 470, y: 440 },
      { id: 'c4_2', x: 700, y: 340 },
      { id: 'c4_3', x: 1380, y: 410 },
      { id: 'c4_4', x: 1440, y: 410 },
      { id: 'c4_5', x: 2700, y: 420 }
    ],
    checkpoints: [
      { id: 'cp_4_1', x: 1020, y: 696 },
      { id: 'cp_4_2', x: 2280, y: 696 }
    ],
    switches: [
      { id: 'sw_4_1', x: 700, y: 348, targetId: 'door_4_1', isPressurePlate: false }
    ],
    doors: [
      { id: 'door_4_1', x: 1850, y: 670, width: 24, height: 80 }
    ],
    chests: [
      { id: 'ch_4_1', x: 760, y: 352, tier: 'epic' },
      { id: 'ch_4_2', x: 1500, y: 422, tier: 'legendary' }
    ],
    enemies: [
      { id: 'e4_1', type: 'dark_knight', x: 500, y: 700 },
      { id: 'e4_2', type: 'bat', x: 800, y: 520 },
      { id: 'e4_3', type: 'dark_knight', x: 1250, y: 700 },
      { id: 'e4_4', type: 'bat', x: 1550, y: 480 },
      { id: 'e4_5', type: 'dark_knight', x: 2450, y: 700 }
    ],
    boss: {
      level: 4,
      x: 3000,
      y: 666
    },
    exitPortal: { x: 3450, y: 680 },
    quests: [
      { id: 'q_mountain_climb', title: 'Scale the Summit Peaks', required: 1, type: 'switch' },
      { id: 'q_enemies', title: 'Defeat 4 Shadow Troops', required: 4, type: 'kills' },
      { id: 'q_boss', title: 'Defeat the Shadow Warrior', required: 1, type: 'boss' }
    ]
  },

  5: {
    id: 5,
    name: 'Lost Kingdom',
    subtitle: 'The Throne of the Dark King',
    worldWidth: 3800,
    worldHeight: 1000,
    theme: 'castle',
    spawnPoint: { x: 80, y: 650 },
    platforms: [
      { x: 0, y: 750, width: 850, height: 250 },
      { x: 1020, y: 750, width: 1150, height: 250 },
      { x: 2350, y: 750, width: 1450, height: 250 },

      // Royal Castle Platforms
      { x: 260, y: 590, width: 180, height: 24 },
      { x: 520, y: 460, width: 220, height: 24 },
      { x: 1160, y: 570, width: 200, height: 24 },
      { x: 1440, y: 440, width: 260, height: 24 },
      { x: 1780, y: 550, width: 200, height: 24 },

      { x: 2500, y: 570, width: 200, height: 24 },
      { x: 2780, y: 440, width: 240, height: 24 }
    ],
    movingPlatforms: [
      { id: 'mp_5_1', x: 860, y: 670, width: 100, height: 20, dx: 150, dy: 0, speed: 80 },
      { id: 'mp_5_2', x: 2180, y: 670, width: 100, height: 20, dx: 0, dy: -180, speed: 75 }
    ],
    hazards: [
      { x: 850, y: 950, width: 170, height: 30, type: 'spikes' },
      { x: 2170, y: 950, width: 180, height: 30, type: 'spikes' }
    ],
    coins: [
      { id: 'c5_1', x: 300, y: 550 },
      { id: 'c5_2', x: 550, y: 420 },
      { id: 'c5_3', x: 600, y: 420 },
      { id: 'c5_4', x: 1500, y: 400 },
      { id: 'c5_5', x: 1560, y: 400 },
      { id: 'c5_6', x: 2820, y: 400 }
    ],
    checkpoints: [
      { id: 'cp_5_1', x: 1080, y: 696 },
      { id: 'cp_5_2', x: 2420, y: 696 }
    ],
    switches: [
      // Pressure Plate & Lever Grand Co-op Mechanism
      { id: 'sw_5_1', x: 550, y: 450, targetId: 'door_5_1', isPressurePlate: true },
      { id: 'sw_5_2', x: 1520, y: 408, targetId: 'door_5_1', isPressurePlate: false }
    ],
    doors: [
      { id: 'door_5_1', x: 2040, y: 670, width: 24, height: 80 }
    ],
    chests: [
      { id: 'ch_5_1', x: 640, y: 432, tier: 'epic' },
      { id: 'ch_5_2', x: 1620, y: 412, tier: 'legendary' }
    ],
    enemies: [
      { id: 'e5_1', type: 'dark_knight', x: 450, y: 700 },
      { id: 'e5_2', type: 'dark_knight', x: 720, y: 700 },
      { id: 'e5_3', type: 'skeleton', x: 1300, y: 710 },
      { id: 'e5_4', type: 'dark_knight', x: 1650, y: 700 },
      { id: 'e5_5', type: 'bat', x: 2600, y: 500 }
    ],
    boss: {
      level: 5,
      x: 3200,
      y: 654
    },
    exitPortal: { x: 3650, y: 680 },
    quests: [
      { id: 'q_royal_door', title: 'Unlock the Throne Room Gate', required: 1, type: 'switch' },
      { id: 'q_enemies', title: 'Clear the Castle Guards', required: 4, type: 'kills' },
      { id: 'q_boss', title: 'Defeat The Dark King', required: 1, type: 'boss' }
    ]
  }
};
