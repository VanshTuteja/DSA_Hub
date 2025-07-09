import { Request, Response } from 'express';
import { UserTopic } from '../models/UserTopic';
import {IStandaredQuizAttempt, StandaredQuizAttempt} from '../models/StandaredQuizAttempt';
import { User } from '../models/User';
import { defaultTopics } from '../data/seed';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
  };
}

// // Default topics data
// const defaultTopics: ITopic[] = [
//   {
//     id: "arrays",
//     name: "Arrays",
//     prerequisites: [],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "strings",
//     name: "Strings",
//     prerequisites: [],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "linked-lists",
//     name: "Linked Lists",
//     prerequisites: ["arrays"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "doubly-linked-lists",
//     name: "Doubly Linked Lists",
//     prerequisites: ["linked-lists"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "stacks",
//     name: "Stacks",
//     prerequisites: ["arrays", "linked-lists"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "queues",
//     name: "Queues",
//     prerequisites: ["arrays", "linked-lists"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "deque",
//     name: "Deque (Double-ended Queue)",
//     prerequisites: ["queues"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "priority-queues",
//     name: "Priority Queues",
//     prerequisites: ["queues", "arrays"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "hash-tables",
//     name: "Hash Tables",
//     prerequisites: ["arrays"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "sets",
//     name: "Sets",
//     prerequisites: ["hash-tables"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   },
//   {
//     id: "maps",
//     name: "Maps",
//     prerequisites: ["hash-tables"],
//     status: "not-started",
//     score: 0,
//     totalQuestions: 5,
//     attempts: 0,
//     bestScore: 0
//   }
// ];

export const initializeUserTopics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId  = req.user?.id;

    // Check if user already has topics initialized
    const existingTopics = await UserTopic.find({ userId });
    if (existingTopics.length > 0) {
      res.status(400).json({ message: 'Topics already initialized for this user' });
      return;
    }

    // Create user topics from default topics
    const userTopics = defaultTopics.map(topic => ({
      userId,
      topicId: topic.id,
      name: topic.name,
      prerequisites: topic.prerequisites,
      status: topic.status,
      score: topic.score,
      totalQuestions: topic.totalQuestions,
      attempts: topic.attempts,
      bestScore: topic.bestScore
    }));

    await UserTopic.insertMany(userTopics);

    res.status(201).json({
      message: 'Topics initialized successfully',
      count: userTopics.length
    });
  } catch (error) {
    console.error('Initialize topics error:', error);
    res.status(500).json({ message: 'Server error during topic initialization' });
  }
};

export const getUserTopics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
  //   if (!userId) {
  // console.log("req.user is undefined");}
  console.log("userId ===",userId);
    const topics = await UserTopic.find({ userId }).sort({ createdAt: 1 });
    res.json({
      success:true,
      topics: topics
      .map(topic => ({
        id: topic.topicId,
        name: topic.name,
        prerequisites: topic.prerequisites,
        status: topic.status,
        score: topic.score,
        totalQuestions: topic.totalQuestions,
        attempts: topic.attempts,
        bestScore: topic.bestScore,
        lastAttempt:topic.lastAttempt || null,
        _id: topic._id
      }))
    });
  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({ message: 'Server error while fetching topics' });
  }
};

export const updateTopicProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(400).json({ errors: errors.array() });
    //   return;
    // }

    const userId = req.user!.id;
    const { topicId } = req.params;
    const { score, newStatus,lastAttempt } = req.body;

    const topic = await UserTopic.findOne({ userId, topicId });
    if (!topic) {
      res.status(404).json({ message: 'Topic not found' });
      return;
    }
    // Update topic progress
    topic.attempts += 1;
    topic.score = score;
    if (score > topic.bestScore) {
      topic.bestScore = score;
    }
    if (newStatus) {
      topic.status = newStatus;
    }
    topic.lastAttempt = lastAttempt;
    await topic.save();

    const user = await User.findById(userId);
    if(user){
    if(user.stats.totalQuizzes) {
      user.stats.totalQuizzes += 1;
    }else{
      user.stats.totalQuizzes = 1;
    }
    user.stats.totalScore += score;
    user.stats.lastActivity = lastAttempt; 
    await user.save();}


    res.json({
      success:true,
      message: 'Topic progress updated successfully',
      topic: {
        id: topic.topicId,
        name: topic.name,
        prerequisites: topic.prerequisites,
        status: topic.status,
        score: topic.score,
        totalQuestions: topic.totalQuestions,
        attempts: topic.attempts,
        bestScore: topic.bestScore,
        lastAttempt:lastAttempt,
        _id: topic._id
      }
    });
  } catch (error) {
    console.error('Update topic progress error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while updating topic progress' });
  }
};

