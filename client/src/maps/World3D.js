import * as THREE from 'three';

// Real 3D Environment Builder with 3D Terrain, Scenery, Lighting, and Fog
export class World3D {
  constructor(scene) {
    this.scene = scene;
    this.platformMeshes = [];
    this.hazardMeshes = [];
    this.sceneryMeshes = [];
    this.lights = [];
  }

  setupLighting(theme) {
    // Clear old lights
    for (const l of this.lights) this.scene.remove(l);
    this.lights = [];

    // Ambient Hemisphere Light
    let skyColor = 0xdbeafe;
    let groundColor = 0x1e293b;
    let sunColor = 0xfef08a;
    let fogColor = 0x0f172a;
    let fogDensity = 0.012;

    if (theme === 'forest') {
      skyColor = 0x86efac;
      groundColor = 0x064e3b;
      sunColor = 0xfef08a;
      fogColor = 0x062d27;
      fogDensity = 0.008;
    } else if (theme === 'cave') {
      skyColor = 0x38bdf8;
      groundColor = 0x0284c7;
      sunColor = 0x67e8f9;
      fogColor = 0x030712;
      fogDensity = 0.015;
    } else if (theme === 'ruins') {
      skyColor = 0xfde047;
      groundColor = 0x78350f;
      sunColor = 0xfacc15;
      fogColor = 0x1c1917;
      fogDensity = 0.01;
    } else if (theme === 'mountain') {
      skyColor = 0xa855f7;
      groundColor = 0x311042;
      sunColor = 0xf43f5e;
      fogColor = 0x090514;
      fogDensity = 0.01;
    } else {
      // Castle
      skyColor = 0xc084fc;
      groundColor = 0x18181b;
      sunColor = 0xfef08a;
      fogColor = 0x09090b;
      fogDensity = 0.009;
    }

    const hemiLight = new THREE.HemisphereLight(skyColor, groundColor, 0.7);
    this.scene.add(hemiLight);
    this.lights.push(hemiLight);

    // Directional Sunlight with Shadows
    const dirLight = new THREE.DirectionalLight(sunColor, 1.2);
    dirLight.position.set(40, 60, 40);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    this.scene.add(dirLight);
    this.lights.push(dirLight);

    // Dynamic Atmospheric 3D Fog
    this.scene.fog = new THREE.FogExp2(fogColor, fogDensity);
  }

  buildPlatforms(platforms, theme) {
    for (const p of platforms) {
      const w = p.width / 20;
      const h = p.height / 20;
      const x = (p.x / 20) + (w / 2);
      const y = ((1000 - p.y) / 20) - (h / 2);

      // 3D Stone Block with Depth
      const blockGeo = new THREE.BoxGeometry(w, h, 3.2);

      let baseColor = 0x1e293b;
      let topTrimColor = 0x22c55e;
      if (theme === 'cave') { baseColor = 0x0f172a; topTrimColor = 0x0284c7; }
      else if (theme === 'ruins') { baseColor = 0x292524; topTrimColor = 0xb45309; }
      else if (theme === 'mountain') { baseColor = 0x1e1b4b; topTrimColor = 0x64748b; }
      else if (theme === 'castle') { baseColor = 0x18181b; topTrimColor = 0x71717a; }

      const mat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.75,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(blockGeo, mat);
      mesh.position.set(x, y, 0);
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      this.platformMeshes.push(mesh);

      // Lush Top Trim (Grass / Crystal / Marble rim)
      const trimGeo = new THREE.BoxGeometry(w, 0.25, 3.3);
      const trimMat = new THREE.MeshStandardMaterial({
        color: topTrimColor,
        roughness: 0.5
      });
      const trim = new THREE.Mesh(trimGeo, trimMat);
      trim.position.set(x, y + h / 2 - 0.12, 0);
      this.scene.add(trim);
      this.platformMeshes.push(trim);
    }
  }

  buildHazards(hazards) {
    for (const h of hazards) {
      const w = h.width / 20;
      const hgt = h.height / 20;
      const x = (h.x / 20);
      const y = ((1000 - h.y) / 20);

      const count = Math.max(2, Math.floor(w / 0.8));
      const spikeGeo = new THREE.ConeGeometry(0.35, hgt * 2, 6);
      const spikeMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.8,
        roughness: 0.3
      });

      for (let i = 0; i < count; i++) {
        const spike = new THREE.Mesh(spikeGeo, spikeMat);
        spike.position.set(x + (i + 0.5) * (w / count), y + hgt, 0);
        this.scene.add(spike);
        this.hazardMeshes.push(spike);
      }
    }
  }

  buildScenery(worldWidth, theme) {
    const maxX = worldWidth / 20;

    if (theme === 'forest') {
      // 3D Pine Trees in Background
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 4, 8);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
      const foliageGeo = new THREE.ConeGeometry(2.2, 5, 8);
      const foliageMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });

      for (let x = 0; x < maxX; x += 12) {
        const treeGroup = new THREE.Group();
        const trunk = new THREE.Mesh(trunkGeo, trunkMat);
        trunk.position.y = 2;
        treeGroup.add(trunk);

        const f1 = new THREE.Mesh(foliageGeo, foliageMat);
        f1.position.y = 5;
        treeGroup.add(f1);

        const f2 = new THREE.Mesh(foliageGeo, foliageMat);
        f2.position.y = 6.8;
        f2.scale.setScalar(0.75);
        treeGroup.add(f2);

        treeGroup.position.set(x + (Math.random() - 0.5) * 4, 15, -6 - Math.random() * 8);
        this.scene.add(treeGroup);
        this.sceneryMeshes.push(treeGroup);
      }
    } else if (theme === 'cave') {
      // 3D Glowing Crystals in Background
      const crystalGeo = new THREE.ConeGeometry(0.8, 4, 5);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.7,
        roughness: 0.2
      });

      for (let x = 0; x < maxX; x += 15) {
        const c1 = new THREE.Mesh(crystalGeo, crystalMat);
        c1.position.set(x, 12, -4);
        c1.rotation.z = Math.random() * 0.4;
        this.scene.add(c1);
        this.sceneryMeshes.push(c1);
      }
    } else if (theme === 'ruins') {
      // 3D Ancient Ruin Pillars
      const pillarGeo = new THREE.CylinderGeometry(0.8, 0.8, 12, 10);
      const pillarMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 });

      for (let x = 0; x < maxX; x += 16) {
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(x, 18, -5);
        this.scene.add(pillar);
        this.sceneryMeshes.push(pillar);
      }
    } else {
      // 3D Castle Towers
      const towerGeo = new THREE.BoxGeometry(3, 16, 3);
      const towerMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.8 });

      for (let x = 0; x < maxX; x += 18) {
        const tower = new THREE.Mesh(towerGeo, towerMat);
        tower.position.set(x, 18, -6);
        this.scene.add(tower);
        this.sceneryMeshes.push(tower);
      }
    }
  }

  clear() {
    for (const m of this.platformMeshes) this.scene.remove(m);
    for (const m of this.hazardMeshes) this.scene.remove(m);
    for (const m of this.sceneryMeshes) this.scene.remove(m);
    for (const l of this.lights) this.scene.remove(l);
    this.platformMeshes = [];
    this.hazardMeshes = [];
    this.sceneryMeshes = [];
    this.lights = [];
  }
}
