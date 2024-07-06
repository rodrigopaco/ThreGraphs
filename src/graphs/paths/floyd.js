import Vertex from "../Vertex";
import Edge from "../Edge";
//Rosa Mariana Torrez Quispe
// Ru:109836
//C.I:8631426
class Graph {
    constructor() {
        this.vertexMap = new Map();
        this.edgeList = [];
    }

    addVertex(label, color = 0x000000) {
        const vertex = new Vertex(label, color);
        this.vertexMap.set(label, vertex);
        return vertex;
    }

    addEdge(srcLabel, destLabel, weight = 1) {
        const srcVertex = this.vertexMap.get(srcLabel);
        const destVertex = this.vertexMap.get(destLabel);

        if (!srcVertex || !destVertex) {
            throw new Error("Las vertices no se encontraron ");
        }

        const edge = new Edge(srcVertex, destVertex, weight);
        srcVertex.addNeighbor(destVertex, weight);
        this.edgeList.push(edge);
        return edge;
    }

    floydWarshall() {
        const verticesArray = Array.from(this.vertexMap.values());
        const numVertices = verticesArray.length;
        const distanceMatrix = [];

        // Inicializar la matriz de distancias
        for (let i = 0; i < numVertices; i++) {
            distanceMatrix[i] = [];
            for (let j = 0; j < numVertices; j++) {
                if (i === j) {
                    distanceMatrix[i][j] = 0;
                } else {
                    distanceMatrix[i][j] = Infinity;
                }
            }
        }
        this.edgeList.forEach(edge => {
            const srcIndex = verticesArray.indexOf(edge.getSource());
            const destIndex = verticesArray.indexOf(edge.getDestination());
            distanceMatrix[srcIndex][destIndex] = edge.getWeight();
        });
        for (let k = 0; k < numVertices; k++) {
            for (let i = 0; i < numVertices; i++) {
                for (let j = 0; j < numVertices; j++) {
                    if (distanceMatrix[i][k] + distanceMatrix[k][j] < distanceMatrix[i][j]) {
                        distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
                    }
                }
            }
        }

        this.displayFloydWarshallResult(distanceMatrix, verticesArray);
    }

    displayFloydWarshallResult(distanceMatrix, vertices) {
        console.log("Las distancias más cortas entre cada par de vértices son:");
        vertices.forEach((v, i) => {
            let row = `${v.getLabel()}: `;
            vertices.forEach((u, j) => {
                row += distanceMatrix[i][j] === Infinity ? "INF " : `${distanceMatrix[i][j]} `;
            });
            console.log(row);
        });
    }
}

export default Graph;
