
// import React from 'react';
// import { Play, Lock, RotateCcw, CheckCircle, Clock, Trophy, ArrowRight, BookOpen, Target, Eye } from 'lucide-react';
// import type { Topic, QuizAttempt } from '../interface/types';

// interface TopicCardProps {
//   topic: Topic;
//   status: 'mastered' | 'in-progress' | 'ready' | 'locked';
//   onStartQuiz: (topicId: string) => void;
//   onReview: (topicId: string) => void;
//   onRetake: (topicId: string) => void;
//   hasQuizHistory: boolean;
//   topics: Topic[];
//   attempts: QuizAttempt[];
// }

// const TopicCard: React.FC<TopicCardProps> = ({
//   topic,
//   status,
//   onStartQuiz,
//   onReview,
//   onRetake,
//   hasQuizHistory,
//   topics,
//   attempts
// }) => {
//   const getStatusConfig = () => {
//     switch (status) {
//       case 'mastered':
//         return {
//           bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
//           borderColor: 'border-green-200 dark:border-green-800',
//           statusColor: 'text-green-600 dark:text-green-400',
//           statusBg: 'bg-green-100 dark:bg-green-900/30',
//           statusIcon: CheckCircle,
//           statusText: 'Mastered',
//           action: 'Take New Quiz'
//         };
//       case 'in-progress':
//         return {
//           bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
//           borderColor: 'border-blue-200 dark:border-blue-800',
//           statusColor: 'text-blue-600 dark:text-blue-400',
//           statusBg: 'bg-blue-100 dark:bg-blue-900/30',
//           statusIcon: Clock,
//           statusText: 'In Progress',
//           action: 'Continue'
//         };
//       case 'ready':
//         return {
//           bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
//           borderColor: 'border-purple-200 dark:border-purple-800',
//           statusColor: 'text-purple-600 dark:text-purple-400',
//           statusBg: 'bg-purple-100 dark:bg-purple-900/30',
//           statusIcon: Play,
//           statusText: 'Ready to Start',
//           action: 'Start'
//         };
//       case 'locked':
//         return {
//           bgColor: 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20',
//           borderColor: 'border-gray-200 dark:border-gray-700',
//           statusColor: 'text-gray-500 dark:text-gray-400',
//           statusBg: 'bg-gray-100 dark:bg-gray-800',
//           statusIcon: Lock,
//           statusText: 'Locked',
//           action: 'Locked'
//         };
//     }
//   };

//   const config = getStatusConfig();
//   const StatusIcon = config.statusIcon;

//   const getPrerequisiteNames = () => {
//     return topic.prerequisites.map(prereqId => 
//       topics.find(t => t.id === prereqId)?.name || prereqId
//     );
//   };

//   const getScoreColor = (score?: number) => {
//     if (!score) return 'text-gray-500 dark:text-gray-400';
//     if (score >= 80) return 'text-green-600 dark:text-green-400';
//     if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
//     return 'text-red-600 dark:text-red-400';
//   };

//   const getProgressWidth = () => {
//     if (status === 'mastered') return '100%';
//     if (status === 'in-progress' && topic.bestScore) return `${topic.bestScore}%`;
//     if (status === 'ready') return '0%';
//     return '0%';
//   };

//   const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : topic.bestScore;
//   const latestScore = attempts.length > 0 ? attempts[attempts.length - 1].score : undefined;

//   return (
//     <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform`}>
//       {/* Header */}
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex-1">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className={`p-2 ${config.statusBg} rounded-lg`}>
//               <StatusIcon className={`w-5 h-5 ${config.statusColor}`} />
//             </div>
//             <div>
//               <h3 className="font-bold text-lg text-gray-900 dark:text-white">
//                 {topic.name}
//               </h3>
//               <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.statusBg} ${config.statusColor}`}>
//                 {config.statusText}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Score Badge */}
//         {bestScore && (
//           <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-bold ${bestScore >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
//             bestScore >= 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
//             'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
//             <Trophy className="w-3 h-3" />
//             <span>{bestScore}%</span>
//           </div>
//         )}
//       </div>

//       {/* Prerequisites */}
//       {topic.prerequisites.length > 0 && (
//         <div className="mb-4">
//           <div className="flex items-center space-x-2 mb-2">
//             <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Prerequisites:</span>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {getPrerequisiteNames().map((prereqName, index) => {
//               const prereqTopic = topics.find(t => t.name === prereqName);
//               const isCompleted = prereqTopic?.status === 'mastered';
//               return (
//                 <span
//                   key={index}
//                   className={`px-2 py-1 rounded-lg text-xs font-medium ${
//                     isCompleted
//                       ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
//                       : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
//                   }`}
//                 >
//                   {isCompleted && <CheckCircle className="w-3 h-3 inline mr-1" />}
//                   {prereqName}
//                 </span>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Progress Bar */}
//       {(status === 'mastered' || status === 'in-progress') && (
//         <div className="mb-4">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
//             <span className="text-sm font-bold text-gray-900 dark:text-white">
//               {bestScore || 0}%
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//             <div
//               className={`h-2 rounded-full transition-all duration-500 ${
//                 status === 'mastered' ? 'bg-green-500' : 'bg-blue-500'
//               }`}
//               style={{ width: getProgressWidth() }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Attempts Summary */}
//       {/* {attempts.length > 0 && (
//         <div className="mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//               Quiz History ({attempts.length} attempts)
//             </span>
//           </div>
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Best Score:</span>
//               <div className="font-bold text-gray-900 dark:text-white">{bestScore}%</div>
//             </div>
//             <div>
//               <span className="text-gray-500 dark:text-gray-400">Latest:</span>
//               <div className="font-bold text-gray-900 dark:text-white">{latestScore}%</div>
//             </div>
//           </div>
//         </div>
//       )} */}

