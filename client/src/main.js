// Main Entrypoint connecting UI, GameEngine, Audio, and Networking

import { AudioManager } from './game/AudioManager.js';
import { InputManager } from './game/InputManager.js';
import { NetworkManager } from './network/NetworkManager.js';
import { GameEngine } from './game/GameEngine.js';
import { CHARACTER_CLASSES } from './characters/CharacterClasses.js';

window.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Subsystems
  const canvas = document.getElementById('gameCanvas');
  const audioManager = new AudioManager();
  const inputManager = new InputManager();

  let selectedClass = 'warrior';
  let myPlayerName = 'Hero';

  // Instantiate Game Engine and Network Manager
  const networkManager = new NetworkManager(null);
  const gameEngine = new GameEngine(canvas, inputManager, audioManager, networkManager);
  networkManager.gameEngine = gameEngine;

  // Initialize network connection
  networkManager.init();

  // 2. UI Elements References
  const screenMenu = document.getElementById('screen-menu');
  const screenLobby = document.getElementById('screen-lobby');
  const modalJoin = document.getElementById('modal-join');
  const modalHow = document.getElementById('modal-how-to-play');
  const modalSettings = document.getElementById('modal-settings');
  const modalVictory = document.getElementById('modal-victory');
  const modalGameover = document.getElementById('modal-gameover');
  const touchControls = document.getElementById('touch-controls');

  // Show touch controls if on mobile/touch device
  if (inputManager.isTouchDevice || window.innerWidth <= 850) {
    if (touchControls) touchControls.classList.remove('hidden');
  }

  // 3. Audio unlock on first interaction
  const unlockAudio = () => {
    audioManager.ensureContext();
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
  window.addEventListener('touchstart', unlockAudio);

  // 4. Hero Class Selection in Menu
  const classCards = document.querySelectorAll('#menu-class-selector .class-card');
  classCards.forEach((card) => {
    card.addEventListener('click', () => {
      classCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedClass = card.getAttribute('data-class');
      audioManager.playJump();
    });
  });

  // 5. Single Player Start
  document.getElementById('btn-single-player')?.addEventListener('click', () => {
    audioManager.ensureContext();
    screenMenu.classList.remove('active');
    screenMenu.classList.add('hidden');
    gameEngine.startSoloGame(selectedClass, myPlayerName);
  });

  // 6. Create Multiplayer Room
  document.getElementById('btn-create-game')?.addEventListener('click', () => {
    audioManager.ensureContext();
    networkManager.createRoom(myPlayerName, selectedClass, (res) => {
      if (res && res.success) {
        showLobby(res.snapshot, 1);
      } else {
        alert('Failed to create room. Please check server connection.');
      }
    });
  });

  // 7. Join Multiplayer Room
  document.getElementById('btn-join-game')?.addEventListener('click', () => {
    modalJoin.classList.remove('hidden');
  });

  document.getElementById('btn-close-join')?.addEventListener('click', () => {
    modalJoin.classList.add('hidden');
  });

  document.getElementById('btn-cancel-join')?.addEventListener('click', () => {
    modalJoin.classList.add('hidden');
  });

  document.getElementById('btn-confirm-join')?.addEventListener('click', () => {
    const code = document.getElementById('join-code-input').value.trim();
    const nameInput = document.getElementById('join-name-input').value.trim();
    if (nameInput) myPlayerName = nameInput;

    if (!code || code.length < 4) {
      alert('Please enter a valid room code.');
      return;
    }

    networkManager.joinRoom(code, myPlayerName, selectedClass, (res) => {
      if (res && res.success) {
        modalJoin.classList.add('hidden');
        showLobby(res.snapshot, res.playerNum);
      } else {
        alert(res?.reason || 'Could not join room.');
      }
    });
  });

  // 8. Lobby UI Logic
  function showLobby(snapshot, playerNum) {
    screenMenu.classList.add('hidden');
    screenLobby.classList.remove('hidden');

    document.getElementById('lobby-code-display').textContent = snapshot.code;
    updateLobbyRoster(snapshot);

    const startBtn = document.getElementById('btn-lobby-start');
    if (playerNum === 1) {
      startBtn.style.display = 'block';
      startBtn.disabled = snapshot.players.length < 2;
    } else {
      startBtn.style.display = 'none'; // Only host can start
    }
  }

  function updateLobbyRoster(snapshot) {
    const p1 = snapshot.players.find(p => p.playerNum === 1);
    const p2 = snapshot.players.find(p => p.playerNum === 2);

    if (p1) {
      document.getElementById('slot-p1-name').textContent = p1.name;
      document.getElementById('slot-p1-class').textContent = p1.characterClass;
      document.getElementById('slot-p1-avatar').textContent = CHARACTER_CLASSES[p1.characterClass]?.icon || '🛡️';
      const p1Status = document.getElementById('slot-p1-status');
      p1Status.textContent = p1.ready ? '🟢 Ready' : '⏳ Preparing...';
      p1Status.className = `slot-status ${p1.ready ? 'ready' : 'waiting'}`;
    }

    const slotP2 = document.getElementById('slot-p2');
    if (p2) {
      slotP2.classList.remove('waiting');
      document.getElementById('slot-p2-name').textContent = p2.name;
      document.getElementById('slot-p2-class').textContent = p2.characterClass;
      document.getElementById('slot-p2-avatar').textContent = CHARACTER_CLASSES[p2.characterClass]?.icon || '🏹';
      const p2Status = document.getElementById('slot-p2-status');
      p2Status.textContent = p2.ready ? '🟢 Ready' : '⏳ Preparing...';
      p2Status.className = `slot-status ${p2.ready ? 'ready' : 'waiting'}`;

      const startBtn = document.getElementById('btn-lobby-start');
      if (networkManager.isHost) {
        startBtn.disabled = !(p1 && p1.ready && p2.ready);
      }
    } else {
      slotP2.classList.add('waiting');
      document.getElementById('slot-p2-name').textContent = 'Waiting for Player 2...';
      document.getElementById('slot-p2-class').textContent = '---';
      document.getElementById('slot-p2-avatar').textContent = '❓';
      document.getElementById('slot-p2-status').textContent = '⏳ Awaiting Connection';
    }
  }

  // Socket lobby updates
  networkManager.socket.on('room-updated', (snapshot) => {
    updateLobbyRoster(snapshot);
  });

  networkManager.socket.on('game-started', (snapshot) => {
    screenLobby.classList.add('hidden');
    gameEngine.startMultiplayerGame(snapshot, networkManager.playerNum);
  });

  // Lobby Class picker
  const lobbyPickerBtns = document.querySelectorAll('.mini-picker-btn');
  lobbyPickerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lobbyPickerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedClass = btn.getAttribute('data-class');
      networkManager.sendClassSelection(selectedClass);
    });
  });

  // Ready Up
  let isReady = false;
  document.getElementById('btn-lobby-ready')?.addEventListener('click', () => {
    isReady = !isReady;
    document.getElementById('ready-btn-text').textContent = isReady ? 'Cancel Ready ⏳' : 'Ready Up ⚔️';
    networkManager.sendReadyToggle(isReady);
  });

  // Start Game Button (Host)
  document.getElementById('btn-lobby-start')?.addEventListener('click', () => {
    networkManager.sendStartGame();
  });

  // Copy Code
  document.getElementById('btn-copy-code')?.addEventListener('click', () => {
    const code = document.getElementById('lobby-code-display').textContent;
    navigator.clipboard.writeText(code).then(() => {
      gameEngine.showToast(`📋 Code ${code} copied to clipboard!`);
    });
  });

  // Copy Link
  document.getElementById('btn-copy-link')?.addEventListener('click', () => {
    const code = document.getElementById('lobby-code-display').textContent;
    const url = `${window.location.origin}${window.location.pathname}?room=${code}`;
    navigator.clipboard.writeText(url).then(() => {
      gameEngine.showToast(`🔗 Invite link copied to clipboard!`);
    });
  });

  // Exit Lobby
  document.getElementById('btn-lobby-leave')?.addEventListener('click', () => {
    window.location.reload();
  });

  // 9. Modals: How to play
  document.getElementById('btn-how-to-play')?.addEventListener('click', () => {
    modalHow.classList.remove('hidden');
  });
  document.getElementById('btn-close-how')?.addEventListener('click', () => {
    modalHow.classList.add('hidden');
  });
  document.getElementById('btn-dismiss-how')?.addEventListener('click', () => {
    modalHow.classList.add('hidden');
  });

  // 10. Settings & Audio Controls
  const openSettings = () => {
    modalSettings.classList.remove('hidden');
  };
  document.getElementById('btn-settings')?.addEventListener('click', openSettings);
  document.getElementById('btn-pause-toggle')?.addEventListener('click', () => {
    gameEngine.togglePause();
  });

  document.getElementById('btn-close-settings')?.addEventListener('click', () => {
    modalSettings.classList.add('hidden');
  });
  document.getElementById('btn-dismiss-settings')?.addEventListener('click', () => {
    modalSettings.classList.add('hidden');
  });
  document.getElementById('btn-resume-game')?.addEventListener('click', () => {
    gameEngine.togglePause();
  });
  document.getElementById('btn-quit-to-menu')?.addEventListener('click', () => {
    window.location.reload();
  });

  // Audio Sliders
  document.getElementById('slider-master-volume')?.addEventListener('input', (e) => {
    audioManager.setMasterVolume(e.target.value / 100);
  });
  document.getElementById('slider-sfx-volume')?.addEventListener('input', (e) => {
    audioManager.setSfxVolume(e.target.value / 100);
  });
  document.getElementById('slider-music-volume')?.addEventListener('input', (e) => {
    audioManager.setMusicVolume(e.target.value / 100);
  });
  document.getElementById('btn-mute-toggle')?.addEventListener('click', (e) => {
    const muted = audioManager.toggleMute();
    e.target.textContent = muted ? 'Sound: MUTED 🔇' : 'Sound: ON 🔊';
  });

  // 11. Respawn & Victory buttons
  document.getElementById('btn-respawn')?.addEventListener('click', () => {
    gameEngine.respawnPlayer();
  });
  document.getElementById('btn-gameover-menu')?.addEventListener('click', () => {
    window.location.reload();
  });
  document.getElementById('btn-next-level')?.addEventListener('click', () => {
    gameEngine.nextLevel();
  });
  document.getElementById('btn-victory-menu')?.addEventListener('click', () => {
    window.location.reload();
  });

  // 12. Check URL parameters for instant join (e.g. ?room=X7K9P2)
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam) {
    const codeInput = document.getElementById('join-code-input');
    if (codeInput) codeInput.value = roomParam.toUpperCase();
    modalJoin.classList.remove('hidden');
  }
});
