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
  const comments = await Comment.find({});
  res.json(comments);
});

/**
 * * @desc    Create a comment
 * * @route   POST '/api/'
 * * @access  currentUser
 **/
const createComment = ash(async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    createdAt: "now",
    score: 0,
    user: {
      image: {
        png: "../../assets/avatars/image-juliusomo.png",
        webp: "../../assets/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    },
    replies: [],
    showReplyForm: false
  });

  const createdComment = await comment.save();
  res.status(201).json(createdComment);
});

/**
 * * @desc    Fetch single comment
 * * @route   GET '/api/:id'
 * * @access  Public
 **/
const getCommentById = ash(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    res.json({ comment });
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    Update a comment
 * * @route   PUT '/api/:id'
 * * @access  currentUser
 **/
const updateComment = ash(async (req, res) => {
  const { content } = req.body;

  const comment = await Comment.findById(req.params.id);
  if (comment) {
    comment.content = content;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

/**
 * * @desc    Delete a comment
 * * @route   DELETE '/api/:id'
 * * @access  currentUser
 **/
const deleteComment = ash(async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id);

  if (comment) {
    res.json('Comment removed');
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

export {
  getComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment
};