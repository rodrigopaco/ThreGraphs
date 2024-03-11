class Edge {
    constructor(source, destination, weight = 1) {
        this.source = source;
        this.destination = destination;
        this.weight = weight;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    getWeight() {
        return this.weight;
    }
    getSource() {
        return this.source;
    }
    getDestination() {
        return this.destination;
    }
}
export default Edge;