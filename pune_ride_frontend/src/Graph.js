export class Graph {
    constructor() {
        this.adjList = {};
    }

    addEdge(u, v, weight) {
        if (!this.adjList[u]) this.adjList[u] = [];
        if (!this.adjList[v]) this.adjList[v] = [];
        this.adjList[u].push({ node: v, weight });
        this.adjList[v].push({ node: u, weight });
    }

    dijkstra(startNode, endNode) {
        let distances = {};
        let prev = {};
        let pq = new Set();

        for (let node in this.adjList) {
            distances[node] = Infinity;
            pq.add(node);
        }
        distances[startNode] = 0;

        while (pq.size > 0) {
            let u = null;
            for (let node of pq) {
                if (u === null || distances[node] < distances[u]) u = node;
            }

            if (distances[u] === Infinity || u === endNode) break;
            pq.delete(u);

            for (let edge of this.adjList[u]) {
                let alt = distances[u] + edge.weight;
                if (alt < distances[edge.node]) {
                    distances[edge.node] = alt;
                    prev[edge.node] = u;
                }
            }
        }

        let path = [];
        let curr = endNode;
        while (curr) {
            path.push(curr);
            curr = prev[curr];
        }
        path.reverse();

        return { distance: distances[endNode], path: path[0] === startNode ? path : [] };
    }
}
