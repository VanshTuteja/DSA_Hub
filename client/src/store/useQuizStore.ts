import { create } from 'zustand';
import { devtools, subscribeWithSelector, persist } from 'zustand/middleware';
import { apiService } from '../services/api';
import type {
  CustomContent,
  Quiz,
  QuizState,
  QuizScore,
  UploadProgress,
  Topic,
  QuizAttempt
} from '../interface/types';
import { toast } from 'sonner';
import { custom } from 'zod';

interface QuizStore {
  // State
  customContents: CustomContent[];
  quizzes: Quiz[];
  currentQuiz: QuizState | null;
  quizHistory: QuizState[];
  quizAttempts: { [quizId: string]: QuizAttempt[] };
  quizScores: { [contentId: string]: QuizScore };
  uploadProgress: { [contentId: string]: UploadProgress };
  topics: Topic[];
  isLoading: boolean;
  error: string | null;
  lastSyncTime: number;
  userStreak: number;
  lastActivityDate: string | null;
  isInitialized: boolean;

  // Upload Actions
  uploadContent: (file: File, type: 'pdf' | 'image' | 'video', title?: string) => Promise<string>;
  uploadYouTube: (url: string, title: string) => Promise<string>;

  // Content Management
  fetchAllContent: () => Promise<void>;
  deleteContent: (contentId: string) => Promise<void>;
  checkContentStatus: (contentId: string) => Promise<void>;

  // Quiz Management
  generateQuiz: (contentId: string, questionCount?: number, difficulty?: 'easy' | 'medium' | 'hard' | 'mixed',) => Promise<string>;
  generateNewQuiz: (contentId: string, questionCount?: number) => Promise<string>;
  fetchQuiz: (quizId: string) => Promise<Quiz>;
  startCustomQuiz: (contentId: string) => Promise<void>;
  retakeCustomQuiz: (contentId: string, attemptId?: string) => Promise<void>;
  startTopicQuiz: (topicId: string, questions: any[]) => void;
  retakeTopicQuiz: (topicId: string, attemptId?: string) => void;

  // Quiz Actions
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  completeQuiz: () => void;
  closeQuiz: () => void;
  navigateToQuestion: (questionIndex: number) => void;

  // Review Actions
  getQuizAttempts: (quizId: string) => QuizAttempt[];
  getTopicAttempts: (topicId: string) => QuizAttempt[];
  reviewAttempt: (attemptId: string) => QuizAttempt | null;

  // Topic Management
  updateTopicStatus: (topicId: string, score: number) => void;
  getTopicStatus: (topic: Topic) => 'mastered' | 'in-progress' | 'ready' | 'locked';
  initializeTopics: () => void;

  // User Management
  updateStreak: () => void;
  resetUserData: () => void;
  initializeUser: () => Promise<void>;

  // Utility
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  syncWithServer: () => Promise<void>;
}

// Clean topic definitions - no initial progress
const getCleanTopics = (): Topic[] => [
  {
    id: 'arrays',
    name: 'Arrays',
    prerequisites: [],
    status: 'not-started',
    score: 0,
    totalQuestions: 5,
    attempts: 0,
    bestScore: 0,
  },
  {
    id: 'loops',
    name: 'Loops',
    prerequisites: ['arrays'],
    status: 'not-started',
    score: 0,
    totalQuestions: 5,
    attempts: 0,
    bestScore: 0,
  },
  


];

// Helper function to ensure date is properly formatted
const ensureDate = (date: any): Date => {
  if (date instanceof Date) return date;
  if (typeof date === 'string') return new Date(date);
  return new Date();
};

// Helper function to check if two dates are the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

