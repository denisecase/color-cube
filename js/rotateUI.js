/**
 * This file contains the functions and event listeners for the rotation controls.
 */
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { cubeGroup } from './cubeUI.js';
import { animateOrRender, camera, renderer, scene } from './appUI.js';

// Get references to HTML elements for rotation control.
const rotationCheckbox = document.getElementById('rotationCheckbox');
const rotationButtonLeft = document.getElementById('rotationButtonLeft');
const rotationButtonRight = document.getElementById('rotationButtonRight');

export const rotateSettings = {
  doAnimateRotation: false,
  initialRotation: 0,
};

// Event listener for CHECKBOX CHANGE
rotationCheckbox.addEventListener('change', (event) => {
  // Toggles the rotation animation on or off based on the checkbox's state.
  // If checked, start the rotation animation; if unchecked, stop it.
  rotateSettings.doAnimateRotation = event.target.checked;
  animateOrRender(); // always
});

// Event listener for SLIDER BUTTON LEFT
rotationButtonLeft.addEventListener('click', (event) => {
  rotateSettings.doAnimateRotation = false;
  rotationCheckbox.checked = rotateSettings.doAnimateRotation;
  const rotation = -30;
  setUserRotation(rotation);
  animateOrRender();
});

// Event listener for SLIDER BUTTON RIGHT
rotationButtonRight.addEventListener('click', (event) => {
  rotateSettings.doAnimateRotation = false;
  rotationCheckbox.checked = rotateSettings.doAnimateRotation;
  const rotation = 30;
  setUserRotation(rotation);
  animateOrRender();
});

// Toggle animation (after CHANGE)
export function toggleRotationAnimation(doAnimate) {
  rotateSettings.doAnimateRotation = doAnimate;
  animateOrRender(); // always
}

/**
 * This function is responsible for continuously animating the rotation of the cube group.
 * It's called in a loop to create a dynamic, rotating visual effect in the 3D scene.
 */
export function animateRotation() {
  if (rotateSettings.doAnimateRotation) {
    const rotationVector = new THREE.Vector3(0, 1, 0);
    // The angle for each frame's rotation, in radians.
    // A small value like 0.004 ensures a smooth and continuous rotation effect.
    cubeGroup.rotateOnWorldAxis(rotationVector, 0.004);
  }
}

/**
 * Sets the rotation of the cube group based on user input.
 * This function is typically called when the user adjusts the rotation slider.
 *
 * @param {number} inputRotation - The rotation value inputted by the user.
 */
export function setUserRotation(inputRotation) {
  // Update the global rotation value with the input from the user.
  rotateSettings.initialRotation = inputRotation;

  // Creating a rotation vector, which defines the axis of rotation.
  // Here, the rotation is set to occur around the Z-axis (0, 0, 1).
  //const rotationVector = getNew3DVector(0, 1, 0);
  let axis = new THREE.Vector3(0, 1, 0).normalize();

  // Defining the rotation axis. It is the same as the rotation vector.
  // let axis = rotationVector;

  // Calculating the rotation angle.
  // The user input is assumed to be in degrees, so it's converted to radians.
  // The conversion formula is: radians = (degrees * 2 * Math.PI) / 360.
  let angle = ((2 * Math.PI) / 360) * rotateSettings.initialRotation;

  // Rotating the cube group around the specified axis by the calculated angle.
  // This applies the user's desired rotation to the entire group of cubes.
  cubeGroup.rotateOnWorldAxis(axis, angle);

  // Update the scene to reflect the new rotation.
  renderer.render(scene, camera);
}

// Set initial state of rotation controls from input defaults.
rotationCheckbox.checked = rotateSettings.doAnimateRotation;
