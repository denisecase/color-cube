/**
 * This file defines settings related to the gap between the mini cubes in the 3D scene.
 * It specifies the initial gap size and the minimum and maximum allowable gap sizes.
 * It also includes a flag for enabling/disabling gap animation.
 * It is imported and used in appUI.js.
 */

import { gapSettings } from './gapSettings.js';
import { animateOrRender } from './appUI.js';

// Direction of gap change (increasing or decreasing)
let gap_change_direction = 1;

// Current gap, exported for UI
export let gap = gapSettings.initialGap;

// Get references to HTML elements for gap control.
const gapAnimationCheckbox = document.getElementById('gapAnimationCheckbox');
const gapMinSlider = document.getElementById('gapMinSlider');
const gapMaxSlider = document.getElementById('gapMaxSlider');

// Set initial state of gap controls from input defaults.
gapAnimationCheckbox.checked = gapSettings.doAnimateGap;
gapMinSlider.value = gapSettings.minGap;
gapMaxSlider.value = gapSettings.maxGap;

// Event listener for CHECKBOX CHANGE
gapAnimationCheckbox.addEventListener('change', (event) => {
  gapSettings.doAnimateGap = event.target.checked;
  toggleGapAnimation(gapSettings.doAnimateGap);
  animateOrRender();
});

// Event listener for MIN SLIDER INPUT CHANGE
gapMinSlider.addEventListener('input', (event) => {
  let newMinValue = parseFloat(event.target.value);
  let currentMaxValue = gapSettings.maxGap;
  if (newMinValue > currentMaxValue) {
    newMinValue = currentMaxValue;
    event.target.value = newMinValue;
  }
  gapSettings.minGap = newMinValue;
  animateOrRender();
});

// Event listener for MAX SLIDER INPUT CHANGE
gapMaxSlider.addEventListener('input', (event) => {
  let newMaxValue = parseFloat(event.target.value);
  let currentMinValue = gapSettings.minGap;
  if (newMaxValue < currentMinValue) {
    newMaxValue = currentMinValue;
    event.target.value = newMaxValue;
  }
  gapSettings.maxGap = newMaxValue;
  animateOrRender();
});

// Toggle animation (after CHANGE)
export function toggleGapAnimation(doAnimate) {
  gapSettings.doAnimateGap = animate;
  animateOrRender();
}

/**
 * Animates the gap between the cubes in the 3D scene.
 * Adjusts the gap continuously based on configured settings.
 * Called by the UI
 */
export function animateGap() {
  if (gapSettings.doAnimateGap) {
    // Adjust current gap based on direction of change.
    gap += 0.005 * gap_change_direction;

    // Reverse direction if gap exceeds max or falls below min limits.
    if (gap > gapSettings.maxGap || gap < gapSettings.minGap) {
      gap = Math.min(Math.max(gap, gapSettings.minGap), gapSettings.maxGap);
      gap_change_direction *= -1;
    }
  }
}
