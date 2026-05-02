#ifndef UTILS_H
#define UTILS_H

#include <iostream>
#include <string>
#include <vector>
#include <iomanip>

using namespace std;

#define RESET   "\033[0m"
#define RED     "\033[31m"
#define GREEN   "\033[32m"
#define YELLOW  "\033[33m"
#define BLUE    "\033[34m"
#define MAGENTA "\033[35m"
#define CYAN    "\033[36m"
#define BOLD    "\033[1m"

namespace Utils {
    inline void clearScreen() {
#ifdef _WIN32
        system("cls");
#else
        system("clear");
#endif
    }

    inline void printHeader(const string& title) {
        cout << CYAN << "========================================" << RESET << endl;
        cout << BOLD << YELLOW << "      " << title << RESET << endl;
        cout << CYAN << "========================================" << RESET << endl;
    }

    inline void printDivider() {
        cout << CYAN << "----------------------------------------" << RESET << endl;
    }

    inline void pause() {
        cout << "\nPress Enter to continue...";
        cin.ignore();
        cin.get();
    }
}

#endif
