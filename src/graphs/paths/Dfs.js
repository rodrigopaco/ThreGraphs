// Homework, this presentation will be on fridays
// in lab.
const dfs = (source) => {
    const vertexStack = [];
    source.setVisited(true);
    vertexStack.push(source);

    while (vertexStack.length !== 0) {
        const currentVertex = vertexStack.pop();
        currentVertex.print();
        
        currentVertex.getVertexList().forEach(neighbor => {
            if (!neighbor.getVisited()) {
                neighbor.setVisited(true);
                vertexStack.push(neighbor);
            }
        });
    }
}
export default dfs;