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
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
scene.add(renderer);

// Light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Helper
const gridHelper = new THREE.GridHelper(400, 60);
scene.add(gridHelper);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.maxDistance = 70;
controls.minDistance = 20;

// animate function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
