import type { CustomContent, Topic, UploadProgress, QuizState, QuizScore, QuizAttempt, Quiz } from "@/interface/types";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist, devtools, subscribeWithSelector } from "zustand/middleware";
import { useUserStore } from "./useUserStore";

// const API_END_POINT = "https://food-app-yt.onrender.com/api/v1/restaurant";
const API_END_POINT = "http://localhost:3001/api/topic";
axios.defaults.withCredentials = true;



interface TopicStore {
    // State
    loading: boolean;
    topics: Topic[];
    isInitialized: boolean;
    currentQuiz: QuizState | null;
    userStreak: number;
    lastActivityDate: string | null;
    quizAttempts: { [quizId: string]: QuizAttempt[] };
    quizHistory: QuizState[];

    quizzes: Quiz[];
    quizScores: { [contentId: string]: QuizScore };
    customContents: CustomContent[];
    uploadProgress: { [contentId: string]: UploadProgress };

    initializeTopics: () => void;
    initializeAttempts: () => void;
    initializeCustomContents: () => Promise<void>;
    resetUserData: () => void;
    updateStreak: () => void;

    startTopicQuiz: (topicId: string, questions: any[]) => void;
    retakeTopicQuiz: (topicId: string, attemptId?: string) => void;

    updateTopicStatus: (topicId: string, score: number) => void;
    getTopicStatus: (topic: Topic) => 'mastered' | 'in-progress' | 'ready' | 'locked';
    getTopicAttempts: (topicId: string) => QuizAttempt[];

    answerQuestion: (answerIndex: number) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    completeQuiz: () => void;
    closeQuiz: () => void;
    navigateToQuestion: (questionIndex: number) => void;

    reviewAttempt: (attemptId: string) => QuizAttempt | null;

    uploadContent: (file: File, type: 'pdf' | 'image' | 'video', title?: string) => Promise<string>;
    uploadYouTube: (url: string, title: string) => Promise<string>;
    deleteContent: (contentId: string) => Promise<void>;

    generatePrerequisites: (contentId: string) => Promise<void>;
    generateQuiz: (contentId: string, questionCount?: number, difficulty?: 'easy' | 'medium' | 'hard' | 'mixed',) => Promise<string>;
    getQuizAttempts: (quizId: string) => QuizAttempt[];
    startCustomQuiz: (contentId: string) => Promise<void>;

}


//Checks if both dates are on the same calendar day
const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString();
};

// Checks if date2 is exactly 1 day after date1
const isConsecutiveDay = (date1: Date, date2: Date): boolean => {
    const d1 = new Date(date1.toDateString());
    const d2 = new Date(date2.toDateString());
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays === 1;
};


