const readline = require('readline');

class Floyd {
    constructor() {
        this.vertices = new Map();
        this.Matriz = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    addVertex(label) {
        if (!this.vertices.has(label)) {
            this.vertices.set(label, this.vertices.size);
        }
    }

    addEdge(srcLabel, destLabel, weight = 1) {
        const srcIndex = this.vertices.get(srcLabel);
        const destIndex = this.vertices.get(destLabel);

        if (!this.Matriz[srcIndex]) {
            this.Matriz[srcIndex] = [];
        }
        this.Matriz[srcIndex][destIndex] = weight;
    }

    async inputVerticesAndEdges() {
        const rl = this.rl;

        return new Promise((resolve, reject) => {
            rl.question('Chura, ingresa los vértices (separados por espacios): ', function (vertexInput) {
                vertexInput.trim().split(/\s+/).forEach(vertex => this.addVertex(vertex));

                rl.question('Ahora ingresa las aristas en formato src dest peso (una por línea): ', function (edgeInput) {
                    edgeInput.trim().split('\n').forEach(edge => {
                        const [srcLabel, destLabel, weight] = edge.trim().split(/\s+/);
                        this.addEdge(srcLabel, destLabel, parseInt(weight));
                    });

                    resolve();
                    rl.close();
                }.bind(this));
            }.bind(this));
        });
    }

    floydd() {
        const n = this.vertices.size;
        const dist = this.adjMatrix.map(row => row.slice());

        for (let k = 0; k < n; k++) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (dist[i][k] !== undefined && dist[k][j] !== undefined) {
                        if (dist[i][j] === undefined || dist[i][k] + dist[k][j] < dist[i][j]) {
                            dist[i][j] = dist[i][k] + dist[k][j];
                        }
                    }
                }
            }
        }

        console.log("Matriz de distancias mínimas:");
        for (let i = 0; i < n; i++) {
            let row = "";
            for (let j = 0; j < n; j++) {
                row += dist[i][j] !== undefined ? `${dist[i][j]} ` : "INF ";
            }
            console.log(row);
        }
    }
}

async function main() {
    const fw = new Floyd();
    await fw.inputVerticesAndEdges();
    fw.floydd();
}

main();
