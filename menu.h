#ifndef MENU_H
#define MENU_H

#include <vector>
#include <string>
#include "graph.h"
#include "driver.h"
#include "hash.h"
#include "bst.h"

using namespace std;

class Menu {
private:
    Graph cityMap;
    vector<Driver> drivers;
    RideHistory history;
    string currentUser;

    void initializeData();
    void bookRide();
    void viewDrivers();
    void viewHistory();
    void saveTicketToFile(Driver* d, string src, string dest, double dist, double fare);

public:
    Menu();
    void run();
};

#endif
