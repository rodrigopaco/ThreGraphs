import Vertex from "./graphs/Vertex";
function initGraph() {
    const v1 = new Vertex('v1');
    const v2 = new Vertex('v2');
    const v3 = new Vertex('v3');
    const v4 = new Vertex('v4');
    const v5 = new Vertex('v5');
    v1.addNeighbor(v2);
    v1.addNeighbor(v3);
    v1.addNeighbor(v4);
    v2.addNeighbor(v3);
    v3.addNeighbor(v4);
    v3.addNeighbor(v2);
    v3.addNeighbor(v5);
    v5.addNeighbor(v3);
    v5.addNeighbor(v2);
    console.log(v1);
}
initGraph();