export const useUserTopicsStore = create<TopicStore>()(
    devtools(
        persist(
            subscribeWithSelector((set, get) => ({
                loading: false,
                topics: [],
                isInitialized: false,
                currentQuiz: null,
                userStreak: 0,
                lastActivityDate: null,
                quizAttempts: {},
                quizHistory: [],
                customContents: [],
                uploadProgress: {},
                quizzes: [],
                quizScores: {},

                // Initialize topics
                initializeTopics: async () => {
                    if (get().isInitialized) return;
                    try {
                        get().updateStreak();
                        const response = await axios.get(`${API_END_POINT}/`);

                        console.log("Fetched topics:", response);
                        if (response.data.success) {
                            set({
                                loading: false,
                                topics: response.data.topics,
                                // isInitialized: true,
                            });
                        }
                    } catch (error: any) {
                        console.error("Error initializing topics:", error);
                        toast.error(error.response.data.message || "Failed to initialize topics");
                        set({
                            loading: false,
                            topics: [],
                            // isInitialized: true,
                        })
                    }
                },
                initializeAttempts: async () => {
                    if (get().isInitialized) return;
                    try {
                        const res = await axios.get(`${API_END_POINT}/getUserAttempts`);
                        if (res.data.success) {
                            set({ quizAttempts: res.data.quizAttempts });
                        }
                    } catch (error) {
                        console.error("Error loading attempts:", error);
                        toast.error("Something went wrong loading attempts");
                    }
                },
                initializeCustomContents: async () => {
                    if (get().isInitialized) return;
                    try {
                        set({ loading: true });

                        const response = await axios.get("http://localhost:3001/api/content/content", {
                            params: {
                                page: 1,
                                limit: 50, // adjust limit as needed
                            },
                        });

                        if (response.data.success) {
                            const contents = response.data.contents;

                            // Map server content into CustomContent type if needed
                            const formattedContents: CustomContent[] = contents.map((content: any) => ({
                                id: content._id,
                                type: content.type,
                                title: content.title,
                                fileName: content.fileName || content.title,
                                originalName: content.title,
                                uploadDate: content.createdAt,
                                status: content.status,
                                metadata: content.metadata,
                                language: content.language,
                                quizGenerated: true,
                            }));

                            set({
                                customContents: formattedContents,
                                loading: false,
                                isInitialized: true,
                            });
                        } else {
                            set({ loading: false });
                        }
                    } catch (error: any) {
                        console.error("Error initializing custom contents:", error);
                        toast.error("Error loading contents");
                        set({ loading: false, isInitialized: true, });
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
                        topics: [],
                        userStreak: 0,
                        lastActivityDate: null,
                        // lastSyncTime: 0,
                        isInitialized: false
                    });
                },
                updateStreak: async () => {
                    const today = new Date();
                    const todayStr = today.toISOString();
                    const { user } = useUserStore.getState();

                    if (!user) {
                        return;
                    }

                    let streak = user.stats.streak || 0;
                    const last = user.stats.lastActivity ? new Date(user.stats.lastActivity) : null;

                    // If no last activity ever
                    if (!last) {
                        const newStreak = 1;
                        set({
                            userStreak: newStreak,
                            lastActivityDate: todayStr,
                        });

                        await axios.put("http://localhost:3001/api/auth/profile/streak", {
                            streak: newStreak,
                            lastActivityDate: todayStr,
                        });
                      
                        return;
                    }

                    // Same day already logged — no need to update
                    if (isSameDay(today, last)) {
                        return;
                    }

                    // Consecutive day
                    if (isConsecutiveDay(last, today)) {
                        const newStreak = streak + 1;
                        set({
                            userStreak: newStreak,
                            lastActivityDate: todayStr,
                        });

                        await axios.put("http://localhost:3001/api/auth/profile/streak", {
                            streak: newStreak,
                            lastActivityDate: todayStr,
                        });
                      

                        return;
                    }

                    // Missed a day — reset streak
                    const resetStreak = 1;
                    set({
                        userStreak: resetStreak,
                        lastActivityDate: todayStr,
                    });

                    await axios.put("http://localhost:3001/api/auth/profile/streak", {
                        streak: resetStreak,
                        lastActivityDate: todayStr,
                    });

                },




                startTopicQuiz: (topicId: string, questions: any[]) => {

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
                updateTopicStatus: async (topicId: string, score: number) => {
                    const newStatus = score >= 80 ? 'mastered' : 'in-progress';
                    const lastAttempt = new Date()
                    const response = await axios.put(`${API_END_POINT}/${topicId}/progress`, { score, newStatus, lastAttempt });
                    const updatedTopic = response.data.topic;
                    set(state => ({
                        topics: state.topics.map(topic =>
                            topic.id === topicId
                                ? {
                                    ...topic,
                                    score: updatedTopic.score,
                                    bestScore: updatedTopic.bestScore,
                                    status: updatedTopic.status,
                                    attempts: updatedTopic.attempts,
                                    lastAttempt: updatedTopic.lastAttempt
                                }
                                : topic
                        )
                    }));

                    // Update streak
                    get().updateStreak();

                    //update attempt
                    get().initializeAttempts();

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

                completeQuiz: async () => {
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
                        attemptId: completedQuiz.id!,
                        topicId: currentQuiz.topicId || currentQuiz.contentId!,
                        questions: completedQuiz.questions,
                        userAnswers: completedQuiz.userAnswers,
                        score: completedQuiz.score,
                        correctAnswers,
                        totalQuestions: completedQuiz.questions.length,
                        timeStarted: completedQuiz.timeStarted,
                        timeCompleted: completedQuiz.timeCompleted!,
                        timeTaken: Math.round((completedQuiz.timeCompleted!.getTime() - completedQuiz.timeStarted.getTime()) / 1000),
                        isRetake: completedQuiz.isRetake || false,
                        originalAttemptId: completedQuiz.originalAttemptId,
                        id: ""
                    };


                    //store in database 
                    try {
                        await axios.post(`${API_END_POINT}/createAttempt`, attempt);
                    }
                    catch (error) {
                        toast.error("unable to store attempt");
                    }
                    // Update topic status if it's a topic quiz
                    if (completedQuiz.topicId) {
                        get().updateTopicStatus(completedQuiz.topicId, score);
                    }
                    else {
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
                getTopicAttempts: (topicId: string) => {
                    return get().quizAttempts[topicId] || [];
                },
                reviewAttempt: (attemptId: string) => {
                    const attempts = Object.values(get().quizAttempts).flat();
                    return attempts.find(attempt => attempt.attemptId === attemptId) || null;
                },
                // Upload Actions - Real backend integration
                uploadContent: async (file: File, type: 'pdf' | 'image' | 'video', title?: string): Promise<string> => {
                    const tempId = Date.now().toString();

                    try {
                        set({ loading: true });

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
                        const formData = new FormData();
                        formData.append('file', file);
                        switch (type) {
                            case 'pdf': {
                                const response = await axios.post('http://localhost:3001/api/content/upload/pdf', formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                result = response.data;
                                break;
                            }
                            case 'image': {
                                // result = await apiService.uploadImage(file, fileTitle);
                                const response = await axios.post('http://localhost:3001/api/content/upload/image', formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                result = response.data;
                                break;
                            }
                            case 'video': {
                                // result = await apiService.uploadVideo(file, fileTitle);
                                const response = await axios.post('http://localhost:3001/api/content/upload/video', formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                result = response.data;
                                break;
                            }
                            default:
                                throw new Error('Unsupported file type');
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
                            loading: false,
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
                            loading: false,

                        }));
                        toast.error(error instanceof Error ? error.message : 'Upload failed')
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
                        set({ loading: true });

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
                        // const result = await apiService.uploadYoutube(url, title);
                        const response = await axios.post('http://localhost:3001/api/content/upload/youtube', { url, title });
                        const result = response.data;
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
                            loading: false
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
                            loading: false,
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
                deleteContent: async (contentId: string) => {
                    try {
                        // await apiService.deleteContent(contentId);
                        await axios.delete(`http://localhost:3001/api/content/content/${contentId}`);
                        set(state => ({
                            customContents: state.customContents.filter(content => content.id !== contentId),
                            quizzes: state.quizzes.filter(quiz => quiz.contentId !== contentId),
                            quizAttempts: Object.fromEntries(
                                Object.entries(state.quizAttempts).filter(([key]) => !key.startsWith(contentId))
                            )
                        }));
                    } catch (error) {

                        throw error;
                    }
                },
                generatePrerequisites: async (contentId: string) => {
                    const state = get();
                    const content = state.customContents.find(c => c.id === contentId);

                    if (!content) throw new Error("Content not found");

                    // ✅ Prevent regeneration if already present
                    if (content.prerequisites?.length || content.resources?.length) return;

                    set(state => ({
                        uploadProgress: {
                            ...state.uploadProgress,
                            [contentId]: {
                                contentId,
                                progress: 50,
                                stage: "generating",
                                message: "Generating prerequisites...",
                            },
                        },
                    }));

                    try {
                        const res = await axios.post("http://localhost:3001/api/content/generate-prerequisites", {
                            contentId,
                        });

                        const { prerequisites, resources } = res.data;

                        set(state => ({
                            customContents: state.customContents.map(c =>
                                c.id === contentId ? { ...c, prerequisites, resources } : c
                            ),
                            uploadProgress: {
                                ...state.uploadProgress,
                                [contentId]: {
                                    contentId,
                                    progress: 100,
                                    stage: "completed",
                                    message: "Prerequisites ready",
                                },
                            },
                        }));

                        setTimeout(() => {
                            set(state => {
                                const newProgress = { ...state.uploadProgress };
                                delete newProgress[contentId];
                                return { uploadProgress: newProgress };
                            });
                        }, 3000);

                    } catch (err) {
                        console.error("Failed to generate prerequisites:", err);
                        throw err;
                    }
                },

                generateQuiz: async (contentId: string, questionCount = 5): Promise<string> => {
                    set({ loading: true });

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
                        // await apiService.generateQuiz(contentId, questionCount);
                        const difficulty = 'mixed';
                        await axios.post('http://localhost:3001/api/content/generate-quiz', {
                            contentId,
                            questionCount,
                            difficulty,

                        });

                        // // Fetch the actual quiz data from backend
                        // const quizData = await apiService.getQuiz(contentId);
                        const response = await axios.get(`http://localhost:3001/api/content/quiz/${contentId}`);
                        const quizData = response.data;

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
                            loading: false
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
                        set({ loading: false });
                        throw error;
                    }
                },
                startCustomQuiz: async (contentId: string) => {
                    try {
                        set({ loading: true });

                        // Find the content
                        const content = get().customContents.find(c => c.id === contentId);
                        if (!content) {
                            throw new Error('Content not found');
                        }

                        // Find the most recent quiz for this content
                        let quiz = get().quizzes
                            .filter(q => q.contentId === contentId)
                            .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0];
                        // let quiz = get().quizzes.find(q => q.contentId === contentId);
                        if (!quiz) {
                            // quiz = await apiService.getQuiz(contentId);
                            const response = await axios.get(`http://localhost:3001/api/content/quiz/${contentId}`);
                            quiz = response.data;
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

                        set({ currentQuiz: newQuiz, loading: false });



                    } catch (error) {
                        set({ loading: false });
                        throw error;
                    }
                },
                getQuizAttempts: (contentId: string) => {
                    // const attempts = get().quizAttempts[contentId] || [];

                    // return attempts
                    //     .slice()
                    //     .sort((a, b) => new Date(a.timeCompleted).getTime() - new Date(b.timeCompleted).getTime());
                    return get().quizAttempts[contentId] || [];
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
                    //   lastSyncTime: state.lastSyncTime,
                    userStreak: state.userStreak,
                    lastActivityDate: state.lastActivityDate,
                    isInitialized: state.isInitialized
                }),
            }),
        {
            name: 'Topic Store',
            storage: createJSONStorage(() => localStorage)
        }));


// Add timer functionality
let timerInterval: NodeJS.Timeout | null = null;

useUserTopicsStore.subscribe(
    (state) => state.currentQuiz,
    (currentQuiz) => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        if (currentQuiz && !currentQuiz.isCompleted && currentQuiz.timeRemaining > 0) {
            timerInterval = setInterval(() => {
                const state = useUserTopicsStore.getState();
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
                    useUserTopicsStore.setState({
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
    const store = useUserTopicsStore.getState();

    // Only initialize if not already done
    if (!store.isInitialized) {
        store.initializeTopics();
        store.initializeCustomContents();
        store.initializeAttempts();
    }
}