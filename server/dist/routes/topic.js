"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../middleware/auth");
const topicController_1 = require("../controllers/topicController");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_1.authenticateToken);
// Initialize user topics
router.post('/initialize', topicController_1.initializeUserTopics);
// Get user topics
router.get('/', auth_1.authenticateToken, topicController_1.getUserTopics);
// Get user stats
router.get('/stats', topicController_1.getUserStats);
// Update topic progress
router.put('/:topicId/progress', [
    (0, express_validator_1.body)('score')
        .isNumeric()
        .withMessage('Score must be a number')
        .isInt({ min: 0 })
        .withMessage('Score must be a non-negative integer'),
    (0, express_validator_1.body)('newStatus')
        .optional()
        .isIn(['not-started', 'in-progress', 'completed'])
        .withMessage('Status must be one of: not-started, in-progress, completed')
], auth_1.authenticateToken, topicController_1.updateTopicProgress);
// Reset topic progress
router.put('/:topicId/reset', topicController_1.resetTopicProgress);
router.post('/createAttempt', auth_1.authenticateToken, topicController_1.createAttempt);
router.get('/getUserAttempts', auth_1.authenticateToken, topicController_1.getUserAttempts);
exports.default = router;
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
