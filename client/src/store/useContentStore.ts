// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';
// import axios from 'axios';

// // Types
// export interface CustomContent {
//   id: string;
//   type: 'youtube' | 'pdf' | 'image' | 'video';
//   title: string;
//   originalName?: string;
//   url?: string;
//   fileName?: string;
//   uploadDate: string;
//   status: 'processing' | 'ready' | 'failed' | 'uploading';
//   quizGenerated?: boolean;
//   extractedText?: string;
//   translatedText?: string;
//   language?: string;
//   metadata?: {
//     fileSize?: number;
//     mimeType?: string;
//     processingTime?: number;
//   };
//   error?: string;
// }

// export interface Quiz {
//   id: string;
//   contentId: string;
//   title: string;
//   questions: QuizQuestion[];
//   metadata: {
//     estimatedTime: number;
//     language?: string;
//     difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
//   };
//   createdAt: string;
// }

// export interface QuizQuestion {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: number;
//   explanation: string;
// }

// export interface QuizScore {
//   total: number;
//   correct: number;
//   percentage: number;
//   completedAt: string;
// }

// export interface UploadProgress {
//   contentId: string;
//   stage: 'uploading' | 'analyzing' | 'extracting' | 'generating' | 'complete';
//   progress: number;
//   message: string;
// }

// // New interfaces for quiz taking functionality
// export interface QuizSession {
//   attempt: number;
//   quizId: string;
//   contentId: string;
//   currentQuestionIndex: number;
//   answers: { [questionIndex: number]: number };
//   startTime: string;
//   isCompleted: boolean;
//   timeRemaining?: number;
// }

// export interface QuizResult {
//   quizId: string;
//   contentId: string;
//   score: QuizScore;
//   answers: { [questionIndex: number]: number };
//   correctAnswers: { [questionIndex: number]: number };
//   explanations: { [questionIndex: number]: string };
//   completedAt: string;
// }

// interface ContentStore {
//   pollContentStatus(contentId: any): unknown;
//   // State
//   customContents: CustomContent[];
//   generatedQuizzes: Quiz[];
//   customQuizScores: { [contentId: string]: QuizScore };
//   uploadProgress: UploadProgress | null;
//   isUploading: boolean;
//   isGeneratingQuiz: boolean;
//   error: string | null;
//   isLoading: boolean;

//   // Quiz taking state
//   currentQuizSession: QuizSession | null;
//   currentQuiz: Quiz | null;
//   isLoadingQuiz: boolean;
//   quizResults: QuizResult[];

//   // Actions
//   uploadYouTube: (url: string, title?: string) => Promise<string>;
//   uploadFile: (file: File, title?: string) => Promise<string>;
//   generateQuiz: (contentId: string, questionCount?: number, difficulty?: string) => Promise<string>;
//   getContentStatus: (contentId: string) => Promise<void>;
//   getQuiz: (quizId: string) => Promise<Quiz | null>;
//   getUserContents: () => Promise<void>;
//   getUserQuizzes: () => Promise<void>;
//   removeContent: (contentId: string) => Promise<void>;
//   updateQuizScore: (contentId: string, score: QuizScore) => void;
//   clearError: () => void;
//   setUploadProgress: (progress: UploadProgress | null) => void;
//   initializeStore: () => Promise<void>;

//   // Quiz taking actions
//   startQuiz: (contentId: string) => Promise<boolean>;
//   startQuizById: (quizId: string) => Promise<boolean>;
//   answerQuestion: (questionIndex: number, answerIndex: number) => void;
//   nextQuestion: () => void;
//   previousQuestion: () => void;
//   submitQuiz: () => Promise<QuizResult | null>;
//   exitQuiz: () => void;
//   getQuizProgress: () => { current: number; total: number; percentage: number };

//   // Helper methods
//   getContentById: (id: string) => CustomContent | undefined;
//   getQuizByContentId: (contentId: string) => Quiz | undefined;
//   getQuizById: (quizId: string) => Quiz | undefined;
//   getCurrentQuestion: () => QuizQuestion | null;
//   isQuestionAnswered: (questionIndex: number) => boolean;
//   getQuestionAnswer: (questionIndex: number) => number | undefined;
// }

