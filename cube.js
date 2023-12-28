import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

let scene, camera, renderer, cubeGroup;
let cubeSize = 1;
let gap = 0.4;
let currentRotation = 0;
let doAnimate = false;

function init() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(-15, 10, 15);
  camera.lookAt(scene.position);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create group for all small cubes
  cubeGroup = new THREE.Group();

  // Create 3x3x3 grid of cubes with varying colors
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const r = Math.floor((x + 1) * 127);
        const g = Math.floor((y + 1) * 127);
        const b = Math.floor((z + 1) * 127);
        const color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x * (cubeSize + gap), y * (cubeSize + gap), z * (cubeSize + gap));
        cubeGroup.add(cube);
      }
    }
  }
  scene.add(cubeGroup);

  // ALIGN *******************************

  // Align the black cube (-1, -1, -1) with the negative Y-axis
//  let axis = new THREE.Vector3(1, 0, -1).normalize();
//  let angle = Math.acos(-1 / Math.sqrt(3));
//  cubeGroup.rotateOnAxis(axis, angle);

  let axis = new THREE.Vector3(1, 1, 1).normalize();
  let angle = 3.14;
  cubeGroup.rotateOnAxis(axis, angle);
  
  // END ALIGN ***************************

  render();
}

function animate() {
  requestAnimationFrame(animate);
  // ANIMATE *****************************

  // Rotate the cube group slowly around the Y-axis
  cubeGroup.rotation.y += 0.006;

  // add a controlled rotation to showcase different angles
  if (currentRotation < Math.PI * 2) {
    cubeGroup.rotation.x += 0.006;
    currentRotation += 0.006;
  }

  // END ANIMATE **************************
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  if (doAnimate) {
    animate();
  } else {
    renderer.render(scene, camera);
  }
}


init();
