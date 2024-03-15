// Homework, this presentation will be on fridays
// in lab.
const dfs = (source) => {
    source.setVisited(true);
    const vertexStack = [];
    vertexStack.push(source);
    while (!isEmpty(vertexStack)) {
        const currentVertex = vertexStack.pop();
        currentVertex.print();
        currentVertex.getVertexList().forEach(neighbor => {
            if (!neighbor.getVisited()) {
                neighbor.setVisited(true);
                vertexStack.push(neighbor);
            }
        });
    }
};

const isEmpty = (vertexStack) => {
    return vertexStack.length === 0;
};

export default dfs;