//       {/* Stats */}
//       {(topic.attempts || topic.lastAttempt) && (
//         <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
//           {topic.attempts && (
//             <div className="text-center">
//               <div className="text-xs text-gray-500 dark:text-gray-400">Attempts</div>
//               <div className="text-lg font-bold text-gray-900 dark:text-white">{topic.attempts}</div>
//             </div>
//           )}
//           {topic.lastAttempt && (
//             <div className="text-center">
//               <div className="text-xs text-gray-500 dark:text-gray-400">Last Attempt</div>
//               <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 {topic.lastAttempt.toLocaleString().substring(0,10)}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Action Buttons */}
//       <div className="space-y-2">
//         {status === 'locked' ? (
//           <div className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl text-center font-medium">
//             Complete prerequisites to unlock
//           </div>
//         ) : (
//           <button
//             onClick={() => onStartQuiz(topic.id)}
//             className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-md flex items-center justify-center space-x-2 ${
//               status === 'mastered'
//                 ? 'bg-green-600 hover:bg-green-700 text-white'
//                 : status === 'in-progress'
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
//             }`}
//           >
//             {status === 'mastered' ? (
//               <>
//                 <Play className="w-4 h-4" />
//                 <span>Take New Quiz</span>
//               </>
//             ) : status === 'in-progress' ? (
//               <>
//                 <ArrowRight className="w-4 h-4" />
//                 <span>Continue Quiz</span>
//               </>
//             ) : (
//               <>
//                 <Play className="w-4 h-4" />
//                 <span>Start Quiz</span>
//               </>
//             )}
//           </button>
//         )}

//         {/* Additional Action Buttons */}
//         {attempts.length > 0 && status !== 'locked' && (
//           <div className="grid grid-cols-2 gap-2">
//             {/* <button
//               onClick={() => onRetake(topic.id)}
//               className="py-2 px-4 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-1"
//             >
//               <RotateCcw className="w-3 h-3" />
//               <span>Retake</span>
//             </button> */}
            
//             <button
//               onClick={() => onReview(topic.id)}
//               className="w-31/15 py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-1"
//             >
//               <Eye className="w-3 h-3" />
//               <span>Review</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopicCard;


import React from 'react';
import { Play, Lock,  CheckCircle, Clock, Trophy, ArrowRight, BookOpen,  Eye, Sparkles } from 'lucide-react';
import type { QuizAttempt, Topic } from '@/interface/types';


