// import express from 'express';
// import { authenticateToken, AuthRequest } from '../middleware/auth.js';
// import { Quiz } from '../models/Quiz.js';
// import { QuizAttempt } from '../models/QuizAttempt.js';
// import { User } from '../models/User.js';
// import { quizValidation } from '../utils/validation.js';
// import { logger } from '../utils/logger.js';

// const router = express.Router();

// /**
//  * Start a quiz attempt
//  */
// router.post('/start/:quizId', authenticateToken, async (req: AuthRequest, res) => {
//   try {
//     const quiz = await Quiz.findOne({ 
//       _id: req.params.quizId, 
//       userId: req.user!._id,
//       isActive: true 
//     });

//     if (!quiz) {
//       return res.status(404).json({ error: 'Quiz not found' });
//     }

//     // Check if there's an incomplete attempt
//     const existingAttempt = await QuizAttempt.findOne({
//       userId: req.user!._id,
//       quizId: quiz._id,
//       isCompleted: false
//     });

//     if (existingAttempt) {
//       return res.json({
//         success: true,
//         attempt: {
//           id: existingAttempt._id,
//           quizId: quiz._id,
//           timeStarted: existingAttempt.timeStarted,
//           answers: existingAttempt.answers
//         },
//         quiz: {
//           id: quiz._id,
//           title: quiz.title,
//           questions: quiz.questions.map(q => ({
//             id: q.id,
//             question: q.question,
//             options: q.options
//           })),
//           metadata: quiz.metadata
//         }
//       });
//     }

//     // Create new attempt
//     const attempt = new QuizAttempt({
//       userId: req.user!._id,
//       quizId: quiz._id,
//       contentId: quiz.contentId,
//       totalQuestions: quiz.questions.length,
//       timeStarted: new Date(),
//       correctAnswers: 0,
//       metadata: {
//         difficulty: quiz.metadata.difficulty,
//         contentType: quiz.metadata.contentType,
//         deviceInfo: req.headers['user-agent'],
//         ipAddress: req.ip
//       }
//     });

//     await attempt.save();

//     res.json({
//       success: true,
//       attempt: {
//         id: attempt._id,
//         quizId: quiz._id,
//         timeStarted: attempt.timeStarted
//       },
//       quiz: {
//         id: quiz._id,
//         title: quiz.title,
//         questions: quiz.questions.map(q => ({
//           id: q.id,
//           question: q.question,
//           options: q.options
//         })),
//         metadata: quiz.metadata
//       }
//     });

//   } catch (error) {
//     logger.error(`Start quiz failed: ${error}`);
//     res.status(500).json({ error: 'Failed to start quiz' });
//   }
// });

// /**
//  * Submit quiz answer
//  */
// router.post('/answer/:attemptId', authenticateToken, async (req: AuthRequest, res) => {
//   try {
//     const { error, value } = quizValidation.submitAnswer.validate(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     const { questionId, selectedAnswer, timeSpent } = value;

//     const attempt = await QuizAttempt.findOne({
//       _id: req.params.attemptId,
//       userId: req.user!._id,
//       isCompleted: false
//     });

//     if (!attempt) {
//       return res.status(404).json({ error: 'Quiz attempt not found' });
//     }

//     const quiz = await Quiz.findById(attempt.quizId);
//     if (!quiz) {
//       return res.status(404).json({ error: 'Quiz not found' });
//     }

//     // Find the question
//     const question = quiz.questions.find(q => q.id === questionId);
//     if (!question) {
//       return res.status(400).json({ error: 'Question not found' });
//     }

//     // Check if answer already exists
//     const existingAnswerIndex = attempt.answers.findIndex(a => a.questionId === questionId);
//     const isCorrect = selectedAnswer === question.correctAnswer;

//     const answerData = {
//       questionId,
//       selectedAnswer,
//       isCorrect,
//       timeSpent: timeSpent || 0
//     };

//     if (existingAnswerIndex >= 0) {
//       // Update existing answer
//       const wasCorrect = attempt.answers[existingAnswerIndex].isCorrect;
//       attempt.answers[existingAnswerIndex] = answerData;
      
//       // Update correct answers count
//       if (wasCorrect && !isCorrect) {
//         attempt.correctAnswers--;
//       } else if (!wasCorrect && isCorrect) {
//         attempt.correctAnswers++;
//       }
//     } else {
//       // Add new answer
//       attempt.answers.push(answerData);
//       if (isCorrect) {
//         attempt.correctAnswers++;
//       }
//     }

//     await attempt.save();

//     res.json({
//       success: true,
//       isCorrect,
//       correctAnswer: question.correctAnswer,
//       explanation: question.explanation
//     });

//   } catch (error) {
//     logger.error(`Submit answer failed: ${error}`);
//     res.status(500).json({ error: 'Failed to submit answer' });
//   }
// });

// /**
//  * Complete quiz attempt
//  */
// router.post('/complete/:attemptId', authenticateToken, async (req: AuthRequest, res) => {
//   try {
//     const attempt = await QuizAttempt.findOne({
//       _id: req.params.attemptId,
//       userId: req.user!._id,
//       isCompleted: false
//     });

//     if (!attempt) {
//       return res.status(404).json({ error: 'Quiz attempt not found' });
//     }

