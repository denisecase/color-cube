/**
 * Resize handling module.
 * This module is responsible for handling the resizing of the canvas. 
 * It updates the renderer and camera whenever the user resizes their browser window.
 * This ensures that the canvas and its contents are appropriately scaled and displayed,
 * maintaining the correct aspect ratio and dimensions relative to the available browser window space.
 * It also ensures that the 3D scene is rendered with the updated settings.
 * 
 * It is imported and used in app.js.
 */

import { camera, renderer, scene } from "./appUI.js";

/**
 * Handles the resizing of the canvas container, renderer, and camera.
 * This function is triggered when the browser window is resized or when the DOM content is fully loaded.
 * It adjusts the size of the canvas container to fit the available space,
 * considering the dimensions of other page elements like headers and footers.
 * It also updates the renderer and camera settings to match the new canvas size.
 */
export function handleResize() {
  // Adjust canvas container dimensions based on the available window space.
  const canvasContainer = document.getElementById("canvas-container");

  if (canvasContainer) {
    // Calculate the available height by subtracting the heights of the header, footer, and article elements.
    const headerHeight = document.querySelector("header")?.offsetHeight || 0;
    const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
    const articleHeight = document.querySelector("article")?.offsetHeight || 0;
    const availableHeight = window.innerHeight - headerHeight - footerHeight - articleHeight;
    canvasContainer.style.height = `${availableHeight}px`;
  }

  // Adjust Renderer and Camera to fit the new size of the canvas container.
  if (renderer && camera) {
    const canvasWidth = canvasContainer ? canvasContainer.clientWidth : window.innerWidth;
    const canvasHeight = canvasContainer
      ? canvasContainer.clientHeight
      : window.innerHeight - headerHeight - footerHeight;

    // Update the aspect ratio of the camera and the size of the renderer.
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);

    // Rerender the scene with the updated settings.
    renderer.render(scene, camera);
  }
}

// Attach the handleResize function to window resize and DOMContentLoaded events.
window.addEventListener("resize", handleResize);
document.addEventListener("DOMContentLoaded", handleResize);
