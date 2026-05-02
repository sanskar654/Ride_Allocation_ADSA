#ifndef HEAP_H
#define HEAP_H

#include <vector>
#include "driver.h"

using namespace std;

struct HeapNode {
    double priority;
    Driver* driver;

    HeapNode(double p, Driver* d) : priority(p), driver(d) {}
};

class MinHeap {
private:
    vector<HeapNode> heap;

    void heapifyUp(int index) {
        while (index > 0) {
            int parent = (index - 1) / 2;
            if (heap[index].priority < heap[parent].priority) {
                swap(heap[index], heap[parent]);
                index = parent;
            } else break;
        }
    }

    void heapifyDown(int index) {
        int smallest = index;
        int left = 2 * index + 1;
        int right = 2 * index + 2;

        if (left < heap.size() && heap[left].priority < heap[smallest].priority)
            smallest = left;
        if (right < heap.size() && heap[right].priority < heap[smallest].priority)
            smallest = right;

        if (smallest != index) {
            swap(heap[index], heap[smallest]);
            heapifyDown(smallest);
        }
    }

public:
    void push(double priority, Driver* driver) {
        heap.push_back(HeapNode(priority, driver));
        heapifyUp(heap.size() - 1);
    }

    Driver* pop() {
        if (heap.empty()) return nullptr;
        Driver* topDriver = heap[0].driver;
        heap[0] = heap.back();
        heap.pop_back();
        if (!heap.empty()) heapifyDown(0);
        return topDriver;
    }

    bool empty() {
        return heap.empty();
    }
};

#endif
