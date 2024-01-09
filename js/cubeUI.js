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
  2. Run these commands:
     git add .
     git commit -m "new stuff"
     git push
*/

/**
 * This file contains the functions for setting up the main cube group in the 3D scene.
 *
 */
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { scene } from './appUI.js';

export let cubeGroup;

/**
 * Initializes the cube group by setting up the group, creating cubes, positioning them,
 * adjusting the cube group's position, and aligning it to the desired orientation.
 *
 * It is exported and used by appUI.js.
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
  // Creating a new Group object.
  // A Group is a collection of objects that can be manipulated together.
  // In this case, cubeGroup will hold all the individual cubes, allowing us to perform
  // operations on the entire set of cubes at once.
  cubeGroup = new THREE.Group();
  scene.add(cubeGroup);
}

export const cubeSettings = {
  size: 1,
  colorList: [0, 32, 64, 96, 128, 160, 192, 224, 255],
  initialGap: 0.2, // The initial gap size between cubes.
};

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
  const blocks = cubeSettings.colorList;
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
 * Aligns the cube group in the 3D scene.
 *
 * This function is responsible for rotating the cube group so that a specific part
 * of it (in this case, the white cube) is aligned towards a particular direction
 * (akin to pointing towards the 'north pole' in a geographical context).
 */
function alignCubeGroup() {
  // Defining the axis of rotation.
  // The axis is a vector represented by three values: (x, y, z).
  // The values here create a diagonal axis across the X and Y axes.
  // 'normalize()' is called to ensure that the axis vector has a unit length of 1.
  // This standardizes the rotation effect regardless of the axis length.
  let axis = new THREE.Vector3(1, 0, -1).normalize();

  // Calculating the angle for rotation.
  // 'Math.atan(Math.sqrt(2))' computes the angle needed to rotate the cube group
  // so that the white cube aligns as intended.
  // This specific calculation is based on the desired orientation of the cube group.
  let angle = -Math.atan(Math.sqrt(2));
 // let angle = 5.3;

  // Rotating the cube group around the specified axis by the calculated angle.
  // This method rotates the entire group of cubes, changing their orientation in the 3D space.
  // The rotation is applied relative to their current position.
  cubeGroup.rotateOnAxis(axis, angle);


  let rotationAxis = new THREE.Vector3(0, 1, 0).normalize();

  // Defining the rotation axis. It is the same as the rotation vector.
 // let axis = rotationVector;

  // Calculating the rotation angle.
  // The user input is assumed to be in degrees, so it's converted to radians.
  // The conversion formula is: radians = (degrees * 2 * Math.PI) / 360.
  let rotationAngle = 0.27;

  // Rotating the cube group around the specified axis by the calculated angle.
  // This applies the user's desired rotation to the entire group of cubes.
  cubeGroup.rotateOnWorldAxis(rotationAxis, rotationAngle);

}
