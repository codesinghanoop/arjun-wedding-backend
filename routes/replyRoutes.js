import express from 'express';

import {
  getReply,
  createReply,
  getReplies,
  updateReplyScore,
  editReply,
  toggleReplyShowReplyForm,
  deleteReply
} from '../controller/replyController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getReplies).post(createReply);
router.route('/:replyId').get(getReply);
router.route('/:replyId/edit').patch(editReply);
router.route('/:replyId/update').put(updateReplyScore);
router.route('/:replyId/toggle').put(toggleReplyShowReplyForm);
router.route('/:replyId/delete').delete(deleteReply);

export default router;