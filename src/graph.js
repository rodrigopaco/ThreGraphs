import Vertex from "./graphs/Vertex";
import bfs  from './graphs/paths/Bfs';
import Graph  from './graphs/paths/Algoritmos';

export function initGraph() {

    const graph = new Graph();
    const v1 = graph.addVertex('A');
    const v2 = graph.addVertex('B');
    const v3 = graph.addVertex('C');
    const v4 = graph.addVertex('D');

    graph.addEdge('A', 'B', 1);
    graph.addEdge('A', 'C', 4);
    graph.addEdge('B', 'D', 3);
    graph.addEdge('C', 'D', 1);

    console.log("Algoritmo de Floyd:");
    graph.floyd();

    console.log("\n Algoritmo de Dijkstra Vertice:");
    graph.dijkstra('A');
   
}
initGraph();