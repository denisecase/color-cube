/**
 * app.js - Start the Web Application
*/

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import './js/resize.js';
import './js/cubeUI.js';
import { init, animateOrRender } from './js/appUI.js';

// Start the web app
init();
animateOrRender();