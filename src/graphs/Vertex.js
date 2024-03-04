import Edge from "./Edge";

class Vertex {
    constructor(label) {
        this.label = label;
        this.vertexList = []
        this.edgesList = []
    }
    addNeighbor(destination, weight = 1) {
        this.vertexList.push(destination);
        const edge = new Edge(this, destination, weight);
        this.edgesList.push(edge);
    }
    getLabel() {
        return this.label;
    }
}
export default Vertex;