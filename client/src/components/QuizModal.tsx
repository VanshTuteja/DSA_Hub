import React, { useState } from 'react';
import { X, Timer, List, CheckCircle, Circle, Brain, Zap, Target, Award } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import type { QuizState } from '../interface/types';

interface QuizModalProps {
  quiz: QuizState;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onNavigateToQuestion: (questionIndex: number) => void;
  title: string;
}

const QuizModal: React.FC<QuizModalProps> = ({
  quiz,
  onAnswer,
  onNext,
  onPrevious,
  onClose,
  onNavigateToQuestion,
  title
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = quiz.questions[quiz.currentQuestionIndex];

  const getQuestionStatus = (index: number) => {
    if (quiz.userAnswers[index] !== undefined) {
      return 'answered';
    } else if (index === quiz.currentQuestionIndex) {
      return 'current';
    } else {
      return 'unanswered';
    }
  };

  const getAnsweredCount = () => {
    return quiz.userAnswers.filter(answer => answer !== undefined).length;
  };

  const handleQuestionClick = (questionIndex: number) => {
    if(questionIndex <= quiz.currentQuestionIndex || quiz.userAnswers)
    onNavigateToQuestion(questionIndex);
    setIsSheetOpen(false);
  };

  const getScoreColor = () => {
    const percentage = (getAnsweredCount() / quiz.questions.length) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    if (percentage >= 60) return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 z-50 flex flex-col">
      {/* Quiz Header */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 px-4 md:px-8 py-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Question {quiz.currentQuestionIndex + 1} of {quiz.questions.length}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Question Navigation Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                  <List className="w-5 h-5" />
                  <span className="hidden md:inline font-medium">
                    Questions
                  </span>
                  <div className="bg-white/20 px-2 py-1 rounded-lg">
                    <span className="font-bold text-sm">
                      {getAnsweredCount()}/{quiz.questions.length}
                    </span>
                  </div>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="px-3 w-[500px] sm:w-[540px] bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-slate-800">
                <SheetHeader className="pb-6">
                  <SheetTitle className="flex items-center space-x-3 text-xl text-gray-900 dark:text-white">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                      <List className="w-5 h-5 text-white" />
                    </div>
                    <span>Question Navigator</span>
                  </SheetTitle>
                  <SheetDescription className="text-base text-gray-600 dark:text-gray-300">
                    Jump to any question instantly. Track your progress with visual indicators.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  {/* Enhanced Progress Section */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-indigo-100 dark:border-slate-600 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Award className={`w-5 h-5 ${getScoreColor().split(' ')[0]} ${getScoreColor().split(' ')[2]}`} />
                        <span className="font-semibold text-gray-800 dark:text-gray-100">Progress Status</span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor()}`}>
                        {Math.round((getAnsweredCount() / quiz.questions.length) * 100)}%
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      <strong>{getAnsweredCount()}</strong> of <strong>{quiz.questions.length}</strong> questions completed
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative"
                        style={{ width: `${(getAnsweredCount() / quiz.questions.length) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Questions Grid */}
                  <div className="grid grid-cols-1 gap-3 max-h-[calc(100vh-350px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-200 dark:scrollbar-thumb-slate-600 scrollbar-track-gray-100 dark:scrollbar-track-slate-700">
                    {quiz.questions.map((question, index) => {
                      const status = getQuestionStatus(index);
                      return (
                        <button
                          key={index}
                          onClick={() => handleQuestionClick(index)}
                          className={`group p-4 text-left rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] ${
                            status === 'current'
                              ? 'border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 shadow-md ring-2 ring-indigo-200 dark:ring-indigo-500/50'
                              : status === 'answered'
                              ? 'border-green-200 dark:border-green-600 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 hover:border-green-300 dark:hover:border-green-500 hover:shadow-green-100 dark:hover:shadow-green-900/20'
                              : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-white dark:hover:from-slate-700 dark:hover:to-slate-800'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {status === 'answered' ? (
                                <div className="relative">
                                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                                </div>
                              ) : status === 'current' ? (
                                <div className="relative">
                                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                                    <Zap className="w-3 h-3 text-white" />
                                  </div>
                                  <div className="absolute inset-0 bg-indigo-400 rounded-full animate-pulse opacity-30"></div>
                                </div>
                              ) : (
                                <Circle className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-indigo-400 dark:group-hover:text-indigo-300 transition-colors" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`text-sm font-bold ${
                                  status === 'current' 
                                    ? 'text-indigo-700 dark:text-indigo-300' 
                                    : status === 'answered'
                                    ? 'text-green-700 dark:text-green-300'
                                    : 'text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'
                                }`}>
                                  Question {index + 1}
                                </span>
                                {status === 'current' && (
                                  <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs rounded-full font-bold shadow-sm animate-pulse">
                                    ACTIVE
                                  </span>
                                )}
                                {status === 'answered' && (
                                  <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded-full font-bold shadow-sm">
                                    ✓ DONE
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm line-clamp-2 ${
                                status === 'current' 
                                  ? 'text-gray-900 dark:text-gray-100 font-medium' 
                                  : status === 'answered'
                                  ? 'text-gray-800 dark:text-gray-200'
                                  : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                              }`}>
                                {question.question}
                              </p>
                              {status === 'answered' && (
                                <div className="mt-2 p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg border border-green-200 dark:border-green-600">
                                  <p className="text-xs text-green-700 dark:text-green-300 font-medium">
                                    ✓ Your answer: <span className="font-bold">{question.options[quiz.userAnswers[index]!]}</span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Enhanced Timer */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl shadow-md ${
              quiz.timeRemaining <= 60 
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse' 
                : quiz.timeRemaining <= 300
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
            }`}>
              <Timer className="w-5 h-5" />
              <span className="font-mono font-bold text-lg">
                {formatTime(quiz.timeRemaining)}
              </span>
            </div>
            {/* Enhanced Close Button */}
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          {/* Enhanced Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                <div className="absolute right-0 top-0 h-full w-1 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mt-3">
              <span className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Question Progress</span>
              </span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {Math.round(((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100)}% Complete
              </span>
            </div>
          </div>

          {/* Enhanced Question */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 mb-8 border border-indigo-100 dark:border-slate-600 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-relaxed">
                {currentQuestion.question}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Brain className="w-4 h-4" />
                <span>Choose the best answer below</span>
              </div>
            </div>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onAnswer(index)}
                  className={`group w-full p-6 text-left rounded-xl border-2 transition-all duration-300 text-lg transform hover:scale-[1.02] ${
                    quiz.userAnswers[quiz.currentQuestionIndex] === index
                      ? 'border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 shadow-lg ring-2 ring-indigo-200 dark:ring-indigo-500/50'
                      : 'border-gray-200 dark:border-slate-600 hover:border-indigo-200 dark:hover:border-indigo-500 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-white dark:hover:from-slate-700 dark:hover:to-slate-800 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      quiz.userAnswers[quiz.currentQuestionIndex] === index
                        ? 'border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md'
                        : 'border-gray-300 dark:border-slate-500 group-hover:border-indigo-400 dark:group-hover:border-indigo-400'
                    }`}>
                      {quiz.userAnswers[quiz.currentQuestionIndex] === index && (
                        <>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20"></div>
                        </>
                      )}
                    </div>
                    <span className={`flex-1 transition-colors ${
                      quiz.userAnswers[quiz.currentQuestionIndex] === index
                        ? 'text-indigo-800 dark:text-indigo-200 font-medium'
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quiz Navigation */}
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-gray-200/50 dark:border-slate-700/50 px-4 md:px-8 py-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={onPrevious}
            disabled={quiz.currentQuestionIndex === 0}
            className="flex items-center space-x-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 hover:from-gray-200 hover:to-gray-300 dark:hover:from-slate-600 dark:hover:to-slate-500 disabled:from-gray-50 disabled:to-gray-100 dark:disabled:from-slate-800 dark:disabled:to-slate-700 disabled:text-gray-400 dark:disabled:text-gray-500 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-xl font-medium transition-all duration-200 text-lg shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:shadow-none"
          >
            <span>← Previous</span>
          </button>
          
          <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              {Array.from({ length: quiz.questions.length }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === quiz.currentQuestionIndex
                      ? 'bg-indigo-500 w-6'
                      : quiz.userAnswers[i] !== undefined
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={onNext}
            disabled={quiz.userAnswers[quiz.currentQuestionIndex] === undefined}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-slate-600 dark:disabled:to-slate-500 text-white disabled:text-gray-500 px-8 py-3 rounded-xl font-medium transition-all duration-200 text-lg shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:shadow-none"
          >
            <span>
              {quiz.currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz 🎉' : 'Next →'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;