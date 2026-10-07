// Class Definitions and Skill Attributes

export const CHARACTER_CLASSES = {
  warrior: {
    name: 'Warrior',
    icon: '🛡️',
    maxHp: 120,
    maxMp: 100,
    speed: 210,
    jumpForce: 430,
    attackDmg: 28,
    attackRange: 48,
    attackCooldown: 0.32,
    skillName: 'Whirlwind Slash',
    skillCost: 35,
    skillCooldown: 1.8,
    color: '#38bdf8',
    secondaryColor: '#1e3a8a',
    capeColor: '#ef4444'
  },
  archer: {
    name: 'Archer',
    icon: '🏹',
    maxHp: 95,
    maxMp: 100,
    speed: 235,
    jumpForce: 440,
    attackDmg: 20,
    attackRange: 280, // Ranged projectile
    attackCooldown: 0.35,
    skillName: 'Piercing Arrow',
    skillCost: 30,
    skillCooldown: 1.5,
    color: '#4ade80',
    secondaryColor: '#14532d',
    capeColor: '#15803d'
  },
  mage: {
    name: 'Mage',
    icon: '🔮',
    maxHp: 85,
    maxMp: 120,
    speed: 205,
    jumpForce: 420,
    attackDmg: 24,
    attackRange: 260,
    attackCooldown: 0.38,
    skillName: 'Arcane Meteor',
    skillCost: 40,
    skillCooldown: 2.2,
    color: '#c084fc',
    secondaryColor: '#581c87',
    capeColor: '#9333ea'
  },
  rogue: {
    name: 'Rogue',
    icon: '🗡️',
    maxHp: 95,
    maxMp: 100,
    speed: 250,
    jumpForce: 450,
    attackDmg: 22,
    attackRange: 42,
    attackCooldown: 0.22,
    skillName: 'Shadow Dash',
    skillCost: 35,
    skillCooldown: 1.2,
    color: '#f43f5e',
    secondaryColor: '#4c0519',
    capeColor: '#334155'
  }
};