// // Use your existing API endpoint
// const API_BASE_URL = 'http://localhost:3001/api/content';

// // Configure axios defaults
// axios.defaults.withCredentials = true;

// // Utility function to make authenticated API calls
// const apiCall = async (endpoint: string, options: any = {}) => {
//   try {
//     const config = {
//       url: `${API_BASE_URL}${endpoint}`,
//       withCredentials: true,
//       ...options,
//     };

//     const response = await axios(config);
//     return response.data;
//   } catch (error: any) {
//     if (error.response?.data?.error) {
//       throw new Error(error.response.data.error);
//     }
//     throw new Error(error.message || 'Request failed');
//   }
// };

// export const useContentStore = create<ContentStore>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         // Initial state
//         customContents: [],
//         generatedQuizzes: [],
//         customQuizScores: {},
//         uploadProgress: null,
//         isUploading: false,
//         isGeneratingQuiz: false,
//         error: null,
//         isLoading: false,

//         // Quiz taking state
//         currentQuizSession: null,
//         currentQuiz: null,
//         isLoadingQuiz: false,
//         quizResults: [],

//         // Initialize store - fetch user data
//         initializeStore: async () => {
//           try {
//             set({ isLoading: true, error: null });
//             await Promise.all([
//               get().getUserContents(),
//               get().getUserQuizzes()
//             ]);
//           } catch (error) {
//             console.error('Failed to initialize content store:', error);
//             set({ error: error instanceof Error ? error.message : 'Failed to load data' });
//           } finally {
//             set({ isLoading: false });
//           }
//         },

//         // Upload YouTube video
//         uploadYouTube: async (url: string, title?: string) => {
//           try {
//             set({ isUploading: true, error: null });
            
//             // Set initial progress
//             const progressId = Date.now().toString();
//             set({
//               uploadProgress: {
//                 contentId: progressId,
//                 stage: 'uploading',
//                 progress: 10,
//                 message: 'Submitting YouTube URL...'
//               }
//             });

//             const response = await apiCall('/upload/youtube', {
//               method: 'POST',
//               data: {
//                 url,
//                 title: title || `YouTube Video - ${new Date().toLocaleDateString()}`
//               },
//             });

//             const contentId = response.contentId;

//             // Update progress
//             set({
//               uploadProgress: {
//                 contentId,
//                 stage: 'analyzing',
//                 progress: 30,
//                 message: 'Analyzing video content...'
//               }
//             });

//             // Add content to state
//             const newContent: CustomContent = {
//               id: contentId,
//               type: 'youtube',
//               title: title || `YouTube Video - ${new Date().toLocaleDateString()}`,
//               url,
//               uploadDate: new Date().toISOString(),
//               status: 'processing',
//             };

//             set(state => ({
//               customContents: [...state.customContents, newContent]
//             }));

//             // Start polling for status updates
//             get().pollContentStatus(contentId);

//             return contentId;
//           } catch (error) {
//             set({ 
//               error: error instanceof Error ? error.message : 'Upload failed',
//               isUploading: false,
//               uploadProgress: null
//             });
//             throw error;
//           }
//         },

//         // Upload file (PDF, image, video)
//         uploadFile: async (file: File, title?: string) => {
//           try {
//             set({ isUploading: true, error: null });

//             // Determine upload endpoint based on file type
//             let endpoint = '/upload/pdf';
//             let fileType: 'pdf' | 'image' | 'video' = 'pdf';
            
//             if (file.type.startsWith('image/')) {
//               endpoint = '/upload/image';
//               fileType = 'image';
//             } else if (file.type.startsWith('video/')) {
//               endpoint = '/upload/video';
//               fileType = 'video';
//             }

