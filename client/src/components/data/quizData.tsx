// Static quiz data for standard learning path
// export const TOPIC_QUIZ_DATA = {
//   'arrays': {
//     questions: [
//       {
//         id: '1',
//         question: 'What is the time complexity of accessing an element by index in an array?',
//         options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
//         correctAnswer: 0,
//         explanation: 'Arrays provide constant time O(1) access because elements are stored in contiguous memory locations with direct index-based access.'
//       },
//       {
//         id: '2',
//         question: 'Which operation has O(n) time complexity in the worst case for a dynamic array?',
//         options: ['Access', 'Search', 'Insert at end', 'Delete at end'],
//         correctAnswer: 1,
//         explanation: 'Searching for an element in an unsorted array requires checking each element sequentially, resulting in O(n) time complexity.'
//       },
//       {
//         id: '3',
//         question: 'What happens when you try to access an array element beyond its bounds in most programming languages?',
//         options: ['Returns null', 'Returns 0', 'Throws an exception', 'Undefined behavior'],
//         correctAnswer: 2,
//         explanation: 'Most modern programming languages throw an index out of bounds exception to prevent undefined behavior and security vulnerabilities.'
//       },
//       {
//         id: '4',
//         question: 'In a sorted array, what is the optimal time complexity for searching an element?',
//         options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
//         correctAnswer: 1,
//         explanation: 'Binary search can be used on sorted arrays to achieve O(log n) time complexity by repeatedly dividing the search space in half.'
//       },
//       {
//         id: '5',
//         question: 'What is the space complexity of merging two arrays of size n and m?',
//         options: ['O(1)', 'O(n)', 'O(m)', 'O(n + m)'],
//         correctAnswer: 3,
//         explanation: 'Merging two arrays requires additional space to store all elements from both arrays, resulting in O(n + m) space complexity.'
//       }
//     ]
//   },
//   'strings': {
//     questions: [
//       {
//         id: '1',
//         question: 'What is the time complexity of string concatenation using the + operator in most programming languages?',
//         options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
//         correctAnswer: 1,
//         explanation: 'String concatenation typically creates a new string and copies both strings, resulting in O(n + m) time where n and m are the lengths of the strings.'
//       },
//       {
//         id: '2',
//         question: 'Which algorithm is commonly used for pattern matching in strings?',
//         options: ['Binary Search', 'KMP Algorithm', 'Quick Sort', 'Dijkstra'],
//         correctAnswer: 1,
//         explanation: 'The KMP (Knuth-Morris-Pratt) algorithm is specifically designed for efficient pattern matching in strings with O(n + m) time complexity.'
//       },
//       {
//         id: '3',
//         question: 'What is the purpose of a StringBuilder in Java?',
//         options: ['Faster string access', 'Immutable strings', 'Efficient string concatenation', 'String sorting'],
//         correctAnswer: 2,
//         explanation: 'StringBuilder provides efficient string concatenation by maintaining a resizable buffer, avoiding the creation of multiple intermediate string objects.'
//       },
//       {
//         id: '4',
//         question: 'In the context of string algorithms, what does "lexicographic order" mean?',
//         options: ['Length-based ordering', 'Dictionary order', 'Reverse order', 'ASCII value sum'],
//         correctAnswer: 1,
//         explanation: 'Lexicographic order is the same as dictionary order, where strings are compared character by character from left to right.'
//       },
//       {
//         id: '5',
//         question: 'What is the time complexity of checking if a string is a palindrome?',
//         options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
//         correctAnswer: 2,
//         explanation: 'Checking if a string is a palindrome requires comparing characters from both ends moving inward, which takes O(n) time where n is the string length.'
//       }
//     ]
//   },
//   'linked-lists': {
//     questions: [
//       {
//         id: '1',
//         question: 'What is the main advantage of linked lists over arrays?',
//         options: ['Faster access time', 'Dynamic memory allocation', 'Better cache performance', 'Less memory usage'],
//         correctAnswer: 1,
//         explanation: 'Linked lists can grow and shrink during runtime through dynamic memory allocation, unlike arrays which have fixed size.'
//       },
//       {
//         id: '2',
//         question: 'What is the time complexity of inserting an element at the beginning of a singly linked list?',
//         options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
//         correctAnswer: 0,
//         explanation: 'Inserting at the beginning of a linked list only requires updating a few pointers and is always O(1) regardless of list size.'
//       },
//       {
//         id: '3',
//         question: 'How do you detect a cycle in a linked list efficiently?',
//         options: ['Use extra space', 'Floyd\'s cycle detection', 'Sort the list', 'Use recursion'],
//         correctAnswer: 1,
//         explanation: 'Floyd\'s cycle detection algorithm (tortoise and hare) uses two pointers moving at different speeds to detect cycles in O(n) time with O(1) space.'
//       },
//       {
//         id: '4',
//         question: 'What is the space complexity of reversing a linked list iteratively?',
//         options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
//         correctAnswer: 0,
//         explanation: 'Iterative reversal of a linked list only requires a constant number of pointers (previous, current, next), making it O(1) space complexity.'
//       },
//       {
//         id: '5',
//         question: 'In a doubly linked list, what additional information does each node contain?',
//         options: ['Size of list', 'Pointer to previous node', 'Node index', 'Data type'],
//         correctAnswer: 1,
//         explanation: 'Each node in a doubly linked list contains a pointer to both the next node and the previous node, allowing bidirectional traversal.'
//       }
//     ]
//   },
//   'stacks': {
//     questions: [
//       {
//         id: '1',
//         question: 'Which principle do stacks follow?',
//         options: ['FIFO', 'LIFO', 'Random access', 'Priority based'],
//         correctAnswer: 1,
//         explanation: 'Stacks follow the LIFO (Last In First Out) principle where the last element added is the first one to be removed.'
//       },
//       {
//         id: '2',
//         question: 'What is the time complexity of push and pop operations in a stack?',
//         options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
//         correctAnswer: 0,
//         explanation: 'Both push and pop operations in a stack are O(1) as they only involve adding or removing from the top of the stack.'
//       },
//       {
//         id: '3',
//         question: 'Which of the following applications commonly uses a stack?',
//         options: ['BFS traversal', 'Function call management', 'Priority queues', 'Hash tables'],
//         correctAnswer: 1,
//         explanation: 'Function call management uses a call stack to keep track of function calls and their local variables in LIFO order.'
//       },
//       {
//         id: '4',
//         question: 'What happens when you try to pop from an empty stack?',
//         options: ['Returns null', 'Returns 0', 'Stack underflow', 'Nothing'],
//         correctAnswer: 2,
//         explanation: 'Attempting to pop from an empty stack results in a stack underflow condition, which is typically handled as an error.'
//       },
//       {
//         id: '5',
//         question: 'Which operation allows you to see the top element without removing it?',
//         options: ['pop', 'push', 'peek/top', 'isEmpty'],
//         correctAnswer: 2,
//         explanation: 'The peek (or top) operation returns the top element of the stack without removing it, useful for checking what\'s on top.'
//       }
//     ]
//   },
//   'queues': {
//     questions: [
//       {
//         id: '1',
//         question: 'Which principle do queues follow?',
//         options: ['LIFO', 'FIFO', 'Random access', 'FILO'],
//         correctAnswer: 1,
//         explanation: 'Queues follow the FIFO (First In First Out) principle where the first element added is the first one to be removed.'
//       },
//       {
//         id: '2',
//         question: 'What is the time complexity of enqueue and dequeue operations in a queue?',
//         options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
//         correctAnswer: 0,
//         explanation: 'Both enqueue (insertion) and dequeue (removal) operations in a queue are O(1) when implemented properly.'
//       },
//       {
//         id: '3',
//         question: 'Which traversal algorithm commonly uses a queue?',
//         options: ['DFS', 'BFS', 'Preorder', 'Postorder'],
//         correctAnswer: 1,
//         explanation: 'Breadth-First Search (BFS) uses a queue to explore nodes level by level in a systematic manner.'
//       },
//       {
//         id: '4',
//         question: 'What is a circular queue?',
//         options: ['Queue with cycles', 'Queue in a circle shape', 'Queue where rear follows front', 'Infinite queue'],
//         correctAnswer: 2,
//         explanation: 'A circular queue is implemented using a fixed-size array where the rear position wraps around to the beginning when it reaches the end.'
//       },
//       {
//         id: '5',
//         question: 'What is the main advantage of a circular queue over a linear queue?',
//         options: ['Faster operations', 'Better space utilization', 'Simpler implementation', 'Dynamic size'],
//         correctAnswer: 1,
//         explanation: 'Circular queues better utilize available space by reusing positions that have been freed up, avoiding the wasted space problem of linear queues.'
//       }
//     ]
//   },
//   'trees': {
//     questions: [
//       {
//         id: '1',
//         question: 'What type of data structure are trees?',
//         options: ['Linear', 'Hierarchical', 'Circular', 'Sequential'],
//         correctAnswer: 1,
//         explanation: 'Trees are hierarchical data structures with parent-child relationships between nodes, forming a tree-like structure.'
//       },
//       {
//         id: '2',
//         question: 'What is the maximum number of children a node can have in a binary tree?',
//         options: ['1', '2', '3', 'Unlimited'],
//         correctAnswer: 1,
//         explanation: 'In a binary tree, each node can have at most 2 children, typically referred to as left child and right child.'
//       },
//       {
//         id: '3',
//         question: 'What is the height of a tree with only one node (root)?',
//         options: ['0', '1', '-1', 'Undefined'],
//         correctAnswer: 0,
//         explanation: 'The height of a tree is defined as the number of edges in the longest path from root to leaf. A single node has height 0.'
//       },
//       {
//         id: '4',
//         question: 'In which traversal do you visit the root node first?',
//         options: ['Inorder', 'Preorder', 'Postorder', 'Level order'],
//         correctAnswer: 1,
//         explanation: 'Preorder traversal visits nodes in the order: root, left subtree, right subtree, so the root is visited first.'
//       },
//       {
//         id: '5',
//         question: 'What is the time complexity of searching in a balanced binary search tree?',
//         options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
//         correctAnswer: 1,
//         explanation: 'In a balanced BST, the height is approximately log n, so searching takes O(log n) time as we eliminate half the remaining nodes at each step.'
//       }
//     ]
//   },
//   'recursion': {
//     questions: [
//       {
//         id: '1',
//         question: 'What is the base case in recursion?',
//         options: ['The first call', 'The condition to stop', 'The recursive call', 'The return value'],
//         correctAnswer: 1,
//         explanation: 'The base case is the condition that stops the recursion from continuing indefinitely and provides a direct answer without further recursive calls.'
//       },
//       {
//         id: '2',
//         question: 'What happens if a recursive function lacks a proper base case?',
//         options: ['Compilation error', 'Stack overflow', 'Infinite loop', 'Return null'],
//         correctAnswer: 1,
//         explanation: 'Without a proper base case, recursive calls continue indefinitely, eventually filling up the call stack and causing a stack overflow.'
//       },
//       {
//         id: '3',
//         question: 'What is the space complexity of a recursive function in terms of call stack?',
//         options: ['O(1)', 'O(log n)', 'O(n)', 'Depends on recursion depth'],
//         correctAnswer: 3,
//         explanation: 'The space complexity depends on the maximum recursion depth, as each recursive call adds a new frame to the call stack.'
//       },
//       {
//         id: '4',
//         question: 'Which problem-solving approach does recursion typically use?',
//         options: ['Divide and conquer', 'Greedy approach', 'Dynamic programming', 'Brute force'],
//         correctAnswer: 0,
//         explanation: 'Recursion often uses divide and conquer approach, breaking down problems into smaller subproblems that can be solved recursively.'
//       },
//       {
//         id: '5',
//         question: 'What is tail recursion?',
//         options: ['Recursion at the end', 'Recursion with tail pointer', 'Last recursive call in function', 'Recursion that can be optimized'],
//         correctAnswer: 3,
//         explanation: 'Tail recursion occurs when the recursive call is the last operation in the function, allowing for optimization that reuses the current stack frame.'
//       }
//     ]
//   },
//   'sorting': {
//     questions: [
//       {
//         id: '1',
//         question: 'What is the best case time complexity of Quick Sort?',
//         options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
//         correctAnswer: 1,
//         explanation: 'Quick Sort has O(n log n) best case time complexity when the pivot divides the array into roughly equal halves at each step.'
//       },
//       {
//         id: '2',
//         question: 'Which sorting algorithm is stable by default?',
//         options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
//         correctAnswer: 2,
//         explanation: 'Merge Sort is stable because it maintains the relative order of equal elements during the merging process.'
//       },
//       {
//         id: '3',
//         question: 'What is the worst case time complexity of Bubble Sort?',
//         options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
//         correctAnswer: 2,
//         explanation: 'Bubble Sort has O(n²) worst case complexity when the array is sorted in reverse order, requiring maximum number of swaps.'
//       },
//       {
//         id: '4',
//         question: 'Which sorting algorithm has the best worst-case time complexity?',
//         options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Insertion Sort'],
//         correctAnswer: 1,
//         explanation: 'Merge Sort has O(n log n) worst-case time complexity, which is optimal for comparison-based sorting algorithms.'
//       },
//       {
//         id: '5',
//         question: 'What is the space complexity of in-place Quick Sort?',
//         options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
//         correctAnswer: 1,
//         explanation: 'In-place Quick Sort has O(log n) space complexity due to the recursive call stack, even though it sorts the array in-place.'
//       }
//     ]
//   }
// };


