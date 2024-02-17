import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  500
);
scene.add(camera);

// Create a renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(30, 30, 30);
pointLight1.intensity = 4000;
scene.add(pointLight1);
const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(-30, -30, 30);
pointLight2.intensity = 4000;
scene.add(pointLight2);

// Helper
const gridHelper = new THREE.GridHelper(400, 60);
scene.add(gridHelper);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = false;
controls.maxDistance = 70;
controls.minDistance = 5;

function createRaum(w, h, d, t) {
  // boden
  createWall(0, t / 2, 0, w, t, d);
  // N wand
  createWall(-(w / 2 + t / 2), h / 2 + t, 0, t, h, d);
  // S wand
  createWall(w / 2 + t / 2, h / 2 + t, 0, t, h, d);
  // W wand
  createWall(0, h / 2 + t, -(d / 2 + t / 2), w, h, t);
  // O wand
  createWall(0, h / 2 + t, d / 2 + t / 2, w, h, t);
  // decke
  createWall(0, h + t + t / 2, 0, w, t, d);
}
createRaum(21, 11, 32, 0.5);

function createWall(x, y, z, width, height, depth) {
  const wall_geometry = new THREE.BoxGeometry(width, height, depth);
  const wall_material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const wall_cube = new THREE.Mesh(wall_geometry, wall_material);
  wall_cube.position.set(x, y, z);
  scene.add(wall_cube);
}

// ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500, 10, 10),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

// animate function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