//             // Set initial progress
//             const progressId = Date.now().toString();
//             set({
//               uploadProgress: {
//                 contentId: progressId,
//                 stage: 'uploading',
//                 progress: 10,
//                 message: `Uploading ${file.name}...`
//               }
//             });

//             const formData = new FormData();
//             formData.append('file', file);
//             if (title) {
//               formData.append('title', title);
//             }

//             const response = await apiCall(endpoint, {
//               method: 'POST',
//               data: formData,
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//               },
//             });

//             const contentId = response.contentId;

//             // Update progress
//             set({
//               uploadProgress: {
//                 contentId,
//                 stage: 'analyzing',
//                 progress: 40,
//                 message: 'Analyzing file content...'
//               }
//             });

//             // Add content to state
//             const newContent: CustomContent = {
//               id: contentId,
//               type: fileType,
//               title: title || file.name,
//               fileName: file.name,
//               originalName: file.name,
//               uploadDate: new Date().toISOString(),
//               status: 'processing',
//               metadata: {
//                 fileSize: file.size,
//                 mimeType: file.type,
//               },
//             };

//             set(state => ({
//               customContents: [...state.customContents, newContent]
//             }));

//             // Start polling for status updates
//             get().pollContentStatus(contentId);

//             return contentId;
//           } catch (error) {
//             set({ 
//               error: error instanceof Error ? error.message : 'Upload failed',
//               isUploading: false,
//               uploadProgress: null
//             });
//             throw error;
//           }
//         },

//         // Generate quiz from content
//         generateQuiz: async (contentId: string, questionCount = 5, difficulty = 'mixed') => {
//           try {
//             set({ isGeneratingQuiz: true, error: null });

//             // Update progress
//             set({
//               uploadProgress: {
//                 contentId,
//                 stage: 'generating',
//                 progress: 80,
//                 message: 'Generating quiz questions...'
//               }
//             });

//             const response = await apiCall('/generate-quiz', {
//               method: 'POST',
//               data: {
//                 contentId,
//                 questionCount,
//                 difficulty,
//               },
//             });

//             const quizId = response.quiz.id;

//             // Get the full quiz data
//             const quiz = await get().getQuiz(quizId);
//             if (quiz) {
//               set(state => ({
//                 generatedQuizzes: [...state.generatedQuizzes, quiz]
//               }));
//             }

//             // Update content status
//             set(state => ({
//               customContents: state.customContents.map(content =>
//                 content.id === contentId
//                   ? { ...content, quizGenerated: true, status: 'ready' }
//                   : content
//               ),
//               uploadProgress: {
//                 contentId,
//                 stage: 'complete',
//                 progress: 100,
//                 message: 'Quiz generated successfully!'
//               }
//             }));

//             // Clear progress after a short delay
//             setTimeout(() => {
//               set({ uploadProgress: null, isGeneratingQuiz: false });
//             }, 2000);

//             return quizId;
//           } catch (error) {
//             set({ 
//               error: error instanceof Error ? error.message : 'Quiz generation failed',
//               isGeneratingQuiz: false,
//               uploadProgress: null
//             });
//             throw error;
//           }
//         },

//         // Poll content status
//         pollContentStatus: async (contentId: string) => {
//           const maxAttempts = 30; // 5 minutes with 10-second intervals
//           let attempts = 0;

//           const poll = async (): Promise<void> => {
//             try {
//               if (attempts >= maxAttempts) {
//                 set(state => ({
//                   customContents: state.customContents.map(content =>
//                     content.id === contentId
//                       ? { ...content, status: 'failed', error: 'Processing timeout' }
//                       : content
//                   ),
//                   uploadProgress: null,
//                   isUploading: false
//                 }));
//                 return;
//               }

//               await get().getContentStatus(contentId);
//               const content = get().getContentById(contentId);

//               if (content?.status === 'ready') {
//                 // Update progress
//                 set({
//                   uploadProgress: {
//                     contentId,
//                     stage: 'extracting',
//                     progress: 70,
//                     message: 'Content processed successfully!'
//                   }
//                 });

