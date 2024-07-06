import Vertex from "../Vertex";
import Edge from "../Edge";

class Network {
    constructor() {
        this.nodes = new Map();
        this.links = [];
    }

    addNode(name, color = 0xffffff) {
        const node = new Vertex(name, color);
        this.nodes.set(name, node);
        return node;  
    }

    addLink(srcName, destName, weight = 1) {
        const srcNode = this.nodes.get(srcName);
        const destNode = this.nodes.get(destName);

        if (!srcNode || !destNode) {
            throw new Error("Nodos no encontrados");
        }

        const link = new Edge(srcNode, destNode, weight);
        srcNode.addNeighbor(destNode, weight);
        this.links.push(link);
        return link;
    }

    findNode(name) {
        const node = this.nodes.get(name);
        if (!node) {
            throw new Error(`Nodo '${name}' no encontrado`);
        }
        return node;
    }

    floydWarshall() {
        const nodesArray = Array.from(this.nodes.values());
        const dist = nodesArray.map(() => nodesArray.map(() => Infinity));

        nodesArray.forEach((node, i) => {
            dist[i][i] = 0;
            node.getEdgesList().forEach(link => {
                const j = nodesArray.indexOf(link.getDestination());
                dist[i][j] = link.getWeight();
            });
        });

        for (let k = 0; k < nodesArray.length; k++) {
            for (let i = 0; i < nodesArray.length; i++) {
                for (let j = 0; j < nodesArray.length; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        this.displaySolution(dist, nodesArray);
    }

    dijkstraAlgorithm(startName) {
        const startNode = this.findNode(startName);

        const distances = new Map(Array.from(this.nodes.keys(), key => [key, Infinity]));
        distances.set(startName, 0);

        const pq = new MinPriorityQueue();
        pq.insert({ element: startNode, priority: 0 });

        while (!pq.isEmpty()) {
            const { element: node } = pq.extractMin();

            node.getEdgesList().forEach(link => {
                const alt = distances.get(node.getName()) + link.getWeight();
                const neighborName = link.getDestination().getName();
                if (alt < distances.get(neighborName)) {
                    distances.set(neighborName, alt);
                    pq.insert({ element: link.getDestination(), priority: alt });
                }
            });
        }

        this.displayDijkstra(distances);
    }

    displaySolution(dist, nodes) {
        console.log("Distancias más cortas entre cada par de nodos:");
        nodes.forEach((n, i) => {
            let row = `${n.getName()}: `;
            nodes.forEach((u, j) => {
                row += dist[i][j] === Infinity ? "∞ " : `${dist[i][j]} `;
            });
            console.log(row);
        });
    }

    displayDijkstra(distances) {
        console.log("Nodo y Distancia desde el origen");
        distances.forEach((dist, node) => {
            console.log(`${node}\t${dist === Infinity ? 'Infinito' : dist}`);
        });
    }
}

class MinPriorityQueue {
    constructor() {
        this.queue = [];
    }

    insert(item) {
        this.queue.push(item);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.queue.length - 1;
        while (index > 0) {
            let element = this.queue[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.queue[parentIndex];

            if (parent.priority <= element.priority) break;
            this.queue[index] = parent;
            this.queue[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMin() {
        const min = this.queue[0];
        const end = this.queue.pop();
        if (this.queue.length > 0) {
            this.queue[0] = end;
            this.sinkDown(0);
        }
        return min;
    }

    sinkDown(index) {
        const length = this.queue.length;
        const element = this.queue[index];
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.queue[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.queue[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            this.queue[index] = this.queue[swap];
            this.queue[swap] = element;
            index = swap;
        }
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

export default Network;
