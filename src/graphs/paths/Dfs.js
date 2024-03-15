// Homework, this presentation will be on fridays
// in lab.
const dfs = (source) => {
    const visited = new Set();
    dfsHelper(source, visited);
}

const dfsHelper = (vertex, visited) => {
    visited.add(vertex);
    vertex.print(); 

    vertex.getVertexList().forEach(neighbour => {
        if (!visited.has(neighbour)) {
            dfsHelper(neighbour, visited);
        }
    });
}

export default dfs;