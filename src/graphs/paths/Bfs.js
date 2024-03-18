import delay from '../../shapes/utils/delay';
const bfs = async(source) => {
    source.setVisited(true);
    source.setColor(0x00ff00);
    await delay();
    const vertexLine = [];
    vertexLine.push(source);
    while (!isEmpty(vertexLine)) {
        const firstVertex = vertexLine.pop();
        firstVertex.print();
        firstVertex?.setColor(0x00ff00);
        await delay();
        firstVertex.getVertexList().forEach(async (vertex )=> {
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
export default bfs;
