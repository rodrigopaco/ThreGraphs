import delay from '../../shapes/utils/delay';

class Dijkstra {
    constructor(vertices) {
        this.vertices = vertices;
    }

    async dijkstra(sourceVertex) {
        const dis = {}; 
        const prev = {}; 

        this.vertices.forEach(vertex => {
            dis[vertex.getLabel()] = Infinity;
            prev[vertex.getLabel()] = null;
        });
        dis[sourceVertex.getLabel()] = 0;

        const unvisited = new Set(this.vertices);

        while (unvisited.size > 0) {
            let minVertex = null;
            let minDis = Infinity;

            unvisited.forEach(vertex => {
                if (dis[vertex.getLabel()] < minDis) {
                    minDis = dis[vertex.getLabel()];
                    minVertex = vertex;
                }
            });

            if (!minVertex) break;

            unvisited.delete(minVertex);

            minVertex.getEdgesList().forEach(async edge => {
                const neighbor = edge.getDestination();
                const alt = dis[minVertex.getLabel()] + edge.getWeight();
                if (alt < dis[neighbor.getLabel()]) {
                    dis[neighbor.getLabel()] = alt;
                    prev[neighbor.getLabel()] = minVertex.getLabel();
                    this.vertices.forEach(v => {
                        if (v === neighbor || v === minVertex) {
                            v.setColor(0x00ff00);
                        }
                    });
                    await delay();
                }
            });
        }

        console.log("Distancias mínimas desde el vértice de origen: ");
        console.table(dis);

        console.log("Vértices previos en el camino más corto: ");
        console.table(prev);

        return { dis, prev };
    }
}

export default Dijkstra;
