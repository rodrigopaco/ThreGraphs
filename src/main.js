import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { initGraph } from './graph';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);
const objects = [];
// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xB161ED);

// Crear la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 5;

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
const {vertex, edges} = initGraph();
vertex.forEach(vertex => {
    scene.add(vertex);
    objects.push(vertex);
    vertex.edgesList.forEach(edge => {
        scene.add(edge);
    });
});
const dragControls = new DragControls(objects, camera, renderer.domElement);
let dragVertex = null;
dragControls.addEventListener('dragstart', function (event) {
    console.log(event);
    dragVertex = event.object
    controls.enabled = false;
});

dragControls.addEventListener('dragend', function (event) {
    dragVertex = null;
    controls.enabled = true;
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    edges.forEach(edge => {
        edge.updatePosition();
    })
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    
}
animate();

