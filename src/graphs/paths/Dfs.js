// Homework, this presentation will be on fridays
// in lab.
const dfs = (source) => {
    source.setVisited(true);
    const vertexLine = [];
    vertexLine.push(source);
    while (!isEmpty(vertexLine)) {
        const firstVertex = vertexLine.shift();
        firstVertex.print();
        firstVertex.getVertexList().forEach(vertex => {
            if (!vertex.getVisited()) {
                //set the first vertex like a visited
                vertex.setVisited(true);
                //add to the line
                vertexLine.push(vertex);
            }
            
        });
    }
}
const isEmpty = (vertexLine) => {
    return vertexLine.length === 0;
}
export default dfs;