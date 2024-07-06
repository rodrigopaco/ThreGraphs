import Graph from './graphs/paths/DijkstraFloyd';

export function initGraph() {
    const graph = new Graph();

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

    console.log("Floyd:");
    graph.floydWarshall();

    console.log("\nDijkstra:");
    graph.dijkstra('v1');
}
initGraph();