//                 // Auto-generate quiz
//                 await get().generateQuiz(contentId);
//                 set({ isUploading: false });
//                 return;
//               } else if (content?.status === 'failed') {
//                 set({ 
//                   uploadProgress: null,
//                   isUploading: false,
//                   error: content.error || 'Content processing failed'
//                 });
//                 return;
//               }

//               attempts++;
//               setTimeout(() => poll(), 10000); // Poll every 10 seconds
//             } catch (error) {
//               console.error('Polling error:', error);
//               attempts++;
//               if (attempts < maxAttempts) {
//                 setTimeout(() => poll(), 10000);
//               } else {
//                 set({ 
//                   uploadProgress: null,
//                   isUploading: false,
//                   error: 'Processing timeout'
//                 });
//               }
//             }
//           };

//           poll();
//         },

//         // Get content status
//         getContentStatus: async (contentId: string) => {
//           try {
//             const response = await apiCall(`/content/${contentId}/status`);
            
//             set(state => ({
//               customContents: state.customContents.map(content =>
//                 content.id === contentId
//                   ? {
//                       ...content,
//                       status: response.status === 'completed' ? 'ready' : response.status,
//                       quizGenerated: response.quizGenerated,
//                       language: response.language,
//                       error: response.error,
//                     }
//                   : content
//               )
//             }));
//           } catch (error) {
//             console.error('Failed to get content status:', error);
//           }
//         },

//         // Get quiz by ID
//         getQuiz: async (quizId: string) => {
//           try {
//             const response = await apiCall(`/quiz/${quizId}`);
//             return {
//               id: response._id,
//               contentId: response.contentId,
//               title: response.title,
//               questions: response.questions,
//               metadata: response.metadata,
//               createdAt: response.createdAt,
//             } as Quiz;
//           } catch (error) {
//             console.error('Failed to get quiz:', error);
//             return null;
//           }
//         },

//         // Get user contents
//         getUserContents: async () => {
//           try {
//             const response = await apiCall('/content');
            
//             const contents: CustomContent[] = response.contents.map((content: any) => ({
//               id: content._id,
//               type: content.type,
//               title: content.title,
//               originalName: content.originalName,
//               fileName: content.originalName,
//               url: content.url,
//               uploadDate: content.createdAt,
//               status: content.status === 'completed' ? 'ready' : content.status,
//               quizGenerated: content.quizGenerated,
//               language: content.language,
//               metadata: content.metadata,
//               extractedText: content.extractedText,
//               translatedText: content.translatedText,
//               error: content.error,
//             }));

//             set({ customContents: contents });
//           } catch (error) {
//             console.error('Failed to get user contents:', error);
//             set({ error: 'Failed to load content' });
//           }
//         },

//         // Get user quizzes
//         getUserQuizzes: async () => {
//           try {
//             const response = await apiCall('/quizzes');
            
//             const quizzes: Quiz[] = response.quizzes.map((quiz: any) => ({
//               id: quiz.id,
//               contentId: quiz.content?._id || '',
//               title: quiz.title,
//               questions: [], // Questions loaded separately when needed
//               metadata: quiz.metadata,
//               createdAt: quiz.createdAt,
//             }));

//             set({ generatedQuizzes: quizzes });
//           } catch (error) {
//             console.error('Failed to get user quizzes:', error);
//             set({ error: 'Failed to load quizzes' });
//           }
//         },

//         // Remove content
//         removeContent: async (contentId: string) => {
//           try {
//             await apiCall(`/content/${contentId}`, {
//               method: 'DELETE',
//             });

//             set(state => ({
//               customContents: state.customContents.filter(content => content.id !== contentId),
//               generatedQuizzes: state.generatedQuizzes.filter(quiz => quiz.contentId !== contentId),
//               customQuizScores: Object.fromEntries(
//                 Object.entries(state.customQuizScores).filter(([key]) => key !== contentId)
//               ),
//             }));
//           } catch (error) {
//             set({ error: error instanceof Error ? error.message : 'Failed to remove content' });
//             throw error;
//           }
//         },

