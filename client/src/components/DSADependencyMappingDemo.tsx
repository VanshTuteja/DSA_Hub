import React, { useState, useEffect } from 'react';
import { Settings, BookOpen, Target, TrendingUp, CheckCircle, AlertCircle, Users, BarChart3, ArrowRight, Play, Pause, Moon, Sun, Code, Database, GitBranch } from 'lucide-react';

const DSADependencyMappingDemo = () => {
  const [activeDemo, setActiveDemo] = useState('concept');
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // DSA-specific dependency data
  const dsaConceptMap = {
    'Arrays & Strings': {
      level: 1,
      dependencies: [],
      description: 'Fundamental data structures for storing sequences of elements',
      progress: 95,
      unlocks: ['Linked Lists', 'Two Pointers', 'Sliding Window'],
      difficulty: 'Beginner',
      timeToMaster: '2-3 weeks'
    },
    'Linked Lists': {
      level: 2,
      dependencies: ['Arrays & Strings'],
      description: 'Dynamic data structures with node-based storage',
      progress: 85,
      unlocks: ['Stacks & Queues', 'Trees'],
      difficulty: 'Beginner',
      timeToMaster: '1-2 weeks'
    },
    'Stacks & Queues': {
      level: 2,
      dependencies: ['Arrays & Strings', 'Linked Lists'],
      description: 'LIFO and FIFO data structures for ordered processing',
      progress: 75,
      unlocks: ['Trees', 'Graph Traversal'],
      difficulty: 'Beginner',
      timeToMaster: '1-2 weeks'
    },
    'Hash Tables': {
      level: 2,
      dependencies: ['Arrays & Strings'],
      description: 'Key-value data structures with O(1) average lookup',
      progress: 80,
      unlocks: ['Graph Algorithms', 'Dynamic Programming'],
      difficulty: 'Intermediate',
      timeToMaster: '2-3 weeks'
    },
    'Trees': {
      level: 3,
      dependencies: ['Linked Lists', 'Stacks & Queues'],
      description: 'Hierarchical data structures with parent-child relationships',
      progress: 60,
      unlocks: ['Binary Search Trees', 'Heap', 'Graph Algorithms'],
      difficulty: 'Intermediate',
      timeToMaster: '3-4 weeks'
    },
    'Binary Search Trees': {
      level: 4,
      dependencies: ['Trees', 'Hash Tables'],
      description: 'Ordered binary trees with efficient search operations',
      progress: 45,
      unlocks: ['Advanced Trees', 'Graph Algorithms'],
      difficulty: 'Intermediate',
      timeToMaster: '2-3 weeks'
    },
    'Heap': {
      level: 4,
      dependencies: ['Trees'],
      description: 'Complete binary trees with heap property for priority operations',
      progress: 30,
      unlocks: ['Sorting Algorithms', 'Graph Algorithms'],
      difficulty: 'Intermediate',
      timeToMaster: '2-3 weeks'
    },
    'Graph Algorithms': {
      level: 5,
      dependencies: ['Trees', 'Hash Tables', 'Stacks & Queues'],
      description: 'Algorithms for traversing and analyzing graph structures',
      progress: 20,
      unlocks: ['Dynamic Programming', 'Advanced Algorithms'],
      difficulty: 'Advanced',
      timeToMaster: '4-6 weeks'
    },
    'Dynamic Programming': {
      level: 5,
      dependencies: ['Hash Tables', 'Graph Algorithms'],
      description: 'Optimization technique using memoization and tabulation',
      progress: 15,
      unlocks: ['Advanced Algorithms'],
      difficulty: 'Advanced',
      timeToMaster: '6-8 weeks'
    }
  };

  const dsaAssessmentData = {
    beginner: {
      title: 'Arrays & Basic Data Structures',
      questions: [
        { id: 1, question: 'Reverse an array in-place', type: 'Coding Challenge', difficulty: 'Easy', timeLimit: '15 min' },
        { id: 2, question: 'Find the maximum element in an array', type: 'Algorithm Design', difficulty: 'Easy', timeLimit: '10 min' },
        { id: 3, question: 'Implement a simple stack using arrays', type: 'Implementation', difficulty: 'Easy', timeLimit: '20 min' }
      ],
      estimatedTime: '45 minutes',
      prerequisites: ['Basic Programming', 'Problem Solving']
    },
    intermediate: {
      title: 'Trees & Hash Tables',
      questions: [
        { id: 1, question: 'Binary Tree Level Order Traversal', type: 'Tree Algorithms', difficulty: 'Medium', timeLimit: '30 min' },
        { id: 2, question: 'Design a HashMap with collision handling', type: 'System Design', difficulty: 'Medium', timeLimit: '25 min' },
        { id: 3, question: 'Find LCA of two nodes in BST', type: 'Tree Algorithms', difficulty: 'Medium', timeLimit: '20 min' }
      ],
      estimatedTime: '75 minutes',
      prerequisites: ['Arrays & Strings', 'Linked Lists', 'Basic Trees']
    },
    advanced: {
      title: 'Graph Algorithms & Dynamic Programming',
      questions: [
        { id: 1, question: 'Implement Dijkstra\'s shortest path algorithm', type: 'Graph Algorithms', difficulty: 'Hard', timeLimit: '45 min' },
        { id: 2, question: 'Longest Increasing Subsequence (DP)', type: 'Dynamic Programming', difficulty: 'Hard', timeLimit: '40 min' },
        { id: 3, question: 'Design a distributed cache system', type: 'System Design', difficulty: 'Hard', timeLimit: '60 min' }
      ],
      estimatedTime: '2.5 hours',
      prerequisites: ['Trees', 'Hash Tables', 'Graph Traversal', 'Basic DP']
    }
  };

  const dsaResultsData = {
    overallProgress: 68,
    completedConcepts: 6,
    totalConcepts: 9,
    strongAreas: ['Arrays & Strings', 'Linked Lists', 'Hash Tables'],
    improvementAreas: ['Dynamic Programming', 'Graph Algorithms'],
    nextRecommendations: [
      'Master Binary Search Trees fundamentals',
      'Practice Graph BFS/DFS problems',
      'Start with basic DP patterns'
    ],
    timeSpent: '42.5 hours',
    avgScore: 82,
    problemsSolved: 127,
    currentStreak: 15
  };

  // Animation effect for concept mapping
  useEffect(() => {
    if (isAnimating && activeDemo === 'concept') {
      const interval = setInterval(() => {
        const concepts = Object.keys(dsaConceptMap);
        const randomConcept = concepts[Math.floor(Math.random() * concepts.length)];
        setSelectedConcept(randomConcept);
      }, 2000 / animationSpeed);

      return () => clearInterval(interval);
    }
  }, [isAnimating, animationSpeed, activeDemo]);

  const ConceptMappingDemo = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            DSA Concept Dependency Map
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Interactive visualization of Data Structures & Algorithms learning path
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25'
            }`}
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isAnimating ? 'Pause' : 'Animate'}</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Speed:</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-20 accent-blue-600"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <div className={`relative overflow-hidden rounded-2xl p-8 min-h-[500px] ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
              : 'bg-white/80 border border-gray-200/50 backdrop-blur-sm shadow-xl'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-200"></div>
            </div>
            
            {/* Concept nodes */}
            <div className="relative z-10 h-full">
              {Object.entries(dsaConceptMap).map(([concept, data], index) => {
                const isSelected = selectedConcept === concept;
                const isUnlocked = data.progress > 50;
                const row = Math.floor(index / 3);
                const col = index % 3;
                
                return (
                  <div
                    key={concept}
                    className={`absolute transition-all duration-700 cursor-pointer transform ${
                      isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                    }`}
                    style={{
                      left: `${10 + col * 30}%`,
                      top: `${10 + row * 22}%`,
                    }}
                    onClick={() => setSelectedConcept(concept)}
                  >
                    <div className={`relative p-4 rounded-2xl transition-all duration-500 border-2 ${
                      isSelected 
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500 shadow-2xl shadow-blue-500/50'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500 shadow-2xl shadow-blue-500/50'
                        : isUnlocked 
                          ? isDarkMode
                            ? 'bg-gradient-to-r from-green-800/80 to-emerald-800/80 border-green-500/50 text-green-100 shadow-lg shadow-green-500/20'
                            : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-800 shadow-lg shadow-green-500/20'
                          : isDarkMode
                            ? 'bg-gradient-to-r from-gray-700/80 to-gray-800/80 border-gray-600/50 text-gray-300 shadow-lg'
                            : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 text-gray-600 shadow-lg'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        {isUnlocked ? (
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="font-semibold text-sm leading-tight">{concept}</span>
                      </div>
                      
                      <div className="mb-2">
                        <div className={`w-full rounded-full h-2 ${
                          isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                        }`}>
                          <div
                            className={`h-2 rounded-full transition-all duration-700 ${
                              isSelected 
                                ? 'bg-white shadow-lg' 
                                : 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm'
                            }`}
                            style={{ width: `${data.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs">{data.progress}%</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            data.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                            data.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {data.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Connection lines */}
                    {data.dependencies.map((dep, depIndex) => (
                      <svg
                        key={dep}
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full pointer-events-none"
                        width="60"
                        height="4"
                        viewBox="0 0 60 4"
                      >
                        <line
                          x1="0"
                          y1="2"
                          x2="50"
                          y2="2"
                          stroke={isDarkMode ? '#6366f1' : '#3b82f6'}
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="animate-pulse"
                        />
                        <polygon
                          points="50,0 60,2 50,4"
                          fill={isDarkMode ? '#6366f1' : '#3b82f6'}
                        />
                      </svg>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`rounded-2xl p-4 ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
              : 'bg-white/80 border border-gray-200/50 backdrop-blur-sm shadow-lg'
          }`}>
            <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 flex items-center`}>
              <GitBranch className="w-5 h-5 mr-2" />
              Legend
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg shadow-sm"></div>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Mastered (≥50%)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg shadow-sm"></div>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>In Progress (&lt;50%)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-sm"></div>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Currently Selected</span>
              </div>
            </div>
          </div>

          {selectedConcept && (
            <div className={`rounded-2xl p-4 ${
              isDarkMode 
                ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
                : 'bg-white/80 border border-gray-200/50 backdrop-blur-sm shadow-lg'
            }`}>
              <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 flex items-center`}>
                <Code className="w-5 h-5 mr-2" />
                {selectedConcept}
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {dsaConceptMap[selectedConcept].description}
              </p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Progress:</span>
                  <span className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    {dsaConceptMap[selectedConcept].progress}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Level:</span>
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                    {dsaConceptMap[selectedConcept].level}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time to Master:</span>
                  <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                    {dsaConceptMap[selectedConcept].timeToMaster}
                  </span>
                </div>
                
                {dsaConceptMap[selectedConcept].dependencies.length > 0 && (
                  <div>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Prerequisites:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dsaConceptMap[selectedConcept].dependencies.map(dep => (
                        <span key={dep} className={`px-2 py-1 text-xs rounded-full ${
                          isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {dep}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {dsaConceptMap[selectedConcept].unlocks.length > 0 && (
                  <div>
                    <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Unlocks:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dsaConceptMap[selectedConcept].unlocks.map(unlock => (
                        <span key={unlock} className={`px-2 py-1 text-xs rounded-full ${
                          isDarkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700'
                        }`}>
                          {unlock}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const AssessmentPreviewDemo = () => {
    const [selectedLevel, setSelectedLevel] = useState('beginner');
    
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Adaptive DSA Assessment
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Personalized coding challenges based on your skill level
            </p>
          </div>
          <div className="flex space-x-2">
            {Object.keys(dsaAssessmentData).map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-xl capitalize font-medium transition-all transform hover:scale-105 ${
                  selectedLevel === level
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className={`rounded-2xl p-6 ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
              : 'bg-white/80 border border-gray-200/50 backdrop-blur-sm shadow-xl'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {dsaAssessmentData[selectedLevel].title}
              </h4>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Estimated Time:</span>
                <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {dsaAssessmentData[selectedLevel].estimatedTime}
                </span>
              </div>
              <div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Prerequisites:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {dsaAssessmentData[selectedLevel].prerequisites.map(prereq => (
                    <span key={prereq} className={`px-3 py-1 text-xs rounded-full ${
                      isDarkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {dsaAssessmentData[selectedLevel].questions.map((question, index) => (
                <div key={question.id} className={`rounded-xl p-4 transition-all hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border border-gray-600/50' 
                    : 'bg-gray-50/80 border border-gray-200/50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                      }`}>
                        #{index + 1}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {question.timeLimit}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      question.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <p className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {question.question}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {question.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl p-6 ${
            isDarkMode 
              ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
              : 'bg-white/80 border border-gray-200/50 backdrop-blur-sm shadow-xl'
          }`}>
            <h4 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Assessment Features
            </h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Adaptive Difficulty
                  </h5>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Problems adjust based on your performance and coding patterns
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Real-time Code Review
                  </h5>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Instant feedback on code quality, optimization, and best practices
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Performance Analytics
                  </h5>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Track time complexity, space usage, and coding efficiency metrics
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Peer Comparison
                  </h5>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Compare your solutions with other learners at similar levels
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
              }`}>
                Start {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ResultsAnalyticsDemo = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Learning Analytics Dashboard
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Track your DSA mastery progress and identify growth opportunities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Last updated: 2 hours ago
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className={`rounded-2xl p-6 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-800/50 to-blue-900/50 border border-blue-700/50' 
            : 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
              {dsaResultsData.overallProgress}%
            </span>
          </div>
          <h4 className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            Overall Progress
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
            {dsaResultsData.completedConcepts}/{dsaResultsData.totalConcepts} concepts mastered
          </p>
        </div>

        <div className={`rounded-2xl p-6 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-green-800/50 to-green-900/50 border border-green-700/50' 
            : 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-green-900'}`}>
              {dsaResultsData.problemsSolved}
            </span>
          </div>
          <h4 className={`font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
            Problems Solved
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-green-200' : 'text-green-600'}`}>
            {dsaResultsData.currentStreak} day streak
          </p>
        </div>

        <div className={`rounded-2xl p-6 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-800/50 to-purple-900/50 border border-purple-700/50' 
            : 'bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-purple-500" />
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-purple-900'}`}>
              {dsaResultsData.avgScore}
            </span>
          </div>
          <h4 className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-800'}`}>
            Average Score
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-purple-600'}`}>
            Across all assessments
          </p>
        </div>

        <div className={`rounded-2xl p-6 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-orange-800/50 to-orange-900/50 border border-orange-700/50' 
            : 'bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 text-orange-500" />
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-orange-900'}`}>
              {dsaResultsData.timeSpent}
            </span>
          </div>
          <h4 className={`font-semibold ${isDarkMode ? 'text-orange-300' : 'text-orange-800'}`}>
            Time Invested
          </h4>
          <p className={`text-sm ${isDarkMode ? 'text-orange-200' : 'text-orange-600'}`}>
            Total learning time
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`rounded-2xl p-6 ${
          isDarkMode 
            ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
            : 'bg-white/80 border border-gray-200/50 backdrop-blur-sm shadow-xl'
        }`}>
          <h4 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Strong Areas
          </h4>
          <div className="space-y-3">
            {dsaResultsData.strongAreas.map((area, index) => (
              <div key={area} className={`flex items-center space-x-3 p-3 rounded-xl ${
                isDarkMode ? 'bg-green-900/30 border border-green-800/50' : 'bg-green-50 border border-green-200'
              }`}>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className={`font-medium ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl p-6 ${
          isDarkMode 
            ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
            : 'bg-white/80 border border-gray-200/50 backdrop-blur-sm shadow-xl'
        }`}>
          <h4 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Areas for Improvement
          </h4>
          <div className="space-y-3">
            {dsaResultsData.improvementAreas.map((area, index) => (
              <div key={area} className={`flex items-center space-x-3 p-3 rounded-xl ${
                isDarkMode ? 'bg-red-900/30 border border-red-800/50' : 'bg-red-50 border border-red-200'
              }`}>
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className={`font-medium ${isDarkMode ? 'text-red-300' : 'text-red-800'}`}>
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 ${
        isDarkMode 
          ? 'bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm' 
          : 'bg-white/80 border border-gray-200/50 backdrop-blur-sm shadow-xl'
      }`}>
        <h4 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Personalized Recommendations
        </h4>
        <div className="space-y-3">
          {dsaResultsData.nextRecommendations.map((recommendation, index) => (
            <div key={index} className={`flex items-center space-x-3 p-4 rounded-xl transition-all hover:scale-[1.02] ${
              isDarkMode ? 'bg-blue-900/30 border border-blue-800/50' : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{index + 1}</span>
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  {recommendation}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              DSA Learning Platform
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Master Data Structures & Algorithms with intelligent learning paths
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-xl transition-all transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-500/25' 
                  : 'bg-gray-800 hover:bg-gray-900 text-white shadow-lg'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className={`p-3 rounded-xl transition-all transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-lg'
            }`}>
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'concept', label: 'Concept Mapping', icon: GitBranch },
              { key: 'assessment', label: 'Assessment Preview', icon: Target },
              { key: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveDemo(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  activeDemo === key
                    ? isDarkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="transition-all duration-500">
          {activeDemo === 'concept' && <ConceptMappingDemo />}
          {activeDemo === 'assessment' && <AssessmentPreviewDemo />}
          {activeDemo === 'analytics' && <ResultsAnalyticsDemo />}
        </div>
      </div>
    </div>
  );
};

export default DSADependencyMappingDemo;