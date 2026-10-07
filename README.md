# ⚔️ Twin Quest: Lost Kingdom

A lightweight, beautiful, browser-based **2D Platform Adventure Game** supporting both **Single Player** and **2-Player Online Cooperative Multiplayer**.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Salaihariprasanna/twin-quest-adventure)

🔗 **GitHub Repository**: [https://github.com/Salaihariprasanna/twin-quest-adventure](https://github.com/Salaihariprasanna/twin-quest-adventure)  
🌐 **Live Game URL (Render)**: [https://twin-quest-adventure.onrender.com](https://twin-quest-adventure.onrender.com)

> **"Open website → Create Game / Join Game → Enter simple private code → Start playing"**  
> No installation, no downloads, and no complicated account creation required!

---

## 🌟 Key Features

- **🎮 Dual Game Modes**:
  - **Single Player**: Solo adventure with automatically adapted cooperative mechanics.
  - **2-Player Online Co-op**: Instant private room codes (e.g. `X7K9P2`) with 1-click shareable links.
- **🛡️ 4 Distinct Hero Classes**:
  - **Warrior** (`🛡️`): Heavy melee blade slash, high vitality, whirlwind cleave skill.
  - **Archer** (`🏹`): Rapid long-range arrows, agile dash, piercing volley skill.
  - **Mage** (`🔮`): Arcane spark bolts, high mana, exploding arcane meteor skill.
  - **Rogue** (`🗡️`): Dual dagger slashes, high speed, invulnerable shadow dash skill.
- **🗺️ 5 Complete Adventure Worlds**:
  - **Level 1 — Whispering Forest**: Tutorial grounds, slimes, goblins, and the **Forest Guardian** boss.
  - **Level 2 — Crystal Cave**: Crumbling platforms, moving lifts, crystal bats, and the **Crystal Beast** boss.
  - **Level 3 — Forgotten Ruins**: Ancient mechanisms, dual-lever doors, bone skeletons, and the **Ancient Guardian** boss.
  - **Level 4 — Shadow Mountains**: Vertical climbs, moving hazards, dark knights, and the **Shadow Warrior** boss.
  - **Level 5 — Lost Kingdom**: The royal throne room, grand cooperative puzzles, and **The Dark King** final boss.
- **🤝 Cooperative Mechanics**:
  - **Pressure Plates & Gates**: One player holds a plate while their partner crosses the barrier.
  - **Dual-Lever Doors**: Coordinate pulling ancient levers to unlock fortified doors.
  - **Boss Tactics**: Coordinate aggro, dodge telegraphed attack warnings, and strike weak points.
- **✨ Checkpoint System**: Glowing crystal checkpoints save progress; players respawn without restarting levels.
- **📜 Quest & Treasure System**:
  - Dynamic quest tracking (coins collected, monsters slain, boss targets).
  - 4 Tiers of Chests: Common, Rare, Epic, and Legendary artifacts.
  - Floating damage numbers, coin gains, and animated rewards (`+50 COINS`, `+100 XP`, `TREASURE FOUND!`).
- **🎵 Zero-Dependency Audio**:
  - 100% self-contained Web Audio API synthesizer for all SFX and dynamic ambient music per level.
  - No broken audio files or CORS issues.
- **📱 Fully Responsive & Touch-Ready**:
  - Full keyboard and mouse support for desktop.
  - On-screen touch D-Pad and large virtual action buttons for mobile & tablets.
- **🌐 Network Reliability**:
  - Real-time Socket.IO synchronization with client-side interpolation.
  - Automatic reconnection grace period (15s buffer preserves game state during network hiccups).
  - Clear connection indicators (🟢 Connected, 🟡 Reconnecting..., 🔴 Offline).

---

## 📁 Project Structure

```text
twin-quest/
├── client/                     # Frontend client (Vite + HTML5 Canvas Engine)
│   ├── index.html              # UI overlays, HUD, modals, touch controls, and canvas
│   ├── package.json            # Client dependencies (Vite, socket.io-client)
│   ├── vite.config.js          # Vite config with WebSocket dev proxy
│   └── src/
│       ├── main.js             # UI wiring, lobby handling, and entrypoint
│       ├── style.css           # Fantasy RPG glassmorphic CSS styling
│       ├── characters/
│       │   ├── CharacterClasses.js # Hero stats, skills, and attributes
│       │   └── Player.js       # Player state machine, physics, and cartoon renderer
│       ├── enemies/
│       │   ├── Enemy.js        # Slime, Bat, Goblin, Skeleton, Dark Knight AI
│       │   └── Boss.js         # Multi-phase bosses with telegraphed attacks
│       ├── game/
│       │   ├── AudioManager.js # Procedural Web Audio synthesizer (SFX & music)
│       │   ├── Camera.js       # Smooth lerping camera with co-op tracking & screen shake
│       │   ├── FloatingText.js # Floating damage numbers and loot labels
│       │   ├── GameEngine.js   # Main physics, combat, collision, and rendering loop
│       │   ├── InputManager.js # Keyboard, mouse, and mobile touch input handler
│       │   └── ParticleSystem.js # Dust, hit sparks, magic bursts, and explosion particles
│       ├── maps/
│       │   ├── InteractiveObjects.js # Checkpoints, switches, doors, chests, moving platforms
│       │   ├── LevelData.js    # Data for all 5 adventure worlds
│       │   └── TileRenderer.js # Parallax background, platforms, hazards, and coin rendering
│       ├── network/
│       │   └── NetworkManager.js # Socket.IO client, sync throttling, and reconnect handler
│       ├── quests/
│       │   └── QuestManager.js # Quest definitions, progress tracking, and HUD
│       └── ui/
│           └── HUD.js          # Health bars, boss meters, and notification toasts
├── server/                     # Backend multiplayer server (Node.js + Express + Socket.IO)
│   ├── rooms/
│   │   ├── GameRoom.js         # Room state, player slots, and level replication
│   │   └── RoomManager.js      # Room codes, lifecycle, and inactivity cleanup
│   └── server.js               # Express & Socket.IO server, static file host
├── dev.js                      # Dual-runner launching server and client together
├── test-multiplayer.js         # Automated end-to-end multiplayer verification script
├── package.json                # Root build & start scripts
└── README.md                   # Complete documentation
```

---

## 🕹️ Controls

### Desktop Controls

| Action | Primary Key | Secondary / Mouse |
| :--- | :--- | :--- |
| **Move Left / Right** | <kbd>A</kbd> / <kbd>D</kbd> | <kbd>←</kbd> / <kbd>→</kbd> |
| **Jump** | <kbd>Space</kbd> | <kbd>W</kbd> / <kbd>↑</kbd> |
| **Double Jump** | <kbd>Space</kbd> (in mid-air) | <kbd>W</kbd> (in mid-air) |
| **Dash / Evade** | <kbd>Shift</kbd> | — |
| **Primary Attack** | <kbd>J</kbd> | Left Click |
| **Special Class Skill** | <kbd>K</kbd> | Right Click |
| **Interact** (Levers, Chests, Portals) | <kbd>E</kbd> | — |
| **Pause / Settings** | <kbd>ESC</kbd> | Pause Button (⚙️) |

### Mobile Touch Controls

On smartphones and tablets, an on-screen responsive overlay appears automatically:
- **Left Side**: Virtual D-Pad buttons (`◀`, `▶`).
- **Right Side**: Action buttons for **Jump** (`▲`), **Attack** (`⚔️`), **Skill** (`✨`), **Dash** (`⚡`), and **Interact** (`E`).

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 1. Installation

Run this single command from the project root:

```bash
npm run install:all
```

*(Or run `npm install` in root, followed by `cd client && npm install`)*

### 2. Start Development Mode

To start both the multiplayer backend and frontend simultaneously:

```bash
npm run dev
```

- **Frontend client**: [http://localhost:5173](http://localhost:5173)
- **Multiplayer server**: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing Multiplayer Locally

You can easily test the 2-player cooperative multiplayer on a single computer:

### Manual Testing (2 Browser Windows)
1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Click **Create Room**. A 6-character room code will appear (e.g. `X7K9P2`).
3. Click **Copy Link** (or copy the code).
4. Open a **new Incognito window** or a second browser tab and paste the link (or click **Join Room** and enter the code).
5. Both players select their hero class and click **Ready Up**.
6. Player 1 (the host) clicks **START ADVENTURE 🚀**.
7. Both heroes will spawn together in real time!

### Automated Integration Test
We also include an automated multiplayer integration suite that tests room creation, join flow, ready toggles, position sync, switch triggers, checkpoints, and disconnect/reconnect handling:

```bash
# Make sure the server is running (e.g., node server/server.js in another terminal)
node test-multiplayer.js
```

---

## 📦 Production Build & Deployment

The application is structured for 1-click cloud deployment on platforms like **Render**, **Railway**, **Fly.io**, or **Heroku**.

### 1. Build the Frontend

```bash
npm run build
```

This compiles the Vite client into optimized static assets in `client/dist`.

### 2. Start the Production Server

```bash
npm start
```

When started with a production build, the Express server will automatically serve the static assets from `client/dist` and handle WebSockets on the exact same port (`PORT` environment variable).

### Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `PORT` | The HTTP & WebSocket port for the server | `3000` |
| `NODE_ENV` | Environment mode (`production` or `development`) | `development` |

---

## 🛡️ Network Resilience & Error Handling

- **Graceful Disconnection**: If a player's internet slows down or drops, an in-game banner indicates that the game is waiting for reconnection without instantly kicking the player.
- **Slot Preservation**: The disconnected player's slot, inventory, and checkpoint are preserved.
- **Solo Fallback**: If a partner disconnects permanently, the remaining player can continue progressing through the adventure alone.
- **Friendly Error Messages**: Technical network errors are converted into human-readable prompts with Retry and Return to Menu options.

---

## 📜 License

MIT License. Free for learning, modification, and building upon!
