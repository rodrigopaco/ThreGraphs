// Homework, this presentation will be on fridays
// in lab.
const dfs = (source) => {
    const stack = [];
    source.setVisited(true);
    stack.push(source);

    while (stack.length !== 0) {
        const currentVertex = stack.pop();
        currentVertex.print();

        currentVertex.getVertexList().forEach(vertex => {
            if (!vertex.getVisited()) {
                vertex.setVisited(true);
                stack.push(vertex);
            }
        });
    }
};

export default dfs;
