/**
 * Main module for initializing and managing a 3D environment using Three.js.
 *
 * This module serves as the core of a 3D application, handling the setup and
 * maintenance of various components essential for rendering a 3D scene. It imports
 * and utilizes Three.js for creating and manipulating 3D graphics.
 *
 * Key functionalities include:
 *  - Initializing the 3D scene, camera, and renderer.
 *  - Setting up and managing a group of cubes in the scene.
 *  - Handling dynamic animations for the cubes, including gap changes and rotation.
 *  - Adjusting the scene's rendering based on browser window resize events.
 *
 * External modules are imported for specific aspects of the scene setup and management:
 *  - 'resize.js' for handling window resize events.
 *  - 'settings_camera.js', 'settings_gap.js', 'settings_rotate.js' for various configuration settings.
 *  - 'ui_cube.js', 'ui_gap.js', 'ui_rotate.js' for UI-related functionalities and animations.
 *
 * This module exports key components like the scene, camera, and renderer, along with
 * the initialization function and utility functions for the 3D environment.
 *
 * It is imported and used in app.js, cubeUI.js, gapUI.js, rotateUI.js, and app.js.
 */

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { handleResize } from './resize.js';
import { gapInfo, animateGap } from './gapSettings.js';
import { rotateSettings } from './rotateSettings.js';
import { cameraSettings } from './cameraSettings.js';
import { initCubeGroup, cubeGroup, positionCubes } from './cubeUI.js';
import { animateRotation } from './rotateUI.js';
export let scene, camera, renderer;

/**
 * Initializes the 3D environment and the cubes within it. This function is called
 * from 'app.js' to start the application. It sets up the scene, camera, renderer,
 * and the group of cubes, then positions and animates them.
 */
export function init() {
  setupScene();
  setupCamera();
  setupRenderer();
  initCubeGroup();
  animateOrRender();
  handleResize(); // Handles browser window resizing & maintain aspect ratio
}

/** Setup functions for the 3D environment
 Set the background color of the scene
 */
function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
}

/**
 * Sets up the camera for the 3D scene.
 *
 * The camera is a THREE.PerspectiveCamera, which simulates the way the human eye sees.
 * It is characterized by four main properties:
 *
 * 1. Field of View (FOV): e.g., 50-75
 *    - Represents the extent of the observable world seen at any moment (in degrees).
 *    - A larger FOV value results in a wider perspective, while a smaller FOV narrows the view.
 *
 * 2. Aspect Ratio: window.innerWidth / window.innerHeight
 *    - The ratio of the width to the height of the camera's viewport.
 *    - Using the window's width and height ensures the camera's aspect ratio matches the display's.
 *
 * 3. Near Clipping Plane: e.g., 0.1
 *    - The closest distance to the camera at which objects will be rendered.
 *    - Objects closer to the camera than this distance will not be visible.
 *
 * 4. Far Clipping Plane: e.g., 100-1000
 *    - The farthest distance from the camera at which objects will be rendered.
 *    - Objects beyond this distance from the camera will not be visible.
 *
 * After setting up these properties, the camera's position is set to around (0, -10, 0),
 * and it is oriented to look at the center of the scene.
 */
function setupCamera() {
  // BHJ
  camera = new THREE.PerspectiveCamera(
    cameraSettings.field_of_view, // ~50-75
    window.innerWidth / window.innerHeight, // aspect ratio
    cameraSettings.near_clipping_plane, //~0.1
    cameraSettings.far_clipping_plane, //~100-1000
  );

  // Setting the position of the camera in the 3D world space.
  // The position is defined by three coordinates: (x, y, z).

  // x: e.g., 0
  // - This sets the camera's position along the X-axis.
  // - A value of 0 means the camera is positioned at the origin of the X-axis.

  // x: e.g., 0-10
  // y: -10
  // - This sets the camera's position along the Y-axis.
  // - A value of -10 means the camera is positioned 10 units below the origin along the Y-axis.
  // - Negative values move the camera down, while positive values move it up.

  // x: e.g., 0
  // z: 0
  // - This sets the camera's position along the Z-axis.
  // - A value of 0 means the camera is positioned at the origin of the Z-axis.

  camera.position.set(
    cameraSettings.camera_set_position_on_x_axis, // e.g., 0
    cameraSettings.camera_set_position_on_y_axis, // e.g., -25
    cameraSettings.camera_set_position_on_z_axis, // e.g., 6.3
  );

  camera.lookAt(
    cameraSettings.camera_look_at_x_value, // e.g., 0
    cameraSettings.camera_look_at_y_value, // e.g., 0
    cameraSettings.camera_look_at_z_value, // e.g., 6.3
  );
}

/**
 * Sets up the renderer for the 3D scene.
 *
 * The renderer is responsible for drawing the computed 3D scene onto the 2D screen.
 * In this function, a WebGL renderer is created and configured, and then attached
 * to the DOM element where the 3D scene should be displayed.
 */
function setupRenderer() {
  // Creating a new WebGL renderer.
  // The WebGL renderer allows for rendering 3D graphics in the web browser.
  // { antialias: true }: This option enables anti-aliasing, which smooths the edges of objects.
  renderer = new THREE.WebGLRenderer({ antialias: true });

  // Setting the size of the renderer.
  // window.innerWidth and window.innerHeight are used to make the rendered scene
  // fill the full window. This ensures the 3D scene occupies the maximum available space.
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Appending the renderer to the DOM.
  // The renderer's DOM element (canvas) is appended to the 'canvas-container' element.
  // This makes the 3D scene visible on the webpage in the specified container.
  document.getElementById('canvas-container').appendChild(renderer.domElement);
}

/**
 * Decides whether to trigger animation or a single render based on the current UI inputs.
 * If either gap or rotation animation is enabled, it continues the animation loop.
 * Otherwise, it renders the scene once without animation.
 */
export function animateOrRender() {
  if (gapInfo.doAnimateGap || rotateSettings.doAnimateRotation) {
    // Continue the animation loop if any animation is active.
    animate();
  } else {
    // Render the scene once if no animation is active.
    renderer.render(scene, camera);
  }
}

/**
 * Continuously animates the scene by updating the gap and rotation animations
 * and then rendering the scene. This function is called repeatedly using
 * requestAnimationFrame for smooth animations.
 */
export function animate() {
  // Continuously request the next frame for smooth animation.
  requestAnimationFrame(animate);

  // Apply gap and rotation animations as needed.
  animateGap();
  animateRotation();
  positionCubes();

  // Render the updated scene.
  renderer.render(scene, camera);
}

/**
 * Creates a new 3D vector.
 * Useful for setting positions and other vector-based properties.
 *
 * @param {number} x - The X coordinate.
 * @param {number} y - The Y coordinate.
 * @param {number} z - The Z coordinate.
 * @returns {THREE.Vector3} A new THREE.Vector3 object.
 */
export function getNew3DVector(x, y, z) {
  return new THREE.Vector3(x, y, z);
}
