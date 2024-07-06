import Vertex from "./graphs/Vertex";
import bfs  from './graphs/paths/Bfs'
import dfs from "./graphs/paths/Dfs";
import dijkstra from "./graphs/paths/dijkstra"


export function initGraph() {
   /* const v1 = new Vertex('v1');
    const v2 = new Vertex('v2');
    const v3 = new Vertex('v3');
    const v4 = new Vertex('v4');
    const v5 = new Vertex('v5');
    const v6 = new Vertex('v6');
    const v7 = new Vertex('v7');
    const e1 =  v1.addNeighbor(v2);
    const e2 = v1.addNeighbor(v3);
    const e3 = v1.addNeighbor(v4);
    const e4 =  v3.addNeighbor(v7);
    const e5 =  v4.addNeighbor(v7);
    const e6 = v5.addNeighbor(v2);
    const e7 = v5.addNeighbor(v1);
    const e8 = v5.addNeighbor(v6);  
    const e9 = v7.addNeighbor(v1);
    const e10 = v6.addNeighbor(v3);
    const e11 = v6.addNeighbor(v4);
    const e12 = v6.addNeighbor(v7);
    // v1.addNeighbor(v2);
    // v1.addNeighbor(v3);
    // v1.addNeighbor(v4);
    // v2.addNeighbor(v3);
    // v3.addNeighbor(v4);
    // v3.addNeighbor(v2);
    // v3.addNeighbor(v5);
    // v5.addNeighbor(v3);
    // v5.addNeighbor(v2);
    //run dfs
     dfs(v1);  // Ejecutar DFS desde el vértice v1
     */

     
///esto es para el floyd
    const v1 = graph.addVertex('v1');
    const v2 = graph.addVertex('v2');
    const v3 = graph.addVertex('v3');
    const v4 = graph.addVertex('v4');

    // Agregar aristas
    graph.addEdge('v1', 'v2', 5);
    graph.addEdge('v1', 'v4', 10);
    graph.addEdge('v2', 'v3', 3);
    graph.addEdge('v3', 'v4', 1);

    // Ejecutar el algoritmo de Floyd-Warshall
    graph.floydWarshall();

/*  para el algoritmo de Dijkstra


function initGraph() {
    const graph = new Graph();

    const v1 = graph.addVertex('v1');
    const v2 = graph.addVertex('v2');
    const v3 = graph.addVertex('v3');
    const v4 = graph.addVertex('v4');

    graph.addEdge('v1', 'v2', 5);
    graph.addEdge('v1', 'v4', 10);
    graph.addEdge('v2', 'v3', 3);
    graph.addEdge('v3', 'v4', 1);

    const { distances, previousVertices } = graph.dijkstra('v1');

    console.log("Distancias desde v1:", distances);
    console.log("Vértices anteriores:", previousVertices);
}

initGraph();

*/

}

initGraph();
