#ifndef GRAPH_H
#define GRAPH_H

#include <string>
#include <vector>
#include <map>
#include <queue>
#include <algorithm>

using namespace std;

class Graph {
private:
    map<string, vector<pair<string, double>>> adjList;

public:
    void addEdge(const string& u, const string& v, double weight);
    pair<double, vector<string>> dijkstra(const string& startNode, const string& endNode);
    vector<pair<double, vector<string>>> getAllPaths(const string& start, const string& end);
    bool hasLocation(const string& node);
    vector<string> getAllLocations();
private:
    void findPathsDFS(string u, string d, map<string, bool>& visited, vector<string>& path, double currentDist, vector<pair<double, vector<string>>>& allPaths);
};

#endif
