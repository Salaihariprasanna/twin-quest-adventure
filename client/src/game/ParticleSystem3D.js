import * as THREE from 'three';

// Real 3D WebGL Particle System (No SVG, Real 3D Geometry)
export class ParticleSystem3D {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];

    // Shared geometries and materials for performance
    this.sparkleGeo = new THREE.OctahedronGeometry(0.2, 0);
    this.sphereGeo = new THREE.SphereGeometry(0.2, 6, 6);
    this.boxGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  }

  emit(options) {
    const {
      x,
      y,
      z = 0,
      count = 8,
      color = 0xf59e0b,
      size = 0.25,
      speed = 6,
      life = 0.6,
      gravity = -12,
      shape = 'sparkle'
    } = options;

    const geo = shape === 'sparkle' ? this.sparkleGeo : (shape === 'box' ? this.boxGeo : this.sphereGeo);

    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 1
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(size);
      this.scene.add(mesh);

      const angle = Math.random() * Math.PI * 2;
      const elev = (Math.random() - 0.5) * Math.PI;
      const spd = (Math.random() * 0.7 + 0.3) * speed;

      this.particles.push({
        mesh,
        mat,
        vx: Math.cos(angle) * Math.cos(elev) * spd,
        vy: (Math.sin(angle) * 0.5 + 0.5) * spd + 2,
        vz: Math.sin(elev) * spd * 0.6,
        life,
        maxLife: life,
        gravity,
        rx: (Math.random() - 0.5) * 10,
        ry: (Math.random() - 0.5) * 10
      });
    }
  }

  createHitSparks(x, y, color = 0xfef08a) {
    this.emit({ x, y, count: 12, color, size: 0.3, speed: 7, life: 0.3, shape: 'sparkle' });
  }

  createDust(x, y) {
    this.emit({ x, y, count: 5, color: 0x94a3b8, size: 0.35, speed: 2.5, life: 0.35, gravity: 0, shape: 'sphere' });
  }

  createCoinSparkle(x, y) {
    this.emit({ x, y, count: 10, color: 0xfacc15, size: 0.3, speed: 5, life: 0.5, shape: 'sparkle' });
  }

  createMagicBurst(x, y, color = 0x60a5fa) {
    this.emit({ x, y, count: 16, color, size: 0.4, speed: 8, life: 0.5, shape: 'sparkle' });
  }

  createCheckpointAura(x, y) {
    this.emit({ x, y, count: 24, color: 0x38bdf8, size: 0.35, speed: 6, life: 0.8, shape: 'sparkle' });
  }

  createDefeatExplosion(x, y) {
    this.emit({ x, y, count: 30, color: 0xf97316, size: 0.5, speed: 10, life: 0.7, shape: 'box' });
    this.emit({ x, y, count: 15, color: 0xfacc15, size: 0.35, speed: 8, life: 0.5, shape: 'sparkle' });
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mat.dispose();
        this.particles.splice(i, 1);
        continue;
      }

      p.vy += p.gravity * dt;
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;

      p.mesh.rotation.x += p.rx * dt;
      p.mesh.rotation.y += p.ry * dt;

      const progress = p.life / p.maxLife;
      p.mat.opacity = progress;
      p.mesh.scale.setScalar(progress);
    }
  }

  clear() {
    for (const p of this.particles) {
      this.scene.remove(p.mesh);
      p.mat.dispose();
    }
    this.particles = [];
  }
}
