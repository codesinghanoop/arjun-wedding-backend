import express from 'express';

import {
  getComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment
} from '../controller/commentController.js';

const router = express.Router();

router.route('/').get(getComments).post(createComment);
router
  .route('/:id')
  .get(getCommentById)
  .put(updateComment)
  .delete(deleteComment);

export default router;