// Helper function to check if date is consecutive day
const isConsecutiveDay = (date1: Date, date2: Date): boolean => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        // Initial State - Completely empty for new users
        customContents: [],
        quizzes: [],
        currentQuiz: null,
        quizHistory: [],
        quizAttempts: {},
        quizScores: {},
        uploadProgress: {},
        topics: [],
        isLoading: false,
        error: null,
        lastSyncTime: 0,
        userStreak: 0,
        lastActivityDate: null,
        isInitialized: false,

        // Initialize user data from backend
        initializeUser: async () => {
          if (get().isInitialized) return;

          try {
            set({ isLoading: true, error: null });

            // Initialize clean topics first
            get().initializeTopics();

            // Try to fetch content from backend
            await get().fetchAllContent();

            set({ isInitialized: true, isLoading: false });
          } catch (error) {
            toast.error('Backend not available, starting with clean state');
            set({
              isInitialized: true,
              isLoading: false,
              error: null // Don't show error for new users
            });
          }
        },

        // Initialize clean topics
        initializeTopics: async () => {
          // await apiService.initializeTopics(userId);
          // const currentTopics = get().topics;
          // if (currentTopics.length === 0) {
          try {
            const result = await apiService.fetchTopics();

            console.log("Fetched topics:", result);

            set({
              topics: result.topics
            });
          } catch (error: any) {
            console.error("Error initializing topics:", error);

            set({
              topics: getCleanTopics(), // fallback to empty/default topics
              error: error.response?.data?.message || "Failed to initialize topics now"
            });
          }
          // }
        },

        // User Management
        updateStreak: () => {
          const today = new Date();
          const { lastActivityDate, userStreak } = get();

          if (!lastActivityDate) {
            // First activity
            set({
              userStreak: 1,
              lastActivityDate: today.toISOString()
            });
            return;
          }

          const lastActivity = new Date(lastActivityDate);

          if (isSameDay(today, lastActivity)) {
            // Same day, no change
            return;
          } else if (isConsecutiveDay(lastActivity, today)) {
            // Consecutive day, increment streak
            set({
              userStreak: userStreak + 1,
              lastActivityDate: today.toISOString()
            });
          } else {
            // Streak broken, reset to 1
            set({
              userStreak: 1,
              lastActivityDate: today.toISOString()
            });
          }
        },

        resetUserData: () => {
          set({
            customContents: [],
            quizzes: [],
            currentQuiz: null,
            quizHistory: [],
            quizAttempts: {},
            quizScores: {},
            topics: getCleanTopics(),
            userStreak: 0,
            lastActivityDate: null,
            lastSyncTime: 0,
            isInitialized: false
          });
        },

        // Upload Actions - Real backend integration
        uploadContent: async (file: File, type: 'pdf' | 'image' | 'video', title?: string): Promise<string> => {
          const tempId = Date.now().toString();

          try {
            set({ isLoading: true, error: null });

            const fileTitle = title || file.name;

            // Create temporary content for immediate UI feedback
            const tempContent: CustomContent = {
              id: tempId,
              type,
              title: fileTitle,
              fileName: file.name,
              originalName: file.name,
              uploadDate: new Date().toISOString(),
              status: 'uploading',
              metadata: {
                fileSize: file.size,
                mimeType: file.type
              }
            };

            // Add to the beginning of the array (latest first)
            set(state => ({
              customContents: [tempContent, ...state.customContents],
              uploadProgress: {
                ...state.uploadProgress,
                [tempId]: {
                  contentId: tempId,
                  progress: 0,
                  stage: 'uploading',
                  message: 'Uploading file...'
                }
              }
            }));

            // Call actual backend API
            let result;
            switch (type) {
              case 'pdf':
                result = await apiService.uploadPdf(file, fileTitle);
                break;
              case 'image':
                result = await apiService.uploadImage(file, fileTitle);
                break;
              case 'video':
                result = await apiService.uploadVideo(file, fileTitle);
                break;
              default:
                throw new Error('Unsupported file type');
            }
            if(result.success){
              toast.success("upload sss");
            }
            else{
              toast.error("upload failed");
            }
            // Update with actual content ID from backend
            const actualContentId = result.contentId!;

            // Update content with real ID and completed status
            set(state => ({
              customContents: state.customContents.map(content =>
                content.id === tempId
                  ? { ...content, id: actualContentId, status: 'completed' }
                  : content
              ),
              uploadProgress: {
                ...state.uploadProgress,
                [tempId]: {
                  contentId: tempId,
                  progress: 100,
                  stage: 'completed',
                  message: 'Upload complete!'
                }
              },
              isLoading: false
            }));

            // Clear progress after delay
            setTimeout(() => {
              set(state => {
                const newProgress = { ...state.uploadProgress };
                delete newProgress[tempId];
                return { uploadProgress: newProgress };
              });
            }, 3000);

            // Update streak
            get().updateStreak();

            return actualContentId;

          } catch (error) {
            // Remove temporary content on error
            set(state => ({
              customContents: state.customContents.filter(content => content.id !== tempId),
              isLoading: false,
              error: error instanceof Error ? error.message : 'Upload failed'
            }));

            // Clear progress
            setTimeout(() => {
              set(state => {
                const newProgress = { ...state.uploadProgress };
                delete newProgress[tempId];
                return { uploadProgress: newProgress };
              });
            }, 1000);

            throw error;
          }
        },

        uploadYouTube: async (url: string, title: string): Promise<string> => {
          const tempId = Date.now().toString();

          try {
            set({ isLoading: true, error: null });

            // Create temporary content for UI feedback
            const tempContent: CustomContent = {
              id: tempId,
              type: 'youtube',
              title,
              url,
              uploadDate: new Date().toISOString(),
              status: 'processing'
            };

            // Add to the beginning of the array (latest first)
            set(state => ({
              customContents: [tempContent, ...state.customContents],
              uploadProgress: {
                ...state.uploadProgress,
                [tempId]: {
                  contentId: tempId,
                  progress: 0,
                  stage: 'processing',
                  message: 'Processing YouTube video...'
                }
              }
            }));

            // Call actual backend API
            const result = await apiService.uploadYoutube(url, title);
            const actualContentId = result.contentId;

            // Update with actual content ID from backend
            set(state => ({
              customContents: state.customContents.map(content =>
                content.id === tempId
                  ? { ...content, id: actualContentId, status: 'completed' }
                  : content
              ),
              uploadProgress: {
                ...state.uploadProgress,
                [tempId]: {
                  contentId: tempId,
                  progress: 100,
                  stage: 'completed',
                  message: 'Processing complete!'
                }
              },
              isLoading: false
            }));

            // Clear progress after delay
            setTimeout(() => {
              set(state => {
                const newProgress = { ...state.uploadProgress };
                delete newProgress[tempId];
                return { uploadProgress: newProgress };
              });
            }, 3000);

            // Update streak
            get().updateStreak();

            return actualContentId;

          } catch (error) {
            // Remove temporary content on error
            set(state => ({
              customContents: state.customContents.filter(content => content.id !== tempId),
              isLoading: false,
              error: error instanceof Error ? error.message : 'YouTube processing failed'
            }));

            // Clear progress
            setTimeout(() => {
              set(state => {
                const newProgress = { ...state.uploadProgress };
                delete newProgress[tempId];
                return { uploadProgress: newProgress };
              });
            }, 1000);

            throw error;
          }
        },

        // Content Management - Real backend integration
        fetchAllContent: async () => {
          try {
            const response = await apiService.getAllContent();
            set(state => ({
              customContents: response.contents.sort((a, b) =>
                new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
              ),
              lastSyncTime: Date.now()
            }));
          } catch (error) {
            // If backend is not available, start with empty state for new users
            console.warn('Backend not available, starting with empty state');
            set(state => ({
              customContents: [],
              lastSyncTime: Date.now(),
              error: null // Don't show error for new users
            }));
          }
        },

        deleteContent: async (contentId: string) => {
          try {
            await apiService.deleteContent(contentId);
            set(state => ({
              customContents: state.customContents.filter(content => content.id !== contentId),
              quizzes: state.quizzes.filter(quiz => quiz.contentId !== contentId),
              quizAttempts: Object.fromEntries(
                Object.entries(state.quizAttempts).filter(([key]) => !key.startsWith(contentId))
              )
            }));
          } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to delete content' });
            throw error;
          }
        },

        checkContentStatus: async (contentId: string) => {
          try {
            const status = await apiService.getContentStatus(contentId);
            // set(state => ({
            //   customContents: state.customContents.map(content =>
            //     content.id === contentId
            //       ? { ...content, ...status }
            //       : content
            //   )
            // }));
          } catch (error) {
            console.error('Failed to check content status:', error);
          }
        },

        // Quiz Management - Real backend integration
        generateQuiz: async (contentId: string, questionCount = 5): Promise<string> => {
          set({ isLoading: true, error: null });

          try {
            set(state => ({
              uploadProgress: {
                ...state.uploadProgress,
                [contentId]: {
                  contentId,
                  progress: 75,
                  stage: 'generating',
                  message: 'Generating quiz questions...'
                }
              }
            }));

            // Call actual backend API to generate quiz
            await apiService.generateQuiz(contentId, questionCount);

            // // Fetch the actual quiz data from backend
            // const quizData = await apiService.getQuiz(contentId);

            // Update content status and store quiz
            set(state => ({
              customContents: state.customContents.map(content =>
                content.id === contentId
                  ? { ...content, quizGenerated: true, status: 'completed' }
                  : content
              ),
              quizzes: [...state.quizzes, quizData],
              uploadProgress: {
                ...state.uploadProgress,
                [contentId]: {
                  contentId,
                  progress: 100,
                  stage: 'completed',
                  message: 'Quiz ready!'
                }
              },
              isLoading: false
            }));

            // Clear progress after delay
            setTimeout(() => {
              set(state => {
                const newProgress = { ...state.uploadProgress };
                delete newProgress[contentId];
                return { uploadProgress: newProgress };
              });
            }, 3000);

            return quizData.id;

          } catch (error) {
            set({ isLoading: false, error: error instanceof Error ? error.message : 'Quiz generation failed' });
            throw error;
          }
        },

        generateNewQuiz: async (contentId: string, questionCount = 5): Promise<string> => {
          set({ isLoading: true, error: null });

          try {
            // Call backend API to generate a new quiz with different questions
            const response = await apiService.generateQuiz(contentId, questionCount, 'mixed');

            // Fetch the actual quiz data from backend
            const quizData = await apiService.getQuiz(response.quiz.id);

            set(state => ({
              quizzes: [...state.quizzes, quizData],
              isLoading: false
            }));

            return quizData.id;

          } catch (error) {
            set({ isLoading: false, error: error instanceof Error ? error.message : 'New quiz generation failed' });
            throw error;
          }
        },

        fetchQuiz: async (quizId: string): Promise<Quiz> => {
          try {
            // First check local store
            const localQuiz = get().quizzes.find(q => q.id === quizId);
            if (localQuiz) {
              return localQuiz;
            }

            // If not found locally, fetch from backend
            const quiz = await apiService.getQuiz(quizId);


            // Store in local state
            set(state => ({
              quizzes: [...state.quizzes, quiz]
            }));

            return quiz;
          } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch quiz' });
            throw error;
          }
        },

        startCustomQuiz: async (contentId: string) => {
          try {
            set({ isLoading: true, error: null });

            // Find the content
            const content = get().customContents.find(c => c.id === contentId);
            if (!content) {
              throw new Error('Content not found');
            }

            // Find the most recent quiz for this content
            // let quiz = get().quizzes
            //   .filter(q => q.contentId === contentId)[0];
            //   // .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0];
            let quiz = get().quizzes.find(q => q.contentId === contentId);
            if (!quiz) {
              quiz = await apiService.getQuiz(contentId);
            }

            set((state: { quizzes: any; }) => ({
              quizzes: [...state.quizzes, quiz]
            }));


            if (!quiz) {
              throw new Error('No quiz found for this content. Please generate a quiz first.');
            }

            const timeLimit = quiz.questions.length * 60; // 1 minute per question
            const attemptId = `${contentId}-${Date.now()}`;

            const newQuiz: QuizState = {
              id: attemptId,
              contentId,
              quizId: quiz.id,
              questions: quiz.questions,
              currentQuestionIndex: 0,
              userAnswers: new Array(quiz.questions.length).fill(undefined),
              score: 0,
              isCompleted: false,
              timeStarted: new Date(),
              timeLimit,
              timeRemaining: timeLimit,
            };

            set({ currentQuiz: newQuiz, isLoading: false });



          } catch (error) {
            set({ isLoading: false, error: error instanceof Error ? error.message : 'Failed to start quiz' });
            throw error;
          }
        },

        retakeCustomQuiz: async (contentId: string, attemptId?: string) => {
          try {
            set({ isLoading: true, error: null });

            const content = get().customContents.find(c => c.id === contentId);
            if (!content) {
              throw new Error('Content not found');
            }

            // Get the previous attempt if attemptId is provided
            let questionsToUse;
            if (attemptId) {
              const attempts = get().quizAttempts[contentId] || [];
              const previousAttempt = attempts.find(a => a.id === attemptId);
              if (previousAttempt) {
                questionsToUse = previousAttempt.questions;
              }
            }

            // If no previous attempt found, get the latest quiz
            if (!questionsToUse) {
              const quiz = get().quizzes
                .filter(q => q.contentId === contentId)
                .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0];
              if (!quiz) {
                throw new Error('No quiz found for this content');
              }
              questionsToUse = quiz.questions;
            }

            const timeLimit = questionsToUse.length * 60;
            const newAttemptId = `${contentId}-${Date.now()}`;

            const newQuiz: QuizState = {
              id: newAttemptId,
              contentId,
              questions: questionsToUse,
              currentQuestionIndex: 0,
              userAnswers: new Array(questionsToUse.length).fill(undefined),
              score: 0,
              isCompleted: false,
              timeStarted: new Date(),
              timeLimit,
              timeRemaining: timeLimit,
              isRetake: true,
              originalAttemptId: attemptId
            };

            set({ currentQuiz: newQuiz, isLoading: false });

          } catch (error) {
            set({ isLoading: false, error: error instanceof Error ? error.message : 'Failed to retake quiz' });
            throw error;
          }
        },

        startTopicQuiz: (topicId: string, questions: any[]) => {
          // Initialize topics if not already done
          if (get().topics.length === 0) {
            get().initializeTopics();
          }

          const timeLimit = questions.length * 60;
          const attemptId = `${topicId}-${Date.now()}`;

          const newQuiz: QuizState = {
            id: attemptId,
            topicId,
            questions,
            currentQuestionIndex: 0,
            userAnswers: new Array(questions.length).fill(undefined),
            score: 0,
            isCompleted: false,
            timeStarted: new Date(),
            timeLimit,
            timeRemaining: timeLimit,
          };

          set({ currentQuiz: newQuiz });
        },

        retakeTopicQuiz: (topicId: string, attemptId?: string) => {
          // Get the previous attempt if attemptId is provided
          let questionsToUse;
          if (attemptId) {
            const attempts = get().quizAttempts[topicId] || [];
            const previousAttempt = attempts.find(a => a.id === attemptId);
            if (previousAttempt) {
              questionsToUse = previousAttempt.questions;
            }
          }

          // If no previous attempt found, use default questions
          if (!questionsToUse) {
            const history = get().quizHistory.filter(q => q.topicId === topicId);
            if (history.length > 0) {
              questionsToUse = history[history.length - 1].questions;
            } else {
              toast.error('No previous attempt found');
              return;
            }
          }

          const timeLimit = questionsToUse.length * 60;
          const newAttemptId = `${topicId}-${Date.now()}`;

          const newQuiz: QuizState = {
            id: newAttemptId,
            topicId,
            questions: questionsToUse,
            currentQuestionIndex: 0,
            userAnswers: new Array(questionsToUse.length).fill(undefined),
            score: 0,
            isCompleted: false,
            timeStarted: new Date(),
            timeLimit,
            timeRemaining: timeLimit,
            isRetake: true,
            originalAttemptId: attemptId
          };

          set({ currentQuiz: newQuiz });
        },

        // Topic Management
        updateTopicStatus: (topicId: string, score: number) => {
          set(state => ({
            topics: state.topics.map(topic => {
              if (topic.id === topicId) {
                const newAttempts = (topic.attempts || 0) + 1;
                const newBestScore = Math.max(topic.bestScore || 0, score);
                const newStatus = score >= 80 ? 'mastered' : 'in-progress';

                return {
                  ...topic,
                  status: newStatus,
                  attempts: newAttempts,
                  bestScore: newBestScore,
                  lastAttempt: new Date()
                };
              }
              return topic;
            })
          }));

          // Update streak
          get().updateStreak();

          // Show mastery notification
          if (score >= 80) {
            const topic = get().topics.find(t => t.id === topicId);
            if (topic) {
              toast.success(`🎉 Congratulations! You've mastered ${topic.name}!`, {
                duration: 5000,
              });
            }
          }
        },

        getTopicStatus: (topic: Topic) => {
          const topics = get().topics;
          const allPrereqsMastered = topic.prerequisites.every(prereq =>
            topics.find(t => t.id === prereq)?.status === 'mastered'
          );

          if (topic.status === 'mastered') return 'mastered';
          if (topic.status === 'in-progress') return 'in-progress';
          if (allPrereqsMastered || topic.prerequisites.length === 0) return 'ready';
          return 'locked';
        },

        // Quiz Actions
        answerQuestion: (answerIndex: number) => {
          const { currentQuiz } = get();
          if (!currentQuiz || currentQuiz.isCompleted) return;

          const updatedAnswers = [...currentQuiz.userAnswers];
          updatedAnswers[currentQuiz.currentQuestionIndex] = answerIndex;

          set({
            currentQuiz: {
              ...currentQuiz,
              userAnswers: updatedAnswers
            }
          });
        },

        nextQuestion: () => {
          const { currentQuiz } = get();
          if (!currentQuiz) return;

          if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
            set({
              currentQuiz: {
                ...currentQuiz,
                currentQuestionIndex: currentQuiz.currentQuestionIndex + 1
              }
            });
          } else {
            get().completeQuiz();
          }
        },

        previousQuestion: () => {
          const { currentQuiz } = get();
          if (!currentQuiz || currentQuiz.currentQuestionIndex === 0) return;

          set({
            currentQuiz: {
              ...currentQuiz,
              currentQuestionIndex: currentQuiz.currentQuestionIndex - 1
            }
          });
        },

        navigateToQuestion: (questionIndex: number) => {
          const { currentQuiz } = get();
          if (!currentQuiz) return;

          if (questionIndex >= 0 && questionIndex < currentQuiz.questions.length) {
            set({
              currentQuiz: {
                ...currentQuiz,
                currentQuestionIndex: questionIndex
              }
            });
          }
        },

        completeQuiz: () => {
          const { currentQuiz } = get();
          if (!currentQuiz) return;

          let correctAnswers = 0;
          currentQuiz.questions.forEach((question, index) => {
            if (currentQuiz.userAnswers[index] === question.correctAnswer) {
              correctAnswers++;
            }
          });

          const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
          const completedQuiz: QuizState = {
            ...currentQuiz,
            score,
            isCompleted: true,
            timeCompleted: new Date()
          };

          // Create quiz attempt record
          const attempt: QuizAttempt = {
            id: completedQuiz.id!,
            quizId: currentQuiz.topicId || currentQuiz.contentId!,
            questions: completedQuiz.questions,
            userAnswers: completedQuiz.userAnswers,
            score: completedQuiz.score,
            correctAnswers,
            totalQuestions: completedQuiz.questions.length,
            timeStarted: completedQuiz.timeStarted,
            timeCompleted: completedQuiz.timeCompleted!,
            timeTaken: Math.round((completedQuiz.timeCompleted!.getTime() - completedQuiz.timeStarted.getTime()) / 1000),
            isRetake: completedQuiz.isRetake || false,
            originalAttemptId: completedQuiz.originalAttemptId
          };

          // Update topic status if it's a topic quiz
          if (completedQuiz.topicId) {
            get().updateTopicStatus(completedQuiz.topicId, score);
          } else {
            // Update streak for custom content too
            get().updateStreak();
          }

          // Save quiz score for custom content
          if (completedQuiz.contentId) {
            const quizScore: QuizScore = {
              contentId: completedQuiz.contentId,
              total: currentQuiz.questions.length,
              correct: correctAnswers,
              percentage: score,
              attempt: 1,
              completedAt: new Date()
            };

            set(state => ({
              quizScores: {
                ...state.quizScores,
                [completedQuiz.contentId!]: quizScore
              }
            }));
          }

          // Store attempt in quizAttempts
          const quizKey = currentQuiz.topicId || currentQuiz.contentId!;
          set(state => ({
            currentQuiz: completedQuiz,
            quizHistory: [...state.quizHistory, completedQuiz],
            quizAttempts: {
              ...state.quizAttempts,
              [quizKey]: [...(state.quizAttempts[quizKey] || []), attempt]
            }
          }));

          toast.success(`Quiz completed! You scored ${score}%`);
        },

        closeQuiz: () => {
          set({ currentQuiz: null });
        },

        // Review Actions
        getQuizAttempts: (quizId: string) => {
          return get().quizAttempts[quizId] || [];
        },

        getTopicAttempts: (topicId: string) => {
          return get().quizAttempts[topicId] || [];
        },

        reviewAttempt: (attemptId: string) => {
          const attempts = Object.values(get().quizAttempts).flat();
          return attempts.find(attempt => attempt.id === attemptId) || null;
        },

        // Utility
        clearError: () => set({ error: null }),
        setLoading: (loading: boolean) => set({ isLoading: loading }),

        syncWithServer: async () => {
          try {
            await get().fetchAllContent();
            set({ lastSyncTime: Date.now() });
          } catch (error) {
            console.error('Sync failed:', error);
          }
        },
      })),
      {
        name: 'quiz-store',
        partialize: (state) => ({
          customContents: state.customContents,
          quizzes: state.quizzes,
          quizHistory: state.quizHistory,
          quizAttempts: state.quizAttempts,
          quizScores: state.quizScores,
          topics: state.topics,
          lastSyncTime: state.lastSyncTime,
          userStreak: state.userStreak,
          lastActivityDate: state.lastActivityDate,
          isInitialized: state.isInitialized
        }),
      }
    ),
    {
      name: 'quiz-store',
    }
  )
);

// Add timer functionality
let timerInterval: NodeJS.Timeout | null = null;

useQuizStore.subscribe(
  (state) => state.currentQuiz,
  (currentQuiz) => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    if (currentQuiz && !currentQuiz.isCompleted && currentQuiz.timeRemaining > 0) {
      timerInterval = setInterval(() => {
        const state = useQuizStore.getState();
        const quiz = state.currentQuiz;

        if (!quiz || quiz.isCompleted) {
          if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
          }
          return;
        }

        const newTimeRemaining = quiz.timeRemaining - 1;

        if (newTimeRemaining <= 0) {
          state.completeQuiz();
          if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
          }
        } else {
          useQuizStore.setState({
            currentQuiz: {
              ...quiz,
              timeRemaining: newTimeRemaining
            }
          });
        }
      }, 1000);
    }
  }
);

// Clean initialization for new users
if (typeof window !== 'undefined') {
  const store = useQuizStore.getState();

  // Only initialize if not already done
  if (!store.isInitialized) {
    store.initializeUser();
  }
}