//         // Update quiz score
//         updateQuizScore: (contentId: string, score: QuizScore) => {
//           set(state => ({
//             customQuizScores: {
//               ...state.customQuizScores,
//               [contentId]: score,
//             },
//           }));
//         },

//         // Clear error
//         clearError: () => {
//           set({ error: null });
//         },

//         // Set upload progress
//         setUploadProgress: (progress: UploadProgress | null) => {
//           set({ uploadProgress: progress });
//         },

//         // Quiz taking functionality
//         startQuiz: async (contentId: string) => {
//           try {
//             set({ isLoadingQuiz: true, error: null });

//             // Find the quiz for this content
//             const quiz = get().getQuizByContentId(contentId);
//             if (!quiz) {
//               throw new Error('No quiz found for this content');
//             }

//             // Load full quiz data if questions are empty
//             let fullQuiz = quiz;
//             if (quiz.questions.length === 0) {
//               const loadedQuiz = await get().getQuiz(quiz.id);
//               if (!loadedQuiz) {
//                 throw new Error('Failed to load quiz data');
//               }
//               fullQuiz = loadedQuiz;
//             }

//             // Create quiz session
//             const session: QuizSession = {
//               quizId: fullQuiz.id,
//               contentId,
//               currentQuestionIndex: 0,
//               answers: {},
//               startTime: new Date().toISOString(),
//               isCompleted: false,
//             };

//             set({
//               currentQuizSession: session,
//               currentQuiz: fullQuiz,
//               isLoadingQuiz: false,
//             });

//             return true;
//           } catch (error) {
//             set({ 
//               error: error instanceof Error ? error.message : 'Failed to start quiz',
//               isLoadingQuiz: false 
//             });
//             return false;
//           }
//         },

//         startQuizById: async (quizId: string) => {
//           try {
//             set({ isLoadingQuiz: true, error: null });

//             // Load full quiz data
//             const quiz = await get().getQuiz(quizId);
//             if (!quiz) {
//               throw new Error('Quiz not found');
//             }

//             // Create quiz session
//             const session: QuizSession = {
//               quizId: quiz.id,
//               contentId: quiz.contentId,
//               currentQuestionIndex: 0,
//               answers: {},
//               startTime: new Date().toISOString(),
//               isCompleted: false,
//             };

//             set({
//               currentQuizSession: session,
//               currentQuiz: quiz,
//               isLoadingQuiz: false,
//             });

//             return true;
//           } catch (error) {
//             set({ 
//               error: error instanceof Error ? error.message : 'Failed to start quiz',
//               isLoadingQuiz: false 
//             });
//             return false;
//           }
//         },

//         answerQuestion: (questionIndex: number, answerIndex: number) => {
//           set(state => {
//             if (!state.currentQuizSession) return state;

//             return {
//               currentQuizSession: {
//                 ...state.currentQuizSession,
//                 answers: {
//                   ...state.currentQuizSession.answers,
//                   [questionIndex]: answerIndex,
//                 },
//               },
//             };
//           });
//         },

//         nextQuestion: () => {
//           set(state => {
//             if (!state.currentQuizSession || !state.currentQuiz) return state;

//             const nextIndex = state.currentQuizSession.currentQuestionIndex + 1;
//             if (nextIndex >= state.currentQuiz.questions.length) return state;

//             return {
//               currentQuizSession: {
//                 ...state.currentQuizSession,
//                 currentQuestionIndex: nextIndex,
//               },
//             };
//           });
//         },

//         previousQuestion: () => {
//           set(state => {
//             if (!state.currentQuizSession) return state;

//             const prevIndex = state.currentQuizSession.currentQuestionIndex - 1;
//             if (prevIndex < 0) return state;

//             return {
//               currentQuizSession: {
//                 ...state.currentQuizSession,
//                 currentQuestionIndex: prevIndex,
//               },
//             };
//           });
//         },

