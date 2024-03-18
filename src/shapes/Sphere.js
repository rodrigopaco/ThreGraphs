import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import getPosition from './utils/getPositions';
class Sphere extends THREE.Mesh {
    constructor(label , radius, color) {
        const geometry = new THREE.SphereGeometry(radius, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: color });
        super(geometry, material);
        this.name = 'Sphere';
        this.position.x = getPosition().x;
        this.position.y = getPosition().y;
        this.position.z = getPosition().z;
        this.createLabel(label);
    }
    setColor(color) {
        this.material.color.set(color);
    }
    createLabel(text)  {
        const div = document.createElement('div');
        div.className = 'label';
        div.textContent = text ;
        const label = new CSS2DObject(div);
        //label.position.copy(this.position);
        label.position.x = -0.5;
        label.position.y = 0;
        label.position.z = 0;
        this.add(label);
    };
}
export default Sphere;