// UI interaction module
// js/ui.js
// This module will handle UI interactions, such as checkbox toggles and sliders, and communicate with the cube module.

import { getNew3DVector, camera, renderer, scene, cubeGroup, positionCubes } from "../cube.js";

export const inputs = {
  doAnimateGap: false,
  doAnimateRotation: false,
  rotation: 0,
};

export const cubeSettings = {
  size: 1,
  gap: 0.4,
  gapChangeDirection: 1,
  maxGap: 1.0,
  minGap: 0.3,
  rotationSpeed: 0.01,
};

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

export function setUserRotation(degrees) {
  inputs.rotation = degrees; // Update the rotation value
  const radians = (degrees * Math.PI) / 180;
  cubeGroup.rotation.y = radians; // Rotate around the y-axis to set user rotation
}

export function animateRotation() {
  if (inputs.doAnimateRotation) {
    const rotationVector = getNew3DVector(0, 0, 1);
    cubeGroup.rotateOnWorldAxis(rotationVector, cubeSettings.rotationSpeed);
  }
}

export function animateOrRender() {
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

// Get references to HTML elements
const rotationCheckbox = document.getElementById("rotationCheckbox");
const rotationSlider = document.getElementById("rotationSlider");
const setRotationSlider = document.getElementById("rotationSlider"); // Add this line
const gapAnimationCheckbox = document.getElementById("gapAnimationCheckbox");
const gapMinSlider = document.getElementById("gapMinSlider");
const gapMaxSlider = document.getElementById("gapMaxSlider");

rotationSlider.value = inputs.rotation;

rotationCheckbox.addEventListener("change", (event) => {
  inputs.doAnimateRotation = event.target.checked;
  if (inputs.doAnimateRotation) {
    animateRotation(); // Start the animation
  } else {
    inputs.doAnimateRotation = false; // Stop animation
  }
});

rotationSlider.addEventListener("input", () => {
  const rotation = parseInt(rotationSlider.value);
  document.getElementById("rotation").textContent = rotation;
  setUserRotation(rotation);
});

setRotationSlider.addEventListener("click", () => {
  inputs.doAnimateRotation = false;
});

gapAnimationCheckbox.addEventListener("change", (event) => {
  inputs.doAnimateGap = event.target.checked;
  animateOrRender();
});

gapMinSlider.addEventListener("input", (event) => {
  let newMinValue = parseFloat(event.target.value);
  let currentMaxValue = cubeSettings.maxGap;
  if (newMinValue > currentMaxValue) {
    newMinValue = currentMaxValue;
    event.target.value = newMinValue;
  }
  cubeSettings.minGap = newMinValue;
});

gapMaxSlider.addEventListener("input", (event) => {
  let newMaxValue = parseFloat(event.target.value);
  let currentMinValue = cubeSettings.minGap;
  if (newMaxValue < currentMinValue) {
    newMaxValue = currentMinValue;
    event.target.value = newMaxValue;
  }
  cubeSettings.maxGap = newMaxValue;
});
