// app.js - start the app (called from index.html)

import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { init } from "./cube.js";
import { animate } from "./js/ui.js";
import "./js/resize.js";

// Start the web app

init();
animate();
