// const simulateQuizGeneration = async (
//   contentType: 'youtube' | 'pdf' | 'image' | 'topic-quiz' | 'custom-quiz',
//   options: {
//     fileName?: string;
//     topicName?: string;
//     action?: 'start' | 'continue' | 'retake';
//     contentId?: string;
//     prompt?: string;
//   } = {}
// ): Promise<void> => {
//   setCurrentProcessingContent({ 
//     type: contentType, 
//     fileName: options.fileName,
//     topicName: options.topicName,
//     action: options.action
//   });
//   setShowQuizLoader(true);
//   setQuizLoaderStage('analyzing');

//   try {
//     // Step 1: Analyzing (short simulated delay)
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setQuizLoaderStage('extracting');

//     // Step 2: Extracting (short simulated delay)
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setQuizLoaderStage('generating');

//     // Step 3: Real backend call for quiz generation
//     const startTime = Date.now();
    
//     let response;
//     if (contentType === 'topic-quiz') {
//       response = await fetch('/api/quiz/topic', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           topicName: options.topicName,
//           questionCount: 10
//         })
//       });
//     } else if (contentType === 'custom-quiz') {
//       response = await fetch('/api/quiz/custom', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           prompt: options.prompt,
//           questionCount: 10
//         })
//       });
//     } else {
//       // General content-based quiz (PDF, image, YouTube)
//       response = await fetch('/api/generate-quiz', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contentId: options.contentId,
//           questionCount: 10,
//           difficulty: 'mixed'
//         })
//       });
//     }

//     const endTime = Date.now();
//     const backendDuration = endTime - startTime;

//     // Ensure minimum time for visual effect
//     const minimumGenerateTime = 2000;
//     if (backendDuration < minimumGenerateTime) {
//       await new Promise(resolve => setTimeout(resolve, minimumGenerateTime - backendDuration));
//     }

//     // Step 4: Completion
//     setQuizLoaderStage('complete');
//     await new Promise(resolve => setTimeout(resolve, 800));

//   } catch (error) {
//     console.error('Quiz generation failed:', error);
//     // Optional: Handle error state or show fallback UI
//   } finally {
//     setShowQuizLoader(false);
//     setCurrentProcessingContent(null);
//   }
// };












// const simulateQuizGeneration = async (
//   contentType: 'youtube' | 'pdf' | 'image' | 'topic-quiz' | 'custom-quiz',
//   options: {
//     fileName?: string;
//     topicName?: string;
//     action?: 'start' | 'continue' | 'retake';
//   } = {}
// ): Promise<void> => {
//   setCurrentProcessingContent({ 
//     type: contentType, 
//     fileName: options.fileName,
//     topicName: options.topicName,
//     action: options.action
//   });
//   setShowQuizLoader(true);
  
//   try {
//     // Stage 1: Analyzing
//     setQuizLoaderStage('analyzing');
//     const analyzeResponse = await axios.post('/api/quiz/analyze', {
//       contentType,
//       ...options
//     });
    
//     // Stage 2: Extracting
//     setQuizLoaderStage('extracting');
//     const extractResponse = await axios.post('/api/quiz/extract', {
//       contentType,
//       ...options
//     });
    
//     // Stage 3: Generating
//     setQuizLoaderStage('generating');
//     const generateResponse = await axios.post('/api/quiz/generate', {
//       contentType,
//       ...options
//     });
    
//     const quizData = generateResponse.data;
    
//     // Stage 4: Complete
//     setQuizLoaderStage('complete');
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     // Handle the generated quiz data here
//     // setQuizData(quizData);
    
//   } catch (error) {
//     console.error('Quiz generation failed:', error);
//     // Handle error state
//   } finally {
//     setShowQuizLoader(false);
//     setCurrentProcessingContent(null);
//   }
// };




//QuizModal

// import React from 'react';
// import { X, Timer } from 'lucide-react';
// import type { QuizState } from '../interface/types';

// interface QuizModalProps {
//   quiz: QuizState;
//   onAnswer: (answerIndex: number) => void;
//   onNext: () => void;
//   onPrevious: () => void;
//   onClose: () => void;
//   title: string;
// }

// const QuizModal: React.FC<QuizModalProps> = ({
//   quiz,
//   onAnswer,
//   onNext,
//   onPrevious,
//   onClose,
//   title
// }) => {
//   const formatTime = (seconds: number): string => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const currentQuestion = quiz.questions[quiz.currentQuestionIndex];

//   return (
//     <div className="fixed inset-0 bg-white z-50 flex flex-col">
//       {/* Quiz Header */}
//       <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-lg md:text-2xl font-bold text-gray-900">{title}</h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Question {quiz.currentQuestionIndex + 1} of {quiz.questions.length}
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Timer */}
//             <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
//               quiz.timeRemaining <= 60 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
//             }`}>
//               <Timer className="w-5 h-5" />
//               <span className="font-mono font-semibold text-lg">
//                 {formatTime(quiz.timeRemaining)}
//               </span>
//             </div>
//             {/* Close Button */}
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Quiz Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
//           {/* Progress Bar */}
//           <div className="mb-8">
//             <div className="w-full bg-gray-200 rounded-full h-3">
//               <div
//                 className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
//                 style={{ width: `${((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
//               ></div>
//             </div>
//             <div className="flex justify-between text-sm text-gray-600 mt-2">
//               <span>Progress</span>
//               <span>{Math.round(((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100)}% Complete</span>
//             </div>
//           </div>

//           {/* Question */}
//           <div className="mb-12">
//             <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 leading-relaxed">
//               {currentQuestion.question}
//             </h3>
//             <div className="space-y-4">
//               {currentQuestion.options.map((option, index) => (
//                 <button
//                   key={index}
//                   onClick={() => onAnswer(index)}
//                   className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 text-lg transform hover:scale-[1.01] ${
//                     quiz.userAnswers[quiz.currentQuestionIndex] === index
//                       ? 'border-indigo-500 bg-indigo-50 shadow-md'
//                       : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
//                       quiz.userAnswers[quiz.currentQuestionIndex] === index
//                         ? 'border-indigo-500 bg-indigo-500'
//                         : 'border-gray-300'
//                     }`}>
//                       {quiz.userAnswers[quiz.currentQuestionIndex] === index && (
//                         <div className="w-3 h-3 bg-white rounded-full"></div>
//                       )}
//                     </div>
//                     <span className="flex-1">{option}</span>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quiz Navigation */}
//       <div className="bg-white border-t border-gray-200 px-4 md:px-8 py-6">
//         <div className="max-w-4xl mx-auto flex justify-between">
//           <button
//             onClick={onPrevious}
//             disabled={quiz.currentQuestionIndex === 0}
//             className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-8 py-3 rounded-xl font-medium transition-colors text-lg"
//           >
//             Previous
//           </button>
//           <button
//             onClick={onNext}
//             disabled={quiz.userAnswers[quiz.currentQuestionIndex] === undefined}
//             className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl font-medium transition-colors text-lg"
//           >
//             {quiz.currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizModal;



