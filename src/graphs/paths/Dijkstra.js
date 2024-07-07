const readline = require('readline');

class Dijkstra {
    constructor() {
        this.vertices = new Map();
        this.edges = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    addVertex(label) {
        if (!this.vertices.has(label)) {
            this.vertices.set(label, { label });
        }
    }

    addEdge(srcLabel, destLabel, weight = 1) {
        this.edges.push({ srcLabel, destLabel, weight });
    }

    async inputVerticesAndEdges() {
        const rl = this.rl;

        return new Promise((resolve, reject) => {
            rl.question('Ingresa los vértices (separados por espacios): ', function (vertexInput) {
                vertexInput.trim().split(/\s+/).forEach(vertex => this.addVertex(vertex));

                rl.question('Ingresa las aristas en formato src dest peso (una por línea): ', function (edgeInput) {
                    edgeInput.trim().split('\n').forEach(edge => {
                        const [srcLabel, destLabel, weight] = edge.trim().split(/\s+/);
                        this.addEdge(srcLabel, destLabel, parseInt(weight));
                    });

                    rl.question('Ingresa el vértice de inicio para Dijkstra: ', function (startLabel) {
                        this.dijkstra(startLabel);
                        resolve();
                        rl.close();
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        });
    }

    dijkstra(startLabel) {
        const distances = {};
        const pq = new MinHeap();

        Array.from(this.vertices.keys()).forEach(label => {
            distances[label] = label === startLabel ? 0 : Infinity;
            pq.insert({ label, priority: distances[label] });
        });

        while (!pq.isEmpty()) {
            const { label, priority } = pq.extractMin();

            this.edges
                .filter(({ srcLabel }) => srcLabel === label)
                .forEach(({ destLabel, weight }) => {
                    const alt = priority + weight;
                    if (alt < distances[destLabel]) {
                        distances[destLabel] = alt;
                        pq.insert({ label: destLabel, priority: alt });
                    }
                });
        }

        console.log("Vértice\tDistancia desde el origen");
        Object.entries(distances).forEach(([label, distance]) => {
            console.log(`${label}\t${distance === Infinity ? 'INF' : distance}`);
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

async function main() {
    const dijkstra = new Dijkstra();
    await dijkstra.inputVerticesAndEdges();
}

main();
