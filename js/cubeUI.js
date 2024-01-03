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
 * It sets up the cube group, creates and positions the cubes, and aligns the cube group.
 * It lowers the cube group's position in the 3D scene and 
 * aligns it to the desired orientation (with the white north pole on top).
 * 
 * It exports the cube group for use in other files.
 * 
 * It is imported and used in appUI.js.
 * 
 */
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { cubeSettings } from './cubeSettings.js';
import { gapInfo } from './gapSettings.js';
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
  positionCubes();
  lowerCubeGroup(); // Adjusts cube group's position
  alignCubeGroup(); // Aligns cube group to desired orientation
}

/**
 * Initializes and configures the cube group in the 3D scene.
 *
 * This function is responsible for creating a group of cubes and adding it to the scene.
 * A group in Three.js allows you to manage multiple objects as a single entity,
 * making it easier to control their overall behavior and position.
 */
function setupCubeGroup() {
  // Creating a new Group object.
  // A Group is a collection of objects that can be manipulated together.
  // In this case, cubeGroup will hold all the individual cubes, allowing us to perform
  // operations on the entire set of cubes at once.
  cubeGroup = new THREE.Group();

  // Adding the cube group to the scene.
  // This makes the group (and all of its contained objects) a part of the 3D world,
  // allowing it to be rendered and interacted with within the scene.
  scene.add(cubeGroup);
  if (!cubeGroup) {
    console.error('Cube group is not initialized');
    return;
  }
}

/**
 * Creates a set of colored cubes and adds them to the cube group.
 *
 * This function generates a series of 3D cubes, each with a unique color, and adds them to the cube group.
 * The cubes are created using a nested loop structure to vary their color and position.
 */
function createCubes() {
  // The size of each cube, as defined in the cube settings.
  const cubeSize = cubeSettings.size;

  // An array defining the color intensity values to be used for each cube.
  const blocks = cubeSettings.colorList;

  // Nested loops to create a 3D grid of cubes.
  for (let x = 0; x < blocks.length; x++) {
    for (let y = 0; y < blocks.length; y++) {
      for (let z = 0; z < blocks.length; z++) {
        // Define the geometry for each cube (a box in this case).
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const r = blocks[x];
        const g = blocks[y];
        const b = blocks[z];
        const color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);

        // Create a material for the cube with the specified color.
        const material = new THREE.MeshBasicMaterial({ color: color });

        // Create the cube mesh by combining the geometry and material.
        const cube = new THREE.Mesh(geometry, material);

        // Set a custom property for grid position, used later for positioning.
        cube.gridPosition = new THREE.Vector3(x, y, z);

        // Add the cube to the cube group.
        cubeGroup.add(cube);
      }
    }
  }
}

/**
 * Positions the cubes in a grid formation within the cube group.
 *
 * This function arranges all the cubes in the cube group based on their grid positions,
 * ensuring they are spaced out evenly according to the specified gap.
 * 
 * It is exported and used by appUI.js.
 */
export function positionCubes() {
  // The size of each cube, as defined in the cube settings.
  const cubeSize = cubeSettings.size;

  // Iterate over each cube in the cube group and set its position.
  cubeGroup.children.forEach((cube) => {
    // Position each cube based on its grid position and the defined gap.
    cube.position.set(
      cube.gridPosition.x * (cubeSize + gapInfo.currentGap),
      cube.gridPosition.y * (cubeSize + gapInfo.currentGap),
      cube.gridPosition.z * (cubeSize + gapInfo.currentGap),
    );
  });
}
/**
 * Lowers the cube group's position in the 3D scene.
 *
 * This function adjusts the vertical position of the cube group by moving it downwards
 * along the Y-axis. This is typically done before changing the alignment of the cube group
 * to ensure it is positioned correctly in the scene.
 */
function lowerCubeGroup() {
  // Adjusting the position of the cubeGroup in the 3D world space.
  // The position is set using three coordinates: (x, y, z).

  // x: e.g., 0
  // - The X coordinate. A value of 0 means the cube group's position along the X-axis
  //   remains unchanged (at the origin).

  // y: e.g., -2
  // - The Y coordinate. Setting this to -2 moves the cube group 2 units downwards along
  //   the Y-axis. Negative values in the Y-axis represent a downward movement.

  // z: e.g., 0
  // - The Z coordinate. A value of 0 means the cube group's position along the Z-axis
  //   remains unchanged (at the origin).

  // By setting the position to (0, -2, 0), the cube group is effectively moved straight down
  // by 2 units without altering its position on the X and Z axes.
  cubeGroup.position.set(
    cubeSettings.lowerCubeGroupXCoordinate,
    cubeSettings.lowerCubeGroupYCoordinate,
    cubeSettings.lowerCubeGroupZCoordinate,
  );
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
  let axis = new THREE.Vector3(1, -1, 0).normalize();

  // Calculating the angle for rotation.
  // 'Math.atan(Math.sqrt(2))' computes the angle needed to rotate the cube group
  // so that the white cube aligns as intended.
  // This specific calculation is based on the desired orientation of the cube group.
  let angle = Math.atan(Math.sqrt(2));

  // Rotating the cube group around the specified axis by the calculated angle.
  // This method rotates the entire group of cubes, changing their orientation in the 3D space.
  // The rotation is applied relative to their current position.
  cubeGroup.rotateOnAxis(axis, angle);
}
