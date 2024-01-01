// UI interaction module
// js/ui.js
// This module will handle UI interactions, such as checkbox toggles and sliders, and communicate with the cube module.

import {
  getNew3DVector,
  camera,
  renderer,
  scene,
  cubeGroup,
  positionCubes,
} from '../cube.js';

export const inputs = {
  doAnimateGap: false,  // BHJ: change to false while working
  doAnimateRotation: true, // BHJ: change to false while working
  rotation: 0,
};

export const cubeSettings = {
  size: 1,
  gap: 0.2,
  gapChangeDirection: 1,
  maxGap: 1.0,
  minGap: 0.3,
 // rotationSpeed: 0.002,
};

//#region ROTATION ANIMATION AND SELECTION SLIDER

// Get references to HTML elements

const rotationCheckbox = document.getElementById('rotationAnimationCheckbox');
const rotationSlider = document.getElementById('rotationSlider');
const setRotationSlider = document.getElementById('rotationSlider');

// Set initial state from input defaults

rotationSlider.value = inputs.rotation;
rotationCheckbox.checked = inputs.doAnimateRotation;

// Configure event listeners to the function that handles that event

rotationCheckbox.addEventListener('change', (event) => {
  // if the user clicks on the rotation checkbox, start or stop the animation
  // note that the set rotation slider should now reflect the current rotation based on the animation
  inputs.doAnimateRotation = event.target.checked;
  animateOrRender();
});

//  ROTATION SLIDER GETS TWO EVENTS

  rotationSlider.addEventListener('input', () => {
  // If the user changes the rotation slider, update the rotation value
  // Make sure the rotation animation is off

  const rotation = parseInt(rotationSlider.value);
  document.getElementById('rotation').textContent = rotation;
 // setUserRotation(rotation);

  // always call this at the end
  animateOrRender();
});

setRotationSlider.addEventListener('click', (event) => {
  // If the user clicks on the set rotation slider, stop the animation
  // and set the rotation to the current value of the slider
  inputs.doAnimateRotation = false;
  rotationCheckbox.checked = inputs.doAnimateRotation;

  // BHJ: Add if the value has NOT changed, then do the folloowing
  // also rotate a bit in the direction they provided

  if (rotationSlider.value == rotationSlider.value) {
  const rotation = parseInt(rotationSlider.value);
  document.getElementById('rotation').textContent = rotation;
  +setUserRotation(rotation);

}

  // always call this at the end

  animateOrRender();
});

// Rotation-related functions

//const rotationAngle = 0.004; // radians per frame

/**
 * This function is called continuously to animate the rotation of the cube group.
 */
export function animateRotation() {
  if (inputs.doAnimateRotation) {
    const rotationVector = getNew3DVector(0, 0, 1);
    // const rotationAngle = 0.004; // radians per frame
   // cubeGroup.rotateOnWorldAxis(rotationVector, rotationAngle);
     cubeGroup.rotateOnWorldAxis(rotationVector, 0.004);
  }
}

/**
 * BHJ: This function is called when the user changes the rotation slider.
 * @param {
 * } inputRotation 
 */

export function setUserRotation(inputRotation) {
  inputs.rotation = inputRotation; // Update the rotation value
  const rotationVector = getNew3DVector(0, 0, 1);

 let axis = rotationVector;
 let angle = (2*Math.PI/360)*inputs.rotation;

  cubeGroup.rotateOnWorldAxis(axis, angle);

}

//#endregion ROTATION ANIMATION AND SELECTION SLIDER

//#region GAP ANIMATION

// Get references to HTML elements

const gapAnimationCheckbox = document.getElementById('gapAnimationCheckbox');
const gapMinSlider = document.getElementById('gapMinSlider');
const gapMaxSlider = document.getElementById('gapMaxSlider');

// Set initial state from input defaults

gapAnimationCheckbox.checked = inputs.doAnimateGap;
gapMinSlider.value = cubeSettings.minGap;
gapMaxSlider.value = cubeSettings.maxGap;

// Configure event listeners to the function that handles that event

gapAnimationCheckbox.addEventListener('change', (event) => {
  inputs.doAnimateGap = event.target.checked;
  animateOrRender();
});

gapMinSlider.addEventListener('input', (event) => {
  let newMinValue = parseFloat(event.target.value);
  let currentMaxValue = cubeSettings.maxGap;
  if (newMinValue > currentMaxValue) {
    newMinValue = currentMaxValue;
    event.target.value = newMinValue;
  }
  cubeSettings.minGap = newMinValue;
});

gapMaxSlider.addEventListener('input', (event) => {
  let newMaxValue = parseFloat(event.target.value);
  let currentMinValue = cubeSettings.minGap;
  if (newMaxValue < currentMinValue) {
    newMaxValue = currentMinValue;
    event.target.value = newMaxValue;
  }
  cubeSettings.maxGap = newMaxValue;
});

// Gap-related functions

export function setGapAnimation(animate) {
  inputs.doAnimateGap = animate;
  animateOrRender();
}

export function setGapMin(min) {
  cubeSettings.minGap = min;
  animateOrRender();
}

export function setGapMax(max) {
  cubeSettings.maxGap = max;
  animateOrRender();
}

/**
 * This function is called continuously to animate the gap between the cubes.
 */
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

//#endregion GAP ANIMATION

//#region ANIMATION AND RENDERING

/**
 * This function decides whether to trigger animation or rendering based on user input.
 * If either gap animation or rotation animation is enabled, it triggers animation.
 * Otherwise, it renders the scene.
 */
export function animateOrRender() {
  if (inputs.doAnimateGap || inputs.doAnimateRotation) {
    animate();
  } else {
    renderer.render(scene, camera);
  }
}

/**
 * This function is called continuously to animate the scene.
 */
export function animate() {
  requestAnimationFrame(animate);
  animateGap();
  animateRotation();
  renderer.render(scene, camera);
}


//#endregion ANIMATION AND RENDERING

