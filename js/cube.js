import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

let scene, camera, renderer, cubeGroup;
let cubeSize = 1;
let gap = 0.2;  // Space between cubes

function init() {
    // Create the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Create the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    // Create the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a group for all the small cubes
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
                cubeGroup.add(cube);  // Add  cube to  group
            }
        }
    }

    scene.add(cubeGroup);  // Add  group to  scene

    // Start the animation loop
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the entire group of cubes
    cubeGroup.rotation.x += 0.01;
    cubeGroup.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
