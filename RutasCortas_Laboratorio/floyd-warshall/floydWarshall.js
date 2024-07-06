/**
 * @param {Graph} graph
 * @return {{distances: number[][], nextVertices: GraphVertex[][]}}
 */
export default function floydWarshall(graph) {
  // Obtener todos los vértices del grafo.
  const vertices = graph.getAllVertices();

  // Inicializar la matriz de vértices siguientes con null, lo que significa que no hay
  // vértices previos que nos den el camino más corto.
  const nextVertices = Array(vertices.length).fill(null).map(() => {
    return Array(vertices.length).fill(null);
  });

  // Inicializar la matriz de distancias con Infinidades, lo que significa que no hay
  // caminos entre vértices existentes hasta el momento.
  const distances = Array(vertices.length).fill(null).map(() => {
    return Array(vertices.length).fill(Infinity);
  });

  // Inicializar la matriz de distancias con la distancia que ya conocemos (de las aristas existentes).
  // Y también inicializar los vértices previos desde las aristas.
  vertices.forEach((startVertex, startIndex) => {
    vertices.forEach((endVertex, endIndex) => {
      if (startVertex === endVertex) {
        // La distancia al propio vértice es 0.
        distances[startIndex][endIndex] = 0;
      } else {
        // Encontrar la arista entre los vértices de inicio y fin.
        const edge = graph.findEdge(startVertex, endVertex);

        if (edge) {
          // Hay una arista desde el vértice con startIndex al vértice con endIndex.
          // Guardar la distancia y el vértice previo.
          distances[startIndex][endIndex] = edge.weight;
          nextVertices[startIndex][endIndex] = startVertex;
        } else {
          distances[startIndex][endIndex] = Infinity;
        }
      }
    });
  });

  // Ahora vamos al núcleo del algoritmo.
  // Recorramos todos los pares de vértices (de inicio a fin) e intentemos verificar si existe
  // un camino más corto entre ellos a través de un vértice intermedio. El vértice intermedio también puede ser
  // uno de los vértices del grafo. Como puedes ver, ahora vamos a tener tres bucles sobre todos los vértices del grafo:
  // para los vértices de inicio, fin y medios.
  vertices.forEach((middleVertex, middleIndex) => {
    // El camino comienza desde el vértice de inicio con el índice startIndex.
    vertices.forEach((startVertex, startIndex) => {
      // El camino termina en el vértice de fin con el índice endIndex.
      vertices.forEach((endVertex, endIndex) => {
        // Comparar la distancia existente desde el vértice de inicio hasta el vértice de fin,
        // con la distancia desde el vértice de inicio hasta el vértice de fin pero pasando por el vértice intermedio.
        // Guardar la distancia más corta y el vértice previo que nos permite tener esta distancia más corta.
        const distViaMiddle = distances[startIndex][middleIndex] + distances[middleIndex][endIndex];

        if (distances[startIndex][endIndex] > distViaMiddle) {
          // Hemos encontrado un camino más corto a través del vértice intermedio.
          distances[startIndex][endIndex] = distViaMiddle;
          nextVertices[startIndex][endIndex] = middleVertex;
        }
      });
    });
  });

  // Distancia más corta de x a y: distances[x][y].
  // Siguiente vértice después de x en el camino de x a y: nextVertices[x][y].
  return { distances, nextVertices };
}
