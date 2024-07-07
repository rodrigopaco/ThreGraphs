import Vertex from "./graphs/Vertex";
import Floyd from './graphs/paths/Floyd'; 
//import Dijkstra from './graphs/paths/Dijkstra'; 

export function initGraph() {
    const v1 = new Vertex('v1');
    const v2 = new Vertex('v2');
    const v3 = new Vertex('v3');
    const v4 = new Vertex('v4');
    const v5 = new Vertex('v5');
    const v6 = new Vertex('v6');
    const v7 = new Vertex('v7');

    const e1 = v1.addNeighbor(v2, 2); // Ajustar peso del borde según sea necesario
    const e2 = v1.addNeighbor(v3, 5);
    const e3 = v1.addNeighbor(v4, 1);
    const e4 = v3.addNeighbor(v7, 3);
    const e5 = v4.addNeighbor(v7, 7);
    const e6 = v5.addNeighbor(v2, 4);
    const e7 = v5.addNeighbor(v1, 2);
    const e8 = v5.addNeighbor(v6, 6);
    const e9 = v7.addNeighbor(v1, 4);
    const e10 = v6.addNeighbor(v3, 1);
    const e11 = v6.addNeighbor(v4, 2);
    const e12 = v6.addNeighbor(v7, 5);

    v1.addNeighbor(v2, 2); // Ajustar peso del borde según sea necesario
    v1.addNeighbor(v3, 5);
    v1.addNeighbor(v4, 1);
    v2.addNeighbor(v3, 2);
    v3.addNeighbor(v4, 3);
    v3.addNeighbor(v2, 1); 
    v3.addNeighbor(v5, 4); 
    v5.addNeighbor(v3, 6); 
    v5.addNeighbor(v2, 3); 


    const floydAlgorithm = new Floyd([v1, v2, v3, v4, v5, v6, v7]);
    floydAlgorithm.floyd();

    //const dijkstraAlgorithm = new Dijkstra([v1, v2, v3, v4, v5, v6, v7]);
    //dijkstraAlgorithm.dijkstra(v1);

    return {
        vertex: [v1, v2, v3, v4, v5, v6, v7],
        edges: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12]
    };
}

initGraph();