export const TOPIC_QUIZ_DATA = {
  'arrays': {
    questions: [
      {
        id: '1',
        question: 'What is the time complexity of accessing an element by index in an array?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Arrays provide constant time O(1) access because elements are stored in contiguous memory locations with direct index-based access.'
      },
      {
        id: '2',
        question: 'Which operation has O(n) time complexity in the worst case for a dynamic array?',
        options: ['Access', 'Search', 'Insert at end', 'Delete at end'],
        correctAnswer: 1,
        explanation: 'Searching for an element in an unsorted array requires checking each element sequentially, resulting in O(n) time complexity.'
      },
      {
        id: '3',
        question: 'What happens when you try to access an array element beyond its bounds in most programming languages?',
        options: ['Returns null', 'Returns 0', 'Throws an exception', 'Undefined behavior'],
        correctAnswer: 2,
        explanation: 'Most modern programming languages throw an index out of bounds exception to prevent undefined behavior and security vulnerabilities.'
      },
      {
        id: '4',
        question: 'In a sorted array, what is the optimal time complexity for searching an element?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Binary search can be used on sorted arrays to achieve O(log n) time complexity by repeatedly dividing the search space in half.'
      },
      {
        id: '5',
        question: 'What is the space complexity of merging two arrays of size n and m?',
        options: ['O(1)', 'O(n)', 'O(m)', 'O(n + m)'],
        correctAnswer: 3,
        explanation: 'Merging two arrays requires additional space to store all elements from both arrays, resulting in O(n + m) space complexity.'
      },
      {
        id: '6',
        question: 'What is the time complexity of inserting an element at the beginning of an array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Inserting at the beginning requires shifting all existing elements one position to the right, resulting in O(n) time complexity.'
      },
      {
        id: '7',
        question: 'Which of the following is NOT an advantage of arrays?',
        options: ['Cache locality', 'Random access', 'Dynamic size', 'Memory efficiency'],
        correctAnswer: 2,
        explanation: 'Static arrays have fixed size, while dynamic arrays can resize but with overhead. Dynamic sizing is not a fundamental advantage of arrays.'
      },
      {
        id: '8',
        question: 'What is the maximum number of elements that can be stored in a 2D array of size m×n?',
        options: ['m + n', 'm × n', 'm^n', 'n^m'],
        correctAnswer: 1,
        explanation: 'A 2D array with m rows and n columns can store exactly m × n elements.'
      },
      {
        id: '9',
        question: 'In a circular array implementation, when does the array become full?',
        options: ['When front == rear', 'When (rear + 1) % size == front', 'When rear == size - 1', 'When front == 0'],
        correctAnswer: 1,
        explanation: 'In a circular array, the condition (rear + 1) % size == front indicates that the array is full.'
      },
      {
        id: '10',
        question: 'What is the time complexity of finding the minimum element in an unsorted array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 2,
        explanation: 'Finding the minimum element requires examining each element once, resulting in O(n) time complexity.'
      }
    ]
  },
  'strings': {
    questions: [
      {
        id: '1',
        question: 'What is the time complexity of string concatenation using the + operator in most programming languages?',
        options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'String concatenation typically creates a new string and copies both strings, resulting in O(n + m) time where n and m are the lengths of the strings.'
      },
      {
        id: '2',
        question: 'Which algorithm is commonly used for pattern matching in strings?',
        options: ['Binary Search', 'KMP Algorithm', 'Quick Sort', 'Dijkstra'],
        correctAnswer: 1,
        explanation: 'The KMP (Knuth-Morris-Pratt) algorithm is specifically designed for efficient pattern matching in strings with O(n + m) time complexity.'
      },
      {
        id: '3',
        question: 'What is the purpose of a StringBuilder in Java?',
        options: ['Faster string access', 'Immutable strings', 'Efficient string concatenation', 'String sorting'],
        correctAnswer: 2,
        explanation: 'StringBuilder provides efficient string concatenation by maintaining a resizable buffer, avoiding the creation of multiple intermediate string objects.'
      },
      {
        id: '4',
        question: 'In the context of string algorithms, what does "lexicographic order" mean?',
        options: ['Length-based ordering', 'Dictionary order', 'Reverse order', 'ASCII value sum'],
        correctAnswer: 1,
        explanation: 'Lexicographic order is the same as dictionary order, where strings are compared character by character from left to right.'
      },
      {
        id: '5',
        question: 'What is the time complexity of checking if a string is a palindrome?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Checking if a string is a palindrome requires comparing characters from both ends moving inward, which takes O(n) time where n is the string length.'
      },
      {
        id: '6',
        question: 'What is the worst-case time complexity of the naive string matching algorithm?',
        options: ['O(n)', 'O(m)', 'O(n + m)', 'O(n × m)'],
        correctAnswer: 3,
        explanation: 'The naive string matching algorithm has O(n × m) worst-case time complexity where n is the text length and m is the pattern length.'
      },
      {
        id: '7',
        question: 'Which data structure is commonly used to implement string reversal?',
        options: ['Queue', 'Stack', 'Heap', 'Tree'],
        correctAnswer: 1,
        explanation: 'A stack follows LIFO (Last In, First Out) principle, making it perfect for string reversal operations.'
      },
      {
        id: '8',
        question: 'What is the space complexity of the longest common subsequence (LCS) algorithm using dynamic programming?',
        options: ['O(1)', 'O(n)', 'O(m)', 'O(n × m)'],
        correctAnswer: 3,
        explanation: 'The LCS algorithm using dynamic programming creates a 2D table of size n × m, resulting in O(n × m) space complexity.'
      },
      {
        id: '9',
        question: 'In string hashing, what is the purpose of using a prime number as the base?',
        options: ['Faster computation', 'Reduce collisions', 'Save memory', 'Improve readability'],
        correctAnswer: 1,
        explanation: 'Using a prime number as the base in string hashing helps reduce the probability of hash collisions.'
      },
      {
        id: '10',
        question: 'What is the time complexity of finding all anagrams of a string in a text?',
        options: ['O(n)', 'O(n log n)', 'O(n × m)', 'O(n + m)'],
        correctAnswer: 0,
        explanation: 'Using a sliding window approach with character frequency counting, we can find all anagrams in O(n) time.'
      }
    ]
  },
  'matrices': {
    questions: [
      {
        id: '1',
        question: 'What is the time complexity of matrix multiplication for two n×n matrices?',
        options: ['O(n²)', 'O(n³)', 'O(n⁴)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Standard matrix multiplication algorithm has O(n³) time complexity as it requires three nested loops.'
      },
      {
        id: '2',
        question: 'What is the space complexity of storing a sparse matrix using coordinate list (COO) format?',
        options: ['O(n²)', 'O(n)', 'O(k)', 'O(log n)'],
        correctAnswer: 2,
        explanation: 'COO format stores only non-zero elements, so space complexity is O(k) where k is the number of non-zero elements.'
      },
      {
        id: '3',
        question: 'In row-major order, how are 2D array elements stored in memory?',
        options: ['Column by column', 'Row by row', 'Diagonally', 'Randomly'],
        correctAnswer: 1,
        explanation: 'Row-major order stores elements row by row, meaning all elements of the first row are stored first, then the second row, and so on.'
      },
      {
        id: '4',
        question: 'What is the time complexity of finding the transpose of an n×n matrix?',
        options: ['O(1)', 'O(n)', 'O(n²)', 'O(n³)'],
        correctAnswer: 2,
        explanation: 'Transposing a matrix requires visiting each element once, resulting in O(n²) time complexity.'
      },
      {
        id: '5',
        question: 'Which algorithm is used to find the determinant of a matrix efficiently?',
        options: ['Bubble Sort', 'LU Decomposition', 'Binary Search', 'Merge Sort'],
        correctAnswer: 1,
        explanation: 'LU Decomposition can be used to compute the determinant efficiently in O(n³) time.'
      },
      {
        id: '6',
        question: 'What is the result of multiplying a matrix by its inverse?',
        options: ['Zero matrix', 'Identity matrix', 'Transpose matrix', 'Determinant'],
        correctAnswer: 1,
        explanation: 'Multiplying a matrix by its inverse always results in the identity matrix (A × A⁻¹ = I).'
      },
      {
        id: '7',
        question: 'In a symmetric matrix, what relationship exists between elements?',
        options: ['A[i][j] = A[j][i]', 'A[i][j] = -A[j][i]', 'A[i][j] = 0', 'A[i][j] = 1'],
        correctAnswer: 0,
        explanation: 'In a symmetric matrix, elements are symmetric about the main diagonal, so A[i][j] = A[j][i].'
      },
      {
        id: '8',
        question: 'What is the time complexity of searching for an element in a sorted matrix where rows and columns are sorted?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Using the search algorithm starting from top-right or bottom-left corner, we can search in O(n + m) time, which is O(n) for square matrices.'
      },
      {
        id: '9',
        question: 'What is the space complexity of in-place matrix rotation?',
        options: ['O(1)', 'O(n)', 'O(n²)', 'O(n log n)'],
        correctAnswer: 0,
        explanation: 'In-place matrix rotation can be done using constant extra space O(1) by rotating elements in concentric circles.'
      },
      {
        id: '10',
        question: 'Which property makes a matrix suitable for dynamic programming problems?',
        options: ['Square shape', 'Optimal substructure', 'Symmetric elements', 'Sparse nature'],
        correctAnswer: 1,
        explanation: 'Optimal substructure property allows problems to be broken down into overlapping subproblems, making matrices suitable for DP.'
      }
    ]
  },
  'linked-lists': {
    questions: [
      {
        id: '1',
        question: 'What is the time complexity of inserting an element at the beginning of a linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Inserting at the beginning only requires updating the head pointer and the new node\'s next pointer, which takes constant time.'
      },
      {
        id: '2',
        question: 'What is the main disadvantage of linked lists compared to arrays?',
        options: ['Dynamic size', 'Memory overhead', 'Sequential access', 'Insertion complexity'],
        correctAnswer: 1,
        explanation: 'Linked lists have memory overhead due to storing pointers and don\'t provide cache locality like arrays.'
      },
      {
        id: '3',
        question: 'How do you detect a cycle in a linked list efficiently?',
        options: ['Two pointers (Floyd\'s algorithm)', 'Hash table', 'Recursion', 'Sorting'],
        correctAnswer: 0,
        explanation: 'Floyd\'s cycle detection algorithm uses two pointers moving at different speeds to detect cycles in O(n) time and O(1) space.'
      },
      {
        id: '4',
        question: 'What is the time complexity of deleting a node from the middle of a linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'To delete a node from the middle, you first need to find it, which takes O(n) time in the worst case.'
      },
      {
        id: '5',
        question: 'Which operation is more efficient in a linked list compared to an array?',
        options: ['Random access', 'Insertion at beginning', 'Binary search', 'Cache performance'],
        correctAnswer: 1,
        explanation: 'Insertion at the beginning is O(1) for linked lists but O(n) for arrays due to element shifting.'
      },
      {
        id: '6',
        question: 'What happens when you try to access a null pointer in a linked list?',
        options: ['Returns 0', 'Throws exception', 'Segmentation fault', 'Returns null'],
        correctAnswer: 2,
        explanation: 'Accessing a null pointer typically results in a segmentation fault or access violation error.'
      },
      {
        id: '7',
        question: 'How do you find the middle element of a linked list in one pass?',
        options: ['Count then traverse', 'Two pointers technique', 'Recursion', 'Hash table'],
        correctAnswer: 1,
        explanation: 'Use two pointers: one moves one step at a time, the other moves two steps. When the fast pointer reaches the end, slow pointer is at the middle.'
      },
      {
        id: '8',
        question: 'What is the space complexity of reversing a linked list iteratively?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Iterative reversal only requires a constant number of pointers (previous, current, next), so space complexity is O(1).'
      },
      {
        id: '9',
        question: 'In a singly linked list, what information does each node contain?',
        options: ['Data only', 'Pointer only', 'Data and next pointer', 'Data and two pointers'],
        correctAnswer: 2,
        explanation: 'Each node in a singly linked list contains data and a pointer to the next node in the sequence.'
      },
      {
        id: '10',
        question: 'What is the time complexity of merging two sorted linked lists?',
        options: ['O(1)', 'O(n)', 'O(n + m)', 'O(n × m)'],
        correctAnswer: 2,
        explanation: 'Merging two sorted linked lists requires visiting each node once, resulting in O(n + m) time complexity.'
      }
    ]
  },
  'doubly-linked-lists': {
    questions: [
      {
        id: '1',
        question: 'What is the main advantage of a doubly linked list over a singly linked list?',
        options: ['Less memory usage', 'Bidirectional traversal', 'Faster insertion', 'Better cache performance'],
        correctAnswer: 1,
        explanation: 'Doubly linked lists allow traversal in both directions due to the previous pointer, making certain operations more efficient.'
      },
      {
        id: '2',
        question: 'How many pointers does each node in a doubly linked list contain?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'Each node contains two pointers: one pointing to the next node and one pointing to the previous node.'
      },
      {
        id: '3',
        question: 'What is the time complexity of deleting a node when you have a direct reference to it?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'With a direct reference and previous pointer, deletion can be done in O(1) time by updating the surrounding nodes\' pointers.'
      },
      {
        id: '4',
        question: 'What is the space overhead of a doubly linked list compared to a singly linked list?',
        options: ['Same', 'One extra pointer per node', 'Double the memory', 'Half the memory'],
        correctAnswer: 1,
        explanation: 'Each node requires one additional pointer to store the reference to the previous node.'
      },
      {
        id: '5',
        question: 'In a doubly linked list, what should the previous pointer of the head node point to?',
        options: ['Itself', 'Null', 'Tail node', 'First data node'],
        correctAnswer: 1,
        explanation: 'The previous pointer of the head node should point to null since there is no node before the head.'
      },
      {
        id: '6',
        question: 'What is the time complexity of reversing a doubly linked list?',
        options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Reversing requires visiting each node once and swapping the next and previous pointers, resulting in O(n) time complexity.'
      },
      {
        id: '7',
        question: 'Which operation is more efficient in a doubly linked list compared to singly linked list?',
        options: ['Insertion at beginning', 'Deletion with node reference', 'Searching', 'Memory usage'],
        correctAnswer: 1,
        explanation: 'Deletion with a node reference is O(1) in doubly linked lists but O(n) in singly linked lists since you need to find the previous node.'
      },
      {
        id: '8',
        question: 'What happens to the tail pointer when you delete the last node in a doubly linked list?',
        options: ['Points to null', 'Points to new last node', 'Remains unchanged', 'Points to head'],
        correctAnswer: 1,
        explanation: 'The tail pointer should be updated to point to the new last node after deletion.'
      },
      {
        id: '9',
        question: 'In a circular doubly linked list, what does the next pointer of the tail node point to?',
        options: ['Null', 'Head node', 'Itself', 'Previous node'],
        correctAnswer: 1,
        explanation: 'In a circular doubly linked list, the tail node\'s next pointer points back to the head node, completing the circle.'
      },
      {
        id: '10',
        question: 'What is the minimum number of pointer updates required to insert a node in the middle of a doubly linked list?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
        explanation: 'Four pointer updates are needed: new node\'s next and previous, and the next and previous of adjacent nodes.'
      }
    ]
  },
  'circular-linked-lists': {
    questions: [
      {
        id: '1',
        question: 'In a circular linked list, what does the last node point to?',
        options: ['Null', 'Head node', 'Itself', 'Previous node'],
        correctAnswer: 1,
        explanation: 'In a circular linked list, the last node\'s next pointer points back to the head node, forming a circle.'
      },
      {
        id: '2',
        question: 'How do you detect the end of a circular linked list during traversal?',
        options: ['Check for null', 'Count nodes', 'Check if next equals head', 'Use a flag'],
        correctAnswer: 2,
        explanation: 'Since there\'s no null pointer, you detect the end by checking if the current node\'s next pointer equals the head.'
      },
      {
        id: '3',
        question: 'What is the main advantage of a circular linked list?',
        options: ['Less memory usage', 'Faster insertion', 'No need for head pointer', 'Efficient round-robin traversal'],
        correctAnswer: 3,
        explanation: 'Circular linked lists are perfect for round-robin algorithms and applications that need continuous cyclic access.'
      },
      {
        id: '4',
        question: 'What is the time complexity of inserting a node at the end of a circular linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Without a tail pointer, you need to traverse the entire list to find the last node, resulting in O(n) time complexity.'
      },
      {
        id: '5',
        question: 'How can you make insertion at the end of a circular linked list O(1)?',
        options: ['Use recursion', 'Maintain a tail pointer', 'Use double pointers', 'Sort the list'],
        correctAnswer: 1,
        explanation: 'By maintaining a tail pointer, you can directly access the last node and insert in O(1) time.'
      },
      {
        id: '6',
        question: 'What happens if you apply Floyd\'s cycle detection algorithm to a circular linked list?',
        options: ['No cycle detected', 'Infinite loop', 'Cycle always detected', 'Segmentation fault'],
        correctAnswer: 2,
        explanation: 'Floyd\'s algorithm will always detect a cycle in a circular linked list since the entire list forms a cycle.'
      },
      {
        id: '7',
        question: 'In a circular linked list with n nodes, how many nodes will you visit to traverse the entire list once?',
        options: ['n - 1', 'n', 'n + 1', 'Infinite'],
        correctAnswer: 1,
        explanation: 'You need to visit exactly n nodes to traverse the entire list once, stopping when you reach the head again.'
      },
      {
        id: '8',
        question: 'What is the space complexity of reversing a circular linked list?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Reversing can be done in-place using a constant amount of extra space for pointer manipulation.'
      },
      {
        id: '9',
        question: 'Which application is best suited for circular linked lists?',
        options: ['Stack implementation', 'Binary search', 'CPU scheduling', 'Sorting'],
        correctAnswer: 2,
        explanation: 'CPU scheduling algorithms like Round Robin are perfectly suited for circular linked lists due to their cyclic nature.'
      },
      {
        id: '10',
        question: 'What is the key difference between deleting the head node in a circular vs. singly linked list?',
        options: ['No difference', 'Must update last node\'s pointer', 'Cannot delete head', 'Requires sorting'],
        correctAnswer: 1,
        explanation: 'In a circular linked list, deleting the head requires updating the last node\'s pointer to point to the new head.'
      }
    ]
  },
  'stacks': {
    questions: [
      {
        id: '1',
        question: 'What principle does a stack follow?',
        options: ['FIFO', 'LIFO', 'Random access', 'Priority-based'],
        correctAnswer: 1,
        explanation: 'Stack follows LIFO (Last In, First Out) principle where the last element inserted is the first one to be removed.'
      },
      {
        id: '2',
        question: 'What is the time complexity of push and pop operations in a stack?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Both push and pop operations are performed at the top of the stack, making them O(1) operations.'
      },
      {
        id: '3',
        question: 'What happens when you try to pop from an empty stack?',
        options: ['Returns null', 'Returns 0', 'Stack underflow', 'Creates new element'],
        correctAnswer: 2,
        explanation: 'Attempting to pop from an empty stack results in a stack underflow error.'
      },
      {
        id: '4',
        question: 'Which of the following applications commonly uses stacks?',
        options: ['Breadth-first search', 'Function call management', 'Priority queues', 'Hash tables'],
        correctAnswer: 1,
        explanation: 'Function call management uses stacks to keep track of function calls and local variables (call stack).'
      },
      {
        id: '5',
        question: 'What is the space complexity of a stack implementation using arrays?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Stack implementation using arrays requires O(n) space where n is the maximum number of elements.'
      },
      {
        id: '6',
        question: 'Which operation allows you to view the top element without removing it?',
        options: ['push', 'pop', 'peek/top', 'isEmpty'],
        correctAnswer: 2,
        explanation: 'The peek (or top) operation returns the top element without removing it from the stack.'
      },
      {
        id: '7',
        question: 'What is the result of the following operations on an empty stack: push(1), push(2), pop(), push(3), pop()?',
        options: ['1', '2', '3', 'Empty stack'],
        correctAnswer: 2,
        explanation: 'After push(1), push(2), pop() removes 2. After push(3), pop() removes 3. The answer is 3.'
      },
      {
        id: '8',
        question: 'Which data structure can be used to implement a stack?',
        options: ['Array only', 'Linked list only', 'Both array and linked list', 'Hash table'],
        correctAnswer: 2,
        explanation: 'Stacks can be implemented using both arrays and linked lists, each with their own advantages.'
      },
      {
        id: '9',
        question: 'What is the primary use of stacks in expression evaluation?',
        options: ['Store variables', 'Handle operator precedence', 'Sort numbers', 'Find duplicates'],
        correctAnswer: 1,
        explanation: 'Stacks are used to handle operator precedence and evaluate expressions in postfix, prefix, or infix notation.'
      },
      {
        id: '10',
        question: 'In a stack overflow condition, what has happened?',
        options: ['Stack is empty', 'Stack is full', 'Stack is corrupted', 'Stack is reversed'],
        correctAnswer: 1,
        explanation: 'Stack overflow occurs when you try to push an element onto a full stack.'
      }
    ]
  },
  'queues': {
    questions: [
      {
        id: '1',
        question: 'What principle does a queue follow?',
        options: ['LIFO', 'FIFO', 'Random access', 'Priority-based'],
        correctAnswer: 1,
        explanation: 'Queue follows FIFO (First In, First Out) principle where the first element inserted is the first one to be removed.'
      },
      {
        id: '2',
        question: 'What are the two main operations performed on a queue?',
        options: ['push and pop', 'enqueue and dequeue', 'insert and delete', 'add and remove'],
        correctAnswer: 1,
        explanation: 'The two main operations are enqueue (insertion at rear) and dequeue (removal from front).'
      },
      {
        id: '3',
        question: 'What is the time complexity of enqueue and dequeue operations?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Both enqueue and dequeue operations are performed at fixed positions (rear and front), making them O(1) operations.'
      },
      {
        id: '4',
        question: 'Which application commonly uses queues?',
        options: ['Function calls', 'Breadth-first search', 'Expression evaluation', 'Recursion'],
        correctAnswer: 1,
        explanation: 'Breadth-first search uses queues to explore nodes level by level in graphs and trees.'
      },
      {
        id: '5',
        question: 'What happens when you try to dequeue from an empty queue?',
        options: ['Returns null', 'Queue underflow', 'Returns 0', 'Creates new element'],
        correctAnswer: 1,
        explanation: 'Attempting to dequeue from an empty queue results in a queue underflow error.'
      },
      {
        id: '6',
        question: 'In a circular queue, what happens when the rear pointer reaches the end of the array?',
        options: ['Queue becomes full', 'Wraps around to beginning', 'Throws exception', 'Stops working'],
        correctAnswer: 1,
        explanation: 'In a circular queue, the rear pointer wraps around to the beginning of the array when it reaches the end.'
      },
      {
        id: '7',
        question: 'What is the advantage of a circular queue over a linear queue?',
        options: ['Faster operations', 'Better memory utilization', 'Simpler implementation', 'Unlimited size'],
        correctAnswer: 1,
        explanation: 'Circular queues better utilize memory by reusing vacant spaces created by dequeue operations.'
      },
      // Completing the queues questions first (question 8 was cut off)
      {
        id: '8',
        question: 'Which operation allows you to view the front element without removing it?',
        options: ['enqueue', 'dequeue', 'front/peek', 'isEmpty'],
        correctAnswer: 2,
        explanation: 'The front (or peek) operation returns the front element without removing it from the queue.'
      },
      {
        id: '9',
        question: 'What is the condition for a circular queue to be full?',
        options: ['rear == front', '(rear + 1) % size == front', 'rear == size - 1', 'front == 0'],
        correctAnswer: 1,
        explanation: 'A circular queue is full when (rear + 1) % size equals front, leaving one empty space to distinguish between full and empty states.'
      },
      {
        id: '10',
        question: 'Which of the following is NOT a type of queue?',
        options: ['Priority queue', 'Circular queue', 'Double-ended queue', 'Stack queue'],
        correctAnswer: 3,
        explanation: 'Stack queue is not a valid type of queue. The other three are legitimate queue variations.'
      }
    ]
  },
  'priority-queues': {
    questions: [
      {
        id: '1',
        question: 'What determines the order of elements in a priority queue?',
        options: ['Insertion order', 'Priority values', 'Alphabetical order', 'Random order'],
        correctAnswer: 1,
        explanation: 'Priority queues order elements based on their priority values, with higher priority elements being dequeued first.'
      },
      {
        id: '2',
        question: 'Which data structure is commonly used to implement a priority queue?',
        options: ['Array', 'Linked list', 'Heap', 'Stack'],
        correctAnswer: 2,
        explanation: 'Binary heaps are the most efficient data structure for implementing priority queues, providing O(log n) insertion and deletion.'
      },
      {
        id: '3',
        question: 'What is the time complexity of inserting an element into a binary heap-based priority queue?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Insertion into a binary heap requires bubbling up the element to maintain heap property, taking O(log n) time.'
      },
      {
        id: '4',
        question: 'What is the time complexity of extracting the minimum element from a min-heap priority queue?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Extracting the minimum requires removing the root and heapifying down, which takes O(log n) time.'
      },
      {
        id: '5',
        question: 'Which algorithm commonly uses priority queues?',
        options: ['Binary search', 'Dijkstra\'s algorithm', 'Merge sort', 'Linear search'],
        correctAnswer: 1,
        explanation: 'Dijkstra\'s shortest path algorithm uses priority queues to efficiently select the next vertex with minimum distance.'
      },
      {
        id: '6',
        question: 'What happens when two elements have the same priority in a priority queue?',
        options: ['Error occurs', 'Implementation dependent', 'FIFO order', 'LIFO order'],
        correctAnswer: 1,
        explanation: 'The behavior depends on the implementation - it could be FIFO, LIFO, or arbitrary order for equal priorities.'
      },
      {
        id: '7',
        question: 'What is the space complexity of a priority queue implemented using a binary heap?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'A binary heap stores all n elements in an array, requiring O(n) space.'
      },
      {
        id: '8',
        question: 'Which operation allows you to view the highest priority element without removing it?',
        options: ['enqueue', 'dequeue', 'peek/top', 'isEmpty'],
        correctAnswer: 2,
        explanation: 'The peek or top operation returns the highest priority element without removing it from the queue.'
      },
      {
        id: '9',
        question: 'What is the time complexity of building a heap from an unsorted array?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 0,
        explanation: 'Building a heap from an unsorted array using the heapify process takes O(n) time, not O(n log n).'
      },
      {
        id: '10',
        question: 'In a max-heap priority queue, which element is always at the root?',
        options: ['Smallest element', 'Largest element', 'Middle element', 'Random element'],
        correctAnswer: 1,
        explanation: 'In a max-heap, the largest element (highest priority) is always at the root of the heap.'
      }
    ]
  },
  'binary-trees': {
    questions: [
      {
        id: '1',
        question: 'What is the maximum number of nodes at level k in a binary tree?',
        options: ['k', '2^k', '2^(k-1)', '2^(k+1)'],
        correctAnswer: 2,
        explanation: 'At level k (starting from level 1), the maximum number of nodes is 2^(k-1).'
      },
      {
        id: '2',
        question: 'What is the time complexity of searching in a balanced binary search tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'In a balanced BST, searching takes O(log n) time as we eliminate half the search space at each step.'
      },
      {
        id: '3',
        question: 'Which traversal visits nodes in ascending order in a binary search tree?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
        correctAnswer: 1,
        explanation: 'Inorder traversal (left, root, right) visits nodes in ascending order in a binary search tree.'
      },
      {
        id: '4',
        question: 'What is the height of a complete binary tree with n nodes?',
        options: ['⌊log₂(n)⌋', '⌊log₂(n)⌋ + 1', '⌈log₂(n)⌉', '⌈log₂(n+1)⌉'],
        correctAnswer: 3,
        explanation: 'The height of a complete binary tree with n nodes is ⌈log₂(n+1)⌉.'
      },
      {
        id: '5',
        question: 'What is the worst-case time complexity for insertion in an unbalanced binary search tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'In the worst case (skewed tree), insertion can take O(n) time as the tree becomes like a linked list.'
      },
      {
        id: '6',
        question: 'Which property must be maintained in a binary search tree?',
        options: ['Left subtree > root > right subtree', 'Left subtree < root < right subtree', 'All levels must be filled', 'Height must be balanced'],
        correctAnswer: 1,
        explanation: 'In a BST, all nodes in the left subtree are less than the root, and all nodes in the right subtree are greater than the root.'
      },
      {
        id: '7',
        question: 'What is the space complexity of recursive inorder traversal?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Recursive traversal uses the call stack, which in the worst case (skewed tree) can be O(n) deep.'
      },
      {
        id: '8',
        question: 'Which traversal is used to create a copy of a binary tree?',
        options: ['Inorder', 'Preorder', 'Postorder', 'Level order'],
        correctAnswer: 1,
        explanation: 'Preorder traversal (root, left, right) is used to create a copy as it processes the root before its children.'
      },
      {
        id: '9',
        question: 'What is the minimum number of nodes in a complete binary tree of height h?',
        options: ['2^h - 1', '2^h', '2^(h-1)', '2^(h-1) + 1'],
        correctAnswer: 2,
        explanation: 'A complete binary tree of height h has at least 2^(h-1) nodes (when the last level has only one node).'
      },
      {
        id: '10',
        question: 'Which operation is NOT efficiently supported by binary search trees?',
        options: ['Search', 'Insert', 'Delete', 'Find kth smallest'],
        correctAnswer: 3,
        explanation: 'Finding the kth smallest element requires either inorder traversal or additional data structures, making it less efficient than other operations.'
      }
    ]
  },
  'binary-search-trees': {
    questions: [
      {
        id: '1',
        question: 'What is the average case time complexity for search operation in a BST?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'In the average case, BST search takes O(log n) time as the tree is reasonably balanced.'
      },
      {
        id: '2',
        question: 'What happens when you insert elements in sorted order into a BST?',
        options: ['Creates balanced tree', 'Creates skewed tree', 'Causes error', 'Creates random tree'],
        correctAnswer: 1,
        explanation: 'Inserting sorted elements creates a skewed (degenerate) tree that behaves like a linked list.'
      },
      {
        id: '3',
        question: 'Which node replacement strategy is used when deleting a node with two children?',
        options: ['Any leaf node', 'Inorder successor or predecessor', 'Root node', 'Random node'],
        correctAnswer: 1,
        explanation: 'When deleting a node with two children, it\'s replaced by either its inorder successor or predecessor to maintain BST property.'
      },
      {
        id: '4',
        question: 'What is the space complexity of iterative inorder traversal using a stack?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Iterative inorder traversal uses a stack which in the worst case (skewed tree) can store O(n) nodes.'
      },
      {
        id: '5',
        question: 'Which BST property ensures efficient searching?',
        options: ['Height balance', 'Ordering property', 'Complete structure', 'Node coloring'],
        correctAnswer: 1,
        explanation: 'The ordering property (left < root < right) allows us to eliminate half the search space at each step.'
      },
      {
        id: '6',
        question: 'What is the time complexity of finding the minimum element in a BST?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 2,
        explanation: 'Finding the minimum requires going to the leftmost node, which takes O(h) time where h is the height (O(n) in worst case).'
      },
      {
        id: '7',
        question: 'Which traversal gives nodes in descending order in a BST?',
        options: ['Inorder', 'Reverse inorder', 'Preorder', 'Postorder'],
        correctAnswer: 1,
        explanation: 'Reverse inorder traversal (right, root, left) gives nodes in descending order in a BST.'
      },
      {
        id: '8',
        question: 'What is the key advantage of BST over a sorted array?',
        options: ['Faster search', 'Dynamic insertion/deletion', 'Less memory usage', 'Better cache locality'],
        correctAnswer: 1,
        explanation: 'BSTs support dynamic insertion and deletion efficiently, while sorted arrays require O(n) time for these operations.'
      },
      {
        id: '9',
        question: 'What is the worst-case height of a BST with n nodes?',
        options: ['log n', 'n', 'n - 1', 'n/2'],
        correctAnswer: 2,
        explanation: 'In the worst case (skewed tree), the height can be n-1, making the BST behave like a linked list.'
      },
      {
        id: '10',
        question: 'Which operation maintains the BST property after modification?',
        options: ['Only insertion', 'Only deletion', 'Both insertion and deletion', 'Neither operation'],
        correctAnswer: 2,
        explanation: 'Both insertion and deletion operations are designed to maintain the BST ordering property.'
      }
    ]
  },
  'avl-trees': {
    questions: [
      {
        id: '1',
        question: 'What is the maximum allowed height difference between left and right subtrees in an AVL tree?',
        options: ['0', '1', '2', '3'],
        correctAnswer: 1,
        explanation: 'AVL trees maintain balance by ensuring the height difference between left and right subtrees is at most 1.'
      },
      {
        id: '2',
        question: 'What is the time complexity of insertion in an AVL tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'AVL tree insertion takes O(log n) time as the tree height is always logarithmic due to balancing.'
      },
      {
        id: '3',
        question: 'Which rotation is needed when a node becomes unbalanced due to insertion in the left subtree of its left child?',
        options: ['Left rotation', 'Right rotation', 'Left-Right rotation', 'Right-Left rotation'],
        correctAnswer: 1,
        explanation: 'Left-Left case requires a single right rotation to restore balance.'
      },
      {
        id: '4',
        question: 'What is the minimum number of nodes in an AVL tree of height h?',
        options: ['2^h - 1', 'h + 1', 'Fibonacci sequence', '2^(h-1)'],
        correctAnswer: 2,
        explanation: 'The minimum number of nodes follows the Fibonacci sequence: F(h+2) - 1, where F is the Fibonacci number.'
      },
      {
        id: '5',
        question: 'When is a double rotation required in AVL tree balancing?',
        options: ['Never', 'Left-Right or Right-Left cases', 'Only during deletion', 'Always'],
        correctAnswer: 1,
        explanation: 'Double rotations are needed for Left-Right and Right-Left cases where single rotations are insufficient.'
      },
      {
        id: '6',
        question: 'What is the balance factor of a node in an AVL tree?',
        options: ['Left height + Right height', 'Left height - Right height', 'Right height - Left height', 'Max(Left, Right) height'],
        correctAnswer: 1,
        explanation: 'Balance factor is defined as the height of the left subtree minus the height of the right subtree.'
      },
      {
        id: '7',
        question: 'What is the maximum height of an AVL tree with n nodes?',
        options: ['log n', '1.44 log n', '2 log n', 'n'],
        correctAnswer: 1,
        explanation: 'The maximum height of an AVL tree is approximately 1.44 log₂(n), which is still O(log n).'
      },
      {
        id: '8',
        question: 'Which operation might trigger rebalancing in an AVL tree?',
        options: ['Only insertion', 'Only deletion', 'Both insertion and deletion', 'Only searching'],
        correctAnswer: 2,
        explanation: 'Both insertion and deletion can cause imbalance and trigger rotations to restore AVL property.'
      },
      {
        id: '9',
        question: 'What is the time complexity of searching in an AVL tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Searching in an AVL tree takes O(log n) time due to the guaranteed logarithmic height.'
      },
      {
        id: '10',
        question: 'What is the main advantage of AVL trees over regular BSTs?',
        options: ['Simpler implementation', 'Guaranteed O(log n) operations', 'Less memory usage', 'Faster for unbalanced data'],
        correctAnswer: 1,
        explanation: 'AVL trees guarantee O(log n) time complexity for all operations by maintaining balance automatically.'
      }
    ]
  },
  'red-black-trees': {
    questions: [
      {
        id: '1',
        question: 'What are the two possible colors for nodes in a Red-Black tree?',
        options: ['Red and Blue', 'Black and White', 'Red and Black', 'Green and Red'],
        correctAnswer: 2,
        explanation: 'Red-Black trees use exactly two colors: Red and Black, hence the name.'
      },
      {
        id: '2',
        question: 'What color is the root node in a Red-Black tree?',
        options: ['Red', 'Black', 'Either color', 'No color'],
        correctAnswer: 1,
        explanation: 'The root node must always be black according to Red-Black tree properties.'
      },
      {
        id: '3',
        question: 'What is the rule about red nodes in a Red-Black tree?',
        options: ['Cannot have red children', 'Cannot have black children', 'Must be leaf nodes', 'Must have two children'],
        correctAnswer: 0,
        explanation: 'Red nodes cannot have red children (no two red nodes can be adjacent).'
      },
      {
        id: '4',
        question: 'What is the black-height property in Red-Black trees?',
        options: ['All nodes are black', 'All paths have equal black nodes', 'Height must be even', 'Root is always black'],
        correctAnswer: 1,
        explanation: 'Every path from a node to its descendant NIL nodes contains the same number of black nodes.'
      },
      {
        id: '5',
        question: 'What is the time complexity of insertion in a Red-Black tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Red-Black tree insertion takes O(log n) time due to the balanced structure maintained by the coloring rules.'
      },
      {
        id: '6',
        question: 'What color are NIL (leaf) nodes in a Red-Black tree?',
        options: ['Red', 'Black', 'Either color', 'Transparent'],
        correctAnswer: 1,
        explanation: 'All NIL (null/leaf) nodes are considered black in Red-Black trees.'
      },
      {
        id: '7',
        question: 'What is the maximum height of a Red-Black tree with n nodes?',
        options: ['log n', '2 log n', '3 log n', 'n'],
        correctAnswer: 1,
        explanation: 'The maximum height is 2 log₂(n + 1), which is still O(log n).'
      },
      {
        id: '8',
        question: 'Which operation is used to maintain Red-Black tree properties?',
        options: ['Balancing', 'Rotation and recoloring', 'Sorting', 'Hashing'],
        correctAnswer: 1,
        explanation: 'Both rotation and recoloring operations are used to maintain Red-Black tree properties after insertions and deletions.'
      },
      {
        id: '9',
        question: 'What color is a newly inserted node initially?',
        options: ['Black', 'Red', 'Either color', 'Depends on parent'],
        correctAnswer: 1,
        explanation: 'Newly inserted nodes are initially colored red to maintain the black-height property.'
      },
      {
        id: '10',
        question: 'What is the main advantage of Red-Black trees over AVL trees?',
        options: ['Better search performance', 'Simpler rotations', 'Fewer rotations needed', 'Less memory usage'],
        correctAnswer: 2,
        explanation: 'Red-Black trees require fewer rotations during insertion and deletion compared to AVL trees, making them more efficient for frequent modifications.'
      }
    ]
  },
  'heaps': {
    questions: [
      {
        id: '1',
        question: 'What is the heap property for a max-heap?',
        options: ['Parent ≤ Children', 'Parent ≥ Children', 'Parent = Children', 'No specific order'],
        correctAnswer: 1,
        explanation: 'In a max-heap, the parent node is always greater than or equal to its children.'
      },
      {
        id: '2',
        question: 'What is the time complexity of extracting the maximum element from a max-heap?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Extracting the maximum requires removing the root and heapifying down, which takes O(log n) time.'
      },
      {
        id: '3',
        question: 'How is a binary heap typically implemented?',
        options: ['Linked list', 'Array', 'Binary tree with pointers', 'Hash table'],
        correctAnswer: 1,
        explanation: 'Binary heaps are typically implemented using arrays for efficient memory usage and cache performance.'
      },
      {
        id: '4',
        question: 'In an array-based heap, what is the index of the left child of node at index i?',
        options: ['2i', '2i + 1', 'i/2', 'i + 1'],
        correctAnswer: 1,
        explanation: 'For a node at index i, the left child is at index 2i + 1 (assuming 0-based indexing).'
      },
      {
        id: '5',
        question: 'What is the time complexity of building a heap from an unsorted array?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 0,
        explanation: 'Building a heap using the heapify process takes O(n) time, not O(n log n) as commonly misconceived.'
      },
      {
        id: '6',
        question: 'What operation is performed to maintain heap property after insertion?',
        options: ['Heapify down', 'Heapify up', 'Rotation', 'Recoloring'],
        correctAnswer: 1,
        explanation: 'After insertion at the end, we perform heapify up (bubble up) to maintain the heap property.'
      },
      {
        id: '7',
        question: 'What is the height of a complete binary heap with n nodes?',
        options: ['log n', '⌊log₂(n)⌋', '⌈log₂(n)⌉', 'n'],
        correctAnswer: 1,
        explanation: 'The height of a complete binary heap with n nodes is ⌊log₂(n)⌋.'
      },
      {
        id: '8',
        question: 'Which sorting algorithm uses heaps?',
        options: ['Quick sort', 'Merge sort', 'Heap sort', 'Bubble sort'],
        correctAnswer: 2,
        explanation: 'Heap sort uses a heap data structure to sort elements with O(n log n) time complexity.'
      },
      {
        id: '9',
        question: 'What is the space complexity of a heap?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'A heap requires O(n) space to store n elements.'
      },
      {
        id: '10',
        question: 'In a min-heap, where is the smallest element located?',
        options: ['Last position', 'Middle', 'Root', 'Random position'],
        correctAnswer: 2,
        explanation: 'In a min-heap, the smallest element is always at the root (index 0).'
      }
    ]
  },
  'graphs': {
    questions: [
      {
        id: '1',
        question: 'What is the time complexity of DFS traversal in a graph with V vertices and E edges?',
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'],
        correctAnswer: 2,
        explanation: 'DFS visits each vertex once and examines each edge once, resulting in O(V + E) time complexity.'
      },
      {
        id: '2',
        question: 'Which data structure is used to implement DFS?',
        options: ['Queue', 'Stack', 'Heap', 'Array'],
        correctAnswer: 1,
        explanation: 'DFS uses a stack (either explicitly or through recursion) to keep track of vertices to visit.'
      },
      {
        id: '3',
        question: 'What is the space complexity of adjacency matrix representation?',
        options: ['O(V)', 'O(E)', 'O(V²)', 'O(V + E)'],
        correctAnswer: 2,
        explanation: 'Adjacency matrix requires O(V²) space regardless of the number of edges.'
      },
      {
        id: '4',
        question: 'Which algorithm is used to find the shortest path in an unweighted graph?',
        options: ['DFS', 'BFS', 'Dijkstra', 'Floyd-Warshall'],
        correctAnswer: 1,
        explanation: 'BFS finds the shortest path in unweighted graphs by exploring nodes level by level.'
      },
      {
        id: '5',
        question: 'What is a topological sort?',
        options: ['Sorting vertices by value', 'Linear ordering of vertices', 'Sorting edges by weight', 'Random ordering'],
        correctAnswer: 1,
        explanation: 'Topological sort is a linear ordering of vertices such that for every directed edge (u,v), u comes before v.'
      },
      {
        id: '6',
        question: 'Which algorithm detects cycles in a directed graph?',
        options: ['BFS', 'DFS with colors', 'Dijkstra', 'Prim\'s'],
        correctAnswer: 1,
        explanation: 'DFS with three colors (white, gray, black) can detect cycles in directed graphs.'
      },
      {
        id: '7',
        question: 'What is the time complexity of Dijkstra\'s algorithm using a binary heap?',
        options: ['O(V²)', 'O(E log V)', 'O(V log V)', 'O(V + E) log V'],
        correctAnswer: 3,
        explanation: 'Dijkstra\'s algorithm with binary heap has time complexity O((V + E) log V).'
      },
      {
        id: '8',
        question: 'Which graph representation is more space-efficient for sparse graphs?',
        options: ['Adjacency matrix', 'Adjacency list', 'Edge list', 'Incidence matrix'],
        correctAnswer: 1,
        explanation: 'Adjacency list uses O(V + E) space, making it more efficient for sparse graphs than adjacency matrix.'
      },
      {
        id: '9',
        question: 'What is a strongly connected component?',
        options: ['A complete subgraph', 'A cycle in the graph', 'A maximal set of mutually reachable vertices', 'A minimum spanning tree'],
        correctAnswer: 2,
        explanation: 'A strongly connected component is a maximal set of vertices where every vertex is reachable from every other vertex.'
      },
      {
        id: '10',
        question: 'Which algorithm finds the minimum spanning tree?',
        options: ['Dijkstra', 'BFS', 'Prim\'s or Kruskal\'s', 'Floyd-Warshall'],
        correctAnswer: 2,
        explanation: 'Both Prim\'s and Kruskal\'s algorithms find the minimum spanning tree of a weighted graph.'
      }
    ]
  },
  'hash-tables': {
    questions: [
      {
        id: '1',
        question: 'What is the average time complexity of search operation in a hash table?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Hash tables provide O(1) average time complexity for search operations through direct key-to-index mapping.'
      },
      {
        id: '2',
        question: 'What is a hash collision?',
        options: ['Two keys having same value', 'Two keys mapping to same index', 'Hash function error', 'Table overflow'],
        correctAnswer: 1,
        explanation: 'A hash collision occurs when two different keys hash to the same index in the hash table.'
      },
      {
        id: '3',
        question: 'Which collision resolution technique uses linked lists?',
        options: ['Linear probing', 'Quadratic probing', 'Chaining', 'Double hashing'],
        correctAnswer: 2,
        explanation: 'Chaining resolves collisions by storing multiple elements at the same index using linked lists.'
      },
      {
        id: '4',
        question: 'What is the load factor of a hash table?',
        options: ['Number of elements / Table size', 'Table size / Number of elements', 'Number of collisions', 'Hash function efficiency'],
        correctAnswer: 0,
        explanation: 'Load factor is the ratio of number of elements to the table size, indicating how full the table is.'
      },
      {
        id: '5',
        question: 'What happens when the load factor becomes too high?',
        options: ['Better performance', 'More collisions', 'Less memory usage', 'Faster searching'],
        correctAnswer: 1,
        explanation: 'High load factor leads to more collisions, degrading performance and potentially making operations O(n).'
      },
      {
        id: '6',
        question: 'Which probing technique examines positions h(k), h(k)+1, h(k)+2, ...?',
        options: ['Quadratic probing', 'Linear probing', 'Double hashing', 'Random probing'],
        correctAnswer: 1,
        explanation: 'Linear probing examines consecutive positions starting from the hash value until an empty slot is found.'
      },
      {
        id: '7',
        question: 'What is the worst-case time complexity of search in a hash table?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'In worst case, all elements hash to the same index, making search O(n) due to linear traversal.'
      },
      {
        id: '8',
        question: 'What is rehashing in hash tables?',
        options: ['Changing hash function', 'Resizing the table', 'Removing collisions', 'Sorting elements'],
        correctAnswer: 1,
        explanation: 'Rehashing involves resizing the hash table and redistributing all elements to maintain performance.'
      },
      {
        id: '9',
        question: 'Which hash function property ensures uniform distribution?',
        options: ['Deterministic', 'Fast computation', 'Uniform distribution', 'Collision resistance'],
        correctAnswer: 2,
        explanation: 'Uniform distribution ensures keys are evenly distributed across the hash table, minimizing collisions.'
      },
      {
        id: '10',
        question: 'What is double hashing?',
        options: ['Using two hash tables', 'Hashing twice', 'Using two hash functions for probing', 'Duplicate key handling'],
        correctAnswer: 2,
        explanation: 'Double hashing uses a second hash function to determine the probe sequence, reducing clustering.'
      }
    ]
  },

  'trees': {
    questions: [
      {
        id: '1',
        question: 'What is the height of a binary tree with n nodes in the worst case?',
        options: ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'In worst case (skewed tree), height can be n-1, making it O(n).'
      },
      {
        id: '2',
        question: 'What is the time complexity of searching in a balanced BST?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Balanced BST maintains O(log n) height, enabling O(log n) search time.'
      },
      {
        id: '3',
        question: 'Which traversal visits root between left and right subtrees?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
        correctAnswer: 1,
        explanation: 'Inorder traversal visits left subtree, then root, then right subtree.'
      },
      {
        id: '4',
        question: 'What property must a binary search tree satisfy?',
        options: ['Complete tree', 'Left < Root < Right', 'Balanced height', 'Full tree'],
        correctAnswer: 1,
        explanation: 'BST property: left subtree values < root < right subtree values.'
      },
      {
        id: '5',
        question: 'What is the maximum number of nodes in a binary tree of height h?',
        options: ['2^h', '2^(h+1) - 1', '2^h - 1', '2^(h-1)'],
        correctAnswer: 1,
        explanation: 'Maximum nodes = 2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1.'
      },
      {
        id: '6',
        question: 'Which tree is always balanced?',
        options: ['Binary tree', 'BST', 'AVL tree', 'Binary heap'],
        correctAnswer: 2,
        explanation: 'AVL tree maintains balance through rotations, ensuring height difference ≤ 1.'
      },
      {
        id: '7',
        question: 'What is the space complexity of recursive inorder traversal?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(h)'],
        correctAnswer: 3,
        explanation: 'Recursive calls use stack space proportional to tree height h.'
      },
      {
        id: '8',
        question: 'Which operation is NOT supported efficiently in a heap?',
        options: ['Insert', 'Delete max', 'Find max', 'Search arbitrary element'],
        correctAnswer: 3,
        explanation: 'Heaps are not ordered for arbitrary search, requiring O(n) time to find specific elements.'
      },
      {
        id: '9',
        question: 'What is a complete binary tree?',
        options: ['All levels filled', 'All internal nodes have 2 children', 'All levels filled except possibly last', 'Perfect binary tree'],
        correctAnswer: 2,
        explanation: 'Complete binary tree has all levels filled except possibly the last level, which is filled left to right.'
      },
      {
        id: '10',
        question: 'What is the time complexity of building a heap from an array?',
        options: ['O(n log n)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Bottom-up heap construction (heapify) takes O(n) time, not O(n log n).'
      }
    ]
  },

  'sorting': {
    questions: [
      {
        id: '1',
        question: 'What is the worst-case time complexity of Quick Sort?',
        options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'Quick Sort has O(n²) worst-case when pivot is always the smallest or largest element.'
      },
      {
        id: '2',
        question: 'Which sorting algorithm is stable?',
        options: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'],
        correctAnswer: 2,
        explanation: 'Merge Sort maintains relative order of equal elements, making it stable.'
      },
      {
        id: '3',
        question: 'What is the space complexity of Merge Sort?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Merge Sort requires O(n) extra space for merging subarrays.'
      },
      {
        id: '4',
        question: 'Which sorting algorithm works by building a sorted sequence one element at a time?',
        options: ['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Heap Sort'],
        correctAnswer: 1,
        explanation: 'Insertion Sort builds sorted sequence by inserting each element into its correct position.'
      },
      {
        id: '5',
        question: 'What is the best-case time complexity of Bubble Sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 0,
        explanation: 'Optimized Bubble Sort can detect sorted array and terminate early in O(n) time.'
      },
      {
        id: '6',
        question: 'Which sorting algorithm is used by most standard library sort functions?',
        options: ['Quick Sort', 'Merge Sort', 'Introsort', 'Heap Sort'],
        correctAnswer: 2,
        explanation: 'Introsort (introspective sort) combines Quick Sort, Heap Sort, and Insertion Sort for optimal performance.'
      },
      {
        id: '7',
        question: 'What is the time complexity of Counting Sort?',
        options: ['O(n log n)', 'O(n + k)', 'O(n²)', 'O(k log k)'],
        correctAnswer: 1,
        explanation: 'Counting Sort runs in O(n + k) where n is array size and k is range of input values.'
      },
      {
        id: '8',
        question: 'Which sorting algorithm performs best on nearly sorted data?',
        options: ['Quick Sort', 'Heap Sort', 'Insertion Sort', 'Selection Sort'],
        correctAnswer: 2,
        explanation: 'Insertion Sort performs exceptionally well on nearly sorted data with O(n) best-case.'
      },
      {
        id: '9',
        question: 'What is the invariant of Selection Sort?',
        options: ['Left part is sorted', 'Right part is sorted', 'Pivot is in correct position', 'Array is partitioned'],
        correctAnswer: 0,
        explanation: 'Selection Sort maintains the invariant that the left portion is always sorted.'
      },
      {
        id: '10',
        question: 'Which sorting algorithm is NOT comparison-based?',
        options: ['Merge Sort', 'Quick Sort', 'Radix Sort', 'Heap Sort'],
        correctAnswer: 2,
        explanation: 'Radix Sort works by processing digits/characters without comparing elements directly.'
      }
    ]
  },

  'dynamic-programming': {
    questions: [
      {
        id: '1',
        question: 'What are the two main properties required for dynamic programming?',
        options: ['Recursion and iteration', 'Optimal substructure and overlapping subproblems', 'Memoization and tabulation', 'Base case and recursive case'],
        correctAnswer: 1,
        explanation: 'DP requires optimal substructure (optimal solution contains optimal solutions to subproblems) and overlapping subproblems.'
      },
      {
        id: '2',
        question: 'What is memoization?',
        options: ['Bottom-up approach', 'Top-down caching', 'Space optimization', 'Recursive solution'],
        correctAnswer: 1,
        explanation: 'Memoization is a top-down approach that caches results of subproblems to avoid recomputation.'
      },
      {
        id: '3',
        question: 'What is the time complexity of the classic Fibonacci DP solution?',
        options: ['O(2^n)', 'O(n)', 'O(n log n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'DP solution for Fibonacci computes each number once, resulting in O(n) time complexity.'
      },
      {
        id: '4',
        question: 'In the 0/1 Knapsack problem, what does dp[i][w] represent?',
        options: ['Weight of item i', 'Value of item i', 'Maximum value using first i items with weight limit w', 'Number of items'],
        correctAnswer: 2,
        explanation: 'dp[i][w] represents the maximum value achievable using the first i items with weight limit w.'
      },
      {
        id: '5',
        question: 'What is the space complexity of the standard DP solution for Longest Common Subsequence?',
        options: ['O(1)', 'O(n)', 'O(m + n)', 'O(m × n)'],
        correctAnswer: 3,
        explanation: 'LCS typically uses a 2D table of size m × n where m and n are string lengths.'
      },
      {
        id: '6',
        question: 'Which technique is used to optimize space in DP solutions?',
        options: ['Memoization', 'Tabulation', 'Rolling array', 'Recursion'],
        correctAnswer: 2,
        explanation: 'Rolling array technique uses only necessary previous states, reducing space complexity.'
      },
      {
        id: '7',
        question: 'What is the difference between tabulation and memoization?',
        options: ['Speed vs memory', 'Bottom-up vs top-down', 'Iterative vs recursive', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'Tabulation is bottom-up and iterative, while memoization is top-down and recursive.'
      },
      {
        id: '8',
        question: 'In the coin change problem, what does dp[i] represent?',
        options: ['Value of coin i', 'Number of coins', 'Minimum coins needed to make amount i', 'Maximum amount'],
        correctAnswer: 2,
        explanation: 'dp[i] represents the minimum number of coins needed to make amount i.'
      },
      {
        id: '9',
        question: 'What is the time complexity of the edit distance problem?',
        options: ['O(n)', 'O(n²)', 'O(m × n)', 'O(2^n)'],
        correctAnswer: 2,
        explanation: 'Edit distance (Levenshtein distance) has O(m × n) time complexity for strings of length m and n.'
      },
      {
        id: '10',
        question: 'Which DP pattern is used for problems with choices at each step?',
        options: ['Linear DP', 'Interval DP', 'Tree DP', 'Decision DP'],
        correctAnswer: 3,
        explanation: 'Decision DP pattern is used when we have choices at each step, like take/don\'t take in knapsack.'
      }
    ]
  },
 'complexity-analysis': {
  questions: [
    {
      id: '1',
      question: 'What is the time complexity of a nested loop where outer loop runs n times and inner loop runs m times?',
      options: ['O(n + m)', 'O(n * m)', 'O(n^m)', 'O(max(n, m))'],
      correctAnswer: 1,
      explanation: 'Nested loops multiply their complexities, resulting in O(n * m) time complexity.'
    },
    {
      id: '2',
      question: 'Which notation represents the best-case time complexity?',
      options: ['Big O (O)', 'Big Omega (Ω)', 'Big Theta (Θ)', 'Little o (o)'],
      correctAnswer: 1,
      explanation: 'Big Omega (Ω) notation represents the best-case or lower bound of an algorithm.'
    },
    {
      id: '3',
      question: 'What is the space complexity of a recursive function with depth d that uses O(1) space per call?',
      options: ['O(1)', 'O(log d)', 'O(d)', 'O(d²)'],
      correctAnswer: 2,
      explanation: 'Recursive calls create a call stack of depth d, each using O(1) space, totaling O(d) space.'
    },
    {
      id: '4',
      question: 'Which complexity class grows fastest?',
      options: ['O(n log n)', 'O(n²)', 'O(2^n)', 'O(n!)'],
      correctAnswer: 3,
      explanation: 'Factorial O(n!) grows faster than exponential O(2^n), which grows faster than polynomial complexities.'
    },
    {
      id: '5',
      question: 'What is the time complexity of binary search on a sorted array?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 1,
      explanation: 'Binary search eliminates half the search space in each iteration, resulting in O(log n) complexity.'
    },
    {
      id: '6',
      question: 'What does amortized analysis measure?',
      options: ['Worst-case performance', 'Average performance over sequence of operations', 'Best-case performance', 'Memory usage'],
      correctAnswer: 1,
      explanation: 'Amortized analysis calculates the average time per operation over a sequence of operations.'
    },
    {
      id: '7',
      question: 'Which operation on a hash table has O(1) average time complexity?',
      options: ['Insertion only', 'Search only', 'Deletion only', 'All of the above'],
      correctAnswer: 3,
      explanation: 'Hash tables provide O(1) average time complexity for insertion, search, and deletion operations.'
    },
    {
      id: '8',
      question: 'What is the time complexity of finding all prime numbers up to n using Sieve of Eratosthenes?',
      options: ['O(n)', 'O(n log n)', 'O(n log log n)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'Sieve of Eratosthenes has time complexity O(n log log n) due to its efficient prime marking process.'
    },
    {
      id: '9',
      question: 'Which data structure operation typically has O(log n) time complexity?',
      options: ['Array access', 'Hash table lookup', 'Heap insertion', 'Stack push'],
      correctAnswer: 2,
      explanation: 'Heap insertion maintains heap property by bubbling up, taking O(log n) time in worst case.'
    },
    {
      id: '10',
      question: 'What is the space complexity of merge sort?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 2,
      explanation: 'Merge sort requires O(n) extra space for temporary arrays during the merge process.'
    }
  ]
},

'number-theory': {
  questions: [
    {
      id: '1',
      question: 'What is the time complexity of the Euclidean algorithm for finding GCD?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctAnswer: 1,
      explanation: 'Euclidean algorithm has O(log n) time complexity where n is the smaller of the two numbers.'
    },
    {
      id: '2',
      question: 'Which test is commonly used for primality testing?',
      options: ['Linear search', 'Binary search', 'Miller-Rabin test', 'Bubble sort'],
      correctAnswer: 2,
      explanation: 'Miller-Rabin is a probabilistic primality test that efficiently determines if a number is prime.'
    },
    {
      id: '3',
      question: 'What is the relationship between GCD and LCM for two numbers a and b?',
      options: ['GCD(a,b) = LCM(a,b)', 'GCD(a,b) × LCM(a,b) = a × b', 'GCD(a,b) + LCM(a,b) = a + b', 'No relationship'],
      correctAnswer: 1,
      explanation: 'For any two numbers a and b: GCD(a,b) × LCM(a,b) = a × b.'
    },
    {
      id: '4',
      question: 'What does Fermat\'s Little Theorem state?',
      options: ['a^p ≡ a (mod p) for prime p', 'a^(p-1) ≡ 1 (mod p) for prime p and gcd(a,p)=1', 'a^2 ≡ 1 (mod p)', 'a + p ≡ a (mod p)'],
      correctAnswer: 1,
      explanation: 'Fermat\'s Little Theorem: if p is prime and gcd(a,p)=1, then a^(p-1) ≡ 1 (mod p).'
    },
    {
      id: '5',
      question: 'What is the modular multiplicative inverse of a modulo m?',
      options: ['a × x ≡ 0 (mod m)', 'a × x ≡ 1 (mod m)', 'a + x ≡ 1 (mod m)', 'a - x ≡ 1 (mod m)'],
      correctAnswer: 1,
      explanation: 'Modular multiplicative inverse x satisfies a × x ≡ 1 (mod m).'
    },
    {
      id: '6',
      question: 'Which algorithm is used to solve linear Diophantine equations?',
      options: ['Bubble sort', 'Extended Euclidean algorithm', 'Quick sort', 'Binary search'],
      correctAnswer: 1,
      explanation: 'Extended Euclidean algorithm finds integer solutions to equations of the form ax + by = gcd(a,b).'
    },
    {
      id: '7',
      question: 'What is the Chinese Remainder Theorem used for?',
      options: ['Finding primes', 'Solving system of congruences', 'Factoring numbers', 'Computing GCD'],
      correctAnswer: 1,
      explanation: 'Chinese Remainder Theorem provides a method to solve systems of simultaneous congruences.'
    },
    {
      id: '8',
      question: 'What is Euler\'s totient function φ(n)?',
      options: ['Number of divisors of n', 'Sum of divisors of n', 'Count of integers ≤ n coprime to n', 'Largest prime factor of n'],
      correctAnswer: 2,
      explanation: 'Euler\'s totient function φ(n) counts positive integers up to n that are coprime to n.'
    },
    {
      id: '9',
      question: 'What is the time complexity of trial division for primality testing?',
      options: ['O(1)', 'O(log n)', 'O(√n)', 'O(n)'],
      correctAnswer: 2,
      explanation: 'Trial division checks divisibility up to √n, resulting in O(√n) time complexity.'
    },
    {
      id: '10',
      question: 'What property do Wilson\'s theorem and Fermat\'s Little Theorem share?',
      options: ['Both work for all integers', 'Both are primality tests', 'Both involve modular arithmetic', 'Both find factors'],
      correctAnswer: 2,
      explanation: 'Both Wilson\'s theorem and Fermat\'s Little Theorem are fundamental results in modular arithmetic.'
    }
  ]
},

'bit-manipulation': {
  questions: [
    {
      id: '1',
      question: 'What does the XOR operation a ^ a return?',
      options: ['a', '1', '0', 'Undefined'],
      correctAnswer: 2,
      explanation: 'XOR of any number with itself always returns 0: a ^ a = 0.'
    },
    {
      id: '2',
      question: 'How do you check if a number is a power of 2?',
      options: ['n % 2 == 0', 'n & (n-1) == 0', 'n | (n-1) == 0', 'n ^ (n-1) == 0'],
      correctAnswer: 1,
      explanation: 'For powers of 2, n & (n-1) equals 0 because powers of 2 have only one bit set.'
    },
    {
      id: '3',
      question: 'What is the result of left shifting a number by k positions?',
      options: ['n / 2^k', 'n * 2^k', 'n + k', 'n - k'],
      correctAnswer: 1,
      explanation: 'Left shift by k positions is equivalent to multiplying by 2^k: n << k = n * 2^k.'
    },
    {
      id: '4',
      question: 'How do you flip the i-th bit of a number n?',
      options: ['n | (1 << i)', 'n & (1 << i)', 'n ^ (1 << i)', 'n >> i'],
      correctAnswer: 2,
      explanation: 'XOR with (1 << i) flips the i-th bit: n ^ (1 << i).'
    },
    {
      id: '5',
      question: 'What does Brian Kernighan\'s algorithm count?',
      options: ['Total bits', 'Set bits (1s)', 'Unset bits (0s)', 'Bit positions'],
      correctAnswer: 1,
      explanation: 'Brian Kernighan\'s algorithm efficiently counts the number of set bits using n & (n-1).'
    },
    {
      id: '6',
      question: 'How do you clear the i-th bit of a number n?',
      options: ['n | (1 << i)', 'n & ~(1 << i)', 'n ^ (1 << i)', 'n << i'],
      correctAnswer: 1,
      explanation: 'AND with ~(1 << i) clears the i-th bit: n & ~(1 << i).'
    },
    {
      id: '7',
      question: 'What is the time complexity of counting set bits using Brian Kernighan\'s algorithm?',
      options: ['O(1)', 'O(log n)', 'O(number of set bits)', 'O(n)'],
      correctAnswer: 2,
      explanation: 'The algorithm runs in O(number of set bits) time, making it efficient for sparse bit patterns.'
    },
    {
      id: '8',
      question: 'How do you find the rightmost set bit of a number n?',
      options: ['n & (n-1)', 'n & (-n)', 'n | (n-1)', 'n ^ (n-1)'],
      correctAnswer: 1,
      explanation: 'n & (-n) isolates the rightmost set bit due to two\'s complement representation.'
    },
    {
      id: '9',
      question: 'What does the operation n | (n-1) do?',
      options: ['Clears rightmost set bit', 'Sets rightmost unset bit', 'Flips all bits', 'Counts set bits'],
      correctAnswer: 1,
      explanation: 'n | (n-1) sets the rightmost unset bit and all bits to its right.'
    },
    {
      id: '10',
      question: 'How do you swap two numbers without using a temporary variable?',
      options: ['a = a + b; b = a - b; a = a - b', 'a = a ^ b; b = a ^ b; a = a ^ b', 'Both A and B', 'Neither A nor B'],
      correctAnswer: 2,
      explanation: 'Both arithmetic and XOR methods can swap numbers: addition/subtraction or XOR operations.'
    }
  ]
},
}