//Main Page
// import React, { useState, useRef, useEffect } from 'react';
// import { Brain, Network, Clock, CheckCircle, AlertCircle, User, RotateCcw, Upload, Youtube, FileText, Image, Loader, Plus, X, ExternalLink, Search, Trophy, Play, Lock, Filter, ChevronDown, Target, BarChart3 } from 'lucide-react';
// import { TOPIC_QUIZ_DATA } from './data/quizData';
// import type { Topic, UserProfile, CustomContent, Quiz, QuizQuestion, QuizState } from '../interface/types';
// import TopicCard from './TopicCard';
// import QuizModal from './QuizModal';
// import QuizResults from './QuizResults';
// import UserStats from './UserStats';
// import MobileNav from './MobileNav';
// import UserProfileDropdown from './UserProfileDropdown';
// import QuizGenerationLoader from "./QuizGenerationLoader";
// import { ThemeToggle } from './ThemeToggle';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import Loading from './Loading';
// import { Content } from '@radix-ui/react-dialog';
// import { toast } from 'sonner';

// type FilterType = 'all' | 'mastered' | 'continue' | 'start' | 'locked';

// interface CustomQuizScores {
//   [contentId: string]: {
//     total: number;
//     correct: number;
//   };
// }

// const MainPage: React.FC = () => {
//   // Loader states
//   const [showQuizLoader, setShowQuizLoader] = useState(false);
//   const [quizLoaderStage, setQuizLoaderStage] = useState<'analyzing' | 'extracting' | 'generating' | 'complete'>('analyzing');
//   const [currentProcessingContent, setCurrentProcessingContent] = useState<{
//     type: 'youtube' | 'pdf' | 'image' | 'topic-quiz' | 'custom-quiz';
//     fileName?: string;
//     topicName?: string;
//     action?: 'start' | 'continue' | 'retake';
//   } | null>(null);

//   // Upload and content states
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [uploadType, setUploadType] = useState<'youtube' | 'pdf' | 'image'>('youtube');
//   const [youtubeUrl, setYoutubeUrl] = useState('');
//   const [customContents, setCustomContents] = useState<CustomContent[]>([]);
//   const [generatedQuizzes, setGeneratedQuizzes] = useState<Quiz[]>([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [activeTab, setActiveTab] = useState<'topics' | 'custom'>('topics');
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Custom quiz scores state
//   const [customQuizScores, setCustomQuizScores] = useState<CustomQuizScores>({});

//   // Quiz states
//   const [quizHistory, setQuizHistory] = useState<QuizState[]>([]);
//   const [showQuizModal, setShowQuizModal] = useState(false);
//   const [currentQuiz, setCurrentQuiz] = useState<QuizState | null>(null);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [reviewQuiz, setReviewQuiz] = useState<QuizState | null>(null);

//   // Filter and search states
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
//   const [showFilterDropdown, setShowFilterDropdown] = useState(false);

//   const [topics, setTopics] = useState<Topic[]>([
//     {
//       id: 'arrays',
//       name: 'Arrays',
//       prerequisites: [],
//       status: 'mastered',
//       score: 5,
//       totalQuestions: 5,
//       attempts: 3,
//       bestScore: 100,
//       lastAttempt: new Date('2024-01-15')
//     },
//     {
//       id: 'strings',
//       name: 'Strings',
//       prerequisites: [],
//       status: 'mastered',
//       score: 4,
//       totalQuestions: 5,
//       attempts: 2,
//       bestScore: 80,
//       lastAttempt: new Date('2024-01-14')
//     },
//     {
//       id: 'linked-lists',
//       name: 'Linked Lists',
//       prerequisites: ['arrays'],
//       status: 'in-progress',
//       score: 2,
//       totalQuestions: 5,
//       attempts: 1,
//       bestScore: 40,
//       lastAttempt: new Date('2024-01-10')
//     },
//     {
//       id: 'stacks',
//       name: 'Stacks',
//       prerequisites: ['arrays', 'linked-lists'],
//       status: 'not-started'
//     },
//     {
//       id: 'queues',
//       name: 'Queues',
//       prerequisites: ['arrays', 'linked-lists'],
//       status: 'not-started'
//     },
//     {
//       id: 'trees',
//       name: 'Binary Trees',
//       prerequisites: ['linked-lists', 'recursion'],
//       status: 'not-started'
//     },
//     {
//       id: 'recursion',
//       name: 'Recursion',
//       prerequisites: ['arrays', 'strings'],
//       status: 'not-started'
//     },
//     {
//       id: 'sorting',
//       name: 'Sorting Algorithms',
//       prerequisites: ['arrays', 'recursion'],
//       status: 'not-started'
//     }
//   ]);

//   const userProfile: UserProfile = {
//     name: "Vansh Tuteja",
//     masteredTopics: topics.filter(t => t.status === 'mastered').map(t => t.name),
//     totalScore: 85,
//     streak: 7
//   };

//   // Filter options with icons and labels
//   const filterOptions = [
//     { value: 'all' as FilterType, label: 'All Topics', icon: Network, color: 'text-gray-600 dark:text-gray-400' },
//     { value: 'mastered' as FilterType, label: 'Mastered', icon: Trophy, color: 'text-yellow-600 dark:text-yellow-400' },
//     { value: 'continue' as FilterType, label: 'Continue', icon: RotateCcw, color: 'text-blue-600 dark:text-blue-400' },
//     { value: 'start' as FilterType, label: 'Start', icon: Play, color: 'text-green-600 dark:text-green-400' },
//     { value: 'locked' as FilterType, label: 'Locked', icon: Lock, color: 'text-red-600 dark:text-red-400' }
//   ];

//   // Timer effect for quiz
//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (currentQuiz && !currentQuiz.isCompleted && currentQuiz.timeRemaining > 0) {
//       interval = setInterval(() => {
//         setCurrentQuiz(prev => {
//           if (!prev || prev.isCompleted) return prev;

//           const newTimeRemaining = prev.timeRemaining - 1;

//           if (newTimeRemaining <= 0) {
//             completeQuiz();
//             return { ...prev, timeRemaining: 0 };
//           }

//           return { ...prev, timeRemaining: newTimeRemaining };
//         });
//       }, 1000);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [currentQuiz?.isCompleted, currentQuiz?.timeRemaining]);

//   const getTopicStatus = (topic: Topic) => {
//     const allPrereqsMastered = topic.prerequisites.every(prereq =>
//       topics.find(t => t.id === prereq)?.status === 'mastered'
//     );

//     if (topic.status === 'mastered') return 'mastered';
//     if (topic.status === 'in-progress') return 'in-progress';
//     if (allPrereqsMastered || topic.prerequisites.length === 0) return 'ready';
//     return 'locked';
//   };

