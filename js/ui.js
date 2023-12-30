// UI interaction code
// js/ui.js

import { animate, inputs, render, cubeSettings , animateRotation, setUserRotation} from "../cube.js";

// Get references to HTML elements
const rotationCheckbox = document.getElementById('rotationCheckbox');
const rotationDegrees = document.getElementById('rotationDegrees');
const rotationSlider = document.getElementById('rotationSlider');

rotationSlider.value = inputs.rotationDegrees;

rotationCheckbox.addEventListener("change", (event) => {
  inputs.doAnimateRotation = event.target.checked;
  if (inputs.doAnimateRotation) {
    animateRotation(); // Start the rotation animation when the checkbox is checked
  }
  else {
    // Stop the animation by setting doAnimateRotation to false
    inputs.doAnimateRotation = false;
  }
});

rotationSlider.addEventListener('input', () => {
  const degrees = parseInt(rotationSlider.value);
  rotationDegrees.textContent = degrees;
  setUserRotation(degrees); // Set user rotation when slider is changed
});




document.getElementById("gapAnimationCheckbox").addEventListener("change", (event) => {
  inputs.doAnimateGap = event.target.checked;
  render();
});


document.getElementById("gapMinSlider").addEventListener("input", (event) => {
  let newMinValue = parseFloat(event.target.value);
  let currentMaxValue = cubeSettings.gapMax;

  if (newMinValue > currentMaxValue) {
    newMinValue = currentMaxValue;
    event.target.value = newMinValue;
  }

  cubeSettings.gapMin = newMinValue;
});

document.getElementById("gapMaxSlider").addEventListener("input", (event) => {
  let newMaxValue = parseFloat(event.target.value);
  let currentMinValue = cubeSettings.gapMin;

  if (newMaxValue < currentMinValue) {
    newMaxValue = currentMinValue;
    event.target.value = newMaxValue;
  }

  cubeSettings.gapMax = newMaxValue;
});
