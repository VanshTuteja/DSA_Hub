import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth';
import {
  initializeUserTopics,
  getUserTopics,
  updateTopicProgress,
  resetTopicProgress,
  getUserStats,
  createAttempt,
  getUserAttempts
} from '../controllers/topicController';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Initialize user topics
router.post('/initialize', initializeUserTopics);

// Get user topics
router.get('/',authenticateToken, getUserTopics);

// Get user stats
router.get('/stats', getUserStats);

// Update topic progress
router.put('/:topicId/progress', [
  body('score')
    .isNumeric()
    .withMessage('Score must be a number')
    .isInt({ min: 0 })
    .withMessage('Score must be a non-negative integer'),
  body('newStatus')
    .optional()
    .isIn(['not-started', 'in-progress', 'completed'])
    .withMessage('Status must be one of: not-started, in-progress, completed')
],authenticateToken, updateTopicProgress);

// Reset topic progress
router.put('/:topicId/reset', resetTopicProgress);

router.post('/createAttempt',authenticateToken,createAttempt);

router.get('/getUserAttempts',authenticateToken, getUserAttempts);


export default router;





















// import express, { Request, Response } from 'express';
// import Topic, { ITopic } from '../models/Topic';

// const router = express.Router();

// // GET /api/topics - Get all topics
// router.get('/all', async (req: Request, res: Response) => {
//   try {
//     const topics: ITopic[] = await Topic.find({});

//     res.json({
//       success: true,
//       data: topics
//     });
    
//   } catch (error) {
//     console.error('Error fetching topics:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch topics'
//     });
    
//   }
// });

// // GET /api/topics/:id - Get single topic by id
// router.get('/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const topic: ITopic | null = await Topic.findOne({ id });
    
//     if (!topic) {
//       return res.status(404).json({
//         success: false,
//         message: 'Topic not found'
//       });
//     }
    
    
//     res.json({
//       success: true,
//       data: topic
//     });

//   } catch (error) {
//     console.error('Error fetching topic:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch topics'
//     });
//   }
// });

// export default router;