//   // Enhanced loader simulation for different content types
//   const simulateQuizGeneration = async (
//     contentType: 'youtube' | 'pdf' | 'image' | 'topic-quiz' | 'custom-quiz',
//     options: {
//       fileName?: string;
//       topicName?: string;
//       action?: 'start' | 'continue' | 'retake';
//     } = {}
//   ): Promise<void> => {
//     setShowQuizLoader(true);
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     setShowQuizLoader(false);
//   };

//   // Generate quiz questions from extracted text
//   const generateQuestionsFromText = (text: string, fileName: string): QuizQuestion[] => {
//     const questions: QuizQuestion[] = [];

//     if (text.toLowerCase().includes('array')) {
//       questions.push({
//         id: '1',
//         question: 'Based on the content, what is the time complexity of accessing an element in an array?',
//         options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
//         correctAnswer: 0,
//         explanation: 'Arrays provide constant time O(1) access because elements are stored in contiguous memory locations.'
//       });
//     }

//     if (text.toLowerCase().includes('linked list')) {
//       questions.push({
//         id: '2',
//         question: 'What is the main advantage of linked lists mentioned in the content?',
//         options: ['Faster access', 'Dynamic memory allocation', 'Less memory usage', 'Better cache performance'],
//         correctAnswer: 1,
//         explanation: 'Linked lists provide dynamic memory allocation, allowing the data structure to grow and shrink at runtime.'
//       });
//     }

//     if (text.toLowerCase().includes('stack')) {
//       questions.push({
//         id: '3',
//         question: 'According to the content, which principle do stacks follow?',
//         options: ['FIFO', 'LIFO', 'Random access', 'Priority based'],
//         correctAnswer: 1,
//         explanation: 'Stacks follow the LIFO (Last In First Out) principle where the last element added is the first one to be removed.'
//       });
//     }

//     if (text.toLowerCase().includes('tree')) {
//       questions.push({
//         id: '4',
//         question: 'What type of data structure are trees according to the content?',
//         options: ['Linear', 'Hierarchical', 'Circular', 'Sequential'],
//         correctAnswer: 1,
//         explanation: 'Trees are hierarchical data structures with parent-child relationships between nodes.'
//       });
//     }

//     if (text.toLowerCase().includes('binary search')) {
//       questions.push({
//         id: '5',
//         question: 'What is the time complexity of binary search mentioned in the content?',
//         options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
//         correctAnswer: 1,
//         explanation: 'Binary search has O(log n) time complexity as it divides the search space in half with each comparison.'
//       });
//     }

//     if (questions.length === 0) {
//       questions.push({
//         id: '1',
//         question: `Based on the uploaded content (${fileName}), which is most important for algorithm analysis?`,
//         options: ['Code length', 'Time complexity', 'Variable names', 'Comments'],
//         correctAnswer: 1,
//         explanation: 'Time complexity is crucial for algorithm analysis as it determines how the algorithm scales with input size.'
//       });
//     }

//     return questions.slice(0, 5);
//   };

//   const processFileContent = (file: File): Promise<string> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (file.type.includes('pdf')) {
//           resolve(`
//             Data Structures and Algorithms Concepts...
//           `);
//         } else {
//           resolve(`
//             Algorithm Complexity Analysis...
//           `);
//         }
//       }, 2000);
//     });
//   };

//   const handleYouTubeUpload = async () => {
//     if (!youtubeUrl.trim()) return;

//     setIsProcessing(true);
//     const newContent: CustomContent = {
//       id: Date.now().toString(),
//       type: 'youtube',
//       title: `YouTube Video - ${new Date().toLocaleDateString()}`,
//       url: youtubeUrl,
//       uploadDate: new Date().toISOString(),
//       status: 'processing'
//     };

//     setCustomContents(prev => [...prev, newContent]);
//     setYoutubeUrl('');
//     setShowUploadModal(false);

//     // Show loader for YouTube processing
//     await simulateQuizGeneration('youtube', { fileName: 'YouTube Video' });

//     setTimeout(() => {
//       const extractedText = `Data Structures and Algorithms Tutorial...`;
//       setCustomContents(prev =>
//         prev.map(content =>
//           content.id === newContent.id
//             ? { ...content, status: 'ready', quizGenerated: true, extractedText }
//             : content
//         )
//       );

//       const questions = generateQuestionsFromText(extractedText, 'YouTube Video');
//       const sampleQuiz: Quiz = {
//         id: `quiz-${newContent.id}`,
//         title: 'AI Generated Quiz from YouTube Video',
//         contentId: newContent.id,
//         questions
//       };

//       setGeneratedQuizzes(prev => [...prev, sampleQuiz]);
//       setIsProcessing(false);
//     }, 1000);
//   };

//   const handleFileUpload = async (files: FileList | null) => {
//     if (!files || files.length === 0) return;

//     const file = files[0];
//     const fileType = file.type.includes('pdf') ? 'pdf' : 'image';

//     setIsProcessing(true);
//     const newContent: CustomContent = {
//       id: Date.now().toString(),
//       type: fileType,
//       title: file.name,
//       fileName: file.name,
//       uploadDate: new Date().toISOString(),
//       status: 'processing'
//     };

//     setCustomContents(prev => [...prev, newContent]);
//     setShowUploadModal(false);

//     try {
//       // Show loader for file processing
//       await simulateQuizGeneration(fileType, { fileName: file.name });

//       const extractedText = await processFileContent(file);

//       setTimeout(() => {
//         setCustomContents(prev =>
//           prev.map(content =>
//             content.id === newContent.id
//               ? { ...content, status: 'ready', quizGenerated: true, extractedText }
//               : content
//           )
//         );

//         const questions = generateQuestionsFromText(extractedText, file.name);
//         const sampleQuiz: Quiz = {
//           id: `quiz-${newContent.id}`,
//           title: `AI Generated Quiz from ${file.name}`,
//           contentId: newContent.id,
//           questions
//         };

//         setGeneratedQuizzes(prev => [...prev, sampleQuiz]);
//         setIsProcessing(false);
//       }, 1000);
//     } catch (error) {
//       setCustomContents(prev =>
//         prev.map(content =>
//           content.id === newContent.id
//             ? { ...content, status: 'failed' }
//             : content
//         )
//       );
//       setIsProcessing(false);
//       setShowQuizLoader(false);
//       setCurrentProcessingContent(null);
//     }
//   };

//   const removeCustomContent = (id: string) => {
//     setCustomContents(prev => prev.filter(content => content.id !== id));
//     setGeneratedQuizzes(prev => prev.filter(quiz => quiz.contentId !== id));
//     setCustomQuizScores(prev => {
//       const newScores = { ...prev };
//       delete newScores[id];
//       return newScores;
//     });
//   };

//   const getContentIcon = (type: string) => {
//     const iconProps = { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" };

