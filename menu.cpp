#include "menu.h"
#include "utils.h"
#include "heap.h"
#include <iostream>
#include <fstream>
#include <ctime>
#include <windows.h>

using namespace std;

Menu::Menu() {
    initializeData();
}

void Menu::initializeData() {
    // AUDITED GOOGLE-MAPS PUNE GRAPH
    cityMap.addEdge("Hinjewadi", "Baner", 8.5);
    cityMap.addEdge("Baner", "Shivajinagar", 9.2);
    cityMap.addEdge("Shivajinagar", "Swargate", 4.1);
    cityMap.addEdge("Swargate", "Katraj", 6.9); // Matched: 6.9km
    cityMap.addEdge("Swargate", "Kondhwa", 7.4);
    cityMap.addEdge("Kothrud", "Warje", 3.8);
    cityMap.addEdge("Kothrud", "Shivajinagar", 6.3);
    cityMap.addEdge("Shivajinagar", "Pune Station", 3.1);
    cityMap.addEdge("Pune Station", "Airport", 8.6);
    cityMap.addEdge("Airport", "Viman Nagar", 2.9);
    cityMap.addEdge("Viman Nagar", "Koregaon Park", 4.3);
    cityMap.addEdge("Koregaon Park", "Magarpatta", 6.1);
    cityMap.addEdge("Magarpatta", "Hadapsar", 3.2);
    cityMap.addEdge("Hadapsar", "Kondhwa", 8.4);
    cityMap.addEdge("Warje", "Katraj", 9.5); // Matched: 9.5km
    cityMap.addEdge("Baner", "Pimple Saudagar", 4.9);
    cityMap.addEdge("Hinjewadi", "Pimple Saudagar", 7.2);
    cityMap.addEdge("Ravet", "Hinjewadi", 7.5);
    cityMap.addEdge("Baner", "Aundh", 4.2);
    cityMap.addEdge("Aundh", "Shivajinagar", 5.1);
    cityMap.addEdge("Kothrud", "Pashan", 5.5);
    cityMap.addEdge("Pashan", "Bavdhan", 3.8);
    cityMap.addEdge("Bavdhan", "Warje", 4.1);
    cityMap.addEdge("Wakad", "Hinjewadi", 4.8);
    cityMap.addEdge("Wakad", "Baner", 6.2);

    // UNIFIED LOCAL ECONOMY FLEET (SYNCED WITH WEB - 26 DRIVERS)
    drivers.push_back(Driver("Arjun Singh", 4.9, "Hinjewadi"));
    drivers.push_back(Driver("Priya Sharma", 4.8, "Shivajinagar"));
    drivers.push_back(Driver("Rahul Verma", 4.7, "Koregaon Park"));
    drivers.push_back(Driver("Suresh Mane", 3.5, "Swargate"));
    drivers.push_back(Driver("Vikram Patil", 4.5, "Airport"));
    drivers.push_back(Driver("Nitin Shinde", 4.8, "Katraj"));
    drivers.push_back(Driver("Sagar Patil", 4.2, "Kondhwa"));
    drivers.push_back(Driver("Amol More", 4.6, "Warje"));
    drivers.push_back(Driver("Kiran Rao", 4.9, "Ravet"));
    drivers.push_back(Driver("Aditi Deshpande", 4.7, "Baner"));
    drivers.push_back(Driver("Sameer Kulkarni", 4.8, "Viman Nagar"));
    drivers.push_back(Driver("Megha Joshi", 4.5, "Magarpatta"));
    drivers.push_back(Driver("Rohit Pawar", 4.6, "Kothrud"));
    drivers.push_back(Driver("Sneha Gite", 4.4, "Aundh"));
    drivers.push_back(Driver("Prasad Bhide", 4.7, "Hadapsar"));
    drivers.push_back(Driver("Vivek Taware", 4.3, "Katraj"));
    drivers.push_back(Driver("Manoj Kadam", 4.8, "Pashan"));
    drivers.push_back(Driver("Deepak Shinde", 4.6, "Bavdhan"));
    drivers.push_back(Driver("Anil Gadgil", 4.9, "Shivajinagar"));
    drivers.push_back(Driver("Sunil Mankar", 4.2, "Airport"));
    drivers.push_back(Driver("Yogesh Dhone", 4.5, "Viman Nagar"));
    drivers.push_back(Driver("Ramesh Thorat", 4.3, "Pimple Saudagar"));
    drivers.push_back(Driver("Sanjay Lad", 4.7, "Wakad"));
    drivers.push_back(Driver("Ganesh Kale", 4.6, "Baner"));
    drivers.push_back(Driver("Vijay Gholap", 4.4, "Hadapsar"));
    drivers.push_back(Driver("Prakash Shelke", 4.8, "Katraj"));
}

