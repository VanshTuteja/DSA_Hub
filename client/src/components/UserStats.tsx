import React from 'react';
import { Trophy, Target, Calendar, Award, Brain } from 'lucide-react';
import type { UserProfile, Topic } from '../interface/types';
import type { CustomContent } from '@/interface/types';

interface UserStatsProps {
  userProfile: UserProfile;
  topics: Topic[];
  customContents: CustomContent[];
}

const UserStats: React.FC<UserStatsProps> = ({ userProfile, topics, customContents }) => {
  const completionRate = Math.round((userProfile.masteredTopics.length / topics.length) * 100);
  const inProgressTopics = topics.filter(t => t.status === 'in-progress').length;
  const averageScore = userProfile.averageScore || 0;

  return (
    <div className="rounded-xl p-6 shadow-sm border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold mb-4 flex items-center text-gray-900 dark:text-gray-100">
        <Trophy className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
        Your Statistics
      </h3>

      <div className="space-y-6">
        {/* Overall Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center border dark:border-green-800/30">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {userProfile.masteredTopics.length}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">Mastered</div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center border dark:border-yellow-800/30">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{inProgressTopics}</div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">In Progress</div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center border dark:border-blue-800/30">
            <div className="flex items-center justify-center mb-2">
              <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{customContents.filter(c => c.status === 'completed').length}</div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Custom Ready</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Average Score</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {averageScore > 0 ? `${Math.round(averageScore)}%` : 'N/A'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Current Streak
            </span>
            <span className="font-semibold text-orange-600 dark:text-orange-400">{userProfile.streak} days</span>
          </div>

          {/* <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Topics Available</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {topics.filter(t => t.status !== 'locked').length}
            </span>
          </div> */}
        </div>

        {/* Recent Achievements */}
        {userProfile.masteredTopics.length > 0 && (
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium">Recent Achievements</div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {userProfile.masteredTopics.slice(-3).map((topicName, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Mastered {topicName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats;