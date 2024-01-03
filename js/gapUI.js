/**
 * This file defines settings related to the gap between the mini cubes in the 3D scene.
 * It specifies the initial gap size and the minimum and maximum allowable gap sizes.
 * It also includes a flag for enabling/disabling gap animation.
 * It is imported and used in appUI.js.
 */

import { gapInfo } from './gapSettings.js';
import { animateOrRender } from './appUI.js';

// Get references to HTML elements for gap control.
const gapAnimationCheckbox = document.getElementById('gapAnimationCheckbox');
const gapMinSlider = document.getElementById('gapMinSlider');
const gapMaxSlider = document.getElementById('gapMaxSlider');

// Set initial state of gap controls from input defaults.
gapAnimationCheckbox.checked = gapInfo.doAnimateGap;
gapMinSlider.value = gapInfo.minGap;
gapMaxSlider.value = gapInfo.maxGap;

// Event listener for CHECKBOX CHANGE
gapAnimationCheckbox.addEventListener('change', (event) => {
  gapInfo.doAnimateGap = event.target.checked;
  toggleGapAnimation(gapInfo.doAnimateGap);
  animateOrRender();
});

// Event listener for MIN SLIDER INPUT CHANGE
gapMinSlider.addEventListener('input', (event) => {
  let newMinValue = parseFloat(event.target.value);
  let currentMaxValue = gapInfo.maxGap;
  if (newMinValue > currentMaxValue) {
    newMinValue = currentMaxValue;
    event.target.value = newMinValue;
  }
  gapInfo.minGap = newMinValue;
  animateOrRender();
});

// Event listener for MAX SLIDER INPUT CHANGE
gapMaxSlider.addEventListener('input', (event) => {
  let newMaxValue = parseFloat(event.target.value);
  let currentMinValue = gapInfo.minGap;
  if (newMaxValue < currentMinValue) {
    newMaxValue = currentMinValue;
    event.target.value = newMaxValue;
  }
  gapInfo.maxGap = newMaxValue;
  animateOrRender();
});

// Toggle animation (after CHANGE)
export function toggleGapAnimation(doAnimate) {
  gapInfo.doAnimateGap = animate;
  animateOrRender();
}

