#ifndef RIDE_H
#define RIDE_H

#include <string>
#include <vector>

using namespace std;

struct Ride {
    string userName;
    string driverName;
    string source;
    vector<string> path;
    string destination;
    double distance;
    double fare;

    Ride(string user, string driver, string src, string dest, double dist, double f, vector<string> p)
        : userName(user), driverName(driver), source(src), destination(dest), distance(dist), fare(f), path(p) {}
};

#endif
