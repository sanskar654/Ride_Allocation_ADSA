# 🚖 Pune Ride Allocation System: Technical Justification & Manual

## 1. Project Overview
This project is a high-fidelity **Logistics Allocation System** designed for the Pune metropolitan area. It transforms traditional pathfinding concepts into a real-world supply-demand matching engine. Unlike standard navigation apps, this system solves the **"Matching Problem"**: *Which driver should be assigned to which rider to maximize efficiency and city-wide flow?*

---

## 2. Core Architecture (The Hybrid Model)
The system is built using a **Hybrid Stack** to demonstrate both low-level algorithmic efficiency and modern software usability:

*   **Backend Logic (C++)**: Implements core Data Structures (Graphs, BST, Heaps) for maximum memory efficiency and speed. Ideal for simulating massive city-wide simulations.
*   **Frontend GUI (React.js)**: A professional interface using **Leaflet.js** for real-time mapping and **Framer Motion** for glassmorphism animations.
*   **Routing Layer (OSRM API)**: Integrates real-road geometry data via Open Source Routing Machine to bridge the gap between abstract graphs and real streets.

---

## 3. Scientific Concepts (Beginner Friendly)

### A. Graph Theory (The City Blueprint)
We represent Pune as a **Weighted Directed Graph**:
- **Nodes (Vertices)**: Major hubs like Hinjewadi, Swargate, Kothrud.
- **Edges (Links)**: The roads connecting these hubs.
- **Weights**: The "Cost" of traveling (Distance + Simulated Traffic).

### B. Dijkstra’s Algorithm (Smart Navigation)
The algorithm calculates the "Shortest Path" from point A to B. We use an optimized version:
- **Classic Dijkstra**: Finds path based on distance.
- **Our Innovation**: We use **Traffic-Aware Weights**. $Cost = Distance \times Traffic Factor$. This means the system will lead you *away* from a 5km red road onto an 8km green road to save time.

### C. Min-Heap (Fair Allocation)
To assign a driver, we don't just pick the closest one. We use a **Min-Heap** to prioritize drivers based on a **Balanced Score**:
$$\text{Score} = \frac{\text{Distance to User}}{\text{Driver Rating}}$$
This ensures that high-rated drivers are rewarded with more rides, even if they are slightly further away, maintaining system quality.

---

## 4. Key Features & Innovations

1.  **Real-Road Geometry**: No straight lines. The system uses OSRM API to fetch the actual curves and twists of Pune's roads.
2.  **Simulated Traffic Heatmap**: Visualizes road segments in **Green (Fast)**, **Yellow (Moderate)**, and **Red (Heavy)**.
3.  **Eco-Tracker**: Calculates the CO2 footprint of every trip, encouraging city-wide sustainability awareness.
4.  **Safety Index**: A predictive score based on path complexity and simulated urban brightness.
5.  **Digital Receipt Generation**: Generates a `.txt` ticket for every ride, including all logistical meta-data.

---

## 5. How to Run (Getting Started)

### Prerequisites:
- **Node.js** (for the Web GUI)
- **G++ Compiler** (for the C++ Console version)

### Steps for GUI (Web):
1.  Open the folder `pune_ride_frontend` in your terminal.
2.  Run `npm install` (to download dependencies like Leaflet).
3.  Run `npm run dev`.
4.  Open the link shown (usually `http://localhost:5173/`).

### Steps for Console (C++):
1.  Open the root folder.
2.  Compile the source: `g++ main.cpp menu.cpp graph.cpp -o pune_ride.exe`
3.  Run the executable: `./pune_ride.exe`

---

## 6. Viva Questions & Expected Answers

**Q: Why use a Graph instead of a simple Array?**
*A: Arrays are linear. A city is a complex network of branching paths. Graphs allow us to represent non-linear relationships and use pathfinding algorithms like Dijkstra which are not possible on arrays.*

**Q: What is the Time Complexity of your pathfinding?**
*A: We use Dijkstra with a Priority Queue, which has a complexity of **O(E log V)**, where E is the number of roads (edges) and V is the number of locations (vertices).*

**Q: Is the traffic data real?**
*A: For this project, we use a **Dynamic Simulation Model**. It mimics real-world traffic fluctuations to test how the algorithm handles congestion. It can be easily connected to the Google Maps Traffic API for real-time production use.*

---

## 7. Future Scope
- **Dynamic Pricing**: Implementing surge pricing during heavy rain or peak hours.
- **Pooling Logic**: Extending the algorithm to match two users going to similar destinations.
- **Electric Vehicle (EV) Preference**: Prioritizing EV drivers to further reduce the Eco-Footprint.

## 8. Team Contribution & Task Distribution

| Member Name | Core Responsibility | Key Technical Contributions |
| :--- | :--- | :--- |
| **Daksh** | **Algorithm Core** | Implementation of **Dijkstra’s Logic** and Traffic-aware pathfinding. |
| **Sanskar** | **Dispatch Engine** | Built the **Min-Heap (Priority Queue)** for score-based driver assignment. |
| **Shlok** | **Mapping & API** | Integrated the **OSRM Routing API** and Leaflet.js map architecture. |
| **Aryan** | **GUI & Analytics** | Designed the **React Dashboard** and implemented the **Eco/Safety metrics**. |

---
*Created with ❤️ for the Pune Engineering Community.*
