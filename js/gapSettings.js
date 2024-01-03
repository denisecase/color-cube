/**
 * Defines settings for the gap between cubes in the 3D scene.
 * These settings include parameters for animating the gap size,
 * as well as minimum, maximum, and initial values for the gap.
 *
 * NOTE: The two sliders in index.html expect a value between 0 & 1.
 */
export const gapSettings = {
  doAnimateGap: true,  // Flag to enable/disable gap animation.
  minGap: 0.0,  // The minimum allowable gap between cubes.
  maxGap: 1.0,  // The maximum allowable gap between cubes.
  initialGap: 0.2,  // The initial gap size between cubes.
};
