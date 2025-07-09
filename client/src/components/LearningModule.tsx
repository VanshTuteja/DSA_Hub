import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Play, CheckCircle, Clock, Download, ArrowRight, ArrowLeft as PrevIcon, Target, Pause } from 'lucide-react';
import type { Topic } from '../interface/types';

interface Module {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'video' | 'reading' | 'practice';
  content: string;
  isCompleted: boolean;
}

interface LearningModuleProps {
  topic: Topic;
  onBack: () => void;
  onStartQuiz: (topicId: string) => void;
  onMarkComplete: (topicId: string, moduleId: string) => void;
}

const LearningModule: React.FC<LearningModuleProps> = ({ 
  topic, 
  onBack, 
  onStartQuiz, 
  onMarkComplete 
}) => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Sample DSA modules data
  const getModulesForTopic = (topicId: string): Module[] => {
    const moduleData: Record<string, Module[]> = {
      'arrays': [
        {
          id: '1',
          title: 'Introduction to Arrays & Memory Layout',
          description: 'Understanding array fundamentals, memory allocation, and basic operations',
          duration: 30,
          type: 'video',
          content: 'This module introduces the fundamental concepts of arrays, their purpose, and their role in programming. You\'ll learn about the basic structure of an array, including how elements are stored in contiguous memory locations. We\'ll cover creating your first array and accessing elements using indices. You\'ll also learn how to set up a development environment for practicing array operations and testing your code. We\'ll discuss memory allocation, cache efficiency, and troubleshooting common issues such as index out of bounds errors.',
          isCompleted: false
        },
        {
          id: '2',
          title: 'Array Operations & Time Complexity',
          description: 'Learn insertion, deletion, searching, and their time complexities',
          duration: 25,
          type: 'reading',
          content: 'Deep dive into array operations including insertion at different positions, deletion strategies, and various searching techniques. Understanding time complexity analysis for each operation.',
          isCompleted: false
        },
        {
          id: '3',
          title: 'Multi-dimensional Arrays',
          description: 'Working with 2D arrays, matrices, and nested structures',
          duration: 35,
          type: 'video',
          content: 'Explore multi-dimensional arrays, matrix operations, and practical applications in real-world programming scenarios.',
          isCompleted: false
        },
        {
          id: '4',
          title: 'Array Algorithms & Patterns',
          description: 'Common array algorithms like two pointers, sliding window',
          duration: 40,
          type: 'practice',
          content: 'Practice implementing common array algorithms and problem-solving patterns used in competitive programming and interviews.',
          isCompleted: false
        }
      ],
      'linked-lists': [
        {
          id: '1',
          title: 'Introduction to Linked Lists',
          description: 'Understanding nodes, pointers, and dynamic memory allocation',
          duration: 35,
          type: 'video',
          content: 'Learn the fundamentals of linked lists, how they differ from arrays, and the concept of nodes and pointers.',
          isCompleted: false
        },
        {
          id: '2',
          title: 'Singly Linked List Operations',
          description: 'Insertion, deletion, and traversal in singly linked lists',
          duration: 30,
          type: 'reading',
          content: 'Master the basic operations of singly linked lists including insertion at various positions and deletion strategies.',
          isCompleted: false
        },
        {
          id: '3',
          title: 'Doubly & Circular Linked Lists',
          description: 'Advanced linked list variations and their applications',
          duration: 25,
          type: 'video',
          content: 'Explore doubly linked lists and circular linked lists, understanding their advantages and use cases.',
          isCompleted: false
        }
      ],
      'stacks': [
        {
          id: '1',
          title: 'Stack Fundamentals & LIFO Principle',
          description: 'Understanding stack operations and the Last-In-First-Out principle',
          duration: 25,
          type: 'video',
          content: 'Learn about stack data structure, LIFO principle, and basic operations like push, pop, and peek.',
          isCompleted: false
        },
        {
          id: '2',
          title: 'Stack Implementation & Applications',
          description: 'Implementing stacks using arrays and linked lists',
          duration: 30,
          type: 'reading',
          content: 'Understand different ways to implement stacks and their real-world applications in programming.',
          isCompleted: false
        }
      ]
    };

    return moduleData[topicId] || [
      {
        id: '1',
        title: `Introduction to ${topic.name}`,
        description: `Learn the fundamentals of ${topic.name} and core concepts`,
        duration: 30,
        type: 'video',
        content: `This module covers the essential concepts of ${topic.name} in data structures and algorithms.`,
        isCompleted: false
      }
    ];
  };

  const modules = getModulesForTopic(topic.id);
  const currentModule = modules[currentModuleIndex];
  const completedModules = modules.filter(m => m.isCompleted).length;
  const progressPercentage = Math.round((completedModules / modules.length) * 100);

  const handleMarkComplete = () => {
    onMarkComplete(topic.id, currentModule.id);
  };

  const handleNext = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-5 h-5" />;
      case 'reading': return <BookOpen className="w-5 h-5" />;
      case 'practice': return <Target className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-100 px-3 py-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-700">Learning: {topic.name}</span>
              <span className="text-sm text-blue-600">{progressPercentage}% Complete</span>
            </div>
            
            <button
              onClick={() => onStartQuiz(topic.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>Take Quiz</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Learning Modules */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-8">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold text-gray-900">Learning Modules</h3>
              </div>
              
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    onClick={() => setCurrentModuleIndex(index)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      index === currentModuleIndex
                        ? 'bg-indigo-50 border-2 border-indigo-200'
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        module.isCompleted
                          ? 'bg-green-100 text-green-600'
                          : index === currentModuleIndex
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {module.isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {module.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          {getModuleIcon(module.type)}
                          <span className="text-xs text-gray-500">
                            {module.type === 'video' ? 'Video' : 
                             module.type === 'reading' ? 'Reading' : 'Practice'}
                          </span>
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{module.duration} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Module Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-white mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8" />
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{currentModule.title}</h1>
                    <p className="text-indigo-100 mt-1">{currentModule.type === 'video' ? 'Video Content' : 
                                                        currentModule.type === 'reading' ? 'Reading Material' : 'Practice Session'}</p>
                  </div>
                </div>
                <button
                  onClick={handleMarkComplete}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>
              </div>
              
              <p className="text-lg text-indigo-100">{currentModule.description}</p>
            </div>

            {/* Module Content */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
              {currentModule.type === 'video' && (
                <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {isVideoPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </div>
                    <button
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      {isVideoPlaying ? 'Pause Video' : 'Play Video'}
                    </button>
                    <p className="text-sm text-gray-300 mt-2">
                      Duration: {currentModule.duration} minutes
                    </p>
                  </div>
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700">
                    {currentModule.content}
                  </p>
                  
                  {currentModule.type === 'practice' && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-4">Practice Exercise</h3>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                        <div>// Example: Array traversal</div>
                        <div>function traverseArray(arr) {'{'}</div>
                        <div>&nbsp;&nbsp;for (let i = 0; i &lt; arr.length; i++) {'{'}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;console.log(arr[i]);</div>
                        <div>&nbsp;&nbsp;{'}'}</div>
                        <div>{'}'}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentModuleIndex === 0}
                className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <PrevIcon className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Module {currentModuleIndex + 1} of {modules.length}</div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentModuleIndex + 1) / modules.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <button
                onClick={handleNext}
                disabled={currentModuleIndex === modules.length - 1}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quiz Section */}
            <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Ready to Test Your Knowledge?</h3>
                    <p className="text-green-700">
                      Take the quiz to demonstrate your understanding and unlock new topics.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onStartQuiz(topic.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Start Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;