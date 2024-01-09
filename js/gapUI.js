/**
 * This file defines settings related to the gap between the mini cubes in the 3D scene.
 * It specifies the initial gap size and the minimum and maximum allowable gap sizes.
 * It also includes a flag for enabling/disabling gap animation.
 * It is imported and used in appUI.js.
 */

import { animateOrRender } from './appUI.js';

// Get references to HTML elements for gap control.
const gapAnimationCheckbox = document.getElementById('gapAnimationCheckbox');
const gapMinSlider = document.getElementById('gapMinSlider');
const gapMaxSlider = document.getElementById('gapMaxSlider');



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
export const gapInfo = {
  doAnimateGap: false, // Flag to enable/disable gap animation.
  minGap: 0, // The minimum allowable gap between cubes.
  maxGap: 1, // The maximum allowable gap between cubes.
  initialGap: 0.2, // The initial gap size between cubes.
  deltaGap: 0.005, // The amount by which the gap changes each frame.


  // Getter for currentGap to always return the dynamically calculated gap
  get currentGap() {
    return _currentGap;
  },

  // Setter for currentGap to update the internal gap value
  set currentGap(value) {
    _currentGap = value;
  }
};
/**
 * Animates the gap between the cubes in the 3D scene.
 * Adjusts the gap continuously based on configured settings.
 * Called by the UI
 */

export function animateGap() {
  if (gapInfo.doAnimateGap) {
    // Adjust current gap based on direction of change.
    _currentGap += gapInfo.deltaGap * _gap_change_direction;

    // Reverse direction if gap exceeds max or falls below min limits.
    if (_currentGap > gapInfo.maxGap || _currentGap < gapInfo.minGap) {
      _currentGap = Math.min(Math.max(_currentGap, gapInfo.minGap), gapInfo.maxGap);
      _gap_change_direction *= -1;
    }
  }
}
let _currentGap = gapInfo.initialGap; // Private variable to store the actual current gap
let _gap_change_direction = 1; // Private variable to store the direction of change

// Set initial state of gap controls from input defaults.
gapAnimationCheckbox.checked = gapInfo.doAnimateGap;
gapMinSlider.value = gapInfo.minGap;
gapMaxSlider.value = gapInfo.maxGap;