void Menu::run() {
    Utils::clearScreen();
    Utils::printHeader("PUNE RIDE: SMART MOBILITY OS");
    cout << "Login Username: ";
    getline(cin, currentUser);

    int choice;
    do {
        Utils::clearScreen();
        Utils::printHeader("PUNE RIDE MAIN DASHBOARD");
        cout << YELLOW << "Operator: " << RESET << currentUser << "\n\n";
        cout << "1. Dispatch a Ride (Min-Heap)\n";
        cout << "2. View Fleet Analytics (BST)\n";
        cout << "3. Ride History & Logs\n";
        cout << "4. Exit System\n";
        Utils::printDivider();
        cout << "Enter selection: ";
        cin >> choice;
        cin.ignore();

        switch (choice) {
            case 1: bookRide(); break;
            case 2: viewDrivers(); break;
            case 3: viewHistory(); break;
            case 4: cout << GREEN << "System shutdown. Safe travels!" << RESET << endl; break;
            default: cout << RED << "Invalid Command!" << RESET << endl; Utils::pause(); break;
        }
    } while (choice != 4);
}

void Menu::viewDrivers() {
    Utils::clearScreen();
    Utils::printHeader("FLEET PERFORMANCE (SORTED BY RATING)");
    
    DriverBST bst;
    for (auto& d : drivers) {
        bst.insert(&d);
    }
    bst.displaySorted();
    Utils::pause();
}

void Menu::saveTicketToFile(Driver* d, string src, string dest, double dist, double fare) {
    ofstream ticket("Ride_Ticket.txt");
    ticket << "------------------------------------------\n";
    ticket << "          PUNE RIDE OFFICIAL TICKET\n";
    ticket << "------------------------------------------\n";
    ticket << "Operator: " << currentUser << "\n";
    ticket << "Driver:   " << d->name << "\n";
    ticket << "Vehicle:  Local Economy Unit\n";
    ticket << "Rating:   " << d->rating << " *\n\n";
    ticket << "Pickup:   " << src << "\n";
    ticket << "Drop:     " << dest << "\n";
    ticket << "Distance: " << dist << " km\n";
    ticket << "Total Fare: Rs. " << fare << " (Flat 20/KM)\n";
    ticket << "------------------------------------------\n";
    ticket << "   THANK YOU FOR USING PUNE RIDE ENGINE\n";
    ticket << "------------------------------------------\n";
    ticket.close();
}

