/**
 * Main module for initializing and managing a 3D environment using Three.js.
 */

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
//import { handleResize } from './resize.js';
import { rotateSettings } from './rotateUI.js';
import { initCubeGroup, cubeGroup } from './cubeUI.js';
import { animateRotation } from './rotateUI.js';
export let scene, camera, renderer;

/**
 * Initializes the 3D environment and the cubes within it.
 */
export function init() {
  setupScene();
  setupCamera();
  setupRenderer();
  initCubeGroup();
  animateOrRender();
  //handleResize(); // Handles browser window resizing & maintain aspect ratio
}

/**
 * Setup functions for the 3D environment
 */
function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
}

export const cameraSettings = {
  left: -12,
  right: 12,
  top: 12,
  bottom: -12,
  near: 0,
  far: 100,

  camera_x: 0,
  camera_y: 0,
  camera_z: -25,

  camera_look_x: 0,
  camera_look_y: 0,
  camera_look_z: 0,
  /* // Dynamic: The Z-coordinate of the point where the camera is directed, mirroring the Z-axis position.
   get camera_look_at_z_value() {
     return this.camera_z_value;
   },*/
  /* // Dynamic: Calculated property for the camera z value, based on current cube color list and gap settings.
   get camera_z_value() {
     const numCubes = cubeSettings.colorList.length;
     const width = cubeSettings.size;
     const numGaps = numCubes -1;
     const gap = gapInfo.initialGap;
     return (numCubes * width + numGaps * gap) * Math.sqrt(3)/2;
   }*/
};

/**
 * Sets up the camera for the 3D scene.
 */
function setupCamera() {
  camera = new THREE.OrthographicCamera(
    cameraSettings.left,
    cameraSettings.right,
    cameraSettings.top,
    cameraSettings.bottom,
    cameraSettings.near,
    cameraSettings.far,
  );

  camera.position.set(
    cameraSettings.camera_x, // e.g., 0
    cameraSettings.camera_y, // e.g., 0
    cameraSettings.camera_z, // e.g., -25
  );

  camera.lookAt(
    cameraSettings.camera_look_x, // e.g., 0
    cameraSettings.camera_look_y, // e.g., 0
    cameraSettings.camera_look_z, // e.g., 0
  );
}

/**
 * The renderer draws the computed 3D scene onto the 2D screen.
 */
function setupRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('canvas-container').appendChild(renderer.domElement);
}

/**
 * Decides whether to trigger animation or a single render based on the current UI inputs.
 * If either gap or rotation animation is enabled, it continues the animation loop.
 * Otherwise, it renders the scene once without animation.
 */
export function animateOrRender() {
  if ( rotateSettings.doAnimateRotation) {
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

  // Apply rotation animations as needed.
  animateRotation();

  // Render the updated scene.
  renderer.render(scene, camera);
}

