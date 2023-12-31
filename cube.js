// After Making Changes
// Copy this URL to clipboard: https://github.com/denisecase/color-cube
// Open Safari.
// Put cursor in very top address location.
// Paste in the URL.
// In the GitHub repo, click on cube.js to select it for editing.
// From your machine, use COMMAND A to select all of this file.
// Right-click "Copy".
// Back in GitHub cube.js, click pencil to "Edit in Place"
// In GitHub cube.js, use COMMAND A to select all the file contents.
// Right-click "Paste".
// Click green buttons to commit. Change message as desired.

// Cube module
// cube.js
// This module handles all cube-related logic, including cube creation, animation, and gap settings.

// app.js - start the app (called from index.html)

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { init } from './cube.js';
import { animate } from './js/ui.js';
import './js/resize.js';

// Start the web app

init();
animate();
import { handleResize } from './js/resize.js';
import { animateOrRender, cubeSettings } from './js/ui.js';

export let renderer, camera, scene, cubeGroup;

export function init() {
  setupScene();
  setupCamera();
  setupRenderer();
  setupCubeGroup();
  createCubes();
  positionCubes();
  alignCubeGroup();
  animateOrRender();
  handleResize();
}

export function getNew3DVector(x, y, z) {
  return new THREE.Vector3(x, y, z);
}

function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
}

function setupCamera() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, -10, 0);
  camera.lookAt(scene.position);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas-container').appendChild(renderer.domElement);
}

function setupCubeGroup() {
  cubeGroup = new THREE.Group();
  scene.add(cubeGroup);
}

function createCubes() {
  const cubeSize = cubeSettings.size;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const r = Math.floor((x + 1) * 120);
        const g = Math.floor((y + 1) * 120);
        const b = Math.floor((z + 1) * 120);
        const color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);
        cube.gridPosition = new THREE.Vector3(x, y, z);
        cubeGroup.add(cube);
      }
    }
  }
}

export function positionCubes() {
  const gap = cubeSettings.gap;
  const cubeSize = cubeSettings.size;
  cubeGroup.children.forEach((cube) => {
    cube.position.set(
      cube.gridPosition.x * (cubeSize + gap),
      cube.gridPosition.y * (cubeSize + gap),
      cube.gridPosition.z * (cubeSize + gap),
    );
  });
}

function alignCubeGroup() {
  // align white cube to the top (north pole)
  let axis = new THREE.Vector3(1, -1, 0).normalize();
  let angle = Math.atan(Math.sqrt(2));
  cubeGroup.rotateOnAxis(axis, angle);
}