//     switch (type) {
//       case 'youtube':
//         return <Youtube {...iconProps} />;
//       case 'pdf':
//         return <FileText {...iconProps} />;
//       case 'image':
//         return <Image {...iconProps} />;
//       default:
//         return <FileText {...iconProps} />;
//     }
//   };

//   const generateQuizForTopic = (topicId: string): QuizQuestion[] => {
//     const topicData = TOPIC_QUIZ_DATA[topicId as keyof typeof TOPIC_QUIZ_DATA];
//     if (!topicData) {
//       return [
//         {
//           id: '1',
//           question: `What is a key concept in ${topics.find(t => t.id === topicId)?.name}?`,
//           options: ['Concept A', 'Concept B', 'Concept C', 'All of the above'],
//           correctAnswer: 3,
//           explanation: 'This is a placeholder question. More questions will be added for this topic.'
//         }
//       ];
//     }

//     const shuffledQuestions = [...topicData.questions].sort(() => Math.random() - 0.5);
//     return shuffledQuestions.slice(0, 5);
//   };

//   const startQuizForTopic = async (topicId: string) => {
//     const topic = topics.find(t => t.id === topicId);
//     if (!topic) return;

//     // Determine the action type
//     let action: 'start' | 'continue' | 'retake' = 'start';
//     if (topic.status === 'in-progress') {
//       action = 'continue';
//     } else if (topic.status === 'mastered' || (topic.attempts && topic.attempts > 0)) {
//       action = 'retake';
//     }

//     // Show loader for topic quiz generation
//     await simulateQuizGeneration('topic-quiz', {
//       topicName: topic.name,
//       action: action
//     });

//     // Update topic status to in-progress if it's the first time
//     if (topic.status === 'not-started' || (topic.status === 'ready' && !topic.attempts)) {
//       setTopics(prev => prev.map(t =>
//         t.id === topicId
//           ? {
//             ...t,
//             status: 'in-progress',
//             totalQuestions: 5,
//             attempts: 0,
//             bestScore: 0,
//             score: 0
//           }
//           : t
//       ));
//     }

//     const questions = generateQuizForTopic(topicId);
//     const timeLimit = questions.length * 60;
//     const attemptNumber = (topic.attempts || 0) + 1;

//     const newQuiz: QuizState = {
//       topicId,
//       questions,
//       currentQuestionIndex: 0,
//       userAnswers: new Array(questions.length).fill(undefined),
//       score: 0,
//       isCompleted: false,
//       timeStarted: new Date(),
//       timeLimit,
//       timeRemaining: timeLimit,
//       attempt: attemptNumber
//     };

//     setCurrentQuiz(newQuiz);
//     setShowQuizModal(true);
//   };

//   const startCustomQuiz = async (contentId: string) => {
//     const quiz = generatedQuizzes.find(q => q.contentId === contentId);
//     const content = customContents.find(c => c.id === contentId);
//     if (!quiz || !content) return;

//     // Show loader for custom quiz generation
//     await simulateQuizGeneration('custom-quiz', {
//       fileName: content.title,
//       action: 'start'
//     });

//     const timeLimit = quiz.questions.length * 60;

//     const newQuiz: QuizState = {
//       contentId,
//       questions: quiz.questions,
//       currentQuestionIndex: 0,
//       userAnswers: new Array(quiz.questions.length).fill(undefined),
//       score: 0,
//       isCompleted: false,
//       timeStarted: new Date(),
//       timeLimit,
//       timeRemaining: timeLimit
//     };

//     setCurrentQuiz(newQuiz);
//     setShowQuizModal(true);
//   };

//   const handleQuizAnswer = (answerIndex: number) => {
//     if (!currentQuiz || currentQuiz.isCompleted) return;

//     const updatedAnswers = [...currentQuiz.userAnswers];
//     updatedAnswers[currentQuiz.currentQuestionIndex] = answerIndex;

//     setCurrentQuiz({
//       ...currentQuiz,
//       userAnswers: updatedAnswers
//     });
//   };

//   const onNavigateToQuestion = (questionIndex: number) => {
//     if (!currentQuiz) return;
//     let max = -1;
//     max = Math.max(currentQuiz.currentQuestionIndex, max)
//     if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1 &&
//       questionIndex <= max) {
//       setCurrentQuiz({
//         ...currentQuiz,
//         currentQuestionIndex: questionIndex
//       });
//     }
//     else {
//       toast.success("Not go there");
//     }
//   };

//   const nextQuizQuestion = () => {
//     if (!currentQuiz) return;

//     if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
//       setCurrentQuiz({
//         ...currentQuiz,
//         currentQuestionIndex: currentQuiz.currentQuestionIndex + 1
//       });
//     } else {
//       completeQuiz();
//     }
//   };

//   const previousQuizQuestion = () => {
//     if (!currentQuiz || currentQuiz.currentQuestionIndex === 0) return;

//     setCurrentQuiz({
//       ...currentQuiz,
//       currentQuestionIndex: currentQuiz.currentQuestionIndex - 1
//     });
//   };

//   const completeQuiz = () => {
//     if (!currentQuiz) return;

//     let correctAnswers = 0;
//     currentQuiz.questions.forEach((question, index) => {
//       if (currentQuiz.userAnswers[index] === question.correctAnswer) {
//         correctAnswers++;
//       }
//     });

//     const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
//     const completedQuiz: QuizState = {
//       ...currentQuiz,
//       score,
//       isCompleted: true,
//       timeCompleted: new Date()
//     };

//     setQuizHistory(prev => [...prev, completedQuiz]);

//     // Update topic status and statistics
//     if (completedQuiz.topicId) {
//       setTopics(prev => prev.map(topic => {
//         if (topic.id === completedQuiz.topicId) {
//           const newAttempts = (topic.attempts || 0) + 1;
//           const newBestScore = Math.max(topic.bestScore || 0, score);
//           const newStatus = score >= 70 ? 'mastered' : 'in-progress';

//           return {
//             ...topic,
//             status: newStatus,
//             score: correctAnswers,
//             totalQuestions: 5,
//             attempts: newAttempts,
//             bestScore: newBestScore,
//             lastAttempt: new Date()
//           };
//         }
//         return topic;
//       }));
//     }

//     // Update custom quiz scores
//     if (completedQuiz.contentId) {
//       setCustomQuizScores(prev => ({
//         ...prev,
//         [completedQuiz.contentId!]: {
//           total: completedQuiz.questions.length,
//           correct: correctAnswers
//         }
//       }));
//     }

//     setCurrentQuiz(completedQuiz);
//   };

//   const closeQuizModal = () => {
//     setShowQuizModal(false);
//     setCurrentQuiz(null);
//   };

//   const showTopicReview = (topicId: string) => {
//     const topicQuizHistory = quizHistory.filter(quiz =>
//       quiz.topicId === topicId && quiz.isCompleted
//     );

//     const latestQuiz = topicQuizHistory[topicQuizHistory.length - 1];
//     if (latestQuiz) {
//       setReviewQuiz(latestQuiz);
//       setShowReviewModal(true);
//     }
//   };