interface TopicCardProps {
  topic: Topic;
  status: 'mastered' | 'in-progress' | 'ready' | 'locked';
  onStartQuiz: (topicId: string) => void;
  onReview: (topicId: string) => void;
  onRetake: (topicId: string) => void;
  hasQuizHistory: boolean;
  topics: Topic[];
  attempts: QuizAttempt[];
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  status,
  onStartQuiz,
  onReview,
  topics,
  attempts
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'mastered':
        return {
          bgColor: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-900/20 dark:via-green-900/20 dark:to-teal-900/20',
          borderColor: 'border-emerald-200/60 dark:border-emerald-700/60',
          statusColor: 'text-emerald-700 dark:text-emerald-300',
          statusBg: 'bg-emerald-100/80 dark:bg-emerald-900/40',
          statusIcon: CheckCircle,
          statusText: 'Mastered',
          action: 'Take New Quiz',
          accent: 'bg-gradient-to-r from-emerald-500 to-teal-500'
        };
      case 'in-progress':
        return {
          bgColor: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20',
          borderColor: 'border-blue-200/60 dark:border-blue-700/60',
          statusColor: 'text-blue-700 dark:text-blue-300',
          statusBg: 'bg-blue-100/80 dark:bg-blue-900/40',
          statusIcon: Clock,
          statusText: 'In Progress',
          action: 'Continue',
          accent: 'bg-gradient-to-r from-blue-500 to-indigo-500'
        };
      case 'ready':
        return {
          bgColor: 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-900/20 dark:via-purple-900/20 dark:to-fuchsia-900/20',
          borderColor: 'border-violet-200/60 dark:border-violet-700/60',
          statusColor: 'text-violet-700 dark:text-violet-300',
          statusBg: 'bg-violet-100/80 dark:bg-violet-900/40',
          statusIcon: Sparkles,
          statusText: 'Ready to Start',
          action: 'Start',
          accent: 'bg-gradient-to-r from-violet-500 to-purple-500'
        };
      case 'locked':
        return {
          bgColor: 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900/20 dark:via-gray-900/20 dark:to-zinc-900/20',
          borderColor: 'border-slate-200/60 dark:border-slate-700/60',
          statusColor: 'text-slate-600 dark:text-slate-400',
          statusBg: 'bg-slate-100/80 dark:bg-slate-800/40',
          statusIcon: Lock,
          statusText: 'Locked',
          action: 'Locked',
          accent: 'bg-gradient-to-r from-slate-400 to-gray-400'
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.statusIcon;

  const getPrerequisiteNames = () => {
    return topic.prerequisites.map(prereqId => 
      topics.find(t => t.id === prereqId)?.name || prereqId
    );
  };

  const getProgressWidth = () => {
    if (status === 'mastered') return '100%';
    if (status === 'in-progress' && topic.bestScore) return `${topic.bestScore}%`;
    if (status === 'ready') return '0%';
    return '0%';
  };

  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : topic.bestScore;

  return (
    <div className={`group relative ${config.bgColor} ${config.borderColor} border-2 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/20 hover:scale-[1.01] transform backdrop-blur-sm`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
      
      {/* Status accent line */}
      <div className={`absolute top-0 left-6 right-6 h-1 ${config.accent} rounded-full opacity-60`} />
      
      {/* Header */}
      <div className="relative flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-3">
            <div className={`relative p-3 ${config.statusBg} rounded-2xl shadow-sm backdrop-blur-sm`}>
              <StatusIcon className={`w-6 h-6 ${config.statusColor}`} />
              {status === 'mastered' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Trophy className="w-2.5 h-2.5 text-yellow-800" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                {topic.name}
              </h3>
              <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${config.statusBg} ${config.statusColor} shadow-sm`}>
                {config.statusText}
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Score Badge */}
        { bestScore! > 0 && (
          <div className={`relative flex items-center space-x-2 px-4 py-2 rounded-2xl text-sm font-bold shadow-md backdrop-blur-sm ${
            bestScore! >= 80 ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/50' :
            bestScore! >= 60 ? 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-700/50' :
            'bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-700/50'
          }`}>
            <Trophy className="w-4 h-4" />
            <span className="text-base">{bestScore}%</span>
          </div>
        )}
      </div>

      {/* Prerequisites */}
      {topic.prerequisites.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Prerequisites</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {getPrerequisiteNames().map((prereqName, index) => {
              const prereqTopic = topics.find(t => t.name === prereqName);
              const isCompleted = prereqTopic?.status === 'mastered';
              return (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium shadow-sm backdrop-blur-sm transition-all duration-200 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/50'
                      : 'bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800/40 dark:to-slate-800/40 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50'
                  }`}
                >
                  {isCompleted && <CheckCircle className="w-3.5 h-3.5 mr-1.5" />}
                  {prereqName}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Enhanced Progress Bar */}
      {(status === 'mastered' || status === 'in-progress') && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-lg">
              {bestScore || 0}%
            </span>
          </div>
          <div className="relative w-full bg-gray-200/80 dark:bg-gray-700/80 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${
                status === 'mastered' 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
              }`}
              style={{ width: getProgressWidth() }}
            />
            {/* Animated shine effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"
              style={{ 
                width: getProgressWidth(),
                animationDuration: '2s',
                animationDelay: '0.5s'
              }}
            />
          </div>
        </div>
      )}

      {/* Enhanced Stats */}
      {(topic.attempts || topic.lastAttempt) && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {topic.attempts && (
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-sm backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Attempts</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{topic.attempts}</div>
            </div>
          )}
          {topic.lastAttempt && (
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-sm backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Last Attempt</div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {topic.lastAttempt.toLocaleString().substring(0,10)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Action Buttons */}
      <div className="space-y-3">
        {status === 'locked' ? (
          <div className="w-full py-4 px-6 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800 dark:to-slate-800 text-gray-500 dark:text-gray-400 rounded-2xl text-center font-semibold shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <Lock className="w-5 h-5 mx-auto mb-1" />
            Complete prerequisites to unlock
          </div>
        ) : (
          <button
            onClick={() => onStartQuiz(topic.id)}
            className={`group/btn w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] flex items-center justify-center space-x-3 text-white shadow-lg ${
              status === 'mastered'
                ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700'
                : status === 'in-progress'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700'
                : 'bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-700 hover:via-purple-700 hover:to-fuchsia-700'
            }`}
          >
            {status === 'mastered' ? (
              <>
                <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                <span>Take New Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </>
            ) : status === 'in-progress' ? (
              <>
                <ArrowRight className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                <span>Continue Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                <span>Start Quiz</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        )}

        {/* Enhanced Additional Action Button */}
        {attempts.length > 0 && status !== 'locked' && (
          <button
            onClick={() => onReview(topic.id)}
            className="w-full py-3 px-6 bg-white/70 dark:bg-gray-800/70 hover:bg-white/90 dark:hover:bg-gray-700/90 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 shadow-sm border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Review Performance</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopicCard;