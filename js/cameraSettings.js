/**
 * This file defines the initial settings for the camera used in the 3D scene.
 * It includes configurations for the camera's field of view, clipping planes,
 * and initial positioning and orientation.
 * 
 * It is imported and used in appUI.js.
 */

export const cameraSettings = {
  field_of_view: 50, // The field of view of the camera in degrees.
  near_clipping_plane: 0.1, // The nearest distance from the camera at which objects will be rendered.
  far_clipping_plane: 100, // The farthest distance from the camera at which objects will be rendered.
  camera_set_position_on_x_axis: 0, // The initial position of the camera along the X-axis.
  camera_set_position_on_y_axis: -25, // The initial position of the camera along the Y-axis.
  camera_set_position_on_z_axis: 6.3, // The initial position of the camera along the Z-axis.
  camera_look_at_x_value: 0, // The X-coordinate of the point where the camera is directed.
  camera_look_at_y_value: 0, // The Y-coordinate of the point where the camera is directed.
  camera_look_at_z_value: 6.3, // The Z-coordinate of the point where the camera is directed.
};
