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

/*  para el algoritmo de dijkstra
// Vertex.js

import Edge from "./Edge";

class Vertex {
    constructor(label, color = 0xffffff) {
        this.label = label;
        this.color = color;
        this.neighbors = [];
        // Lista de vértices vecinos
        this.edges = []; 
        this.visited = false;
    }

    addNeighbor(destination, weight = 1) {
        this.neighbors.push(destination);
        const edge = new Edge(this, destination, weight);
        this.edges.push(edge);
        return edge;
    }

    getLabel() {
        return this.label;
    }

    getNeighbors() {
        return this.neighbors;
    }

    getEdges() {
        return this.edges;
    }

    getEdgeTo(neighbor) {
        for (const edge of this.edges) {
            if (edge.getDestination() === neighbor) {
                return edge;
            }
        }
        return null; // Si no hay una arista hacia el vecino
    }

    print() {
        console.log(`Vertex ${this.label}`);
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setVisited(visited) {
        this.visited = visited;
    }

    getVisited() {
        return this.visited;
    }
}

export default Vertex;

**/ 