//         submitQuiz: async () => {
//           try {
//             const { currentQuizSession, currentQuiz } = get();
//             if (!currentQuizSession || !currentQuiz) {
//               throw new Error('No active quiz session');
//             }

//             // Calculate score
//             let correct = 0;
//             const total = currentQuiz.questions.length;
//             const correctAnswers: { [questionIndex: number]: number } = {};
//             const explanations: { [questionIndex: number]: string } = {};

//             currentQuiz.questions.forEach((question, index) => {
//               correctAnswers[index] = question.correctAnswer;
//               explanations[index] = question.explanation;
              
//               if (currentQuizSession.answers[index] === question.correctAnswer) {
//                 correct++;
//               }
//             });

//             const percentage = Math.round((correct / total) * 100);
//             const completedAt = new Date().toISOString();

//             const score: QuizScore = {
//               total,
//               correct,
//               percentage,
//               completedAt,
//             };

//             const result: QuizResult = {
//               quizId: currentQuizSession.quizId,
//               contentId: currentQuizSession.contentId,
//               score,
//               answers: currentQuizSession.answers,
//               correctAnswers,
//               explanations,
//               completedAt,
//             };

//             // Update quiz score in store
//             get().updateQuizScore(currentQuizSession.contentId, score);

//             // Mark session as completed
//             set(state => ({
//               currentQuizSession: state.currentQuizSession ? {
//                 ...state.currentQuizSession,
//                 isCompleted: true,
//               } : null,
//               quizResults: [...state.quizResults, result],
//             }));

//             return result;
//           } catch (error) {
//             set({ error: error instanceof Error ? error.message : 'Failed to submit quiz' });
//             return null;
//           }
//         },

//         exitQuiz: () => {
//           set({
//             currentQuizSession: null,
//             currentQuiz: null,
//           });
//         },

//         getQuizProgress: () => {
//           const { currentQuizSession, currentQuiz } = get();
//           if (!currentQuizSession || !currentQuiz) {
//             return { current: 0, total: 0, percentage: 0 };
//           }

//           const current = currentQuizSession.currentQuestionIndex + 1;
//           const total = currentQuiz.questions.length;
//           const percentage = Math.round((current / total) * 100);

//           return { current, total, percentage };
//         },

//         // Helper methods
//         getContentById: (id: string) => {
//           return get().customContents.find(content => content.id === id);
//         },

//         getQuizByContentId: (contentId: string) => {
//           return get().generatedQuizzes.find(quiz => quiz.contentId === contentId);
//         },

//         getQuizById: (quizId: string) => {
//           return get().generatedQuizzes.find(quiz => quiz.id === quizId);
//         },

//         getCurrentQuestion: () => {
//           const { currentQuizSession, currentQuiz } = get();
//           if (!currentQuizSession || !currentQuiz) return null;

//           return currentQuiz.questions[currentQuizSession.currentQuestionIndex] || null;
//         },

//         isQuestionAnswered: (questionIndex: number) => {
//           const { currentQuizSession } = get();
//           if (!currentQuizSession) return false;

//           return questionIndex in currentQuizSession.answers;
//         },

//         getQuestionAnswer: (questionIndex: number) => {
//           const { currentQuizSession } = get();
//           if (!currentQuizSession) return undefined;

//           return currentQuizSession.answers[questionIndex];
//         },
//       }),
//       {
//         name: 'content-store',
//         partialize: (state) => ({
//           customContents: state.customContents,
//           generatedQuizzes: state.generatedQuizzes,
//           customQuizScores: state.customQuizScores,
//           quizResults: state.quizResults,
//         }),
//       }
//     ),
//     { name: 'content-store' }
//   )
// );

// // Hook for easier access to store actions
// export const useContentActions = () => {
//   const {
//     uploadYouTube,
//     uploadFile,
//     generateQuiz,
//     getContentStatus,
//     getQuiz,
//     getUserContents,
//     getUserQuizzes,
//     removeContent,
//     updateQuizScore,
//     clearError,
//     setUploadProgress,
//     initializeStore,
//     startQuiz,
//     startQuizById,
//     answerQuestion,
//     nextQuestion,
//     previousQuestion,
//     submitQuiz,
//     exitQuiz,
//   } = useContentStore();

