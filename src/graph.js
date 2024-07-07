import lab1 from "./graphs/paths/lab1"
export function initGraph() {

    const graph = new lab1();
    
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

    console.log("Floyd-Warshall Algorithm:");
    graph.floydWarshall();

    console.log("\nDijkstra's Algorithm:");
    graph.dijkstra('v1');
    // const v1 = new Vertex('v1');
    // const v2 = new Vertex('v2');
    // const v3 = new Vertex('v3');
    // const v4 = new Vertex('v4');
    // const v5 = new Vertex('v5');
    // const v6 = new Vertex('v6');
    // const v7 = new Vertex('v7');
    // const e1 =  v1.addNeighbor(v2);
    // const e2 = v1.addNeighbor(v3);
    // const e3 = v1.addNeighbor(v4);
    // const e4 =  v3.addNeighbor(v7);
    // const e5 =  v4.addNeighbor(v7);
    // const e6 = v5.addNeighbor(v2);
    // const e7 = v5.addNeighbor(v1);
    // const e8 = v5.addNeighbor(v6);
    // const e9 = v7.addNeighbor(v1);
    // const e10 = v6.addNeighbor(v3);
    // const e11 = v6.addNeighbor(v4);
    // const e12 = v6.addNeighbor(v7);
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
    // return {vertex : [v1, v2, v3, v4, v5,v6 , v7], edges: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12]}
}
initGraph();