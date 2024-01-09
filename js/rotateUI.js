/**
 * This file contains the functions and event listeners for the rotation controls.
 * It defines the rotation animation and the rotation slider.
 * It also defines the functions for setting the rotation of the cube group.

 */
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { cubeGroup } from './cubeUI.js';
import {
  animateOrRender,
  camera,
  renderer,
  scene,
} from './appUI.js';

// Get references to HTML elements for rotation control.
const rotationCheckbox = document.getElementById('rotationCheckbox');
const rotationSlider = document.getElementById('rotationSlider');
const setRotationSlider = document.getElementById('rotationSlider');

export const rotateSettings = {
  doAnimateRotation: false, // Flag to enable/disable rotation animation.
  initialRotation: 0, // The initial rotation angle of the cube group.
};


// Event listener for CHECKBOX CHANGE
rotationCheckbox.addEventListener('change', (event) => {
  // Toggles the rotation animation on or off based on the checkbox's state.
  // If checked, start the rotation animation; if unchecked, stop it.
  rotateSettings.doAnimateRotation = event.target.checked;
  animateOrRender(); // always
});

// Event listener for SLIDER INPUT CHANGE
rotationSlider.addEventListener('input', () => {
  // Updates the rotation value based on the user's input on the slider.
  // The slider value represents the desired rotation angle in degrees.
  const rotation = parseInt(rotationSlider.value);

  // Update the text content of the 'rotation' element to reflect the new rotation value.
  // This is typically a display element in the UI showing the current rotation value.
  document.getElementById('rotation').textContent = rotation;

  // Note: The following line is commented out. If active, it would set the user's rotation
  // immediately as the slider is moved, which could be used instead of the click event on setRotationSlider.
  // setUserRotation(rotation);

  animateOrRender(); // always
});

// Event listener for SLIDER CLICK
setRotationSlider.addEventListener('click', (event) => {
  // When the set rotation slider is clicked, stop any ongoing rotation animation.
  rotateSettings.doAnimateRotation = false;
  // Update the checkbox to reflect the stopped animation.
  rotationCheckbox.checked = rotateSettings.doAnimateRotation;

  // Check if the slider's value hasn't changed. Though this condition always evaluates to true,
  // it seems intended to check for a change in value. Might require a fix or update.
  if (rotationSlider.value == rotationSlider.value) {
    // Parse the slider's value as an integer for rotation.
    const rotation = parseInt(rotationSlider.value);

    // Update the rotation display text to reflect the new value.
    document.getElementById('rotation').textContent = rotation;

    // Apply this new rotation value to the cube group.
    setUserRotation(rotation);
  }

  // Always call animateOrRender at the end to update the scene.
  // This ensures the scene is rendered with the new settings.
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
    const rotationVector = new THREE.Vector3(0, 0, 1);
    // The angle for each frame's rotation, in radians.
    // A small value like 0.004 ensures a smooth and continuous rotation effect.
    cubeGroup.rotateOnWorldAxis(rotationVector, 0.004);
  }
}

/**
 * Sets the rotation of the cube group based on user input, rotating around the group's center.
 *
 * @param {number} inputRotation - The rotation value inputted by the user, in degrees.
 */
export function setUserRotation(inputRotation) {
  // First, calculate the center of the cube group.
  let center = new THREE.Vector3();
  cubeGroup.children.forEach(cube => {
    center.add(cube.position);
  });
  center.divideScalar(cubeGroup.children.length);

  // Move the cube group to the origin for rotation.
  cubeGroup.position.sub(center);

  // Creating a rotation vector, which defines the axis of rotation.
  const rotationVector = new THREE.Vector3(0, 0, 1); // Rotating around Z-axis

  // Calculating the rotation angle in radians from degrees.
  let angle = ((2 * Math.PI) / 360) * inputRotation;

  // Apply the rotation.
  cubeGroup.rotateOnAxis(rotationVector, angle);

  // Move the cube group back to its original position.
  cubeGroup.position.add(center);

  // Update the scene to reflect the new rotation.
  renderer.render(scene, camera);
}


/**
 * Sets the rotation of the cube group based on user input.
 * This function is typically called when the user adjusts the rotation slider.
 *
 * @param {number} inputRotation - The rotation value inputted by the user.
 */
export function setUserRotationOld(inputRotation) {
  // Update the global rotation value with the input from the user.
  rotateSettings.initialRotation = inputRotation;

  // Creating a rotation vector, which defines the axis of rotation.
  // Here, the rotation is set to occur around the Z-axis (0, 0, 1).
  const rotationVector = getNew3DVector(0, 0, 1);

  // Defining the rotation axis. It is the same as the rotation vector.
  let axis = rotationVector;

  // Calculating the rotation angle.
  // The user input is assumed to be in degrees, so it's converted to radians.
  // The conversion formula is: radians = (degrees * Math.PI) / 180.
  let angle = ((2 * Math.PI) / 360) * rotateSettings.initialRotation;

  // Rotating the cube group around the specified axis by the calculated angle.
  // This applies the user's desired rotation to the entire group of cubes.
  cubeGroup.rotateOnWorldAxis(axis, angle);
}

// Set initial state of rotation controls from input defaults.
rotationSlider.value = rotateSettings.initialRotation;
rotationCheckbox.checked = rotateSettings.doAnimateRotation;