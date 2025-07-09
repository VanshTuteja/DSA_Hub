"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTopics = void 0;
// export const defaultTopics: ITopic[] = [
//   {
//     id: "arrays",
//     name: "Arrays",
//     prerequisites: [],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "strings",
//     name: "Strings",
//     prerequisites: [],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "linked-lists",
//     name: "Linked Lists",
//     prerequisites: ["arrays"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "doubly-linked-lists",
//     name: "Doubly Linked Lists",
//     prerequisites: ["linked-lists"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "stacks",
//     name: "Stacks",
//     prerequisites: ["arrays", "linked-lists"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "queues",
//     name: "Queues",
//     prerequisites: ["arrays", "linked-lists"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "deque",
//     name: "Deque (Double-ended Queue)",
//     prerequisites: ["queues"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "priority-queues",
//     name: "Priority Queues",
//     prerequisites: ["queues", "arrays"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "hash-tables",
//     name: "Hash Tables",
//     prerequisites: ["arrays"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "sets",
//     name: "Sets",
//     prerequisites: ["hash-tables"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "maps",
//     name: "Maps",
//     prerequisites: ["hash-tables"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   }
// ];
exports.defaultTopics = [
    // Basic Data Structures
    {
        id: "arrays",
        name: "Arrays",
        prerequisites: [],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "strings",
        name: "Strings",
        prerequisites: [],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "matrices",
        name: "Matrices",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Linked Data Structures
    {
        id: "linked-lists",
        name: "Linked Lists",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "doubly-linked-lists",
        name: "Doubly Linked Lists",
        prerequisites: ["linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "circular-linked-lists",
        name: "Circular Linked Lists",
        prerequisites: ["linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Stack and Queue Structures
    {
        id: "stacks",
        name: "Stacks",
        prerequisites: ["arrays", "linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "queues",
        name: "Queues",
        prerequisites: ["arrays", "linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "deque",
        name: "Deque (Double-ended Queue)",
        prerequisites: ["queues"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "priority-queues",
        name: "Priority Queues",
        prerequisites: ["queues", "arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Hash-based Structures
    {
        id: "hash-tables",
        name: "Hash Tables",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "sets",
        name: "Sets",
        prerequisites: ["hash-tables"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "maps",
        name: "Maps",
        prerequisites: ["hash-tables"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Tree Structures
    {
        id: "trees",
        name: "Trees",
        prerequisites: ["linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "binary-trees",
        name: "Binary Trees",
        prerequisites: ["trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "binary-search-trees",
        name: "Binary Search Trees",
        prerequisites: ["binary-trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "avl-trees",
        name: "AVL Trees",
        prerequisites: ["binary-search-trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "red-black-trees",
        name: "Red-Black Trees",
        prerequisites: ["binary-search-trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "b-trees",
        name: "B-Trees",
        prerequisites: ["binary-search-trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "segment-trees",
        name: "Segment Trees",
        prerequisites: ["binary-trees", "arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "fenwick-trees",
        name: "Fenwick Trees (Binary Indexed Trees)",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "trie",
        name: "Trie (Prefix Tree)",
        prerequisites: ["trees", "strings"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "suffix-trees",
        name: "Suffix Trees",
        prerequisites: ["trie", "strings"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Heap Structures
    {
        id: "heaps",
        name: "Heaps",
        prerequisites: ["binary-trees", "priority-queues"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "min-heap",
        name: "Min Heap",
        prerequisites: ["heaps"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "max-heap",
        name: "Max Heap",
        prerequisites: ["heaps"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "fibonacci-heap",
        name: "Fibonacci Heap",
        prerequisites: ["heaps"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Graph Structures
    {
        id: "graphs",
        name: "Graphs",
        prerequisites: ["arrays", "linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "adjacency-matrix",
        name: "Adjacency Matrix",
        prerequisites: ["graphs", "matrices"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "adjacency-list",
        name: "Adjacency List",
        prerequisites: ["graphs", "linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "weighted-graphs",
        name: "Weighted Graphs",
        prerequisites: ["graphs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "directed-graphs",
        name: "Directed Graphs",
        prerequisites: ["graphs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Disjoint Set Union
    {
        id: "union-find",
        name: "Union-Find (Disjoint Set Union)",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Sorting Algorithms
    {
        id: "bubble-sort",
        name: "Bubble Sort",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "selection-sort",
        name: "Selection Sort",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "insertion-sort",
        name: "Insertion Sort",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "merge-sort",
        name: "Merge Sort",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "quick-sort",
        name: "Quick Sort",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "heap-sort",
        name: "Heap Sort",
        prerequisites: ["heaps", "arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "counting-sort",
        name: "Counting Sort",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "radix-sort",
        name: "Radix Sort",
        prerequisites: ["counting-sort"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "bucket-sort",
        name: "Bucket Sort",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Searching Algorithms
    {
        id: "linear-search",
        name: "Linear Search",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "binary-search",
        name: "Binary Search",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "ternary-search",
        name: "Ternary Search",
        prerequisites: ["binary-search"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "exponential-search",
        name: "Exponential Search",
        prerequisites: ["binary-search"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "interpolation-search",
        name: "Interpolation Search",
        prerequisites: ["binary-search"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Tree Traversal Algorithms
    {
        id: "tree-traversal",
        name: "Tree Traversal",
        prerequisites: ["binary-trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "dfs-traversal",
        name: "Depth-First Search (DFS)",
        prerequisites: ["tree-traversal", "stacks"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "bfs-traversal",
        name: "Breadth-First Search (BFS)",
        prerequisites: ["tree-traversal", "queues"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "inorder-traversal",
        name: "Inorder Traversal",
        prerequisites: ["tree-traversal"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "preorder-traversal",
        name: "Preorder Traversal",
        prerequisites: ["tree-traversal"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "postorder-traversal",
        name: "Postorder Traversal",
        prerequisites: ["tree-traversal"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Graph Algorithms
    {
        id: "graph-traversal",
        name: "Graph Traversal",
        prerequisites: ["graphs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "graph-dfs",
        name: "Graph DFS",
        prerequisites: ["graph-traversal", "dfs-traversal"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "graph-bfs",
        name: "Graph BFS",
        prerequisites: ["graph-traversal", "bfs-traversal"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "topological-sort",
        name: "Topological Sort",
        prerequisites: ["directed-graphs", "graph-dfs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "strongly-connected-components",
        name: "Strongly Connected Components",
        prerequisites: ["directed-graphs", "graph-dfs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "bipartite-graphs",
        name: "Bipartite Graphs",
        prerequisites: ["graphs", "graph-bfs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "cycle-detection",
        name: "Cycle Detection",
        prerequisites: ["graphs", "graph-dfs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Shortest Path Algorithms
    {
        id: "dijkstra",
        name: "Dijkstra's Algorithm",
        prerequisites: ["weighted-graphs", "priority-queues"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "bellman-ford",
        name: "Bellman-Ford Algorithm",
        prerequisites: ["weighted-graphs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "floyd-warshall",
        name: "Floyd-Warshall Algorithm",
        prerequisites: ["weighted-graphs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "a-star",
        name: "A* Search Algorithm",
        prerequisites: ["dijkstra"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Minimum Spanning Tree
    {
        id: "kruskal",
        name: "Kruskal's Algorithm",
        prerequisites: ["weighted-graphs", "union-find"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "prim",
        name: "Prim's Algorithm",
        prerequisites: ["weighted-graphs", "priority-queues"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Dynamic Programming
    {
        id: "dynamic-programming",
        name: "Dynamic Programming",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "memoization",
        name: "Memoization",
        prerequisites: ["dynamic-programming"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "tabulation",
        name: "Tabulation",
        prerequisites: ["dynamic-programming"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "knapsack",
        name: "Knapsack Problem",
        prerequisites: ["dynamic-programming"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "longest-common-subsequence",
        name: "Longest Common Subsequence",
        prerequisites: ["dynamic-programming", "strings"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "edit-distance",
        name: "Edit Distance",
        prerequisites: ["dynamic-programming", "strings"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "coin-change",
        name: "Coin Change Problem",
        prerequisites: ["dynamic-programming"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "fibonacci",
        name: "Fibonacci Sequence",
        prerequisites: ["dynamic-programming"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Greedy Algorithms
    {
        id: "greedy-algorithms",
        name: "Greedy Algorithms",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "activity-selection",
        name: "Activity Selection Problem",
        prerequisites: ["greedy-algorithms"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "huffman-coding",
        name: "Huffman Coding",
        prerequisites: ["greedy-algorithms", "heaps"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "fractional-knapsack",
        name: "Fractional Knapsack",
        prerequisites: ["greedy-algorithms"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Backtracking
    {
        id: "backtracking",
        name: "Backtracking",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "n-queens",
        name: "N-Queens Problem",
        prerequisites: ["backtracking"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "sudoku-solver",
        name: "Sudoku Solver",
        prerequisites: ["backtracking"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "maze-solving",
        name: "Maze Solving",
        prerequisites: ["backtracking"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "permutations",
        name: "Permutations",
        prerequisites: ["backtracking"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "combinations",
        name: "Combinations",
        prerequisites: ["backtracking"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // String Algorithms
    {
        id: "string-matching",
        name: "String Matching",
        prerequisites: ["strings"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "kmp-algorithm",
        name: "KMP Algorithm",
        prerequisites: ["string-matching"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "rabin-karp",
        name: "Rabin-Karp Algorithm",
        prerequisites: ["string-matching", "hash-tables"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "boyer-moore",
        name: "Boyer-Moore Algorithm",
        prerequisites: ["string-matching"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "z-algorithm",
        name: "Z Algorithm",
        prerequisites: ["string-matching"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "manacher",
        name: "Manacher's Algorithm",
        prerequisites: ["strings"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Advanced Data Structures
    {
        id: "bloom-filter",
        name: "Bloom Filter",
        prerequisites: ["hash-tables"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "lru-cache",
        name: "LRU Cache",
        prerequisites: ["hash-tables", "doubly-linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "skip-list",
        name: "Skip List",
        prerequisites: ["linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "sparse-table",
        name: "Sparse Table",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Bit Manipulation
    {
        id: "bit-manipulation",
        name: "Bit Manipulation",
        prerequisites: [],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "bitwise-operations",
        name: "Bitwise Operations",
        prerequisites: ["bit-manipulation"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "bit-tricks",
        name: "Bit Tricks",
        prerequisites: ["bitwise-operations"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Mathematical Algorithms
    {
        id: "number-theory",
        name: "Number Theory",
        prerequisites: [],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "prime-numbers",
        name: "Prime Numbers",
        prerequisites: ["number-theory"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "sieve-of-eratosthenes",
        name: "Sieve of Eratosthenes",
        prerequisites: ["prime-numbers"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "gcd-lcm",
        name: "GCD and LCM",
        prerequisites: ["number-theory"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "modular-arithmetic",
        name: "Modular Arithmetic",
        prerequisites: ["number-theory"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "fast-exponentiation",
        name: "Fast Exponentiation",
        prerequisites: ["modular-arithmetic"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Computational Geometry
    {
        id: "computational-geometry",
        name: "Computational Geometry",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "convex-hull",
        name: "Convex Hull",
        prerequisites: ["computational-geometry"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "line-intersection",
        name: "Line Intersection",
        prerequisites: ["computational-geometry"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Advanced Graph Algorithms
    {
        id: "max-flow",
        name: "Maximum Flow",
        prerequisites: ["weighted-graphs", "graph-bfs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "ford-fulkerson",
        name: "Ford-Fulkerson Algorithm",
        prerequisites: ["max-flow"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "edmonds-karp",
        name: "Edmonds-Karp Algorithm",
        prerequisites: ["ford-fulkerson"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "dinic",
        name: "Dinic's Algorithm",
        prerequisites: ["max-flow"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "min-cut",
        name: "Minimum Cut",
        prerequisites: ["max-flow"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "matching",
        name: "Graph Matching",
        prerequisites: ["bipartite-graphs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "hungarian-algorithm",
        name: "Hungarian Algorithm",
        prerequisites: ["matching"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "articulation-points",
        name: "Articulation Points",
        prerequisites: ["graph-dfs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "bridges",
        name: "Bridges in Graph",
        prerequisites: ["graph-dfs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "eulerian-path",
        name: "Eulerian Path and Circuit",
        prerequisites: ["graph-traversal"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "hamiltonian-path",
        name: "Hamiltonian Path and Circuit",
        prerequisites: ["graph-traversal", "backtracking"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "graph-coloring",
        name: "Graph Coloring",
        prerequisites: ["graphs", "backtracking"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "traveling-salesman",
        name: "Traveling Salesman Problem",
        prerequisites: ["dynamic-programming", "graphs"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Two Pointers and Sliding Window
    {
        id: "two-pointers",
        name: "Two Pointers Technique",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "sliding-window",
        name: "Sliding Window",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "fast-slow-pointers",
        name: "Fast and Slow Pointers",
        prerequisites: ["linked-lists"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Divide and Conquer
    {
        id: "divide-and-conquer",
        name: "Divide and Conquer",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "closest-pair",
        name: "Closest Pair of Points",
        prerequisites: ["divide-and-conquer", "computational-geometry"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "karatsuba",
        name: "Karatsuba Algorithm",
        prerequisites: ["divide-and-conquer"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "strassen",
        name: "Strassen's Matrix Multiplication",
        prerequisites: ["divide-and-conquer", "matrices"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Advanced Topics
    {
        id: "mo-algorithm",
        name: "Mo's Algorithm",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "sqrt-decomposition",
        name: "Square Root Decomposition",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "heavy-light-decomposition",
        name: "Heavy-Light Decomposition",
        prerequisites: ["trees", "segment-trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "centroid-decomposition",
        name: "Centroid Decomposition",
        prerequisites: ["trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "link-cut-tree",
        name: "Link-Cut Tree",
        prerequisites: ["trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "persistent-data-structures",
        name: "Persistent Data Structures",
        prerequisites: ["trees"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "randomized-algorithms",
        name: "Randomized Algorithms",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "monte-carlo",
        name: "Monte Carlo Methods",
        prerequisites: ["randomized-algorithms"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "reservoir-sampling",
        name: "Reservoir Sampling",
        prerequisites: ["randomized-algorithms"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Approximation Algorithms
    {
        id: "approximation-algorithms",
        name: "Approximation Algorithms",
        prerequisites: ["greedy-algorithms"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "vertex-cover",
        name: "Vertex Cover",
        prerequisites: ["approximation-algorithms"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "set-cover",
        name: "Set Cover",
        prerequisites: ["approximation-algorithms"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Parallel Algorithms
    {
        id: "parallel-algorithms",
        name: "Parallel Algorithms",
        prerequisites: ["arrays"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "parallel-prefix",
        name: "Parallel Prefix Sum",
        prerequisites: ["parallel-algorithms"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "parallel-sorting",
        name: "Parallel Sorting",
        prerequisites: ["parallel-algorithms", "merge-sort"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Game Theory
    {
        id: "game-theory",
        name: "Game Theory",
        prerequisites: ["dynamic-programming"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "minimax",
        name: "Minimax Algorithm",
        prerequisites: ["game-theory"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "alpha-beta-pruning",
        name: "Alpha-Beta Pruning",
        prerequisites: ["minimax"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "nim-game",
        name: "Nim Game",
        prerequisites: ["game-theory"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Advanced String Algorithms
    {
        id: "suffix-array",
        name: "Suffix Array",
        prerequisites: ["strings"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "lcp-array",
        name: "LCP Array",
        prerequisites: ["suffix-array"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "aho-corasick",
        name: "Aho-Corasick Algorithm",
        prerequisites: ["trie", "string-matching"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "palindrome-tree",
        name: "Palindrome Tree",
        prerequisites: ["strings"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    // Complexity Theory
    {
        id: "complexity-analysis",
        name: "Complexity Analysis",
        prerequisites: [],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "big-o-notation",
        name: "Big O Notation",
        prerequisites: ["complexity-analysis"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "amortized-analysis",
        name: "Amortized Analysis",
        prerequisites: ["complexity-analysis"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    },
    {
        id: "np-completeness",
        name: "NP-Completeness",
        prerequisites: ["complexity-analysis"],
        status: "not-started",
        score: 0,
        totalQuestions: 5,
        attempts: 0,
        bestScore: 0
    }
];
