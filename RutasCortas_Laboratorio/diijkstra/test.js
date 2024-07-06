const { Graph, Node, dijkstrasAlgorithm } = require('./dijkstra');

let graph = new Graph();

let Potosi = new Node('Potosi');
let Oruro = new Node('Oruro');
let Beni = new Node('Beni');
let Sucre = new Node('Sucre');
let Tarija = new Node('Tarija');

let algoResult = null;

describe('Dijkstra', () => {

    before(function (done) {
        Potosi.addNeighbor(Oruro, 3);
        Potosi.addNeighbor(Beni, 5);

        Oruro.addNeighbor(Potosi, 3);
        Oruro.addNeighbor(Beni, 1);
        Oruro.addNeighbor(Sucre, 2);

        Beni.addNeighbor(Potosi, 5);
        Beni.addNeighbor(Oruro, 1);
        Beni.addNeighbor(Sucre, 3);
        Beni.addNeighbor(Tarija, 6);

        Sucre.addNeighbor(Oruro, 2);
        Sucre.addNeighbor(Beni, 3);
        Sucre.addNeighbor(Tarija, 4);

        Tarija.addNeighbor(Beni, 6);
        Tarija.addNeighbor(Sucre, 4);

        graph.addNode(Potosi);
        graph.addNode(Oruro);
        graph.addNode(Beni);
        graph.addNode(Sucre);
        graph.addNode(Tarija);

        done();
    });

    it('test Potosi as starting point', (done) => {

        graph.resetNodes();
        Potosi.start = true;

        algoResult = dijkstrasAlgorithm(graph, Potosi);
        console.log(algoResult);

        done();
    });

    it('test Oruro as starting point', (done) => {

        graph.resetNodes();
        Oruro.start = true;

        algoResult = dijkstrasAlgorithm(graph, Potosi);
        console.log(algoResult);

        done();
    });

    it('test Beni as starting point', (done) => {

        graph.resetNodes();
        Beni.start = true;

        algoResult = dijkstrasAlgorithm(graph, Potosi);
        console.log(algoResult);

        done();
    });

    it('test Sucre as starting point', (done) => {

        graph.resetNodes();
        Sucre.start = true;

        algoResult = dijkstrasAlgorithm(graph, Potosi);
        console.log(algoResult);

        done();
    });

    it('test Tarija as starting point', (done) => {

        graph.resetNodes();
        Tarija.start = true;

        algoResult = dijkstrasAlgorithm(graph, Potosi);
        console.log(algoResult);

        done();
    });

});
