// ForkliftScene — canvas orchestration: camera, lights, scroll link, hotspot
// projection to DOM labels. Three.js is imported here only (dynamic import at
// the island level keeps it off every other page — brief §36).
import * as THREE from 'three';
import { createPlaceholderForklift, type ForkliftHotspot } from './ForkliftModel';

export interface SceneOptions {
  canvas: HTMLCanvasElement;
  labelLayer: HTMLElement;
  baseHref: string;
}

export function mountForkliftScene({ canvas, labelLayer, baseHref }: SceneOptions): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

  // Lighting: neutral studio-ish, works in light and dark UI
  scene.add(new THREE.HemisphereLight(0xffffff, 0x3a3f47, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 6, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0xf0a437, 0.5);
  rim.position.set(-5, 3, -4); scene.add(rim);

  // Ground grid — technical drawing feel
  const grid = new THREE.GridHelper(24, 24, 0x5a6068, 0x2a2e35);
  grid.position.y = 0; scene.add(grid);

  const model = createPlaceholderForklift(baseHref);
  model.group.position.set(-0.4, 0, 0);
  scene.add(model.group);

  // Hotspot DOM anchors (real links — accessible, SEO-safe)
  const labels: Array<{ hotspot: ForkliftHotspot; el: HTMLAnchorElement }> = model.hotspots.map((h) => {
    const el = document.createElement('a');
    el.href = h.href;
    el.className = 'forklift-hotspot';
    el.textContent = h.label;
    el.setAttribute('aria-label', h.label);
    labelLayer.appendChild(el);
    return { hotspot: h, el };
  });

  // Scroll-linked camera orbit: progress 0..1 through the section
  let progress = 0;
  const onScroll = () => {
    const rect = canvas.getBoundingClientRect();
    const vh = window.innerHeight;
    progress = THREE.MathUtils.clamp((vh - rect.top) / (vh + rect.height), 0, 1);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const tmp = new THREE.Vector3();
  const resize = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', resize);
  resize();

  let raf = 0;
  const clock = new THREE.Clock();
  const animate = () => {
    raf = requestAnimationFrame(animate);
    model.update(clock.getElapsedTime(), progress);

    // Camera arcs from front-quarter to side-quarter as user scrolls
    const angle = THREE.MathUtils.lerp(0.5, Math.PI / 2 + 0.35, progress);
    const radius = THREE.MathUtils.lerp(8.5, 7, progress);
    const height = THREE.MathUtils.lerp(3.4, 2.0, progress);
    camera.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
    camera.lookAt(0.3, 1.2, 0);

    // Project hotspots to screen space
    const w = canvas.clientWidth, h = canvas.clientHeight;
    for (const { hotspot, el } of labels) {
      tmp.copy(hotspot.position).add(model.group.position).project(camera);
      const visible = tmp.z < 1;
      el.style.transform = `translate(-50%, -50%) translate(${((tmp.x + 1) / 2) * w}px, ${((1 - tmp.y) / 2) * h}px)`;
      el.classList.toggle('is-behind', !visible);
    }

    renderer.render(scene, camera);
  };
  animate();

  // Cleanup
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', resize);
    labels.forEach(({ el }) => el.remove());
    model.dispose();
    grid.dispose();
    renderer.dispose();
  };
}
