// ForkliftModel — replaceable 3D asset layer (brief §10).
// Current implementation: original forklift silhouette built from Three.js
// primitives (no copyrighted model). When a licensed .glb/.gltf is obtained,
// replace createPlaceholderForklift() with a GLTFLoader import — the scene,
// camera, interaction and fallback layers stay untouched.
import * as THREE from 'three';

export interface ForkliftHotspot {
  id: string;
  label: string;
  href: string;
  position: THREE.Vector3;
}

export interface ForkliftModelHandle {
  group: THREE.Group;
  hotspots: ForkliftHotspot[];
  update: (t: number, scrollProgress: number) => void;
  dispose: () => void;
}

const material = (color: number, metal = 0.4, rough = 0.55) =>
  new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough });

export function createPlaceholderForklift(baseHref: string): ForkliftModelHandle {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const track = <T extends THREE.Mesh>(m: T) => { disposables.push(m.geometry, m.material as THREE.Material); group.add(m); return m; };

  const bodyMat = material(0x3d434c, 0.5, 0.45);   // steel graphite
  const accentMat = material(0xb45309, 0.3, 0.5);  // safety amber
  const darkMat = material(0x14161a, 0.2, 0.8);

  // Chassis
  track(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 1.3), bodyMat)).position.set(0, 0.65, 0);
  // Counterweight
  const cw = track(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.75, 1.25), bodyMat));
  cw.position.set(-1.45, 0.68, 0);
  // Operator compartment + seat
  track(new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 1.1), darkMat)).position.set(-0.4, 1.2, 0);
  const seat = track(new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.12, 0.5), accentMat));
  seat.position.set(-0.45, 1.5, 0);
  // Steering column
  const column = track(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 8), darkMat));
  column.position.set(-0.05, 1.35, 0.45); column.rotation.x = 0.35;
  // Overhead guard
  const postGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.5, 8);
  for (const [x, z] of [[-0.75, 0.5], [-0.75, -0.5], [0.25, 0.5], [0.25, -0.5]] as const) {
    const p = track(new THREE.Mesh(postGeo, darkMat)); p.position.set(x, 2.15, z);
  }
  const roof = track(new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.08, 1.15), darkMat));
  roof.position.set(-0.25, 2.9, 0);
  // Mast (two channels + cross members)
  for (const z of [0.55, -0.55]) {
    const ch = track(new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 0.12), accentMat));
    ch.position.set(1.25, 1.75, z);
  }
  for (const y of [0.6, 1.7, 2.8]) {
    const cx = track(new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.1), darkMat));
    cx.position.set(1.25, y, 0);
  }
  // Carriage + forks
  const carriage = track(new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.5, 1.1), bodyMat));
  carriage.position.set(1.42, 1.1, 0);
  for (const z of [0.42, -0.42]) {
    const fork = track(new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.07, 0.14), darkMat));
    fork.position.set(2.0, 0.42, z);
  }
  // Wheels (front drive bigger)
  const wheel = (r: number, x: number, z: number) => {
    const w = track(new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.28, 20), darkMat));
    w.rotation.x = Math.PI / 2; w.position.set(x, r, z);
    return w;
  };
  const wheels = [
    wheel(0.42, 0.85, 0.72), wheel(0.42, 0.85, -0.72),
    wheel(0.28, -1.15, 0.68), wheel(0.28, -1.15, -0.68),
  ];

  // Hotspots: components map to real service pages
  const hotspots: ForkliftHotspot[] = [
    { id: 'battery', label: 'Battery · Service & Reconditioning', href: `${baseHref}/services/battery-service/`, position: new THREE.Vector3(-0.4, 1.0, 0.75) },
    { id: 'controller', label: 'Traction Controller Repair', href: `${baseHref}/services/traction-controller-repair/`, position: new THREE.Vector3(-0.05, 1.1, -0.75) },
    { id: 'engine', label: 'Engine Overhauling', href: `${baseHref}/services/engine-overhauling/`, position: new THREE.Vector3(-1.45, 0.7, 0.75) },
    { id: 'mast', label: 'Hydraulic Repair', href: `${baseHref}/services/hydraulic-repair/`, position: new THREE.Vector3(1.25, 2.3, 0.75) },
    { id: 'wheel', label: 'Tyre Service & Replacement', href: `${baseHref}/services/tyre-service/`, position: new THREE.Vector3(0.85, 0.42, 1.1) },
  ];

  const update = (t: number, _scrollProgress: number) => {
    // Gentle idle only; no continuous spin (motion accessibility)
    group.position.y = Math.sin(t * 0.8) * 0.02;
    for (const w of wheels) w.rotation.z -= 0.004;
  };

  const dispose = () => disposables.forEach((d) => d.dispose());

  return { group, hotspots, update, dispose };
}
