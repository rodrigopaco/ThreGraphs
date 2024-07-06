
import Vertex from "./Vertex";
import Edge from "./Edge";

class Graph {
    constructor() {
        this.vertices = {};
        this.edges = {};
    }

    addVertex(label) {
        const vertex = new Vertex(label);
        this.vertices[label] = vertex;
        return vertex;
    }

    getVertex(label) {
        return this.vertices[label];
    }

    addEdge(sourceLabel, destinationLabel, weight) {
        const sourceVertex = this.vertices[sourceLabel];
        const destinationVertex = this.vertices[destinationLabel];

        if (!sourceVertex || !destinationVertex) {
            throw new Error("Vertex not found");
        }

        const edge = new Edge(sourceVertex, destinationVertex, weight);
        this.edges[`${sourceLabel}-${destinationLabel}`] = edge;
        sourceVertex.addNeighbor(destinationVertex, weight);

        return edge;
    }

    dijkstra(startLabel) {
        const startVertex = this.vertices[startLabel];
        if (!startVertex) {
            throw new Error("Start vertex not found");
        }

        let distances = {};
        let previousVertices = {};
        let visited = {};

        for (const label in this.vertices) {
            distances[label] = Infinity;
            previousVertices[label] = null;
            visited[label] = false;
        }

        distances[startLabel] = 0;

        while (true) {
            let currentLabel = this.getMinDistanceVertex(distances, visited);

            if (currentLabel === null) {
                break;
            }

            let currentVertex = this.vertices[currentLabel];
            visited[currentLabel] = true;

            for (const neighbor of currentVertex.getNeighbors()) {
                if (visited[neighbor.getLabel()]) {
                    continue;
                }

                let edge = currentVertex.getEdgeTo(neighbor);
                let newDistance = distances[currentLabel] + edge.getWeight();

                if (newDistance < distances[neighbor.getLabel()]) {
                    distances[neighbor.getLabel()] = newDistance;
                    previousVertices[neighbor.getLabel()] = currentLabel;
                }
            }
        }

        return { distances, previousVertices };
    }

    getMinDistanceVertex(distances, visited) {
        let minDistance = Infinity;
        let minLabel = null;

        for (const label in this.vertices) {
            if (!visited[label] && distances[label] < minDistance) {
                minDistance = distances[label];
                minLabel = label;
            }
        }

        return minLabel;
    }
}

export default Graph;
