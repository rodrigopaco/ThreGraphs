import EdgeGraphs from "../shapes/Edge";
import * as THREE from 'three';
class Edge extends EdgeGraphs{
    constructor(source, destination, weight = 1) {
        super(source, destination, new THREE.LineBasicMaterial({color: 0xffffff}));
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    getWeight() {
        return this.weight;
    }
    getSource() {
        return this.source;
    }
    getDestination() {
        return this.destination;
    }
}
export default Edge;