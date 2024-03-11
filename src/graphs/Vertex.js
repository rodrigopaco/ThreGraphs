import Edge from "./Edge";

class Vertex {
    constructor(label) {
        this.label = label;
        this.vertexList = []
        this.edgesList = []
        this.visited = false;
    }
    addNeighbor(destination, weight = 1) {
        this.vertexList.push(destination);
        const edge = new Edge(this, destination, weight);
        this.edgesList.push(edge);
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
    getVertexList() {
        return this.vertexList;
    }
}
export default Vertex;