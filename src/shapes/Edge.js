import * as THREE from 'three';
class Edge extends THREE.Line {
    constructor(nodeStart, nodeEnd, material) {
        const geometry = new THREE.BufferGeometry().setFromPoints([nodeStart.position, nodeEnd.position]);
        super(geometry, material);
        this.nodeStart = nodeStart;
        this.nodeEnd = nodeEnd;
    }

    // Método para actualizar la posición de la arista basada en los nodos
    updatePosition() {
        this.geometry.setFromPoints([this.nodeStart.position, this.nodeEnd.position]);
        this.geometry.attributes.position.needsUpdate = true; // Necesario para actualizar la geometría
    }
}
export default Edge;