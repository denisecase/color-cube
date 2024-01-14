/* 
  =========================================
  TO GRAB CODE FROM GITHUB (or EDIT in GitHub)
  =========================================
  1. Copy URL: https://github.com/denisecase/color-cube
  2. Open Safari and paste the URL into the address bar.
  3. In the GitHub repository, click on "js/ui_cube.js" to select it.
  4. Use COMMAND A to select all the content in this file, then right-click and copy.
  5. On your machine, select all in your editor, then paste the copied content.
  
  To EDIT in GitHub:
  - Click the pencil icon to "Edit in Place".
  - Commit your changes with the green buttons.
  - Change the commit message as desired.
*/

/* 
  =========================================
  AFTER MAKING CHANGES (git add/commit/push)
  =========================================
  1. Open Terminal: Menu -> Terminal -> New Terminal
  2. Run:
     git add .
     git commit -m "new stuff"
     git push
*/

/**
 * This file contains the functions for setting up the main cube group in the 3D scene.
 */
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { animateOrRender, scene } from './appUI.js';
import { cameraSettings } from './cameraSettings.js';

export let cubeGroup;

export const cubeSettings = {
  size: 1,
  cubeCount: 9,
  colorList: [0, 32, 64, 96, 128, 160, 192, 224, 255],
  initialGap: 0.5,
};

const cubeCountControls = document.querySelectorAll('input[name="cubeCount"]');

// Event listener for RADIO BUTTON CHANGE
function onCubeCountChange() {
  const oldCubeCount = cubeSettings.cubeCount;
  cubeSettings.cubeCount = parseInt(this.value);
  createCubes();
  cameraSettings.initialize();
 /* resizeCanvas(oldCubeCount, cubeSettings.cubeCount);*/
  animateOrRender(); // always
}
/*
function resizeCanvas(oldCubeCount, newCubeCount) {
  const canvas = document.querySelector('canvas');
  const oldHeight = parseInt(canvas.style.height);
  const newHeight = oldHeight * (newCubeCount / oldCubeCount);
  canvas.style.height = `${newHeight}px`;
}*/

// Add an event listener to each radio button
cubeCountControls.forEach((radio) => {
  radio.addEventListener('input', onCubeCountChange);
  if (parseInt(radio.value) === cubeSettings.cubeCount) {
    radio.checked = true;
  }
});

/**
 * Initializes the cube group
 */
export function initCubeGroup() {
  setupCubeGroup();
  createCubes();
  alignCubeGroup(); // Aligns cube group to desired orientation
}

/**
 * Initializes and configures the cube group in the 3D scene.
 */
function setupCubeGroup() {
  cubeGroup = new THREE.Group();
  scene.add(cubeGroup);
}

function getColorListFromCubeCount(count) {
  const fullList = cubeSettings.colorList;
  const removeCount = (fullList.length - count) / 2;
  if (removeCount <= 0) {
    return fullList;
  }
  return fullList.slice(removeCount, fullList.length - removeCount);
}

function createCube(x, y, z, color, geometry) {
  const material = new THREE.MeshBasicMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(
    x * (cubeSettings.size + cubeSettings.initialGap),
    y * (cubeSettings.size + cubeSettings.initialGap),
    z * (cubeSettings.size + cubeSettings.initialGap),
  );
  cubeGroup.add(cube);
}

/**
 * Creates a set of colored cubes and adds them to the cube group.
 */
function createCubes() {
  // Clear existing cubes from the cubeGroup
  while (cubeGroup.children.length > 0) {
    cubeGroup.remove(cubeGroup.children[0]);
  }

  const colorListForNCubes = getColorListFromCubeCount(cubeSettings.cubeCount);
  const blocks = colorListForNCubes;
  const geometry = new THREE.BoxGeometry(
    cubeSettings.size,
    cubeSettings.size,
    cubeSettings.size,
  );

  for (let x = 0; x < blocks.length; x++) {
    for (let y = 0; y < blocks.length; y++) {
      for (let z = 0; z < blocks.length; z++) {
        const r = blocks[x];
        const g = blocks[y];
        const b = blocks[z];
        const color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);
        createCube(x, y, z, color, geometry);
      }
    }
  }
}

/**
 * Aligns the cube group in the 3D scene by rotating it.
 * This function rotates the cube group so that a specific part,
 * like the white cube, is aligned in a particular direction.
 */
function alignCubeGroup() {
  // Define a diagonal rotation axis across the X and Y axes and normalize it.
  let axis = new THREE.Vector3(1, 0, -1).normalize();

  // Calculate the rotation angle to align the cube group as intended.
  let angle = -Math.atan(Math.sqrt(2));

  // Rotate the cube group around the axis by the calculated angle.
  cubeGroup.rotateOnAxis(axis, angle);

  // Define another rotation axis, vertical along the Y-axis.
  let rotationAxis = new THREE.Vector3(0, 1, 0).normalize();

  // Define a fixed rotation angle to apply additional rotation.
  let rotationAngle = 0.27;

  // Apply the additional rotation around the vertical axis.
  cubeGroup.rotateOnWorldAxis(rotationAxis, rotationAngle);
}

// Set initial value based on the currently selected radio button
const selectedRadio = document.querySelector('input[name="cubeCount"]:checked');
if (selectedRadio) {
  cubeSettings.cubeCount = parseInt(selectedRadio.value);
}
