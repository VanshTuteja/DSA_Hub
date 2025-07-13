import { Menu, Home, User, LogOut, Brain, Target, Award, ChevronRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { UserProfile } from '@/interface/types';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { ThemeToggle } from './ThemeToggle';
import { useUserTopicsStore } from '@/store/useUserTopics';


const MobileNav = () => {
  const { user } = useUserStore();
  const { topics, customContents } = useUserTopicsStore();
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const userProfile: UserProfile = {
    name: user?.username || "VT",
    masteredTopics: topics.filter(t => t.status === 'mastered').map(t => t.name),
    totalScore: user?.stats.totalScore || 0,
    averageScore: user?.stats.averageScore || 0,
    streak: user?.stats.streak || 0,
    email: user?.email || ''
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95">
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 sm:w-96 p-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col h-full">
          {/* Header with Gradient */}
          <SheetHeader className="p-6 bg-gradient-to-r">
            <SheetTitle className="text-left text-white font-semibold"><ThemeToggle /></SheetTitle>
          </SheetHeader>

          {/* User Profile Section */}
          <div className="p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="relative w-14 h-14 rounded-full overflow-hidden cursor-pointer group">
                  {user?.profile.profilePicture != "" ? (
                    <img
                      src={user?.profile.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="group w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                      <User className="w-8 h-8 text-white group-hover:hidden" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {userProfile.name || 'User'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {userProfile.email}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl text-center border border-green-200 dark:border-green-800/30 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {userProfile.masteredTopics.length}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">Mastered</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl text-center border border-yellow-200 dark:border-yellow-800/30 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {topics.filter(t => t.status === 'in-progress').length}
                </div>
                <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">In Progress</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl text-center border border-blue-200 dark:border-blue-800/30 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {customContents.filter(c => c.status === 'completed').length}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Custom Ready</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 p-6 space-y-6">
            <nav className="space-y-2">
              <button
                onClick={() => handleNavigation('/home')}
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                    <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  Home
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => handleNavigation('/profile')}
                className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  Profile
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-xl transition-all duration-200 hover:shadow-sm border border-transparent hover:border-red-200 dark:hover:border-red-800"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-3">
                  <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                Sign Out
              </div>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;