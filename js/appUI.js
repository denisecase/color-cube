// Main module for initializing and managing a 3D environment using Three.js.

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { cameraSettings } from './cameraSettings.js';
import { rotateSettings } from './rotateUI.js';
import { initCubeGroup, cubeGroup } from './cubeUI.js';
import { animateRotation } from './rotateUI.js';
export let scene, camera, renderer;

/**
 * Initializes the 3D environment and the cubes within it.
 */
export function init() {
  setupScene();
  initCubeGroup();
  setupCamera();
  setupRenderer();
  animateOrRender();
  //handleResize(); // Handles browser window resizing & maintain aspect ratio
}

/**
 * Setup functions for the 3D environment
 */
function setupScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);
}

/**
 * Sets up the camera for the 3D scene.
 */
function setupCamera() {
  cameraSettings.initialize();

  camera = new THREE.OrthographicCamera(
    cameraSettings.left,
    cameraSettings.right,
    cameraSettings.top,
    cameraSettings.bottom,
    cameraSettings.near,
    cameraSettings.far,
  );

  camera.position.set(
    cameraSettings.camera_x,
    cameraSettings.camera_y,
    cameraSettings.camera_z,
  );

  camera.lookAt(
    cameraSettings.camera_look_x,
    cameraSettings.camera_look_y,
    cameraSettings.camera_look_z,
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
  if (rotateSettings.doAnimateRotation) {
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
