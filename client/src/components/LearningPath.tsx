import React, { useState } from 'react';
import { Search, AlertTriangle, Play, CheckCircle, Clock, ArrowRight, Book, Target } from 'lucide-react';
import type { Topic } from '../interface/types';

interface LearningPathProps {
  topics: Topic[];
  onStartQuiz: (topicId: string) => void;
  onStartLearning: (topicId: string) => void;
}

const LearningPath: React.FC<LearningPathProps> = ({ topics, onStartQuiz, onStartLearning }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTopicStatus = (topic: Topic) => {
    const allPrereqsMastered = topic.prerequisites.every(prereq =>
      topics.find(t => t.id === prereq)?.status === 'mastered'
    );

    if (topic.status === 'mastered') return 'mastered';
    if (topic.status === 'in-progress') return 'in-progress';
    if (allPrereqsMastered || topic.prerequisites.length === 0) return 'ready';
    return 'locked';
  };

  const getPrerequisiteTopics = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return [];
    
    return topic.prerequisites.map(prereqId => 
      topics.find(t => t.id === prereqId)
    ).filter(Boolean);
  };

  const handleCheckLearningPath = () => {
    if (searchQuery.trim()) {
      const matchedTopic = topics.find(topic => 
        topic.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchedTopic) {
        setSelectedTopic(matchedTopic.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Data Structures & Algorithms Learning Path
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Master DSA concepts step by step with our structured learning approach
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            What would you like to learn today?
          </h2>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for topics like Arrays, Linked Lists, Trees..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              />
            </div>
            
            <button
              onClick={handleCheckLearningPath}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Check Learning Path</span>
            </button>
          </div>
        </div>

        {/* Prerequisites Warning */}
        {selectedTopic && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Prerequisites Required</h3>
                <p className="text-yellow-700 mb-4">
                  To master <strong>{topics.find(t => t.id === selectedTopic)?.name}</strong>, 
                  you'll need to complete these prerequisite topics first. This ensures you have the foundation needed for success.
                </p>
                
                <div className="space-y-3">
                  {getPrerequisiteTopics(selectedTopic).map((prereq, index) => {
                    if (!prereq) return null;
                    const status = getTopicStatus(prereq);
                    
                    return (
                      <div key={prereq.id} className="bg-white rounded-lg p-4 border border-yellow-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-yellow-700">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{prereq.name}</h4>
                              <p className="text-sm text-gray-600">Complete this topic to unlock your next step</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (status === 'ready' || status === 'in-progress') {
                                onStartQuiz(prereq.id);
                              } else if (status === 'mastered') {
                                onStartLearning(prereq.id);
                              }
                            }}
                            disabled={status === 'locked'}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              status === 'mastered'
                                ? 'bg-green-100 text-green-700 cursor-default'
                                : status === 'ready' || status === 'in-progress'
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {status === 'mastered' ? (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="w-4 h-4" />
                                <span>Completed</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1">
                                <Play className="w-4 h-4" />
                                <span>Take Quiz</span>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Path Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const status = getTopicStatus(topic);
            const isHighlighted = topic.id === selectedTopic;
            
            return (
              <div
                key={topic.id}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  isHighlighted 
                    ? 'border-indigo-500 ring-2 ring-indigo-200' 
                    : 'border-gray-200 hover:border-indigo-300'
                } ${status === 'locked' ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      status === 'mastered' ? 'bg-green-100' :
                      status === 'in-progress' ? 'bg-yellow-100' :
                      status === 'ready' ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {status === 'mastered' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : status === 'in-progress' ? (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      ) : status === 'ready' ? (
                        <Play className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Book className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{topic.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {status === 'locked' ? 'Prerequisites required' : status.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  
                  {topic.score !== undefined && topic.totalQuestions && (
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {Math.round((topic.score / topic.totalQuestions) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                  )}
                </div>

                {/* Prerequisites */}
                {topic.prerequisites.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Prerequisites:</div>
                    <div className="flex flex-wrap gap-1">
                      {topic.prerequisites.map((prereqId) => {
                        const prereqTopic = topics.find(t => t.id === prereqId);
                        const prereqMastered = prereqTopic?.status === 'mastered';
                        return (
                          <span
                            key={prereqId}
                            className={`px-2 py-1 rounded text-xs ${
                              prereqMastered
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {prereqTopic?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                {topic.score !== undefined && topic.totalQuestions && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          status === 'mastered' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${(topic.score / topic.totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onStartLearning(topic.id)}
                    disabled={status === 'locked'}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      status === 'locked'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <Book className="w-4 h-4" />
                      <span>Learn</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => onStartQuiz(topic.id)}
                    disabled={status === 'locked'}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      status === 'locked'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>Quiz</span>
                    </div>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Difficulty: {topic.id === 'arrays' || topic.id === 'strings' ? 'Beginner' : 
                           topic.id === 'linked-lists' || topic.id === 'stacks' || topic.id === 'queues' ? 'Intermediate' : 'Advanced'}</span>
                    {topic.attempts && (
                      <span>Attempts: {topic.attempts}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredTopics.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No topics found</h3>
            <p className="text-gray-600">
              Try searching for "Arrays", "Trees", "Sorting", or other DSA topics
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPath;