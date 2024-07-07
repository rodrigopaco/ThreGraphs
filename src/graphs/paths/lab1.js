import Vertex from "../Vertex";
import Edge from "../Edge";

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
            throw new Error("Vertices not found");
        }

        const edge = new Edge(srcVertex, destVertex, weight);
        srcVertex.addNeighbor(destVertex, weight);
        this.edgeList.push(edge);
        return edge;
    }

    floydWarshall() {
        const verticesArray = Array.from(this.vertexMap.values());
        const distanceMatrix = verticesArray.map(v => verticesArray.map(() => Infinity));

        verticesArray.forEach((vertex, i) => {
            distanceMatrix[i][i] = 0;
            vertex.getEdgesList().forEach(edge => {
                const j = verticesArray.indexOf(edge.getDestination());
                distanceMatrix[i][j] = edge.getWeight();
            });
        });

        for (let k = 0; k < verticesArray.length; k++) {
            for (let i = 0; i < verticesArray.length; i++) {
                for (let j = 0; j < verticesArray.length; j++) {
                    if (distanceMatrix[i][k] + distanceMatrix[k][j] < distanceMatrix[i][j]) {
                        distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
                    }
                }
            }
        }

        this.displayFloydWarshallResult(distanceMatrix, verticesArray);
    }

    dijkstra(startLabel) {
        const startVertex = this.vertexMap.get(startLabel);
        if (!startVertex) {
            throw new Error("Start vertex not found");
        }

        const distances = new Map(Array.from(this.vertexMap.keys(), key => [key, Infinity]));
        distances.set(startLabel, 0);

        const visited = new Set();
        const minHeap = new MinHeap();
        minHeap.insert({ node: startVertex, priority: 0 });

        while (!minHeap.isEmpty()) {
            const { node } = minHeap.extractMin();
            const nodeLabel = node.getLabel();
            
            if (visited.has(nodeLabel)) continue;
            visited.add(nodeLabel);

            node.getEdgesList().forEach(edge => {
                const alternativePath = distances.get(nodeLabel) + edge.getWeight();
                const neighborLabel = edge.getDestination().getLabel();
                if (alternativePath < distances.get(neighborLabel)) {
                    distances.set(neighborLabel, alternativePath);
                    minHeap.insert({ node: edge.getDestination(), priority: alternativePath });
                }
            });
        }

        this.displayDijkstraResult(distances);
    }

    displayFloydWarshallResult(distanceMatrix, vertices) {
        console.log("Shortest distances between each pair of vertices:");
        vertices.forEach((v, i) => {
            let row = `${v.getLabel()}: `;
            vertices.forEach((u, j) => {
                row += distanceMatrix[i][j] === Infinity ? "INF " : `${distanceMatrix[i][j]} `;
            });
            console.log(row);
        });
    }

    displayDijkstraResult(distances) {
        console.log("Vertex\tDistance from Source");
        distances.forEach((distance, vertex) => {
            console.log(`${vertex}\t${distance === Infinity ? 'Infinity' : distance}`);
        });
    }
}

class MinHeap {
    constructor() {
        this.elements = [];
    }

    insert(node) {
        this.elements.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.elements.length - 1;
        while (index > 0) {
            const currentNode = this.elements[index];
            const parentIndex = Math.floor((index - 1) / 2);
            const parentNode = this.elements[parentIndex];

            if (parentNode.priority <= currentNode.priority) break;
            this.elements[index] = parentNode;
            this.elements[parentIndex] = currentNode;
            index = parentIndex;
        }
    }

    extractMin() {
        const minNode = this.elements[0];
        const endNode = this.elements.pop();
        if (this.elements.length > 0) {
            this.elements[0] = endNode;
            this.sinkDown(0);
        }
        return minNode;
    }

    sinkDown(index) {
        const length = this.elements.length;
        const currentNode = this.elements[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.elements[leftChildIndex];
                if (leftChild.priority < currentNode.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.elements[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < currentNode.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.elements[index] = this.elements[swap];
            this.elements[swap] = currentNode;
            index = swap;
        }
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

export default Graph;
