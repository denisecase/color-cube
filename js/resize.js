// Resize handling code
// js/resize.js

import { camera, renderer, scene} from '../cube.js';

export function handleResize() {

  // Adjust canvas container
  const canvasContainer = document.getElementById('canvas-container');

  if (canvasContainer) {
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
    const articleHeight = document.querySelector('article')?.offsetHeight || 0;

    const availableHeight = window.innerHeight - headerHeight - footerHeight - articleHeight;
    canvasContainer.style.height = `${availableHeight}px`;
  }

  // Adjust Renderer and Camera
  if (renderer && camera) {
    const canvasWidth = canvasContainer ? canvasContainer.clientWidth : window.innerWidth;
    const canvasHeight = canvasContainer ? canvasContainer.clientHeight : window.innerHeight - headerHeight - footerHeight;

    // Update camera aspect ratio and renderer size
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);

    // Rerender the scene
    renderer.render(scene, camera);
  }
}


window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);