//   const showCustomQuizReview = (contentId: string) => {
//     const customQuizHistory = quizHistory.filter(quiz =>
//       quiz.contentId === contentId && quiz.isCompleted
//     );

//     const latestQuiz = customQuizHistory[customQuizHistory.length - 1];
//     if (latestQuiz) {
//       setReviewQuiz(latestQuiz);
//       setShowReviewModal(true);
//     }
//   };

//   const retakeQuiz = (topicId: string) => {
//     startQuizForTopic(topicId);
//   };

//   const retakeCustomQuiz = (contentId: string) => {
//     startCustomQuiz(contentId);
//   };

//   // Helper functions for score display
//   const getScoreColor = (percentage: number) => {
//     if (percentage >= 80) return 'text-green-600 dark:text-green-400';
//     if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400';
//     return 'text-red-600 dark:text-red-400';
//   };

//   const getScoreBadgeColor = (percentage: number) => {
//     if (percentage >= 80) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
//     if (percentage >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
//     return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
//   };

//   // Filter topics based on selected filter and search query
//   const getFilteredTopics = () => {
//     let filtered = topics;

//     // Apply status filter
//     if (selectedFilter !== 'all') {
//       filtered = filtered.filter(topic => {
//         const status = getTopicStatus(topic);
//         switch (selectedFilter) {
//           case 'mastered':
//             return status === 'mastered';
//           case 'continue':
//             return status === 'in-progress';
//           case 'start':
//             return status === 'ready';
//           case 'locked':
//             return status === 'locked';
//           default:
//             return true;
//         }
//       });
//     }

//     // Apply search filter
//     if (searchQuery.trim()) {
//       filtered = filtered.filter(topic =>
//         topic.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     return filtered;
//   };

//   // Get counts for each filter
//   const getFilterCounts = () => {
//     const counts = {
//       all: topics.length,
//       mastered: 0,
//       continue: 0,
//       start: 0,
//       locked: 0
//     };

//     topics.forEach(topic => {
//       const status = getTopicStatus(topic);
//       switch (status) {
//         case 'mastered':
//           counts.mastered++;
//           break;
//         case 'in-progress':
//           counts.continue++;
//           break;
//         case 'ready':
//           counts.start++;
//           break;
//         case 'locked':
//           counts.locked++;
//           break;
//       }
//     });

//     return counts;
//   };

//   const filteredTopics = getFilteredTopics();
//   const filterCounts = getFilterCounts();
//   const currentFilterOption = filterOptions.find(option => option.value === selectedFilter);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
//       {
//         <Loading isVisible={showQuizLoader} />
//       }

//       {/* Header */}
//       <header className="sticky top-0 z-50 bg-white dark:bg-gray-800   dark:border-gray-700 transition-colors duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
//                 <Network className="w-6 h-6 md:w-8 md:h-8 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">DSA Assessment Hub</h1>
//                 <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Dependency-Aware Learning System</p>
//               </div>
//             </div>
//             <div className='ml-auto'>
//               <MobileNav
//                 userProfile={userProfile}
//                 onUploadClick={() => setShowUploadModal(true)}
//                 activeTab={activeTab}
//                 onTabChange={setActiveTab}
//                 customContents={customContents}
//                 topics={topics}
//               />
//             </div>
//             <div className="flex items-center space-x-2 md:space-x-4">
//               <ThemeToggle />
//               <div className="hidden lg:block">
//                 <UserProfileDropdown />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-4 md:space-y-8">
//             {/* Welcome Section */}
//             <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 md:p-8 text-white">
//               <div className="flex items-start md:items-center space-x-4 md:space-x-6 mb-8">
//                 <div className="flex-shrink-0">
//                   <div className="flex items-center space-x-4 mb-4">
//                     <Brain className="w-8 h-8 md:w-12 md:h-12" />
//                   </div>
//                 </div>

//                 <div className="flex-1">
//                   <h1 className="text-xl md:text-3xl font-bold">
//                     Master Data Structures & Algorithms
//                   </h1>
//                   <p className="text-indigo-100 mt-2 text-sm md:text-base">
//                     Learn step-by-step with our prerequisite-aware assessment system
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="relative group">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search for topics like Arrays, Linked Lists, Trees..."
//                     className="w-full pl-12 pr-4 py-2 border bg-white placeholder:text-gray-400 text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Tab Navigation */}
//             <div className="border-b border-gray-200 dark:border-gray-700">
//               <nav className="-mb-px flex space-x-4 md:space-x-8">
//                 <button
//                   onClick={() => setActiveTab('topics')}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm md:text-base transition-colors ${activeTab === 'topics'
//                     ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
//                     : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
//                     }`}
//                 >
//                   Standard Learning Path
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('custom')}
//                   className={`py-2 px-1 border-b-2 font-medium text-sm md:text-base transition-colors ${activeTab === 'custom'
//                     ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
//                     : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
//                     }`}
//                 >
//                   Custom Content Quizzes
//                   {customContents.length > 0 && (
//                     <span className="ml-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 py-0.5 px-2 rounded-full text-xs">
//                       {customContents.length}
//                     </span>
//                   )}
//                 </button>
//               </nav>
//             </div>

//             {/* Content based on active tab */}
//             {activeTab === 'topics' && (
//               <div>
//                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
//                   <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Learning Path</h3>

//                   {/* Filter Dropdown */}
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowFilterDropdown(!showFilterDropdown)}
//                       className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
//                     >
//                       <Filter className="w-4 h-4" />
//                       <span>Filter: {currentFilterOption?.label}</span>
//                       <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">
//                         {selectedFilter === 'all' ? filterCounts.all : filterCounts[selectedFilter]}
//                       </span>
//                       <ChevronDown className="w-4 h-4" />
//                     </button>

