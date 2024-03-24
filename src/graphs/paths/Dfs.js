// Homework, this presentation will be on fridays
// in lab.
const dfs = (source) => {
    dfsHelper(source);
}

const dfsHelper = (vertex) => {
    if (vertex.visited) {
        return;
    }

    vertex.visited = true;
    vertex.print(); 

    vertex.getVertexList().forEach(neighbour => {
        dfsHelper(neighbour);
    });
}

export default dfs;
