// Handles keyboard, mouse, and mobile touch inputs seamlessly

export class InputManager {
  constructor() {
    this.keys = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      dash: false,
      attack: false,
      skill: false,
      interact: false,
      pause: false
    };

    // Edge-triggered actions (single press per down event)
    this.pressed = {
      jump: false,
      dash: false,
      attack: false,
      skill: false,
      interact: false,
      pause: false
    };

    this.mouse = { x: 0, y: 0, leftDown: false, rightDown: false };
    this.isTouchDevice = false;

    this.initKeyboard();
    this.initMouse();
    this.initTouch();
  }

  initKeyboard() {
    window.addEventListener('keydown', (e) => {
      // Prevent scrolling on Space and Arrow keys during play
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      this.handleKey(e.code, true);
    });

    window.addEventListener('keyup', (e) => {
      this.handleKey(e.code, false);
    });
  }

  handleKey(code, isDown) {
    switch (code) {
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = isDown;
        break;
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = isDown;
        break;
      case 'KeyW':
      case 'ArrowUp':
        this.keys.up = isDown;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.keys.down = isDown;
        break;
      case 'Space':
        if (isDown && !this.keys.jump) this.pressed.jump = true;
        this.keys.jump = isDown;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        if (isDown && !this.keys.dash) this.pressed.dash = true;
        this.keys.dash = isDown;
        break;
      case 'KeyJ':
        if (isDown && !this.keys.attack) this.pressed.attack = true;
        this.keys.attack = isDown;
        break;
      case 'KeyK':
        if (isDown && !this.keys.skill) this.pressed.skill = true;
        this.keys.skill = isDown;
        break;
      case 'KeyE':
        if (isDown && !this.keys.interact) this.pressed.interact = true;
        this.keys.interact = isDown;
        break;
      case 'Escape':
        if (isDown && !this.keys.pause) this.pressed.pause = true;
        this.keys.pause = isDown;
        break;
    }
  }

  initMouse() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
      if (e.button === 0) { // Left click = attack
        this.mouse.leftDown = true;
        this.keys.attack = true;
        this.pressed.attack = true;
      } else if (e.button === 2) { // Right click = skill
        e.preventDefault();
        this.mouse.rightDown = true;
        this.keys.skill = true;
        this.pressed.skill = true;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.mouse.leftDown = false;
        this.keys.attack = false;
      } else if (e.button === 2) {
        this.mouse.rightDown = false;
        this.keys.skill = false;
      }
    });

    window.addEventListener('contextmenu', (e) => {
      if (e.target.id === 'gameCanvas') e.preventDefault();
    });
  }

  initTouch() {
    // Detect mobile touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      this.isTouchDevice = true;
    }

    const attachTouch = (elemId, keyName, isPressedAction = false) => {
      const el = document.getElementById(elemId);
      if (!el) return;

      const triggerDown = (e) => {
        e.preventDefault();
        this.keys[keyName] = true;
        if (isPressedAction) this.pressed[keyName] = true;
      };

      const triggerUp = (e) => {
        e.preventDefault();
        this.keys[keyName] = false;
      };

      el.addEventListener('touchstart', triggerDown, { passive: false });
      el.addEventListener('touchend', triggerUp, { passive: false });
      el.addEventListener('touchcancel', triggerUp, { passive: false });
      el.addEventListener('mousedown', triggerDown);
      el.addEventListener('mouseup', triggerUp);
    };

    attachTouch('btn-touch-left', 'left');
    attachTouch('btn-touch-right', 'right');
    attachTouch('btn-touch-jump', 'jump', true);
    attachTouch('btn-touch-attack', 'attack', true);
    attachTouch('btn-touch-skill', 'skill', true);
    attachTouch('btn-touch-dash', 'dash', true);
    attachTouch('btn-touch-interact', 'interact', true);
  }

  // Consume and clear single-press action flags
  consumeJump() {
    const val = this.pressed.jump;
    this.pressed.jump = false;
    return val;
  }

  consumeDash() {
    const val = this.pressed.dash;
    this.pressed.dash = false;
    return val;
  }

  consumeAttack() {
    const val = this.pressed.attack;
    this.pressed.attack = false;
    return val;
  }

  consumeSkill() {
    const val = this.pressed.skill;
    this.pressed.skill = false;
    return val;
  }

  consumeInteract() {
    const val = this.pressed.interact;
    this.pressed.interact = false;
    return val;
  }

  consumePause() {
    const val = this.pressed.pause;
    this.pressed.pause = false;
    return val;
  }
}