//                     {showFilterDropdown && (
//                       <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
//                         <div className="py-1">
//                           {filterOptions.map((option) => {
//                             const IconComponent = option.icon;
//                             const count = filterCounts[option.value];
//                             return (
//                               <button
//                                 key={option.value}
//                                 onClick={() => {
//                                   setSelectedFilter(option.value);
//                                   setShowFilterDropdown(false);
//                                 }}
//                                 className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedFilter === option.value ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
//                                   }`}
//                               >
//                                 <div className="flex items-center space-x-2">
//                                   <IconComponent className={`w-4 h-4 ${option.color}`} />
//                                   <span>{option.label}</span>
//                                 </div>
//                                 <span className={`px-2 py-0.5 rounded-full text-xs ${selectedFilter === option.value
//                                   ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
//                                   : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
//                                   }`}>
//                                   {count}
//                                 </span>
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Active Filter Info */}
//                 {(selectedFilter !== 'all' || searchQuery.trim()) && (
//                   <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                         <span className="text-sm text-blue-800 dark:text-blue-300">
//                           {searchQuery.trim() && selectedFilter !== 'all'
//                             ? `Showing ${filteredTopics.length} topics matching "${searchQuery}" in ${currentFilterOption?.label}`
//                             : searchQuery.trim()
//                               ? `Showing ${filteredTopics.length} topics matching "${searchQuery}"`
//                               : `Showing ${filteredTopics.length} ${currentFilterOption?.label} topics`}
//                         </span>
//                       </div>
//                       <button
//                         onClick={() => {
//                           setSelectedFilter('all');
//                           setSearchQuery('');
//                         }}
//                         className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
//                       >
//                         Clear filters
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Topics Grid */}
//                 {filteredTopics.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//                     {filteredTopics.map((topic) => {
//                       const status = getTopicStatus(topic);
//                       const hasQuizHistory = quizHistory.some(quiz => quiz.topicId === topic.id && quiz.isCompleted);
//                       return (
//                         <TopicCard
//                           key={topic.id}
//                           topic={topic}
//                           status={status}
//                           onStartQuiz={startQuizForTopic}
//                           onReview={showTopicReview}
//                           onRetake={retakeQuiz}
//                           hasQuizHistory={hasQuizHistory}
//                           topics={topics}
//                         />
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
//                     <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                       {currentFilterOption && <currentFilterOption.icon className={`w-8 h-8 ${currentFilterOption.color}`} />}
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//                       No topics found
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400 mb-4">
//                       {searchQuery.trim() && selectedFilter !== 'all'
//                         ? `No topics match "${searchQuery}" in ${currentFilterOption?.label} category.`
//                         : searchQuery.trim()
//                           ? `No topics match "${searchQuery}".`
//                           : `No ${currentFilterOption?.label.toLowerCase()} topics available.`}
//                     </p>
//                     <button
//                       onClick={() => {
//                         setSelectedFilter('all');
//                         setSearchQuery('');
//                       }}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//                     >
//                       Show All Topics
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {activeTab === 'custom' && (
//               <div>
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Custom Content Quizzes</h3>
//                   <button
//                     onClick={() => setShowUploadModal(true)}
//                     className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 md:px-4 py-2 rounded-lg transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     <span className="text-sm md:text-base">Add Content</span>
//                   </button>
//                 </div>

//                 {customContents.length === 0 ? (
//                   <div className="text-center py-8 md:py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
//                     <Upload className="w-12 h-12 md:w-16 md:h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                     <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mb-2">No custom content yet</h3>
//                     <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm md:text-base px-4">
//                       Upload YouTube videos, PDFs, or images to generate AI-powered quizzes
//                     </p>
//                     <button
//                       onClick={() => setShowUploadModal(true)}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
//                     >
//                       Upload Your First Content
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 gap-6">
//                     {customContents.map((content) => {
//                       const hasScore = customQuizScores[content.id];
//                       const scorePercentage = hasScore ? Math.round((hasScore.correct / hasScore.total) * 100) : 0;
//                       const hasQuizHistory = quizHistory.some(quiz => quiz.contentId === content.id && quiz.isCompleted);

//                       return (
//                         <div
//                           key={content.id}
//                           className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-600 hover:shadow-lg transition-all duration-300"
//                         >
//                           {/* Header Section */}
//                           <div className="flex items-start justify-between mb-6">
//                             <div className="flex items-center space-x-4">
//                               <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
//                                 {getContentIcon(content.type)}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <h4 className="font-semibold text-gray-900 dark:text-white text-lg truncate">{content.title}</h4>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                                   {content.type === 'youtube' ? 'YouTube Video' : content.type.toUpperCase()}
//                                 </p>
//                               </div>
//                             </div>
//                             <button
//                               onClick={() => removeCustomContent(content.id)}
//                               className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all duration-200"
//                             >
//                               <X className="w-5 h-5" />
//                             </button>
//                           </div>

//                           {/* URL Section */}
//                           {content.url && (
//                             <div className="mb-6">
//                               <a
//                                 href={content.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg transition-all duration-200"
//                               >
//                                 <ExternalLink className="w-4 h-4" />
//                                 <span>View original content</span>
//                               </a>
//                             </div>
//                           )}

//                           {/* Status and Score Section */}
//                           <div className="flex items-center justify-between mb-6">
//                             <div className="flex items-center space-x-3">
//                               <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${content.status === 'ready' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' :
//                                   content.status === 'processing' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' :
//                                     'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
//                                 }`}>
//                                 {content.status === 'processing' && <Loader className="w-4 h-4 mr-2 animate-spin" />}
//                                 {content.status === 'ready' && <CheckCircle className="w-4 h-4 mr-2" />}
//                                 {content.status === 'failed' && <AlertCircle className="w-4 h-4 mr-2" />}
//                                 {content.status === 'processing' ? 'AI Analyzing...' :
//                                   content.status === 'ready' ? 'Quiz Ready' : 'Processing Failed'}
//                               </div>
//                             </div>

//                             {/* Score Display */}
//                             {hasScore && (
//                               <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getScoreBadgeColor(scorePercentage)}`}>
//                                 <Trophy className="w-4 h-4 mr-2" />
//                                 <span>{hasScore.correct}/{hasScore.total} ({scorePercentage}%)</span>
//                               </div>
//                             )}
//                           </div>

//                           {/* Score Details */}
//                           {hasScore && (
//                             <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
//                               <div className="flex items-center justify-between mb-3">
//                                 <h5 className="font-medium text-gray-900 dark:text-white flex items-center">
//                                   <BarChart3 className="w-4 h-4 mr-2" />
//                                   Quiz Performance
//                                 </h5>
//                                 <span className={`text-2xl font-bold ${getScoreColor(scorePercentage)}`}>
//                                   {scorePercentage}%
//                                 </span>
//                               </div>

//                               <div className="flex items-center space-x-4 text-sm">
//                                 <div className="flex items-center space-x-1">
//                                   <Target className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//                                   <span className="text-gray-600 dark:text-gray-400">Total Questions:</span>
//                                   <span className="font-medium text-gray-900 dark:text-white">{hasScore.total}</span>
//                                 </div>
//                                 <div className="flex items-center space-x-1">
//                                   <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
//                                   <span className="text-gray-600 dark:text-gray-400">Correct:</span>
//                                   <span className="font-medium text-green-600 dark:text-green-400">{hasScore.correct}</span>
//                                 </div>
//                               </div>

//                               {/* Progress Bar */}
//                               <div className="mt-3">
//                                 <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                                   <div
//                                     className={`h-2 rounded-full transition-all duration-500 ${scorePercentage >= 80 ? 'bg-green-500' :
//                                         scorePercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
//                                       }`}
//                                     style={{ width: `${scorePercentage}%` }}
//                                   ></div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* Upload Date */}
//                           <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//                             Uploaded: {new Date(content.uploadDate).toLocaleDateString('en-US', {
//                               year: 'numeric',
//                               month: 'long',
//                               day: 'numeric'
//                             })}
//                           </div>

//                           {/* Action Buttons */}
//                           {content.status === 'ready' && content.quizGenerated && (
//                             <div className="space-y-3">
//                               <button
//                                 onClick={() => startCustomQuiz(content.id)}
//                                 className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
//                               >
//                                 <Play className="w-4 h-4" />
//                                 <span>{hasScore ? 'Retake AI Generated Quiz' : 'Take AI Generated Quiz'}</span>
//                               </button>

//                               {/* Review Button */}
//                               {hasQuizHistory && (
//                                 <button
//                                   onClick={() => showCustomQuizReview(content.id)}
//                                   className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
//                                 >
//                                   <FileText className="w-4 h-4" />
//                                   <span>Review Last Attempt</span>
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="hidden lg:block space-y-6">
//             {/* Processing Status */}
//             {isProcessing && !showQuizLoader && (
//               <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
//                 <div className="flex items-center space-x-3">
//                   <Loader className="w-5 h-5 text-yellow-600 dark:text-yellow-400 animate-spin" />
//                   <div>
//                     <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Processing Content</h4>
//                     <p className="text-sm text-yellow-700 dark:text-yellow-400">AI is analyzing your content to generate a quiz...</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* User Stats */}
//             <UserStats customContents={customContents} userProfile={userProfile} topics={topics} />

//             {/* User Profile Card */}
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
//                   <User className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
//                   Recent Activity
//                 </h3>
//                 <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
//                   <RotateCcw className="w-4 h-4" />
//                 </button>
//               </div>
//               <div className="space-y-3">
//                 {topics.filter(t => t.lastAttempt).sort((a, b) =>
//                   new Date(b.lastAttempt!).getTime() - new Date(a.lastAttempt!).getTime()
//                 ).slice(0, 5).map(topic => (
//                   <div key={topic.id} className="flex items-center justify-between text-sm">
//                     <div className="flex items-center space-x-2">
//                       {topic.status === 'mastered' ?
//                         <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" /> :
//                         <Clock className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
//                       }
//                       <span className="text-gray-700 dark:text-gray-300">{topic.name}</span>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-xs text-gray-500 dark:text-gray-400">
//                         {topic.lastAttempt?.toLocaleDateString()}
//                       </div>
//                       <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
//                         {topic.bestScore}% best
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Upload Modal */}
//       <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
//         <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
//           <DialogHeader className="mb-6">
//             <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
//               Create Custom Quiz
//             </DialogTitle>
//           </DialogHeader>

//           <div className="space-y-6">
//             {/* Content Type Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                 Choose Content Type
//               </label>
//               <div className="grid grid-cols-3 gap-3">
//                 <button
//                   onClick={() => setUploadType("youtube")}
//                   className={`p-3 md:p-4 rounded-lg border-2 transition-all ${uploadType === "youtube"
//                     ? "border-red-500 bg-red-50 dark:bg-red-900/20"
//                     : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
//                     }`}
//                 >
//                   <Youtube className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-2" />
//                   <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">YouTube</div>
//                 </button>
//                 <button
//                   onClick={() => setUploadType("pdf")}
//                   className={`p-3 md:p-4 rounded-lg border-2 transition-all ${uploadType === "pdf"
//                     ? "border-red-500 bg-red-50 dark:bg-red-900/20"
//                     : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
//                     }`}
//                 >
//                   <FileText className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-2" />
//                   <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">PDF</div>
//                 </button>
//                 <button
//                   onClick={() => setUploadType("image")}
//                   className={`p-3 md:p-4 rounded-lg border-2 transition-all ${uploadType === "image"
//                     ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
//                     : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
//                     }`}
//                 >
//                   <Image className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mx-auto mb-2" />
//                   <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">Image</div>
//                 </button>
//               </div>
//             </div>

//             {/* Content Input */}
//             {uploadType === "youtube" && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   YouTube Video URL
//                 </label>
//                 <input
//                   type="url"
//                   value={youtubeUrl}
//                   onChange={(e) => setYoutubeUrl(e.target.value)}
//                   placeholder="https://www.youtube.com/watch?v=..."
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
//                   Our AI will analyze the video content and generate relevant DSA questions
//                 </p>
//               </div>
//             )}

//             {(uploadType === "pdf" || uploadType === "image") && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                   Upload {uploadType === "pdf" ? "PDF Document" : "Image"}
//                 </label>
//                 <div
//                   onClick={() => fileInputRef.current?.click()}
//                   className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 md:p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
//                 >
//                   <Upload className="w-8 h-8 md:w-12 md:h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Click to upload or drag and drop</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-500">
//                     {uploadType === "pdf" ? "PDF files up to 10MB" : "PNG, JPG, GIF up to 5MB"}
//                   </p>
//                 </div>
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept={uploadType === "pdf" ? ".pdf" : "image/*"}
//                   onChange={(e) => handleFileUpload(e.target.files)}
//                   className="hidden"
//                 />
//               </div>
//             )}

//             {/* AI Features Info */}
//             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg">
//               <div className="flex items-start space-x-3">
//                 <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-0.5" />
//                 <div>
//                   <h3 className="font-medium text-gray-900 dark:text-white mb-1">
//                     AI-Powered Quiz Generation
//                   </h3>
//                   <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
//                     <li>• Analyzes content to identify key concepts</li>
//                     <li>• Generates contextual DSA questions</li>
//                     <li>• Creates explanations for each answer</li>
//                     <li>• Adapts difficulty based on content complexity</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             {/* Action Buttons */}
//             <div className="flex space-x-4 pt-2">
//               <button
//                 onClick={() => setShowUploadModal(false)}
//                 className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   if (uploadType === "youtube") {
//                     handleYouTubeUpload();
//                   } else {
//                     fileInputRef.current?.click();
//                   }
//                 }}
//                 disabled={uploadType === "youtube" && !youtubeUrl.trim()}
//                 className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-medium transition-all disabled:cursor-not-allowed"
//               >
//                 {uploadType === "youtube" ? "Generate Quiz" : "Upload & Generate"}
//               </button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Quiz Modal - Active Quiz */}
//       {showQuizModal && currentQuiz && !currentQuiz.isCompleted && (
//         <QuizModal
//           quiz={currentQuiz}
//           onAnswer={handleQuizAnswer}
//           onNext={nextQuizQuestion}
//           onPrevious={previousQuizQuestion}
//           onClose={closeQuizModal}
//           onNavigateToQuestion={onNavigateToQuestion}
//           title={currentQuiz.topicId
//             ? topics.find(t => t.id === currentQuiz.topicId)?.name || 'Quiz'
//             : customContents.find(c => c.id === currentQuiz.contentId)?.title || 'Custom Quiz'}
//         />
//       )}

//       {/* Quiz Results Modal */}
//       {showQuizModal && currentQuiz && currentQuiz.isCompleted && (
//         <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
//           <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">Quiz Complete!</h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                   {currentQuiz.topicId
//                     ? topics.find(t => t.id === currentQuiz.topicId)?.name
//                     : customContents.find(c => c.id === currentQuiz.contentId)?.title} Assessment
//                 </p>
//               </div>
//               <button
//                 onClick={closeQuizModal}
//                 className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors p-2"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           <div className="flex-1 overflow-y-auto">
//             <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
//               <QuizResults
//                 quiz={currentQuiz}
//                 title={currentQuiz.topicId
//                   ? topics.find(t => t.id === currentQuiz.topicId)?.name || 'Quiz'
//                   : customContents.find(c => c.id === currentQuiz.contentId)?.title || 'Custom Quiz'}
//                 onReview={() => {
//                   setReviewQuiz(currentQuiz);
//                   setShowReviewModal(true);
//                   setShowQuizModal(false);
//                 }}
//                 onRetake={() => {
//                   if (currentQuiz.topicId) {
//                     startQuizForTopic(currentQuiz.topicId);
//                   } else if (currentQuiz.contentId) {
//                     startCustomQuiz(currentQuiz.contentId);
//                   }
//                 }}
//                 onClose={closeQuizModal}
//                 isTopicMastered={currentQuiz.topicId && currentQuiz.score >= 70}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Full Screen Review Modal */}
//       {showReviewModal && reviewQuiz && (
//         <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col">
//           {/* Review Header */}
//           <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
//                   Review: {reviewQuiz.topicId
//                     ? topics.find(t => t.id === reviewQuiz.topicId)?.name
//                     : customContents.find(c => c.id === reviewQuiz.contentId)?.title} Quiz
//                 </h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                   Completed on {reviewQuiz.timeCompleted?.toLocaleDateString()} • Score: {reviewQuiz.score}%
//                   {reviewQuiz.attempt && ` • Attempt ${reviewQuiz.attempt}`}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowReviewModal(false)}
//                 className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors p-2"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           {/* Review Content */}
//           <div className="flex-1 overflow-y-auto">
//             <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
//               {/* Quiz Summary */}
//               <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-8">
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quiz Results Summary</h3>
//                     <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
//                       <span>Questions: {reviewQuiz.questions.length}</span>
//                       <span>Correct: {reviewQuiz.questions.filter((q, i) => reviewQuiz.userAnswers[i] === q.correctAnswer).length}</span>
//                       <span>Time: {reviewQuiz.timeCompleted
//                         ? Math.round((reviewQuiz.timeCompleted.getTime() - reviewQuiz.timeStarted.getTime()) / 1000)
//                         : reviewQuiz.timeLimit - reviewQuiz.timeRemaining}s</span>
//                     </div>
//                   </div>
//                   <div className={`text-3xl font-bold mt-4 md:mt-0 ${reviewQuiz.score >= 80 ? 'text-green-600 dark:text-green-400' :
//                     reviewQuiz.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
//                     }`}>
//                     {reviewQuiz.score}%
//                   </div>
//                 </div>
//               </div>

//               {/* Question Review */}
//               <div className="space-y-8">
//                 {reviewQuiz.questions.map((question, questionIndex) => {
//                   const userAnswer = reviewQuiz.userAnswers[questionIndex];
//                   const isCorrect = userAnswer === question.correctAnswer;

//                   return (
//                     <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 bg-white dark:bg-gray-800">
//                       <div className="flex items-start justify-between mb-6">
//                         <h4 className="text-xl font-semibold text-gray-900 dark:text-white flex-1 leading-relaxed">
//                           {questionIndex + 1}. {question.question}
//                         </h4>
//                         <div className={`flex items-center space-x-2 ml-6 ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                           {isCorrect ? (
//                             <CheckCircle className="w-6 h-6" />
//                           ) : (
//                             <AlertCircle className="w-6 h-6" />
//                           )}
//                           <span className="font-medium text-lg">
//                             {isCorrect ? 'Correct' : 'Incorrect'}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="space-y-3 mb-6">
//                         {question.options.map((option, optionIndex) => {
//                           const isUserAnswer = userAnswer === optionIndex;
//                           const isCorrectAnswer = question.correctAnswer === optionIndex;

//                           return (
//                             <div
//                               key={optionIndex}
//                               className={`p-4 rounded-lg border-2 ${isCorrectAnswer
//                                 ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
//                                 : isUserAnswer
//                                   ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
//                                   : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700'
//                                 }`}
//                             >
//                               <div className="flex items-center space-x-4">
//                                 <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isCorrectAnswer
//                                   ? 'border-green-500 bg-green-500'
//                                   : isUserAnswer
//                                     ? 'border-red-500 bg-red-500'
//                                     : 'border-gray-300 dark:border-gray-600'
//                                   }`}>
//                                   {(isCorrectAnswer || isUserAnswer) && (
//                                     <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
//                                   )}
//                                 </div>
//                                 <span className="flex-1 text-lg text-gray-900 dark:text-white">{option}</span>
//                                 {isCorrectAnswer && (
//                                   <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
//                                     Correct Answer
//                                   </span>
//                                 )}
//                                 {isUserAnswer && !isCorrectAnswer && (
//                                   <span className="text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
//                                     Your Answer
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           );
//                         })}
//                       </div>

