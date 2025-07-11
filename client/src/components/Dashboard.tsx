// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Target,
  Brain,
  Flame,
  Edit,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  User,
  BarChart3,
  PieChart,
  Activity,
  RotateCcw,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
  Area,
  AreaChart,
  Legend,
  Pie,
} from 'recharts';
import Navbar from './Navbar';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'sonner';
import { useUserTopicsStore } from '@/store/useUserTopics';
import ProfileModal from './ProfileModal';
import Loading from './Loading';
import MobileNav from './MobileNav';

const Dashboard: React.FC = () => {
  const { loading, user, updateProfile } = useUserStore();
  const { topics } = useUserTopicsStore();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    contact: '',
    country: '',
    profilePicture: '',
    bio: '',
  });

  // Update edit data when modal opens
  useEffect(() => {
    if (showProfileModal && user?.profile) {
      setEditData({
        firstName: user.profile.firstName || '',
        lastName: user.profile.lastName || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.profile.bio || '',
        country: user.profile.country || '',
        contact: user.profile.contact?.toString() || '',
        profilePicture: user.profile.profilePicture || ''
      });
    }
  console.log("User:", user);

  }, [showProfileModal, user]);
  // Helper functions for safe date formatting
  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return 'Unknown date';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) return 'Invalid date';
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(editData);
      setShowProfileModal(false);
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData(prev => ({ ...prev, profilePicture: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getUserStats = () => {
    const totalQuizzes = user?.stats?.totalQuizzes || 0;
    const averageScore = Math.round(user?.stats?.averageScore || 0);
    const masteredTopicsCount = topics.filter(t => t.status === 'mastered').length;
    const totalTopics = topics.length || 0;
    const completionRate = totalTopics > 0 ? Math.round((masteredTopicsCount / totalTopics) * 100) : 0;
    const totalMs = user?.stats.totalTimeSpent || 0;
    const totalHours = (totalMs / (1000 * 60 * 60));
    return {
      totalQuizzes,
      averageScore,
      masteredTopicsCount,
      totalTopics,
      completionRate,
      totalHours
    };
  };

  // Prepare chart data from real user data
  const getChartData = () => {
    const userStats = getUserStats();

    // Topics status distribution for pie chart
    const topicsStatusData = [
      { name: 'Mastered', value: topics.filter(t => t.status === 'mastered').length, color: '#10B981' },
      { name: 'In Progress', value: topics.filter(t => t.status === 'in-progress').length, color: '#3B82F6' },
      { name: 'Not Started', value: topics.filter(t => t.status === 'not-started').length, color: '#6B7280' },
    ].filter(item => item.value > 0);

    // Performance data for area chart (using available stats)
    const performanceData = [
      { name: 'Quiz Performance', score: userStats.averageScore },
      { name: 'Completion Rate', score: userStats.completionRate },
      { name: 'Streak Progress', score: Math.min((user?.stats?.streak || 0) * 10, 100) },
    ];

    // Topics progress for bar chart
    const topicsProgressData = topics.slice(0, 8).map(topic => ({
      name: topic.name.length > 15 ? topic.name.substring(0, 15) + '...' : topic.name,
      progress: topic.status === 'mastered' ? 100 :
        topic.status === 'in-progress' ? 60 : 0,
      status: topic.status,
    }));

    // Learning streak data for line chart
    const currentStreak = user?.stats?.streak || 0;
    const streakData = [];

    // Generate last 7 days of streak data
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });

      // Simulate streak data - in real app, this would come from actual streak history
      const streakValue = currentStreak > 0 ? Math.max(0, currentStreak - i) : 0;

      streakData.push({
        day: dayName,
        streak: streakValue,
        date: day.toLocaleDateString(),
      });
    }

    return {
      topicsStatusData,
      performanceData,
      topicsProgressData,
      streakData,
    };
  };

  const streakData = { current: user?.stats?.streak || 0 };
  const userStats = getUserStats();
  const chartData = getChartData();


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300 ">
       <Loading isVisible={loading} />
      <div className='sticky top-0 z-50 w-full dark:bg-gray-900 mx-auto'>
         <div className="flex justify-between items-center lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <MobileNav/>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-10">

        {/* Hero Profile Section */}
        <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 mb-8 shadow-2xl overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Profile Picture Section */}
            <div className="relative group">
              <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full overflow-hidden ring-4 ring-white/30 shadow-2xl group-hover:ring-blue-400/50 transition-all duration-300">
              
                {user?.profile.profilePicture ? (
                  <img
                    src={user?.profile.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              {user?.isVerified && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center ring-4 ring-white/30">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
            </div>

            {/* User Info Section */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  {user?.profile?.firstName} {user?.profile?.lastName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                  <span className="text-lg font-medium">@{user?.username}</span>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  {user?.profile?.country && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{user.profile.country}</span>
                    </div>
                  )}
                  {user?.profile?.contact && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{user.profile.contact}</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                {user?.profile?.bio || 'Welcome to your learning journey! Update your profile to tell others about yourself.'}
              </p>
            </div>

            {/* Action Button */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setShowProfileModal(true)}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Trophy className="w-6 h-6" />}
            label="Total Quizzes"
            value={userStats.totalQuizzes}
            color="blue"
            subtitle="Completed"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            label="Average Score"
            value={`${userStats.averageScore}%`}
            color="green"
            subtitle="Performance"
          />
          <StatCard
            icon={<Brain className="w-6 h-6" />}
            label="Mastered Topics"
            value={userStats.masteredTopicsCount}
            color="purple"
            subtitle={`of ${userStats.totalTopics}`}
          />
          <StatCard
            icon={<Flame className="w-6 h-6" />}
            label="Current Streak"
            value={streakData.current}
            color="orange"
            subtitle="Days"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Completion Rate"
            value={`${userStats.completionRate}%`}
            color="emerald"
            subtitle="Progress"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            label="Total Hours"
            value={`${userStats.totalHours?.toFixed(2) || '0.00'} Hr.`}
            color="yellow"
            subtitle="Time Spent"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Topics Status Distribution */}
          {chartData.topicsStatusData.length > 0 && (
            <div className="group bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <span>Topics Distribution</span>
                </h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {chartData.topicsStatusData.reduce((acc, curr) => acc + curr.value, 0)} Total
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData.topicsStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent! * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {chartData.topicsStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        color: '#000000'
                      }}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Performance Overview */}
          <div className="group bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span>Performance Metrics</span>
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                Live Data
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      color: '#000000'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#3B82F6"
                    fill="url(#colorGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#3B82F6' }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Topics Progress */}
          {chartData.topicsProgressData.length > 0 && (
            <div className="group bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <span>Topics Progress</span>
                </h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  Top {chartData.topicsProgressData.length}
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.topicsProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        color: '#000000'
                      }}
                    />
                    <Bar
                      dataKey="progress"
                      fill="url(#barGradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Learning Streak Timeline */}
          <div className="group bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <span>Learning Streak</span>
              </h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                {streakData.current} Days
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.streakData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      color: '#000000'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="streak"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8, fill: '#F59E0B' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
              <User className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Recent Activity
            </h3>
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {topics.filter(t => t.lastAttempt).sort((a, b) => {
              const dateA = a.lastAttempt ? (typeof a.lastAttempt === 'string' ? new Date(a.lastAttempt) : a.lastAttempt) : new Date(0);
              const dateB = b.lastAttempt ? (typeof b.lastAttempt === 'string' ? new Date(b.lastAttempt) : b.lastAttempt) : new Date(0);
              return dateB.getTime() - dateA.getTime();
            }).slice(0, 5).map(topic => (
              <div key={topic.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {topic.status === 'mastered' ?
                    <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" /> :
                    <Clock className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                  }
                  <span className="text-gray-700 dark:text-gray-300">{topic.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(topic.lastAttempt)}
                  </div>
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {topic.bestScore}% best
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        editData={editData}
        setEditData={setEditData}
        handleProfileUpdate={handleProfileUpdate}
        handleProfilePictureUpload={handleProfilePictureUpload}
        user={user}
      />
    </div>
  );
};

export default Dashboard;

// Enhanced StatCard component
const StatCard = ({
  icon,
  label,
  value,
  color = 'blue',
  subtitle
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
  color?: string;
  subtitle?: string;
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 bg-blue-500/20 text-blue-600 dark:text-blue-400',
    green: 'from-green-500 to-green-600 bg-green-500/20 text-green-600 dark:text-green-400',
    purple: 'from-purple-500 to-purple-600 bg-purple-500/20 text-purple-600 dark:text-purple-400',
    orange: 'from-orange-500 to-orange-600 bg-orange-500/20 text-orange-600 dark:text-orange-400',
    emerald: 'from-emerald-500 to-emerald-600 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    yellow: 'from-yellow-500 to-yellow-600 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="group bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClass.split(' ')[2]} group-hover:scale-110 transition-transform duration-200`}>
          <div className={colorClass.split(' ')[3]}>{icon}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">{label}</div>
          {subtitle && <div className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</div>}
        </div>
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
        {value}
      </div>
    </div>
  );
};