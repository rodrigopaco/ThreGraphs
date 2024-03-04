import * as THREE from 'three';
class Cube extends THREE.Mesh {
    constructor(label, size, color) {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshNormalMaterial({ color: color });
        super(geometry, material);
        this.label = label
    }
}
export default Cube;