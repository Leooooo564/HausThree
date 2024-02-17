import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x5dbff0);

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
camera.position.set(20, 20, 20);

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
// scene.add(gridHelper);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enablePan = false;
controls.maxDistance = 70;
controls.minDistance = 5;
controls.maxPolarAngle = Math.PI / 2 - 0.1;

let roomObjects = [];
function createRaum(w, h, d, t) {
  roomObjects.forEach((obj) => scene.remove(obj));
  roomObjects = [];
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

  roomObjects.push(wall_cube);
}
// createRaum(21, 11, 32, 0.5);

function createWall(x, y, z, width, height, depth) {
  const wall_geometry = new THREE.BoxGeometry(width, height, depth);
  const wall_material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const wall_cube = new THREE.Mesh(wall_geometry, wall_material);
  wall_cube.position.set(x, y, z);
  scene.add(wall_cube);
  roomObjects.push(wall_cube);
}

// ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(1000, 1000, 10, 10),
  new THREE.MeshBasicMaterial({ color: 0x161838 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// animate function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

let width_value = document.querySelector("#width_value");
let width_input = document.querySelector("#width_input");
let width = Math.round(width_input.value * 100) / 100;

let height_value = document.querySelector("#height_value");
let height_input = document.querySelector("#height_input");
let height = Math.round(height_input.value * 100) / 100;

let depth_value = document.querySelector("#depth_value");
let depth_input = document.querySelector("#depth_input");
let depth = Math.round(depth_input.value * 100) / 100;

let thick_value = document.querySelector("#thick_value");
let thick_input = document.querySelector("#thick_input");
let thick = Math.round(thick_input.value * 100) / 100;

width_value.textContent = width;
width_input.addEventListener("input", (event) => {
  width = Math.round(event.target.value * 100) / 100;
  width_value.textContent = Math.round(event.target.value * 100) / 100;
  createRaum(width, height, depth, thick);
});

height_value.textContent = height;
height_input.addEventListener("input", (event) => {
  height = Math.round(event.target.value * 100) / 100;
  height_value.textContent = Math.round(event.target.value * 100) / 100;
  createRaum(width, height, depth, thick);
});

depth_value.textContent = depth;
depth_input.addEventListener("input", (event) => {
  depth = Math.round(event.target.value * 100) / 100;
  depth_value.textContent = Math.round(event.target.value * 100) / 100;
  createRaum(width, height, depth, thick);
});

thick_value.textContent = thick;
thick_input.addEventListener("input", (event) => {
  thick = Math.round(event.target.value * 100) / 100;
  thick_value.textContent = Math.round(event.target.value * 100) / 100;
  createRaum(width, height, depth, thick);
});

document.addEventListener("DOMContentLoaded", function () {
  createRaum(width, height, depth, thick);
});
