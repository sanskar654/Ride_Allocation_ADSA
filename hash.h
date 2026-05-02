#ifndef HASH_H
#define HASH_H

#include <string>
#include <vector>
#include <list>
#include "ride.h"
#include "utils.h"

using namespace std;

class RideHistory {
private:
    static const int TABLE_SIZE = 10;
    vector<list<Ride>> table;

    int hashFunction(const string& key) {
        int hash = 0;
        for (char ch : key) hash += ch;
        return hash % TABLE_SIZE;
    }

public:
    RideHistory() : table(TABLE_SIZE) {}

    void addRide(const Ride& ride) {
        int index = hashFunction(ride.userName);
        table[index].push_back(ride);
    }

    void displayHistory(const string& userName) {
        int index = hashFunction(userName);
        bool found = false;

        Utils::printHeader("RIDE HISTORY: " + userName);
        for (const auto& ride : table[index]) {
            if (ride.userName == userName) {
                cout << YELLOW << "Driver: " << RESET << ride.driverName 
                          << " | " << YELLOW << "Path: " << RESET;
                for (size_t i = 0; i < ride.path.size(); ++i) {
                    cout << ride.path[i] << (i == ride.path.size() - 1 ? "" : " -> ");
                }
                cout << "\n" << YELLOW << "Distance: " << RESET << ride.distance << " km"
                          << " | " << YELLOW << "Fare: " << RESET << "₹" << ride.fare << endl;
                Utils::printDivider();
                found = true;
            }
        }

        if (!found) {
            cout << RED << "No history found for user: " << userName << RESET << endl;
        }
    }
};

#endif
