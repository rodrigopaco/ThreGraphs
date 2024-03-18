import Edge from "./Edge";
import Sphere from "../shapes/Sphere";

class Vertex extends Sphere{
    constructor(label, color = 0xffffff) {
        super(label, 0.2, color);
        this.label = label;
        this.vertexList = []
        this.edgesList = []
        this.visited = false;
    }
    addNeighbor(destination, weight = 1) {
        this.vertexList.push(destination);
        const edge = new Edge(this, destination, weight);
        this.edgesList.push(edge);
        return edge;
    }
    getLabel() {
        return this.label;
    }
    print() {
        console.log(`Vertex  -> ${this.label}`);
    }
    setVisited(visited) {
        this.visited = visited;
    }
    getVisited() {
        return this.visited;
    }
    getEdgesList() {
        return this.edgesList;
    }
    getVertexList() {
        return this.vertexList;
    }
}
export default Vertex;