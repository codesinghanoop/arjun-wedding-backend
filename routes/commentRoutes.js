import express from 'express';
import replyRouter from './replyRoutes.js';

import {
  getComments,
  createComment,
  updateScore,
  getComment,
  toggleShowReplyForm,
  editComment,
  deleteComment
} from '../controller/commentController.js';

const router = express.Router();

router.route('/').get(getComments).post(createComment);
router.route('/:id').get(getComment).put(updateScore);
router.route('/:id/toggle').put(toggleShowReplyForm);
router.route('/:id/edit').patch(editComment);
router.route('/:id/delete').delete(deleteComment);

// * Re-route into replyRouter - to get the following route: /api/comments/:id/replies
router.use('/:id/replies', replyRouter);

export default router;