//                       {/* Explanation */}
//                       <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
//                         <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-3 text-lg">Explanation:</h5>
//                         <p className="text-blue-800 dark:text-blue-400">{question.explanation}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Review Footer */}
//           <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 md:px-8 py-6">
//             <div className="max-w-4xl mx-auto flex justify-center space-x-4">
//               <button
//                 onClick={() => {
//                   if (reviewQuiz.topicId) {
//                     startQuizForTopic(reviewQuiz.topicId);
//                     setShowReviewModal(false);
//                   } else if (reviewQuiz.contentId) {
//                     startCustomQuiz(reviewQuiz.contentId);
//                     setShowReviewModal(false);
//                   }
//                 }}
//                 className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg"
//               >
//                 Retake Quiz
//               </button>
//               <button
//                 onClick={() => setShowReviewModal(false)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-xl font-medium transition-colors text-lg"
//               >
//                 Close Review
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Quiz Ready Notification */}
//       {generatedQuizzes.length > 0 && (
//         <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm z-40">
//           <div className="flex items-center space-x-3">
//             <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full">
//               <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-900 dark:text-white">Quiz Ready!</h4>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {generatedQuizzes[generatedQuizzes.length - 1].questions.length} questions generated
//               </p>
//             </div>
//           </div>
//           <div className="mt-3 flex space-x-2">
//             <button
//               onClick={() => {
//                 const latestQuiz = generatedQuizzes[generatedQuizzes.length - 1];
//                 if (latestQuiz.contentId) {
//                   startCustomQuiz(latestQuiz.contentId);
//                 }
//               }}
//               className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
//             >
//               Take Quiz
//             </button>
//             <button
//               onClick={() => setGeneratedQuizzes(prev => prev.slice(0, -1))}
//               className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 p-2"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainPage;