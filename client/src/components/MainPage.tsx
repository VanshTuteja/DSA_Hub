import React, { useState, useRef, useEffect } from 'react';
import { Brain, Network, Clock, CheckCircle, AlertCircle, User, RotateCcw, Upload, Youtube, FileText, Image, Loader, Plus, X, ExternalLink, Search, Trophy, Play, Lock, Filter, ChevronDown, BarChart3, Eye, Trash2 } from 'lucide-react';
import { TOPIC_QUIZ_DATA } from './data/quizData';
import type {UserProfile, FilterType, QuizAttempt } from '../interface/types';
import TopicCard from './TopicCard';
import QuizModal from './QuizModal';
import QuizResults from './QuizResults';
import UserStats from './UserStats';
import MobileNav from './MobileNav';
import Loading from './Loading';
import ReviewQuizModal from './ReviewQuizModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useQuizStore } from '../store/useQuizStore';
import { toast } from 'sonner';
import { useUserStore } from '@/store/useUserStore';
import { useUserTopicsStore } from '@/store/useUserTopics';
import Navbar from './Navbar';
import { PrerequisiteDialog } from './PrerequisiteDialog';

const MainPage: React.FC = () => {
  // Zustand store
  const {
    error,
    clearError,
  } = useQuizStore();

  const { topics, currentQuiz, loading
    , customContents,
    quizScores,
    uploadProgress
    , initializeTopics,
    initializeCustomContents,
    startTopicQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    navigateToQuestion,
    getTopicStatus,
    getTopicAttempts,
    initializeAttempts,
    reviewAttempt,
    resetUserData,
    retakeTopicQuiz,
    closeQuiz,
    uploadContent,
    uploadYouTube,
    deleteContent,
    generateQuiz,
    getQuizAttempts,
    startCustomQuiz,
  } = useUserTopicsStore();

  const { user } = useUserStore();

  // Local state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'youtube' | 'pdf' | 'image' | 'video'>('youtube');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'topics' | 'custom'>('topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteContentId, setDeleteContentId] = useState<string | null>(null);
  const [reviewAttemptData, setReviewAttemptData] = useState<QuizAttempt | null>(null);
  const [showAttemptsModal, setShowAttemptsModal] = useState(false);
  const [selectedQuizAttempts, setSelectedQuizAttempts] = useState<QuizAttempt[]>([]);
  const [attemptsModalTitle, setAttemptsModalTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userProfile: UserProfile = {
    name: user?.username || "VT",
    masteredTopics: topics.filter(t => t.status === 'mastered').map(t => t.name),
    totalScore: user?.stats.totalScore || 0,
    averageScore: user?.stats.averageScore || 0,
    streak: user?.stats.streak || 0,
    email: user?.email || ''
  };

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

  const formatDateTime = (date: Date | string | undefined): string => {
    if (!date) return 'Unknown date';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) return 'Invalid date';
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

  // Clear error when component mounts
  React.useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  // Watch for quiz state changes
  React.useEffect(() => {
    if (currentQuiz && !showQuizModal) {
      setShowQuizModal(true);
    } else if (!currentQuiz && showQuizModal) {
      setShowQuizModal(false);
    }
  }, [currentQuiz, showQuizModal]);

  // Filter options with icons and labels
  const filterOptions = [
    { value: 'all' as FilterType, label: 'All Topics', icon: Network, color: 'text-gray-600 dark:text-gray-400' },
    { value: 'mastered' as FilterType, label: 'Mastered', icon: Trophy, color: 'text-yellow-600 dark:text-yellow-400' },
    { value: 'continue' as FilterType, label: 'Continue', icon: RotateCcw, color: 'text-blue-600 dark:text-blue-400' },
    { value: 'start' as FilterType, label: 'Start', icon: Play, color: 'text-green-600 dark:text-green-400' },
    { value: 'locked' as FilterType, label: 'Locked', icon: Lock, color: 'text-red-600 dark:text-red-400' }
  ];

  const handleYouTubeUpload = async () => {
    if (!youtubeUrl.trim() || !youtubeTitle.trim()) {
      toast.error('Please provide both URL and title');
      return;
    }

    try {
      setShowUploadModal(false);
      await uploadYouTube(youtubeUrl, youtubeTitle);
      setYoutubeUrl('');
      setYoutubeTitle('');
      toast.success('YouTube video uploaded successfully!');
    } catch (error) {
      console.error('YouTube upload failed:', error);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    let fileType: 'pdf' | 'image' | 'video';

    if (file.type.includes('pdf')) {
      fileType = 'pdf';
    } else if (file.type.includes('image')) {
      fileType = 'image';
    } else if (file.type.includes('video')) {
      fileType = 'video';
    } else {
      toast.error('Unsupported file type');
      return;
    }

    try {
      setShowUploadModal(false);
      await uploadContent(file, fileType);
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };


  const handleGenerateQuiz = async (contentId: string) => {
    try {
      await generateQuiz(contentId);
      toast.success('Quiz generated successfully!');
    } catch (error) {
      console.error('Quiz generation failed:', error);
      toast.error('Failed to generate quiz. Please try again.');
    }
  };


  const handleStartCustomQuiz = async (contentId: string) => {
    try {
      await startCustomQuiz(contentId);
    } catch (error) {
      console.error('Failed to start custom quiz:', error);
      toast.error('Failed to start quiz. Please try again.');
    }
  };


  const handleStartTopicQuiz = (topicId: string) => {
    const topicData = TOPIC_QUIZ_DATA[topicId as keyof typeof TOPIC_QUIZ_DATA];
    if (!topicData) {
      toast.error('Quiz data not available for this topic');
      return;
    }

    const shuffledQuestions = [...topicData.questions].sort(() => Math.random() - 0.5);
    const questions = shuffledQuestions.slice(0, 5);

    startTopicQuiz(topicId, questions);
  };

  const handleRetakeTopicQuiz = (topicId: string, attemptId?: string) => {
    retakeTopicQuiz(topicId, attemptId);
  };

  const handleReviewTopic = (topicId: string) => {
    const attempts = getTopicAttempts(topicId);
    const attempt = attempts.slice().sort((a, b) => new Date(b.timeCompleted).getTime() - new Date(a.timeCompleted).getTime());
    if (attempt.length === 0) {
      toast.error('No quiz attempts found for this topic');
      return;
    }
    setSelectedQuizAttempts(attempt);
    setAttemptsModalTitle(topics.find(t => t.id === topicId)?.name || 'Topic');
    setShowAttemptsModal(true);
  };

  const handleReviewCustom = (contentId: string) => {
    const attempts = getQuizAttempts(contentId);
    const attempt = attempts.slice().sort((a, b) => new Date(b.timeCompleted).getTime() - new Date(a.timeCompleted).getTime());
    if (attempt.length === 0) {
      toast.error('No quiz attempts found for this content');
      return;
    }

    setSelectedQuizAttempts(attempt);
    setAttemptsModalTitle(customContents.find(c => c.id === contentId)?.title || 'Custom Quiz');
    setShowAttemptsModal(true);
  };

  const handleReviewAttempt = (attemptId: string) => {
    const attempt = reviewAttempt(attemptId);
    if (!attempt) {
      toast.error('Attempt not found');
      return;
    }

    setReviewAttemptData(attempt);
    setShowReviewModal(true);
    setShowAttemptsModal(false);
  };

  const handleDeleteContent = (contentId: string) => {
    setDeleteContentId(contentId);
    setShowDeleteModal(true);
  };

  const confirmDeleteContent = async () => {
    if (!deleteContentId) return;

    try {
      await deleteContent(deleteContentId);
      toast.success('Content deleted successfully');
      setShowDeleteModal(false);
      setDeleteContentId(null);
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete content');
    }
  };

  const getContentIcon = (type: string) => {
    const iconProps = { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" };

    switch (type) {
      case 'youtube':
        return <Youtube {...iconProps} />;
      case 'pdf':
        return <FileText {...iconProps} />;
      case 'image':
        return <Image {...iconProps} />;
      case 'video':
        return <Play {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBadgeColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  const getFilteredTopics = () => {
  let filtered = topics;

  // Step 1: Apply filter
  if (selectedFilter !== 'all') {
    filtered = filtered.filter(topic => {
      const status = getTopicStatus(topic);
      switch (selectedFilter) {
        case 'mastered':
          return status === 'mastered';
        case 'continue':
          return status === 'in-progress';
        case 'start':
          return status === 'ready';
        case 'locked':
          return status === 'locked';
        default:
          return true;
      }
    });
  }

  // Step 2: Apply search
  if (searchQuery.trim()) {
    filtered = filtered.filter(topic =>
      topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Step 3: Sort by status priority
  const statusPriority: Record<string, number> = {
    mastered: 0,
    'in-progress': 1,
    ready: 2,
    locked: 3
  };

  return filtered.sort((a, b) => {
    const statusA = getTopicStatus(a);
    const statusB = getTopicStatus(b);
    return statusPriority[statusA] - statusPriority[statusB];
  });
};


  const getFilterCounts = () => {
    const counts = { all: topics.length, mastered: 0, continue: 0, start: 0, locked: 0 };

    topics.forEach(topic => {
      const status = getTopicStatus(topic);
      switch (status) {
        case 'mastered': counts.mastered++; break;
        case 'in-progress': counts.continue++; break;
        case 'ready': counts.start++; break;
        case 'locked': counts.locked++; break;
      }
    });

    return counts;
  };

  const filteredTopics = getFilteredTopics();
  const filterCounts = getFilterCounts();
  const currentFilterOption = filterOptions.find(option => option.value === selectedFilter);

  useEffect(() => {
    const loadData = async () => {
      // resetUserData();
      initializeTopics();
      initializeAttempts();
      initializeCustomContents();
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Loading isVisible={loading} />

      {/* Header */}
      <header className="sticky top-0 z-50 dark:bg-gray-900 bg-white/80  backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
        <div className="flex justify-between items-center lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Navbar />
          <MobileNav/>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 md:p-8 text-white shadow-xl">
              <div className="flex items-start md:items-center space-x-4 md:space-x-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <Brain className="w-8 h-8 md:w-12 md:h-12" />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-xl md:text-3xl font-bold">
                    Master Data Structures & Algorithms
                  </h1>
                  <p className="text-indigo-100 mt-2 text-sm md:text-base">
                    AI-powered assessment system with custom content support
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for topics like Arrays, Linked Lists, Trees..."
                    className="w-full pl-12 pr-4 py-3 border bg-white placeholder:text-gray-400 text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-4 md:space-x-8">
                <button
                  onClick={() => setActiveTab('topics')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm md:text-base transition-colors ${activeTab === 'topics'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                >
                  Standard Learning Path
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm md:text-base transition-colors ${activeTab === 'custom'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                >
                  AI-Generated Quizzes
                  {customContents.length > 0 && (
                    <span className="ml-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 py-0.5 px-2 rounded-full text-xs">
                      {customContents.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'topics' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Learning Path</h3>

                  {/* Filter Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
                    >
                      <Filter className="w-4 h-4" />
                      <span>Filter: {currentFilterOption?.label}</span>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">
                        {selectedFilter === 'all' ? filterCounts.all : filterCounts[selectedFilter]}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {showFilterDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          {filterOptions.map((option) => {
                            const IconComponent = option.icon;
                            const count = filterCounts[option.value];
                            return (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSelectedFilter(option.value);
                                  setShowFilterDropdown(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedFilter === option.value ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
                                  }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <IconComponent className={`w-4 h-4 ${option.color}`} />
                                  <span>{option.label}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${selectedFilter === option.value
                                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                  }`}>
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Topics Grid */}
                {filteredTopics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {filteredTopics.map((topic) => {
                      const status = getTopicStatus(topic);
                      const attempts = getTopicAttempts(topic.id);
                      return (
                        <TopicCard
                          key={topic.id}
                          topic={topic}
                          status={status}
                          onStartQuiz={handleStartTopicQuiz}
                          onReview={handleReviewTopic}
                          onRetake={handleRetakeTopicQuiz}
                          hasQuizHistory={attempts.length > 0}
                          topics={topics}
                          attempts={attempts}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      {currentFilterOption && <currentFilterOption.icon className={`w-8 h-8 ${currentFilterOption.color}`} />}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No topics found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {searchQuery.trim() ? `No topics match "${searchQuery}".` : `No ${currentFilterOption?.label.toLowerCase()} topics available.`}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedFilter('all');
                        setSearchQuery('');
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Show All Topics
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'custom' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">AI-Generated Quizzes</h3>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm md:text-base">Add Content</span>
                  </button>
                </div>

                {customContents.length === 0 ? (
                  <div className="text-center py-8 md:py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                    <Upload className="w-12 h-12 md:w-16 md:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-2">No custom content yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm md:text-base px-4">
                      Upload YouTube videos, PDFs, images, or videos to generate AI-powered quizzes
                    </p>
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-sm md:text-base shadow-lg"
                    >
                      Upload Your First Content
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {customContents.map((content) => {
                      const hasScore = quizScores[content.id];
                      const scorePercentage = hasScore ? hasScore.percentage : 0;
                      const attempts = getQuizAttempts(content.id);
                      const progress = uploadProgress[content.id];

                      return (
                        <div
                          key={content.id}
                          className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
                        >
                          {/* Header Section */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                                {getContentIcon(content.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 dark:text-white text-lg truncate">{content.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {content.type === 'youtube' ? 'YouTube Video' : content.type.toUpperCase()}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteContent(content.id)}
                              className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Progress Indicator */}
                          {progress && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                  {progress.message || 'Processing...'}
                                </span>
                                <span className="text-sm text-blue-600 dark:text-blue-400 font-bold">
                                  {progress.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${progress.progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* URL Section */}
                          {content.url && (
                            <div className="mb-6">
                              <a
                                href={content.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg transition-all duration-200"
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span>View original content</span>
                              </a>
                            </div>
                          )}

                          {/* Status and Score Section */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                              <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${content.status === 'completed' || content.status === 'ready' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
                                content.status === 'processing' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
                                  'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                                }`}>
                                {content.status === 'processing' && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                                {(content.status === 'completed' || content.status === 'ready') && <CheckCircle className="w-4 h-4 mr-2" />}
                                {content.status === 'failed' && <AlertCircle className="w-4 h-4 mr-2" />}
                                {content.status === 'processing' ? 'AI Processing...' :
                                  content.status === 'completed' || content.status === 'ready' ? 'Content Ready' : 'Processing Failed'}
                              </div>
                            </div>

                            {/* Score Display */}
                            {hasScore && (
                              <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getScoreBadgeColor(scorePercentage)}`}>
                                <Trophy className="w-4 h-4 mr-2" />
                                <span>{hasScore.correct}/{hasScore.total} ({scorePercentage}%)</span>
                              </div>
                            )}
                          </div>

                          {/* Attempts Summary */}
                          {attempts.length > 0 && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Quiz History ({attempts.length} attempts)
                                </span>
                                <button
                                  onClick={() => handleReviewCustom(content.id)}
                                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                                >
                                  View All
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Best Score:</span>
                                  <div className="font-bold text-gray-900 dark:text-white">
                                    {Math.max(...attempts.map(a => a.score))}%
                                  </div>
                                </div>
                                <div>
                                  <span className="text-gray-500 dark:text-gray-400">Latest:</span>
                                  <div className="font-bold text-gray-900 dark:text-white">
                                    {attempts[attempts.length - 1]?.score}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Upload Date */}
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Uploaded: {formatDate(content.uploadDate)}
                          </div>

                          {/* Action Buttons */}
                          {(content.status === 'completed' || content.status === 'ready') && (
                            <div className={`grid gap-3 ${attempts.length > 0 ? 'grid-cols-3' : 'grid-cols-2'}`}>

                              {/* Prerequisite dialog button */}
                              <PrerequisiteDialog contentId={content.id} title={content.title} />

                              {/* If quiz is NOT generated */}
                              {!content.quizGenerated ? (
                                <button
                                  onClick={() => handleGenerateQuiz(content.id)}
                                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                                >
                                  <Brain className="w-4 h-4" />
                                  <span>Generate AI Quiz</span>
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleStartCustomQuiz(content.id)}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                                  >
                                    <Play className="w-4 h-4" />
                                    <span>{hasScore ? 'Take New Quiz' : 'Take AI Quiz'}</span>
                                  </button>

                                  {/* Review button if attempts exist */}
                                  {attempts.length > 0 && (
                                    <button
                                      onClick={() => handleReviewCustom(content.id)}
                                      className="w-full py-2 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1 text-sm"
                                    >
                                      <Eye className="w-4 h-4 me-2" />
                                      <span>Review</span>
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          )}


                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* User Stats */}
            <UserStats customContents={customContents} userProfile={userProfile} topics={topics} />

            {/* User Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Recent Activity
                </h3>
                <button onClick={resetUserData} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
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
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              Create AI-Powered Quiz
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Content Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Choose Content Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUploadType("youtube")}
                  className={`p-3 md:p-4 rounded-lg border-2 transition-all ${uploadType === "youtube"
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                >
                  <Youtube className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">YouTube</div>
                </button>
                <button
                  onClick={() => setUploadType("pdf")}
                  className={`p-3 md:p-4 rounded-lg border-2 transition-all ${uploadType === "pdf"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                >
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">PDF</div>
                </button>
                <button
                  onClick={() => setUploadType("image")}
                  className={`p-3 md:p-4 rounded-lg border-2 transition-all ${uploadType === "image"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                >
                  <Image className="w-6 h-6 md:w-8 md:h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">Image</div>
                </button>
                <button
                  onClick={() => setUploadType("video")}
                  className={`p-3 md:p-4 rounded-lg border-2 transition-all ${uploadType === "video"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                >
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">Video</div>
                </button>
              </div>
            </div>

            {/* Content Input */}
            {uploadType === "youtube" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    YouTube Video URL
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={youtubeTitle}
                    onChange={(e) => setYoutubeTitle(e.target.value)}
                    placeholder="Enter a descriptive title"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {(uploadType === "pdf" || uploadType === "image" || uploadType === "video") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload {uploadType === "pdf" ? "PDF Document" : uploadType === "video" ? "Video File" : "Image"}
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 md:p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                >
                  <Upload className="w-8 h-8 md:w-12 md:h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {uploadType === "pdf" ? "PDF files up to 10MB" :
                      uploadType === "video" ? "Video files up to 100MB" :
                        "PNG, JPG, GIF up to 5MB"}
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={uploadType === "pdf" ? ".pdf" :
                    uploadType === "video" ? "video/*" :
                      "image/*"}
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            )}

            {/* AI Features Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    AI-Powered Quiz Generation
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Analyzes content to identify key concepts</li>
                    <li>• Generates contextual DSA questions</li>
                    <li>• Creates explanations for each answer</li>
                    <li>• Adapts difficulty based on content complexity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (uploadType === "youtube") {
                    handleYouTubeUpload();
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                disabled={uploadType === "youtube" && (!youtubeUrl.trim() || !youtubeTitle.trim())}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-medium transition-all disabled:cursor-not-allowed"
              >
                {uploadType === "youtube" ? "Process Video" : "Upload & Process"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md w-full p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <Trash2 className="w-6 h-6 text-red-500 mr-3" />
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this content? This action cannot be undone and will also remove all associated quiz attempts and scores.
            </p>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteContent}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Attempts Modal */}
      <Dialog open={showAttemptsModal} onOpenChange={setShowAttemptsModal}>
        <DialogContent className="max-w-lvw max-h-[90vh] overflow-y-auto p-5 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <BarChart3 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-3" />
              Quiz History: {attemptsModalTitle}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedQuizAttempts.length === 0 ? (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No quiz attempts found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-y-4">
                {selectedQuizAttempts.map((attempt, index) => (
                  <div
                    key={attempt.id}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            #{selectedQuizAttempts.length - index}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Attempt</div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(attempt.score)}`}>
                              {attempt.score}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                          </div>

                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {attempt.correctAnswers}/{attempt.totalQuestions}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Correct</div>
                          </div>

                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {Math.floor(attempt.timeTaken / 60)}:{(attempt.timeTaken % 60).toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
                          </div>

                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatDateTime(attempt.timeCompleted)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleReviewAttempt(attempt.attemptId)}
                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Review</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Quiz Modal */}
      {showReviewModal && reviewAttemptData && (
        <ReviewQuizModal
          attempt={reviewAttemptData}
          onClose={() => {
            setShowReviewModal(false);
            setReviewAttemptData(null);
          }}
          title={attemptsModalTitle}
        />
      )}

      {/* Quiz Modal */}
      {showQuizModal && currentQuiz && !currentQuiz.isCompleted && (
        <QuizModal
          quiz={currentQuiz}
          onAnswer={answerQuestion}
          onNext={nextQuestion}
          onPrevious={previousQuestion}
          onClose={closeQuiz}
          onNavigateToQuestion={navigateToQuestion}
          title={currentQuiz.topicId
            ? topics.find(t => t.id === currentQuiz.topicId)?.name || 'Quiz'
            : customContents.find(c => c.id === currentQuiz.contentId)?.title || 'Custom Quiz'}
        />
      )}

      {/* Quiz Results Modal */}
      {showQuizModal && currentQuiz && currentQuiz.isCompleted && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">Quiz Complete!</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {currentQuiz.topicId
                    ? topics.find(t => t.id === currentQuiz.topicId)?.name
                    : customContents.find(c => c.id === currentQuiz.contentId)?.title} Assessment
                </p>
              </div>
              <button
                onClick={closeQuiz}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
              <QuizResults
                quiz={currentQuiz}
                title={currentQuiz.topicId
                  ? topics.find(t => t.id === currentQuiz.topicId)?.name || 'Quiz'
                  : customContents.find(c => c.id === currentQuiz.contentId)?.title || 'Custom Quiz'}
                // onReview={() => handleReviewAttempt(currentQuiz.)}
                onRetake={() => {
                  if (currentQuiz.topicId) {
                    handleStartTopicQuiz(currentQuiz.topicId);
                  } else if (currentQuiz.contentId) {
                    handleStartCustomQuiz(currentQuiz.contentId);
                  }
                }}
                onClose={closeQuiz}
                isTopicMastered={currentQuiz.topicId && currentQuiz.score >= 80}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;