// cameraSettings.js

import { cubeSettings } from './cubeUI.js';

class CameraSettings {
  constructor() {
    this.left = -14;
    this.right = 14;
    this.top = 14;
    this.bottom = -14;
    this.near = 0;
    this.far = 100;

    this.camera_x = 0;
    this.camera_y = 0; // set dynamically
    this.camera_z = -25;

    this.camera_look_x = 0;
    this.camera_look_y = 0; // set dynamically
    this.camera_look_z = 0;
  }

  get calculated_camera_y_value() {
    const numCubes = cubeSettings.cubeCount;
    console.log('numCubes', numCubes);

    const width = cubeSettings.size;
    console.log('cubeSettings.size', cubeSettings.size);

    const numGaps = numCubes - 1;
    console.log('numGaps', numGaps);

    const gap = cubeSettings.initialGap;
    console.log('gap', gap);

    const y = ((numCubes * width + numGaps * gap) * Math.sqrt(3)) / 2;
    console.log('y calc:', y);

    return y;
  }

  initialize() {
    const y = this.calculated_camera_y_value; // Get the calculated value
    this.camera_y = y;
    this.camera_look_y = y;
    console.log('y calc:', y);
    console.log('this.camera_y', this.camera_y);
    console.log('this.camera_look_y', this.camera_look_y);
  }
}

export const cameraSettings = new CameraSettings();
