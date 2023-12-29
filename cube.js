import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

let scene, camera, renderer, cubeGroup;
let cubeSize = 1;
let currentRotation = 0;
let doAnimate = true;
let doAnimateGap = true;
let doAnimateRotation = true;
let gap = 0.4;
let gapChangeDirection = 1;
const gapMax = 1.0;
const gapMin = 0.3;

function animateGap() {
  if (doAnimateGap) {
    // Adjust the gap based on the direction
    gap += 0.005 * gapChangeDirection;

    // Reverse direction at the limits
    if (gap > gapMax || gap < gapMin) {
      gapChangeDirection *= -1;
      gap = Math.max(gapMin, Math.min(gapMax, gap)); // limit
    }

    positionCubes(gap);
  }
}

function animateRotation() {
  if (doAnimateRotation) {

    // Rotate the cube group around its vertical axis
    // Adjust the rotation speed as needed
    let rotationSpeed = 0.01;
    cubeGroup.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), rotationSpeed);

    // Rotate the cube group slowly around the Y-axis
    //cubeGroup.rotation.y += 0.006;

    // add a controlled rotation to showcase different angles
    // if (currentRotation < Math.PI * 2) {
    //   cubeGroup.rotation.x += 0.006;
    //   currentRotation += 0.006;
    // }
  }
}

function animate() {
  requestAnimationFrame(animate);
  animateGap();
  animateRotation();
  renderer.render(scene, camera);
}

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

  // Create 3x3x3 grid of cubes
  createCubes();
  positionCubes(gap);
  scene.add(cubeGroup);

  // align white cube to the top (north pole)
  alignCubeGroup();

  render();
}

function createCubes() {
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
        cube.gridPosition = new THREE.Vector3(x, y, z);
        cubeGroup.add(cube);
      }
    }
  }
}

function positionCubes(gap) {
  cubeGroup.children.forEach((cube) => {
    cube.position.set(
      cube.gridPosition.x * (cubeSize + gap),
      cube.gridPosition.y * (cubeSize + gap),
      cube.gridPosition.z * (cubeSize + gap)
    );
  });
}

function alignCubeGroup() {
  let axis = new THREE.Vector3(1, 0, -1).normalize();
  let angle = (5 * Math.acos(-1 / Math.sqrt(3))) / 2;
  cubeGroup.rotateOnAxis(axis, angle);
}

function render() {
  if (doAnimate) {
    animate();
  } else {
    renderer.render(scene, camera);
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


// Handle window resize
window.addEventListener("resize", onWindowResize, false);

// Start up
init();