export const resetTopicProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { topicId } = req.params;

    const topic = await UserTopic.findOne({ userId, topicId });
    if (!topic) {
      res.status(404).json({ message: 'Topic not found' });
      return;
    }

    // Reset topic progress
    topic.status = 'not-started';
    topic.score = 0;
    topic.attempts = 0;
    topic.bestScore = 0;

    await topic.save();

    res.json({
      message: 'Topic progress reset successfully',
      topic: {
        id: topic.topicId,
        name: topic.name,
        prerequisites: topic.prerequisites,
        status: topic.status,
        score: topic.score,
        totalQuestions: topic.totalQuestions,
        attempts: topic.attempts,
        bestScore: topic.bestScore,
        _id: topic._id
      }
    });
  } catch (error) {
    console.error('Reset topic progress error:', error);
    res.status(500).json({ message: 'Server error while resetting topic progress' });
  }
};

export const getUserStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const topics = await UserTopic.find({ userId });

    const stats = {
      totalTopics: topics.length,
      completedTopics: topics.filter(t => t.status === 'completed').length,
      inProgressTopics: topics.filter(t => t.status === 'in-progress').length,
      notStartedTopics: topics.filter(t => t.status === 'not-started').length,
      totalAttempts: topics.reduce((sum, t) => sum + t.attempts, 0),
      averageScore: topics.length > 0 ? topics.reduce((sum, t) => sum + t.bestScore, 0) / topics.length : 0,
      totalBestScore: topics.reduce((sum, t) => sum + t.bestScore, 0)
    };

    res.json({ stats });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error while fetching user stats' });
  }
};

export const createAttempt = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      attemptId,
      topicId,
      questions,
      userAnswers,
      score,
      correctAnswers,
      totalQuestions,
      timeStarted,
      timeCompleted,
      timeTaken,
      isRetake,
      originalAttemptId
    } = req.body;


    const userId = req.user?.id;

    // Optional: Validate input here (can use zod or express-validator)

    const newAttempt = await StandaredQuizAttempt.create({
      userId,
      attemptId,
      topicId,
      questions,
      userAnswers,
      score,
      correctAnswers,
      totalQuestions,
      timeStarted: new Date(timeStarted),
      timeCompleted: new Date(timeCompleted),
      timeTaken,
      isRetake: isRetake || false,
      originalAttemptId: originalAttemptId || null
    });

    res.status(201).json({
      success: true,
      message: "Quiz attempt saved successfully",
      attempt: newAttempt
    });
  } catch (error: any) {
    console.error("Error saving quiz attempt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save quiz attempt",
      error: error.message
    });
  }
};

export const getUserAttempts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    // Step 1: Get all attempts by user, sorted by latest
    const attempts = await StandaredQuizAttempt.find({ userId })
      .sort({ createdAt: -1 })
      .select("-userId -_id -createdAt -updatedAt -__v");

    // Step 2: Group by topicId or contentId
    const grouped: Record<string, IStandaredQuizAttempt[]> = {};
    attempts.forEach((attempt: any) => {
      const quizKey = attempt.topicId || attempt.contentId; // fallback if topicId not present
      if (!quizKey) return;
      if (!grouped[quizKey]) grouped[quizKey] = [];
      grouped[quizKey].push(attempt);
    });

    // Step 3: Return as object map
    res.status(200).json({
      success: true,
      quizAttempts: grouped // this matches { [quizId: string]: QuizAttempt[] }
    });

  } catch (error: any) {
    console.error("Error fetching user attempts grouped by quiz ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attempts for user",
      error: error.message
    });
  }
};
