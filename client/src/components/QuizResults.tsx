import React from 'react';
import { CheckCircle, Trophy, Clock, Target, RotateCcw,ArrowRight } from 'lucide-react';
import type { QuizState } from '@/interface/types';

interface QuizResultsProps {
  quiz: QuizState;
  title: string;
  // onReview: () => void;
  onRetake: () => void;
  onClose: () => void;
  isTopicMastered?: boolean | "";
}

const QuizResults: React.FC<QuizResultsProps> = ({
  quiz,
  title,
  // onReview,
  onRetake,
  onClose,
  isTopicMastered
}) => {
  const correctAnswers = quiz.questions.filter((q, i) => quiz.userAnswers[i] === q.correctAnswer).length;
  const timeUsed = quiz.timeCompleted 
    ? Math.round((quiz.timeCompleted.getTime() - quiz.timeStarted.getTime()) / 1000)
    : quiz.timeLimit - quiz.timeRemaining;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding!';
    if (score >= 80) return 'Excellent!';
    if (score >= 70) return 'Great Job!';
    if (score >= 60) return 'Good Work!';
    return 'Keep Practicing!';
  };

  const scoreColor = getScoreColor(quiz.score);
  const scoreMessage = getScoreMessage(quiz.score);

  return (
    <div className="rounded-2xl min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className={`w-36 h-36 mx-auto rounded-full flex items-center justify-center shadow-lg dark:shadow-2xl transition-all duration-500 ${
              scoreColor === 'green' 
                ? 'bg-gradient-to-br from-green-400 to-green-600' 
                : scoreColor === 'yellow' 
                ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                : 'bg-gradient-to-br from-red-400 to-red-600'
            }`}>
              <div className="text-5xl font-bold text-white drop-shadow-lg">
                {quiz.score}%
              </div>
            </div>
            {quiz.score >= 80 && (
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg dark:shadow-2xl animate-pulse">
                <Trophy className="w-6 h-6 text-yellow-800" />
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold  dark:text-white mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {scoreMessage}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            You scored <span className="font-semibold text-gray-900 dark:text-white">{quiz.score}%</span> on <span className="font-semibold text-indigo-600 dark:text-indigo-400">{title}</span>
          </p>
        </div>

        {/* Mastery Badge */}
        {isTopicMastered && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white rounded-2xl p-6 mb-8 shadow-lg dark:shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <CheckCircle className="w-8 h-8" />
              <span className="text-2xl font-bold">🎉 Topic Mastered!</span>
            </div>
            <p className="text-green-100 dark:text-green-50 text-center text-lg">
              Congratulations! You've unlocked new topics and can now progress further!
            </p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{correctAnswers}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">of {quiz.questions.length}</div>
              </div>
            </div>
            <div className="text-green-700 dark:text-green-300 font-semibold text-lg">Correct Answers</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-red-600 dark:text-red-400 transform rotate-45" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {quiz.questions.length - correctAnswers}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">of {quiz.questions.length}</div>
              </div>
            </div>
            <div className="text-red-700 dark:text-red-300 font-semibold text-lg">Incorrect Answers</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{formatTime(timeUsed)}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">total time</div>
              </div>
            </div>
            <div className="text-blue-700 dark:text-blue-300 font-semibold text-lg">Time Used</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg dark:shadow-2xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quiz Progress</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{quiz.score}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                scoreColor === 'green' 
                  ? 'bg-gradient-to-r from-green-400 to-green-600' 
                  : scoreColor === 'yellow' 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' 
                  : 'bg-gradient-to-r from-red-400 to-red-600'
              }`}
              style={{ width: `${quiz.score}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <button
            onClick={onReview}
            className="group bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 py-4 px-6 rounded-xl font-semibold transition-all duration-300 text-lg flex items-center justify-center space-x-3 shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Review Answers</span>
          </button> */}
          
          <button
            onClick={onRetake}
            className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 dark:from-yellow-600 dark:to-orange-600 dark:hover:from-yellow-700 dark:hover:to-orange-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 text-lg flex items-center justify-center space-x-3 shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-2xl transform hover:-translate-y-1"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Retake Quiz</span>
          </button>
          
          <button
            onClick={onClose}
            className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 text-lg flex items-center justify-center space-x-3 shadow-lg dark:shadow-2xl hover:shadow-xl dark:hover:shadow-2xl transform hover:-translate-y-1"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;