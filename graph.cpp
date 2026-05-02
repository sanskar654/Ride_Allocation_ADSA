#include "graph.h"
#include <set>

void Graph::addEdge(const string& u, const string& v, double weight) {
    adjList[u].push_back({v, weight});
    adjList[v].push_back({u, weight});
}

pair<double, vector<string>> Graph::dijkstra(const string& startNode, const string& endNode) {
    map<string, double> dist;
    map<string, string> parent;
    for (auto it = adjList.begin(); it != adjList.end(); ++it) {
        dist[it->first] = 1e9;
    }
    
    priority_queue<pair<double, string>, vector<pair<double, string>>, greater<pair<double, string>>> pq;
    
    dist[startNode] = 0;
    pq.push({0, startNode});
    
    while (!pq.empty()) {
        string u = pq.top().second;
        double d = pq.top().first;
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (size_t i = 0; i < adjList[u].size(); ++i) {
            string v = adjList[u][i].first;
            double weight = adjList[u][i].second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }
    
    vector<string> path;
    if (dist[endNode] == 1e9) return {-1, path};
    
    string curr = endNode;
    while (curr != "") {
        path.push_back(curr);
        curr = parent[curr];
        if (curr == startNode) {
            path.push_back(startNode);
            break;
        }
    }
    reverse(path.begin(), path.end());
    return {dist[endNode], path};
}

vector<pair<double, vector<string>>> Graph::getAllPaths(const string& start, const string& end) {
    vector<pair<double, vector<string>>> allPaths;
    map<string, bool> visited;
    vector<string> path;
    findPathsDFS(start, end, visited, path, 0, allPaths);
    sort(allPaths.begin(), allPaths.end());
    return allPaths;
}

void Graph::findPathsDFS(string u, string d, map<string, bool>& visited, vector<string>& path, double currentDist, vector<pair<double, vector<string>>>& allPaths) {
    visited[u] = true;
    path.push_back(u);
    
    if (u == d) {
        allPaths.push_back({currentDist, path});
    } else {
        for (size_t i = 0; i < adjList[u].size(); ++i) {
            if (!visited[adjList[u][i].first]) {
                findPathsDFS(adjList[u][i].first, d, visited, path, currentDist + adjList[u][i].second, allPaths);
            }
        }
    }
    
    path.pop_back();
    visited[u] = false;
}

bool Graph::hasLocation(const string& node) {
    return adjList.find(node) != adjList.end();
}

vector<string> Graph::getAllLocations() {
    vector<string> locs;
    for (auto it = adjList.begin(); it != adjList.end(); ++it) {
        locs.push_back(it->first);
    }
    return locs;
}
