import * as THREE from 'three';
class Sphere extends THREE.Mesh {
    constructor(radius, color) {
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: color });
        super(geometry, material);
        this.name = 'Sphere';
    }
}
export default Sphere;