//     // Complete the attempt
//     attempt.isCompleted = true;
//     attempt.timeCompleted = new Date();
//     attempt.totalTimeSpent = Math.floor((attempt.timeCompleted.getTime() - attempt.timeStarted.getTime()) / 1000);

//     await attempt.save();

//     // Update user stats
//     const user = await User.findById(req.user!._id);
//     if (user) {
//       user.stats.totalQuizzes++;
//       user.stats.totalScore += attempt.score;
//       user.stats.lastActivity = new Date();

//       // Update mastered topics if score is high enough
//       if (attempt.score >= 80) {
//         const quiz = await Quiz.findById(attempt.quizId);
//         if (quiz && quiz.metadata.contentType) {
//           const topicName = quiz.title.replace('Quiz: ', '');
//           if (!user.masteredTopics.includes(topicName)) {
//             user.masteredTopics.push(topicName);
//           }
//         }
//       }

//       await user.save();
//     }

//     res.json({
//       success: true,
//       attempt: {
//         id: attempt._id,
//         score: attempt.score,
//         correctAnswers: attempt.correctAnswers,
//         totalQuestions: attempt.totalQuestions,
//         totalTimeSpent: attempt.totalTimeSpent,
//         isCompleted: attempt.isCompleted
//       }
//     });

//   } catch (error) {
//     logger.error(`Complete quiz failed: ${error}`);
//     res.status(500).json({ error: 'Failed to complete quiz' });
//   }
// });

// /**
//  * Get quiz attempt details
//  */
// router.get('/attempt/:attemptId', authenticateToken, async (req: AuthRequest, res) => {
//   try {
//     const attempt = await QuizAttempt.findOne({
//       _id: req.params.attemptId,
//       userId: req.user!._id
//     }).populate('quizId');

//     if (!attempt) {
//       return res.status(404).json({ error: 'Quiz attempt not found' });
//     }

//     res.json({
//       success: true,
//       attempt
//     });

//   } catch (error) {
//     logger.error(`Get attempt failed: ${error}`);
//     res.status(500).json({ error: 'Failed to get attempt' });
//   }
// });

// /**
//  * Get user's quiz history
//  */
// router.get('/history', authenticateToken, async (req: AuthRequest, res) => {
//   try {
//     const page = parseInt(req.query.page as string) || 1;
//     const limit = parseInt(req.query.limit as string) || 10;
//     const skip = (page - 1) * limit;

//     const attempts = await QuizAttempt.find({
//       userId: req.user!._id,
//       isCompleted: true
//     })
//       .sort({ timeCompleted: -1 })
//       .skip(skip)
//       .limit(limit)
//       .populate('quizId', 'title metadata')
//       .populate('contentId', 'title type');

//     const total = await QuizAttempt.countDocuments({
//       userId: req.user!._id,
//       isCompleted: true
//     });

//     res.json({
//       success: true,
//       attempts: attempts.map(attempt => ({
//         id: attempt._id,
//         quiz: attempt.quizId,
//         content: attempt.contentId,
//         score: attempt.score,
//         correctAnswers: attempt.correctAnswers,
//         totalQuestions: attempt.totalQuestions,
//         totalTimeSpent: attempt.totalTimeSpent,
//         timeCompleted: attempt.timeCompleted,
//         metadata: attempt.metadata
//       })),
//       pagination: {
//         page,
//         limit,
//         total,
//         pages: Math.ceil(total / limit)
//       }
//     });

//   } catch (error) {
//     logger.error(`Get quiz history failed: ${error}`);
//     res.status(500).json({ error: 'Failed to get quiz history' });
//   }
// });

// /**
//  * Get quiz statistics
//  */
// router.get('/stats', authenticateToken, async (req: AuthRequest, res) => {
//   try {
//     const userId = req.user!._id;

//     // Get overall stats
//     const totalAttempts = await QuizAttempt.countDocuments({
//       userId,
//       isCompleted: true
//     });

//     const avgScoreResult = await QuizAttempt.aggregate([
//       { $match: { userId, isCompleted: true } },
//       { $group: { _id: null, avgScore: { $avg: '$score' } } }
//     ]);

//     const avgScore = avgScoreResult.length > 0 ? Math.round(avgScoreResult[0].avgScore) : 0;

//     // Get stats by difficulty
//     const difficultyStats = await QuizAttempt.aggregate([
//       { $match: { userId, isCompleted: true } },
//       {
//         $group: {
//           _id: '$metadata.difficulty',
//           count: { $sum: 1 },
//           avgScore: { $avg: '$score' },
//           bestScore: { $max: '$score' }
//         }
//       }
//     ]);

//     // Get recent performance (last 10 attempts)
//     const recentAttempts = await QuizAttempt.find({
//       userId,
//       isCompleted: true
//     })
//       .sort({ timeCompleted: -1 })
//       .limit(10)
//       .select('score timeCompleted');

//     res.json({
//       success: true,
//       stats: {
//         totalAttempts,
//         averageScore: avgScore,
//         difficultyBreakdown: difficultyStats,
//         recentPerformance: recentAttempts
//       }
//     });

//   } catch (error) {
//     logger.error(`Get quiz stats failed: ${error}`);
//     res.status(500).json({ error: 'Failed to get quiz statistics' });
//   }
// });

// export default router;