void Menu::bookRide() {
    Utils::clearScreen();
    Utils::printHeader("DISPATCH COMMAND CENTER");

    vector<string> locations = cityMap.getAllLocations();
    cout << BOLD << "ACTIVE PUNE NODES: " << RESET;
    for (size_t i = 0; i < locations.size(); ++i) {
        cout << locations[i] << (i == locations.size() - 1 ? "" : " | ");
    }
    cout << "\n\n";

    string src, dest;
    cout << CYAN << "Source Location:      " << RESET;
    getline(cin, src);
    cout << CYAN << "Destination Location: " << RESET;
    getline(cin, dest);

    if (!cityMap.hasLocation(src) || !cityMap.hasLocation(dest)) {
        cout << RED << "\n[ALERT] Location out of Pune Network bounds!" << RESET << endl;
        Utils::pause();
        return;
      }

    auto allPaths = cityMap.getAllPaths(src, dest);
    if (allPaths.empty()) {
        cout << RED << "\n[ALERT] No path found in urban graph." << RESET << endl;
        Utils::pause();
        return;
    }

    Utils::clearScreen();
    Utils::printHeader("SCANNING PUNE GRAPH FOR OPTIMAL PATHS");
    cout << left << setw(15) << "STRATEGY" << setw(10) << "DIST" << setw(12) << "TRAFFIC" << "NODES" << endl;
    Utils::printDivider();

    int numDisplay = min((int)allPaths.size(), 3);
    for (int i = 0; i < numDisplay; ++i) {
        string tag = (i == 0) ? "MIN-DIST" : (i == 1) ? "BALANCED" : "ALT-PATH";
        string color = (i == 0) ? GREEN : (i == 1) ? YELLOW : MAGENTA;
        string traffic = (allPaths[i].first < 8) ? "LIGHT" : (allPaths[i].first < 15) ? "MODERATE" : "HEAVY";
        
        cout << color << left << setw(15) << tag 
                  << RESET << setw(10) << fixed << setprecision(1) << allPaths[i].first << " km"
                  << setw(12) << traffic << " ";
        
        for (size_t j = 0; j < allPaths[i].second.size(); ++j) {
            cout << allPaths[i].second[j] << (j == allPaths[i].second.size() - 1 ? "" : " > ");
        }
        cout << endl;
    }
    
    int routeChoice;
    cout << "\n" << BOLD << "Select Strategy (1-" << numDisplay << "): " << RESET;
    cin >> routeChoice;
    cin.ignore();

    if (routeChoice < 1 || routeChoice > numDisplay) return;

    double distance = allPaths[routeChoice - 1].first;
    vector<string> path = allPaths[routeChoice - 1].second;

    cout << "\n" << YELLOW << "[SCANNING] Running Min-Heap Dispatch Algorithm";
    for(int i=0; i<3; i++) {
        cout << ".";
        cout.flush();
        Sleep(500);
    }
    cout << RESET << endl;

    cout << CYAN << "[GRAPH] Searching nearest nodes from " << src << "..." << RESET << endl;
    Sleep(800);

    MinHeap pq;
    bool foundDriver = false;
    for (auto& d : drivers) {
        if (d.isAvailable) {
            auto locData = cityMap.dijkstra(d.currentLocation, src);
            if (locData.first != -1) {
                // COST = DISTANCE / RATING (Lower is better)
                double priority = (double)locData.first / d.rating;
                pq.push(priority, &d);
                foundDriver = true;
            }
        }
    }

    if (!foundDriver) {
        cout << RED << "\n[SYSTEM] Zero units available in Pune Sector." << RESET << endl;
        Utils::pause();
        return;
    }

    Driver* bestDriver = pq.pop();
    double finalFare = distance * 20.0; // Flat 20 Rs/KM - No Surge

    Utils::clearScreen();
    Utils::printHeader("OPTIMAL MATCH FOUND (MIN-HEAP)");
    
    cout << setprecision(2) << fixed;
    cout << "Best Driver:    " << BOLD << GREEN << bestDriver->name << RESET << " (" << bestDriver->rating << " stars)\n";
    cout << "Current Loc:    " << bestDriver->currentLocation << "\n";
    cout << "Total Distance: " << distance << " km\n";
    cout << "Trip Duration:  " << (int)(distance * 1.5) << " mins\n";
    Utils::printDivider();
    cout << BOLD << "FINAL FARE:    " << GREEN << "Rs. " << finalFare << RESET << " (Flat Rate)\n";
    Utils::printDivider();

    cout << "Confirm Dispatch & Print Ticket? (y/n): ";
    char confirm;
    cin >> confirm;
    cin.ignore();

    if (confirm == 'y' || confirm == 'Y') {
        bestDriver->isAvailable = false;
        bestDriver->currentLocation = dest;
        saveTicketToFile(bestDriver, src, dest, distance, finalFare);
        history.addRide(Ride(currentUser, bestDriver->name, src, dest, distance, finalFare, path));
        cout << BOLD << GREEN << "\n[SUCCESS] E-Ticket Printed! Driver dispatched to " << src << RESET << endl;
    } else {
        cout << RED << "\n[CANCELLED] Transaction voided." << RESET << endl;
    }
    Utils::pause();
}

void Menu::viewHistory() {
    Utils::clearScreen();
    Utils::printHeader("PUNE RIDE: ANALYTICS LOGS");
    history.displayHistory(currentUser);
    Utils::pause();
}
