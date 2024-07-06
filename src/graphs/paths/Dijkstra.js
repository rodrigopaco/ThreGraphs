import Edge from "../Edge";
import Vertex from "../Vertex";

class GraphDijkstra {
    dijkstra(graph, startVertex){
        const distances = {};
        const visitedVertices = {};
        const previousVertices = {};
        const queue = new PriorityQueue();
      
        graph.getAllVertices().forEach((vertex) => {
          distances[vertex.getKey()] = Infinity;
          previousVertices[vertex.getKey()] = null;
        });
    
        distances[startVertex.getKey()] = 0;
        queue.add(startVertex, distances[startVertex.getKey()]);
    
        while (!queue.isEmpty()) {
          const currentVertex = queue.poll();
    
          currentVertex.getNeighbors().forEach((neighbor) => {
            if (!visitedVertices[neighbor.getKey()]) {
              const edge = graph.findEdge(currentVertex, neighbor);
              const existingDistanceToNeighbor = distances[neighbor.getKey()];
              const distanceToNeighborFromCurrent = distances[currentVertex.getKey()] + edge.weight;
      
              if (distanceToNeighborFromCurrent < existingDistanceToNeighbor) {
                distances[neighbor.getKey()] = distanceToNeighborFromCurrent;
      
                if (queue.hasValue(neighbor)) {
                  queue.changePriority(neighbor, distances[neighbor.getKey()]);
                }
                previousVertices[neighbor.getKey()] = currentVertex;
              }
      
              if (!queue.hasValue(neighbor)) {
                queue.add(neighbor, distances[neighbor.getKey()]);
              }
            }
          });
      
          visitedVertices[currentVertex.getKey()] = currentVertex;
        }
      
        return {
          distances,
          previousVertices,
        };
    }

    constructor() {
        this.vertices = new Set();
        this.edges = new Map();
    }

    addVertex(label) {
        this.vertices.add(label);
        if (!this.edges.has(label)) {
            this.edges.set(label, []);
        }
        return { label };
    }

    addEdge(srcLabel, destLabel, weight = 1) {
        const edge = { srcLabel, destLabel, weight };  
        this.edges.push(edge);       
        return edge;                 
    }
}

class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (index <= 0 || this.heap[parentIndex].priority <= this.heap[index].priority) {
            return;
        }
        this.swap(index, parentIndex);
        this.bubbleUp(parentIndex);
    }

    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }
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
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let swap = null;

        if (leftChildIndex < length) {
            const leftChild = this.heap[leftChildIndex];
            if (leftChild.priority < element.priority) {
                swap = leftChildIndex;
            }
        }

        if (rightChildIndex < length) {
            const rightChild = this.heap[rightChildIndex];
            if (
                (swap === null && rightChild.priority < element.priority) ||
                (swap !== null && rightChild.priority < this.heap[leftChildIndex].priority)
            ) {
                swap = rightChildIndex;
            }
        }

        if (swap === null) {
            return;
        }

        this.swap(index, swap);
        this.sinkDown(swap);
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

export default GraphDijkstra;