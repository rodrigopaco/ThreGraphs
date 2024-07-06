import Vertex from "./graphs/Vertex";
import bfs  from './graphs/paths/Bfs'
import GraphFloyd from "./graphs/paths/Floyd";
import GraphDijkstra from "./graphs/paths/Dijkstra";

function initGraph() {
    const graph1 = new GraphFloyd();
    const graph2 = new GraphDijkstra();

    const v1 = graph1.addVertex('v1');
    const v2 = graph1.addVertex('v2');
    const v3 = graph1.addVertex('v3');
    const v4 = graph1.addVertex('v4');
    const v5 = graph1.addVertex('v5');
    const v6 = graph1.addVertex('v6');
    const v7 = graph1.addVertex('v7');

    graph1.addEdge('v1', 'v3', 2);
    graph1.addEdge('v1', 'v2', 1);
    graph1.addEdge('v1', 'v3', 16);
    graph1.addEdge('v2', 'v6', 20);
    graph1.addEdge('v2', 'v4', 22);
    graph1.addEdge('v3', 'v4', 11);
    graph1.addEdge('v3', 'v5', 3);
    graph1.addEdge('v4', 'v6', 7);
    graph1.addEdge('v5', 'v6', 7);

    console.log("Ruta corta utilizando Floyd: ");
    graph1.floyd(); 

    /*
    const graph2 = new Graph2();

    const v1 = graph2.addVertex('v1');
    const v2 = graph2.addVertex('v2');
    const v3 = graph2.addVertex('v3');
    const v4 = graph2.addVertex('v4');
    const v5 = graph2.addVertex('v5');
    const v6 = graph2.addVertex('v6');
    const v7 = graph2.addVertex('v7');

    graph2.addEdge('v1', 'v2', 8);
    graph2.addEdge('v1', 'v3', 8);
    graph2.addEdge('v1', 'v6', 7);
    graph2.addEdge('v2', 'v3', 9);
    graph2.addEdge('v2', 'v4', 10);
    graph2.addEdge('v3', 'v4', 11);
    graph2.addEdge('v3', 'v6', 12);
    graph2.addEdge('v4', 'v5', 8);
    console.log("Ruta corta utilizando Dijkstra: ");
    graph.dijkstra();
    */
}
initGraph();
