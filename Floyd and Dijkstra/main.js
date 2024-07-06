class Vertex {
    constructor(label, color = 0xffffff) {
        this.label = label;
        this.color = color;
        this.edges = [];
        this.x = Math.random() * 800; // Initial random position
        this.y = Math.random() * 600; 
    }

    addNeighbor(vertex, weight = 1) {
        const edge = { srcVertex: this, destVertex: vertex, weight };
        this.edges.push(edge);
        return edge;
    }

    getEdgesList() {
        return this.edges;
    }
}

class Edge {
    constructor(srcVertex, destVertex, weight) {
        this.srcVertex = srcVertex;
        this.destVertex = destVertex;
        this.weight = weight;
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
            throw new Error("Vertices not found");
        }

        const edge = new Edge(srcVertex, destVertex, weight);
        srcVertex.addNeighbor(destVertex, weight);
        this.edges.push(edge);
        return edge;
    }

    floydWarshall() {
        const verticesArray = Array.from(this.vertices.values());
        const dist = verticesArray.map(v => verticesArray.map(() => Infinity));

        verticesArray.forEach((vertex, i) => {
            dist[i][i] = 0;
            vertex.getEdgesList().forEach(edge => {
                const j = verticesArray.indexOf(edge.destVertex);
                dist[i][j] = edge.weight;
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
        const startVertex = this.vertices.get(startLabel);
        if (!startVertex) {
            throw new Error("Start vertex not found");
        }

        const distances = new Map(Array.from(this.vertices.keys(), key => [key, Infinity]));
        distances.set(startLabel, 0);

        const pq = new MinHeap();
        pq.insert({ node: startVertex, priority: 0 });

        while (!pq.isEmpty()) {
            const { node } = pq.extractMin();

            node.getEdgesList().forEach(edge => {
                const alt = distances.get(node.label) + edge.weight;
                const neighborLabel = edge.destVertex.label;
                if (alt < distances.get(neighborLabel)) {
                    distances.set(neighborLabel, alt);
                    pq.insert({ node: edge.destVertex, priority: alt });
                }
            });
        }

        this.printSolutionDijkstra(distances);
    }

    printSolution(dist, vertices) {
        console.log("Distancias más cortas entre cada par de vértices:");
        vertices.forEach((v, i) => {
            let row = `${v.label}: `;
            vertices.forEach((u, j) => {
                row += dist[i][j] === Infinity ? "INF " : `${dist[i][j]} `;
            });
            console.log(row);
        });
    }

    printSolutionDijkstra(distances) {
        console.log("Vertex\tDistancia desde la fuente:");
        distances.forEach((dist, vertex) => {
            console.log(`${vertex}\t${dist === Infinity ? 'Infinity' : dist}`);
        });
    }
}

const graph = new Graph();

function initGraph() {
    const v1 = graph.addVertex('v1');
    const v2 = graph.addVertex('v2');
    const v3 = graph.addVertex('v3');
    const v4 = graph.addVertex('v4');
    const v5 = graph.addVertex('v5');
    const v6 = graph.addVertex('v6');
    const v7 = graph.addVertex('v7');

    graph.addEdge('v1', 'v2', 7);
    graph.addEdge('v1', 'v3', 9);
    graph.addEdge('v1', 'v6', 14);
    graph.addEdge('v2', 'v3', 10);
    graph.addEdge('v2', 'v4', 15);
    graph.addEdge('v3', 'v4', 11);
    graph.addEdge('v3', 'v6', 2);
    graph.addEdge('v4', 'v5', 6);
    graph.addEdge('v5', 'v6', 9);

    visualizeGraph(graph);

    console.log("Floyd Algorithm:");
    graph.floydWarshall();

    console.log("\nDijkstra Algorithm:");
    graph.dijkstra('v1');
}

function visualizeGraph(graph) {
    const vertices = Array.from(graph.vertices.values());
    const edges = graph.edges.map(e => ({
        source: e.srcVertex.label,
        target: e.destVertex.label,
        weight: e.weight
    }));

    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const simulation = d3.forceSimulation(vertices)
        .force("link", d3.forceLink(edges).id(d => d.label).distance(100))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width / 2, height / 2));

    svg.selectAll("*").remove(); // Delete. the previous graph

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(edges)
        .enter().append("line")
        .attr("stroke-width", d => Math.sqrt(d.weight));

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(vertices)
        .enter().append("circle")
        .attr("r", 10)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const text = svg.append("g")
        .attr("class", "texts")
        .selectAll("text")
        .data(vertices)
        .enter().append("text")
        .attr("dy", -3)
        .attr("dx", 12)
        .text(d => d.label);

    simulation
        .nodes(vertices)
        .on("tick", ticked);

    simulation.force("link")
        .links(edges);

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        text
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

initGraph();
