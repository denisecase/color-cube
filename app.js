// app.js - start the app (called from index.html)

import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { init, animate } from './cube.js';
import './js/ui.js';
import './js/resize.js';

// Start up the color cube web app

init();
animate(); 
