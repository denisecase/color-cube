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

// cube.js (exports init() and animate() to app.js)

import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { handleResize } from "./js/resize.js";

export let renderer, camera, scene;
let cubeGroup;

export const inputs = {
  doAnimateGap: false,
  doAnimateRotation: false,
  rotationDegrees: 0,
};

export const cubeSettings = {
  size: 1,
  gap: 0.4,
  gapChangeDirection: 1,
  maxGap: 1.0,
  minGap: 0.3,
};

export function init() {
  setupScene();
  setupCamera();
  setupRenderer();
  setupCubeGroup();
  createCubes();
  positionCubes();
  alignCubeGroup();
  render();
  handleResize();
}

function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
}

function setupCamera() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, -10, 0);
  camera.lookAt(scene.position);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);
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

function positionCubes() {
  const gap = cubeSettings.gap;
  const cubeSize = cubeSettings.size;
  cubeGroup.children.forEach((cube) => {
    cube.position.set(
      cube.gridPosition.x * (cubeSize + gap),
      cube.gridPosition.y * (cubeSize + gap),
      cube.gridPosition.z * (cubeSize + gap)
    );
  });
}

function alignCubeGroup() {
  // align white cube to the top (north pole)
  let axis = new THREE.Vector3(1, -1, 0).normalize();
  let angle = Math.atan(Math.sqrt(2));
  cubeGroup.rotateOnAxis(axis, angle);
}

export function render() {
  if (inputs.doAnimateGap || inputs.doAnimateRotation) {
    animate();
  } else {
    renderer.render(scene, camera);
  }
}

export function animate() {
  requestAnimationFrame(animate);
  animateGap();
  animateRotation();
  renderer.render(scene, camera);
}

function animateGap() {
  if (inputs.doAnimateGap) {
    // Adjust the gap based on the direction
    cubeSettings.gap += 0.005 * cubeSettings.gapChangeDirection;

    // Check and reverse direction at the limits
    if (cubeSettings.gap > cubeSettings.maxGap) {
      cubeSettings.gap = cubeSettings.maxGap; // Set to max and reverse
      cubeSettings.gapChangeDirection *= -1;
    } else if (cubeSettings.gap < cubeSettings.minGap) {
      cubeSettings.gap = cubeSettings.minGap; // Set to min and reverse
      cubeSettings.gapChangeDirection *= -1;
    }

    positionCubes();
  }
}

export function animateRotation() {
  if (inputs.doAnimateRotation) {
    let rotationSpeed = 0.01; // radians per frame
    cubeGroup.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), rotationSpeed);
  }
}

export function setUserRotation(degrees) {
  inputs.rotationDegrees = degrees; // Update the rotation value
  const radians = (degrees * Math.PI) / 180;
  // Update the cube rotation or any other object here
  cubeGroup.rotation.y = radians; // Rotate around the y-axis to set user rotation
}
