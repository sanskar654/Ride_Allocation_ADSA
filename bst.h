#ifndef BST_H
#define BST_H

#include <iostream>
#include <vector>
#include "driver.h"
#include "utils.h"

using namespace std;

struct BSTNode {
    Driver* driver;
    BSTNode* left;
    BSTNode* right;

    BSTNode(Driver* d) : driver(d), left(nullptr), right(nullptr) {}
};

class DriverBST {
private:
    BSTNode* root;

    BSTNode* insert(BSTNode* node, Driver* d) {
        if (!node) return new BSTNode(d);
        if (d->rating < node->driver->rating)
            node->left = insert(node->left, d);
        else
            node->right = insert(node->right, d);
        return node;
    }

    void inOrder(BSTNode* node) {
        if (!node) return;
        inOrder(node->right);
        cout << YELLOW << left << setw(15) << node->driver->name 
                  << setw(10) << node->driver->rating 
                  << setw(15) << node->driver->currentLocation 
                  << (node->driver->isAvailable ? GREEN "Available" : RED "Busy") << RESET << endl;
        inOrder(node->left);
    }

    void clear(BSTNode* node) {
        if (!node) return;
        clear(node->left);
        clear(node->right);
        delete node;
    }

public:
    DriverBST() : root(nullptr) {}
    ~DriverBST() { clear(root); }

    void insert(Driver* d) {
        root = insert(root, d);
    }

    void displaySorted() {
        cout << BOLD << CYAN << left << setw(15) << "Name" 
                  << setw(10) << "Rating" 
                  << setw(15) << "Location" 
                  << "Status" << RESET << endl;
        Utils::printDivider();
        inOrder(root);
    }
};

#endif