//   return {
//     uploadYouTube,
//     uploadFile,
//     generateQuiz,
//     getContentStatus,
//     getQuiz,
//     getUserContents,
//     getUserQuizzes,
//     removeContent,
//     updateQuizScore,
//     clearError,
//     setUploadProgress,
//     initializeStore,
//     startQuiz,
//     startQuizById,
//     answerQuestion,
//     nextQuestion,
//     previousQuestion,
//     submitQuiz,
//     exitQuiz,
//   };
// };

// // Selectors for better performance
// export const useCustomContents = () => useContentStore(state => state.customContents);
// export const useGeneratedQuizzes = () => useContentStore(state => state.generatedQuizzes);
// export const useCustomQuizScores = () => useContentStore(state => state.customQuizScores);
// export const useUploadProgress = () => useContentStore(state => state.uploadProgress);
// export const useIsUploading = () => useContentStore(state => state.isUploading);
// export const useIsGeneratingQuiz = () => useContentStore(state => state.isGeneratingQuiz);
// export const useContentError = () => useContentStore(state => state.error);
// export const useContentLoading = () => useContentStore(state => state.isLoading);

// // Quiz taking selectors
// export const useCurrentQuizSession = () => useContentStore(state => state.currentQuizSession);
// export const useCurrentQuiz = () => useContentStore(state => state.currentQuiz);
// export const useIsLoadingQuiz = () => useContentStore(state => state.isLoadingQuiz);
// export const useQuizResults = () => useContentStore(state => state.quizResults);
// export const useCurrentQuestion = () => useContentStore(state => state.getCurrentQuestion());
// export const useQuizProgress = () => useContentStore(state => state.getQuizProgress());

// // Helper hooks
// export const useQuizActions = () => {
//   const {
//     startQuiz,
//     startQuizById,
//     answerQuestion,
//     nextQuestion,
//     previousQuestion,
//     submitQuiz,
//     exitQuiz,
//   } = useContentActions();

//   const currentSession = useCurrentQuizSession();
//   const currentQuestion = useCurrentQuestion();
//   const progress = useQuizProgress();
//   const isLoadingQuiz = useIsLoadingQuiz();

//   const isQuestionAnswered = useContentStore(state => 
//     currentSession ? state.isQuestionAnswered(currentSession.currentQuestionIndex) : false
//   );

//   const currentAnswer = useContentStore(state => 
//     currentSession ? state.getQuestionAnswer(currentSession.currentQuestionIndex) : undefined
//   );

//   const canGoNext = currentSession && progress.current < progress.total;
//   const canGoPrevious = currentSession && currentSession.currentQuestionIndex > 0;
//   const canSubmit = currentSession && progress.current === progress.total;

//   return {
//     // Actions
//     startQuiz,
//     startQuizById,
//     answerQuestion,
//     nextQuestion,
//     previousQuestion,
//     submitQuiz,
//     exitQuiz,
    
//     // State
//     currentSession,
//     currentQuestion,
//     progress,
//     isLoadingQuiz,
//     isQuestionAnswered,
//     currentAnswer,
    
//     // Computed
//     canGoNext,
//     canGoPrevious,
//     canSubmit,
//   };
// };

// // Hook for file upload with automatic type detection
// export const useFileUpload = () => {
//   const { uploadFile } = useContentActions();

//   const uploadFileWithType = async (file: File, title?: string) => {
//     if (file.type === 'application/pdf') {
//       return uploadFile(file, title);
//     } else if (file.type.startsWith('image/')) {
//       return uploadFile(file, title);
//     } else if (file.type.startsWith('video/')) {
//       return uploadFile(file, title);
//     } else {
//       throw new Error('Unsupported file type');
//     }
//   };

//   return { uploadFile: uploadFileWithType };
// };