import express from 'express';
import { Reply } from '../models/reply.model.js';
import { Comment } from '../models/comment.model.js';
import ash from 'express-async-handler';

export const router = express.Router();

/**
 * * @desc    Create + Add a reply
 * * @route   POST '/api/comments/:id/replies'
 * * @access  currentUser
 **/

const createReply = ash(async (req, res) => {
  const newReply = new Reply({
    comment: req.params.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    content: req.body.content,
    score: 0,
    replyingTo: req.body.replyingTo,
    user: {
      image: {
        png: "../../assets/avatars/image-juliusomo.png",
        webp: "../../assets/avatars/image-juliusomo.webp"
      },
      username: req.body.user.username
    },
    showReplyForm: false
  });

  await Comment.findByIdAndUpdate(
    req.params.id,
    { $push: { replies: newReply._id } },
    { new: true }
  );

  const createdReply = await newReply.save();
  res.status(201).json(createdReply);
});

/**
 * * @desc    Get all replies for a comment
 * * @route   GET '/api/comments/:id/replies'
 * * @access  currentUser
 **/

const getReplies = ash(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('replies');
  if (comment) {
    res.json(comment.replies);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    Get a reply
 * * @route   GET '/api/:id/replies/:replyId'
 * * @access  currentUser
 **/

const getReply = ash(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('replies');

  if (comment) {
    const replyFound = comment.replies.find((reply) => reply._id.toString() === req.params.replyId);
    if (replyFound) {
      res.json(replyFound);
    } else {
      res.status(404);
      throw new Error('Reply not found');
    }
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    Update reply score
 * * @route   PUT '/api/:id/replies/:replyId/update
 * * @access  currentUser
 **/

const updateReplyScore = ash(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('replies');

  if (comment) {
    const replyFound = comment.replies.find((reply) => reply._id.toString() === req.params.replyId);

    if (replyFound) {
      replyFound.score = req.body.score;
      replyFound.updatedAt = new Date();
    } else {
      res.status(404);
      throw new Error('Reply not found');
    }
    await replyFound.save();
    res.status(204).json(replyFound);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    Edit a reply
 * * @route   PATCH '/api/:id/replies/:replyId/edit'
 * * @access  currentUser
 **/

const editReply = ash(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('replies');

  if (comment) {
    const replyFound = comment.replies.find((reply) => reply._id.toString() === req.params.replyId);

    if (replyFound) {
      replyFound.content = req.body.content;
      replyFound.updatedAt = new Date();
    } else {
      res.status(404);
      throw new Error('Reply not found');
    }
    await replyFound.save();
    res.status(204).json(replyFound);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    ToggleReplyShowReplyForm
 * * @route   PUT '/api/:id/replies/:replyId/toggle'
 * * @access  currentUser
 **/

const toggleReplyShowReplyForm = ash(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('replies');

  if (comment) {
    const replyFound = comment.replies.find((reply) => reply._id.toString() === req.params.replyId);

    if (replyFound) {
      replyFound.showReplyForm = req.body.showReplyForm;
    } else {
      res.status(404);
      throw new Error('Reply not found');
    }
    await replyFound.save();
    res.status(204).json(replyFound);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    Delete a reply
 * * @route   DELETE '/api/:id/replies/:replyId/delete'
 * * @access  currentUser
 **/

const deleteReply = ash(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('replies');

  if (comment) {
    const replyToDelete = comment.replies.find((reply) => reply._id.toString() === req.params.replyId);

    if (!replyToDelete) {
      res.status(404);
      throw new Error('Reply not found');
    } else {
      comment.replies = comment.replies.filter((reply) => reply._id.toString() !== req.params.replyId);
      await comment.save();
      await Reply.findByIdAndRemove(req.params.replyId);
      res.status(204).json('Reply deleted');
    }
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

export {
  createReply,
  getReplies,
  getReply,
  updateReplyScore,
  editReply,
  toggleReplyShowReplyForm,
  deleteReply
};