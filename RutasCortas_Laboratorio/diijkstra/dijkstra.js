class Graph {

    constructor(nodeList) {
        this._nodes = nodeList ? nodeList : [];
    }

    addNode(node) {
        this._nodes.push(node);
    }

    nodes() {
        return this._nodes;
    }

    resetNodes() {
        this._nodes.forEach(node => {
            node.start = false;
        });
    }

}

class Node {

    constructor(name, weighs, neighbors) {
        this.name = name;
        this.weighs = weighs ? weighs : [];
        this._neighbors = neighbors ? neighbors : new Map();
        this.distanceFromStart = 0;
        this.start = true;
    }

    addNeighbor(node, weigh) {
        this._neighbors.set(node, weigh);
        this.weighs.push(weigh);
    }

    neighbors() {
        return this._neighbors;
    }

}

class MinPQ {

    constructor() {
        this.nodes = new Map();
    }

    add(node, weigh) {
        this.nodes.set(node, weigh);
    }

    isEmpty() {
        return this.nodes.size === 0;
    }

    deleteMin() {
        if (this.nodes.size === 0) return;
        let minimumNode = Array.from(this.nodes.keys())[0];

        for (let key of this.nodes.keys()) {
            let weigh = this.nodes.get(key);
            if (weigh < this.nodes.get(minimumNode)) minimumNode = key;
        }

        this.nodes.delete(minimumNode);

        return minimumNode;
    }

    decreasePriority(neighbor, altPath) {
        neighbor.distanceFromStart = altPath;
        this.add(neighbor, altPath);
    }

}

let dijkstrasAlgorithm = (graph, start) => {

    let totalCosts = new Map();
    let prevNodes = new Map();
    let minPQ = new MinPQ();
    let visited = new Set();

    totalCosts.set(start, 0);
    minPQ.add(start);

    for (let node of graph.nodes()) {
        if (node !== start) {
            totalCosts.set(node, Infinity);
        }
    }

    while (!minPQ.isEmpty()) {

        let newSmallest = minPQ.deleteMin();
        visited.add(newSmallest);

        for (let [node, weigh] of newSmallest.neighbors()) {

            if (!visited.has(node)) {

                let altPath = totalCosts.get(newSmallest) + weigh;

                if (altPath < totalCosts.get(node)) {

                    totalCosts.set(node, altPath);
                    prevNodes.set(node, newSmallest);

                    minPQ.decreasePriority(node, altPath);
                }

            }

        }

    }


    return {
       totalCosts: totalCosts,
       prevNodes: prevNodes
    }
};

module.exports = { Graph, Node, MinPQ, dijkstrasAlgorithm };
