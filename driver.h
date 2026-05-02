#ifndef DRIVER_H
#define DRIVER_H

#include <string>

using namespace std;

struct Driver {
    string name;
    double rating;
    string currentLocation;
    bool isAvailable;

    Driver(string n = "", double r = 0.0, string loc = "", bool avail = true)
        : name(n), rating(r), currentLocation(loc), isAvailable(avail) {}
};

#endif
