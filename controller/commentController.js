import express from 'express';
import { Comment } from '../models/comment.model.js';
import ash from 'express-async-handler';

export const router = express.Router();

/**
 * * @desc    Get all comments
 * * @route   GET '/api/'
 * * @access  Public
 **/
const getComments = ash(async (req, res) => {
  const comments = await Comment.find().populate('replies');
  if (comments) {
    res.json(comments);
  } else {
    res.status(404);
    throw new Error('No comment found');
  }
});

/**
 * * @desc    Create a comment
 * * @route   POST '/api/'
 * * @access  currentUser
 **/
const createComment = ash(async (req, res) => {
  const comment = Comment.create({
    content: req.body.content,
    createdAt: new Date(),
    updatedAt: new Date(),
    score: req.body.score,
    user: {
      image: {
        png: "../../assets/avatars/image-juliusomo.png",
        webp: "../../assets/avatars/image-juliusomo.webp"
      },
      username: req.body.user.username
    },
    replies: req.body.replies,
    attend: req.body.attend,
    showReplyForm: false
  });

  res.status(201).json(comment);
});

/**
 * * @desc    Fetch single comment
 * * @route   GET '/api/:id'
 * * @access  Public
 **/
const getComment = ash(async (req, res) => {
  const comment = await Comment.findById(req.params.id).populate('replies');

  if (comment) {
    res.json(comment);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    Update score
 * * @route   PUT '/api/:id'
 * * @access  Public
 **/
const updateScore = ash(async (req, res) => {
  const commentFound = await Comment.findById(req.params.id).populate('replies');

  if (commentFound) {
    commentFound.score = req.body.score;
    commentFound.updatedAt = new Date();
    await commentFound.save();
    res.json(commentFound);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    ToggleShowReplyForm
 * * @route   PUT '/api/:id/toggle'
 * * @access  Public
 **/
const toggleShowReplyForm = ash(async (req, res) => {
  const commentFound = await Comment.findById(req.params.id).populate('replies');

  if (commentFound) {
    commentFound.showReplyForm = req.body.showReplyForm;
    await commentFound.save();
    res.json(commentFound);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    EditComment
 * * @route   PATCH '/api/:id/edit'
 * * @access  Public
 **/
const editComment = ash(async (req, res) => {
  const commentFound = await Comment.findById(req.params.id).populate('replies');

  if (commentFound) {
    commentFound.content = req.body.content;
    commentFound.updatedAt = new Date();
    await commentFound.save();
    res.json(commentFound);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    Delete a comment
 * * @route   DELETE '/api/:id/delete'
 * * @access  currentUser
 **/

const deleteComment = ash(async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  } else {
    res.status(204).json('Comment deleted');
  }
});

export {
  createComment,
  getComments,
  getComment,
  updateScore,
  toggleShowReplyForm,
  editComment,
  deleteComment
};