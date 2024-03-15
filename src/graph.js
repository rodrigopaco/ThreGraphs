import Vertex from "./graphs/Vertex";
import bfs  from './graphs/paths/Bfs';
import dfs from './graphs/paths/Dfs';
function initGraph() {
    const v1 = new Vertex('v1');
    const v2 = new Vertex('v2');
    const v3 = new Vertex('v3');
    const v4 = new Vertex('v4');
    const v5 = new Vertex('v5');
    const v6 = new Vertex('v6');
    const v7 = new Vertex('v7');
    v1.addNeighbor(v2);
    v1.addNeighbor(v3);
    v1.addNeighbor(v4);
    v3.addNeighbor(v7);
    v4.addNeighbor(v7);
    v5.addNeighbor(v2);
    v5.addNeighbor(v1);
    v5.addNeighbor(v6);
    v7.addNeighbor(v1);
    v6.addNeighbor(v3);
    v6.addNeighbor(v4);
    v6.addNeighbor(v7);
    // v1.addNeighbor(v2);
    // v1.addNeighbor(v3);
    // v1.addNeighbor(v4);
    // v2.addNeighbor(v3);
    // v3.addNeighbor(v4);
    // v3.addNeighbor(v2);
    // v3.addNeighbor(v5);
    // v5.addNeighbor(v3);
    // v5.addNeighbor(v2);
    // run dfs
    // bfs(v1);
    dfs(v1);
}
initGraph();