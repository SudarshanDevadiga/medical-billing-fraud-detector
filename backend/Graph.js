class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(from, to) {
    this.addVertex(from);
    this.addVertex(to);
    this.adjacencyList.get(from).push(to);
  }

  bfs(startVertex) {
    const visited = new Set();
    const queue = [startVertex];
    const result = [];
    visited.add(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  dfs(startVertex) {
    const visited = new Set();
    const result = [];
    this._dfsHelper(startVertex, visited, result);
    return result;
  }

  _dfsHelper(vertex, visited, result) {
    visited.add(vertex);
    result.push(vertex);
    const neighbors = this.adjacencyList.get(vertex) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this._dfsHelper(neighbor, visited, result);
      }
    }
  }

  getTopReferrers(limit = 5) {
    const degrees = [];
    for (const [vertex, neighbors] of this.adjacencyList) {
      degrees.push({ vertex, degree: neighbors.length });
    }
    return degrees.sort((a, b) => b.degree - a.degree).slice(0, limit);
  }
}

module.exports = Graph;
