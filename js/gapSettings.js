/**
 * gapSettings.js
 * Defines settings for the gap between cubes in the 3D scene.
 * These settings include parameters for animating the gap size,
 * as well as minimum, maximum, and initial values for the gap.
 *
 * NOTE: The two sliders in index.html expect a value between 0 & 1.
 */


export const gapInfo = {
  doAnimateGap: false,  // Flag to enable/disable gap animation.
  minGap: 0.0,  // The minimum allowable gap between cubes.
  maxGap: 1.0,  // The maximum allowable gap between cubes.
  initialGap: 0.2,  // The initial gap size between cubes.
  deltaGap: 0.005,  // The amount by which the gap changes each frame.
  
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
