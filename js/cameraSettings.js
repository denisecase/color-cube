/**
 * This file defines the initial settings for the camera used in the 3D scene.
 * It includes configurations for the camera's field of view, clipping planes,
 * and initial positioning and orientation.
 * 
 * It is imported and used in appUI.js.
 */

import { cubeSettings } from './cubeSettings.js';
import { gapInfo } from './gapSettings.js'; 

export const cameraSettings = {
  field_of_view: 50, // Static: The field of view of the camera in degrees.
  near_clipping_plane: 0.1, // Static: The nearest distance from the camera at which objects will be rendered.
  far_clipping_plane: 100, // Static: The farthest distance from the camera at which objects will be rendered.
  camera_set_position_on_x_axis: 0, // Static: The initial position of the camera along the X-axis.
  camera_set_position_on_y_axis: -25, // Static: The initial position of the camera along the Y-axis.

  // Dynamic: The initial position of the camera along the Z-axis, calculated based on cube and gap settings.
  get camera_set_position_on_z_axis() {
    return this.camera_z_value;
  },
  
  camera_look_at_x_value: 0, // Static: The X-coordinate of the point where the camera is directed.
  camera_look_at_y_value: 0, // Static: The Y-coordinate of the point where the camera is directed.

  // Dynamic: The Z-coordinate of the point where the camera is directed, mirroring the Z-axis position.
  get camera_look_at_z_value() {
    return this.camera_z_value;
  },

  // Dynamic: Calculated property for the camera z value, based on current cube color list and gap settings.
  get camera_z_value() {
    const numCubes = cubeSettings.colorList.length;
    const width = cubeSettings.size;
    const numGaps = numCubes -1;
    const gap = gapInfo.initialGap;
    return (numCubes * width + numGaps * gap) * Math.sqrt(3)/2;
  }
};