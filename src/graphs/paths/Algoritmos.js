import Vertex from "../Vertex";
import Edge from "../Edge";

class Graph {
    constructor() {
        this.vertices = new Map();
        this.edges = [];
    }

    addVertex(label, color = 0xffffff) {
        const vertex = new Vertex(label, color);
        this.vertices.set(label, vertex);
        return vertex;  
    }

    addEdge(srcLabel, destLabel, weight = 1) {
        const srcVertex = this.vertices.get(srcLabel);
        const destVertex = this.vertices.get(destLabel);

        if (!srcVertex || !destVertex) {
            throw new Error("Vertices no encontrados");
        }

        const edge = new Edge(srcVertex, destVertex, weight);
        srcVertex.addNeighbor(destVertex, weight);
        this.edges.push(edge);
        return edge;
    }

    findVertex(label) {
        const vertex = this.vertices.get(label);
        if (!vertex) {
            throw new Error(`Vertice '${label}' no encontrado`);
        }
        return vertex;
    }

    floyd() {
        const verticesArray = Array.from(this.vertices.values());
        const dist = verticesArray.map(() => verticesArray.map(() => Infinity));

        verticesArray.forEach((vertex, i) => {
            dist[i][i] = 0;
            vertex.getEdgesList().forEach(edge => {
                const j = verticesArray.indexOf(edge.getDestination());
                dist[i][j] = edge.getWeight();
            });
        });

        for (let k = 0; k < verticesArray.length; k++) {
            for (let i = 0; i < verticesArray.length; i++) {
                for (let j = 0; j < verticesArray.length; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        this.printSolution(dist, verticesArray);
    }

    dijkstra(startLabel) {
        const startVertex = this.findVertex(startLabel);

        const distances = new Map(Array.from(this.vertices.keys(), key => [key, Infinity]));
        distances.set(startLabel, 0);

        const pq = new MinHeap();
        pq.insert({ node: startVertex, priority: 0 });

        while (!pq.isEmpty()) {
            const { node } = pq.extractMin();

            node.getEdgesList().forEach(edge => {
                const alt = distances.get(node.getLabel()) + edge.getWeight();
                const neighborLabel = edge.getDestination().getLabel();
                if (alt < distances.get(neighborLabel)) {
                    distances.set(neighborLabel, alt);
                    pq.insert({ node: edge.getDestination(), priority: alt });
                }
            });
        }

        this.printsoldijks(distances);
    }

    printSolution(dist, vertices) {
        console.log("Distancias más cortas entre cada par de vértices:");
        vertices.forEach((v, i) => {
            let row = `${v.getLabel()}: `;
            vertices.forEach((u, j) => {
                row += dist[i][j] === Infinity ? "∞ " : `${dist[i][j]} `;
            });
            console.log(row);
        });
    }

    printsoldijks(distances) {
        console.log("Vertice y Distancia desde el origen");
        distances.forEach((dist, vertex) => {
            console.log(`${vertex}\t${dist === Infinity ? 'Infinito' : dist}`);
        });
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (parent.priority <= element.priority) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMin() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return min;
    }

    sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

export default Graph;
