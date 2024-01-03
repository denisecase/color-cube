/**
 * app.js - Start the Web Application
 *
 * This is the main JavaScript file for the web application. It's the entry point
 * that gets called from `index.html`. Its primary role is to set up and start
 * the web app by initializing the environment and triggering the animation loop.
 *
 * Imports:
 *  - THREE: This is the Three.js library imported from a CDN (Content Delivery Network).
 *    Three.js is a JavaScript library that helps create and display 3D graphics
 *    in a web browser. This version is specified as 0.160.0.
 *
 *  - init: A function imported from './js/ui.js'. It is responsible for initializing
 *    our 3D scene, setting up any objects (like cubes), lights, cameras, etc.
 *
 *  - animate: A function imported from './js/ui.js'. This function is responsible for
 *    continuously rendering the scene and updating any animations or movements in our
 *    3D environment.
 *
 *  - './js/resize.js': This script is responsible for handling window resize events.
 *    It ensures that our 3D graphics respond appropriately when the browser window
 *    is resized, maintaining the correct aspect ratio and size.
 *
 * Function Calls:
 *  - init(): This call initializes our 3D scene with the necessary settings, objects,
 *    and configurations. It prepares the scene before we start animating it.
 *
 *  - animate(): This call starts the animation loop. It ensures that our scene is
 *    continuously rendered and any animations are updated. This creates a dynamic,
 *    interactive 3D environment on the web.
 */

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import './js/resize.js';
import './js/gapSettings.js';
import './js/rotateSettings.js';
import './js/cubeSettings.js';
import './js/cameraSettings.js';
import './js/cubeUI.js';
import './js/gapUI.js';
import { init, animate } from './js/appUI.js';

// Start the web app
init();
animate();
