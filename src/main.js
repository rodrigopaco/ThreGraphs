import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Cube from './shapes/Cube';
import Sphere from './shapes/Sphere';


// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333);

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 5;

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

const cube = new Cube('v1', 0.5, 0xff0000);
const sphere = new Sphere(0.2, 0xff0000)
sphere.position.x =2
scene.add(cube);
scene.add(sphere);
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


animate();

function loadGraph() {
}


loadGraph();
