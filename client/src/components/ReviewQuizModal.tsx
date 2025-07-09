import React, { useState } from 'react';
import { X, CheckCircle, XCircle, Clock, Trophy, ArrowLeft, ArrowRight, Eye, Brain, Target, BarChart3 } from 'lucide-react';
import type { QuizAttempt } from '../interface/types';

interface ReviewQuizModalProps {
  attempt: QuizAttempt;
  onClose: () => void;
  title: string;
}

const ReviewQuizModal: React.FC<ReviewQuizModalProps> = ({
  attempt,
  onClose,
  title
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date | string): string => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const currentQuestion = attempt.questions[currentQuestionIndex];
  const userAnswer = attempt.userAnswers[currentQuestionIndex];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;

  const getAnswerStatus = (questionIndex: number) => {
    const userAns = attempt.userAnswers[questionIndex];
    const correctAns = attempt.questions[questionIndex].correctAnswer;
    
    if (userAns === undefined) return 'unanswered';
    return userAns === correctAns ? 'correct' : 'incorrect';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (score >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  const correctCount = attempt.userAnswers.filter((answer, index) => 
    answer === attempt.questions[index].correctAnswer
  ).length;

  const incorrectCount = attempt.userAnswers.filter((answer, index) => 
    answer !== undefined && answer !== attempt.questions[index].correctAnswer
  ).length;

  const unansweredCount = attempt.userAnswers.filter(answer => answer === undefined).length;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-4 md:px-8 py-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Review: {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Question {currentQuestionIndex + 1} of {attempt.questions.length}</span>
                <span>•</span>
                <span>{formatDate(attempt.timeCompleted)}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Score Display */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl shadow-md ${getScoreBg(attempt.score)}`}>
              <Trophy className={`w-5 h-5 ${getScoreColor(attempt.score)}`} />
              <span className={`font-mono font-bold text-lg ${getScoreColor(attempt.score)}`}>
                {attempt.score}%
              </span>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-all duration-200 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Question Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Quiz Overview
                </h3>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">{correctCount}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Correct</div>
                  </div>
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">{incorrectCount}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Wrong</div>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-600 dark:text-gray-400">{unansweredCount}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Skipped</div>
                  </div>
                </div>

                {/* Time Taken */}
                <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Time Taken</span>
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatTime(attempt.timeTaken)}
                  </div>
                </div>

                {/* Question Grid */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Questions</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {attempt.questions.map((_, index) => {
                      const status = getAnswerStatus(index);
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestionIndex(index)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all duration-200 ${
                            index === currentQuestionIndex
                              ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-800'
                              : ''
                          } ${
                            status === 'correct'
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : status === 'incorrect'
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-400 dark:hover:bg-gray-500'
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Question Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                {/* Question Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isCorrect 
                          ? 'bg-green-100 dark:bg-green-900/30' 
                          : userAnswer !== undefined 
                          ? 'bg-red-100 dark:bg-red-900/30' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        ) : userAnswer !== undefined ? (
                          <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        ) : (
                          <Brain className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          Question {currentQuestionIndex + 1}
                        </h3>
                        <div className={`text-sm font-medium ${
                          isCorrect 
                            ? 'text-green-600 dark:text-green-400' 
                            : userAnswer !== undefined 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {isCorrect ? 'Correct Answer' : userAnswer !== undefined ? 'Incorrect Answer' : 'Not Answered'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
                    <p className="text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                      {currentQuestion.question}
                    </p>
                  </div>
                </div>

                {/* Answer Options */}
                <div className="space-y-4 mb-8">
                  {currentQuestion.options.map((option, index) => {
                    const isUserAnswer = userAnswer === index;
                    const isCorrectAnswer = currentQuestion.correctAnswer === index;
                    
                    let optionStyle = 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700';
                    let iconElement = null;
                    
                    if (isCorrectAnswer) {
                      optionStyle = 'border-green-400 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-200 dark:ring-green-800';
                      iconElement = <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />;
                    } else if (isUserAnswer && !isCorrectAnswer) {
                      optionStyle = 'border-red-400 bg-red-50 dark:bg-red-900/20 ring-2 ring-red-200 dark:ring-red-800';
                      iconElement = <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
                    }

                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${optionStyle}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {iconElement || (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className={`text-lg ${
                              isCorrectAnswer 
                                ? 'text-green-800 dark:text-green-300 font-medium' 
                                : isUserAnswer 
                                ? 'text-red-800 dark:text-red-300 font-medium' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {option}
                            </span>
                            {isUserAnswer && (
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Your answer
                              </div>
                            )}
                            {isCorrectAnswer && (
                              <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                                Correct answer
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                        Explanation
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 px-4 md:px-8 py-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 disabled:from-gray-50 disabled:to-gray-100 disabled:text-gray-400 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 text-lg shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:shadow-none"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              {Array.from({ length: attempt.questions.length }, (_, i) => {
                const status = getAnswerStatus(i);
                return (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentQuestionIndex
                        ? 'w-6 bg-indigo-500'
                        : status === 'correct'
                        ? 'bg-green-500'
                        : status === 'incorrect'
                        ? 'bg-red-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setCurrentQuestionIndex(Math.min(attempt.questions.length - 1, currentQuestionIndex + 1))}
            disabled={currentQuestionIndex === attempt.questions.length - 1}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 text-lg shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:shadow-none"
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewQuizModal;