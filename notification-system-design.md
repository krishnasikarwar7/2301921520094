# Notification System Design

## Approach & Sorting Algorithm
To isolate critical notifications without relying on custom database queries, a front-end ranking evaluation matrix was introduced. The parsing function filters and shifts elements iteratively based on assigned hierarchical values:
- **Placement**: Weight 3
- **Result**: Weight 2
- **Event**: Weight 1

When item weights are uniform, tie-breaking evaluation computes date differentials using native unix millisecond evaluations via JavaScript's standard `Date` conversions.

## System Efficiency & Stream Maintenance
- **Time Complexity:** The routine operates at $O(N \log N)$ based on native browser sorting implementations.
- **Scale Strategy:** To handle streaming real-time inputs cleanly as thousands of notifications roll in, a **Min-Heap (Priority Queue)** configuration capped tightly at sizing $k=10$ could be used. This drops processing down to an isolated execution step of $O(N \log k)$, keeping client memory completely optimal.