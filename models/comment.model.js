import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  user: {
    image: {
      png: {
        type: String,
        required: true
      },
      webp: {
        type: String,
        required: true
      }
    },
    username: {
      type: String,
      required: true
    }
  },
  replies: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply',
  } ],
  showReplyForm: {
    type: Boolean,
    required: true
  },
  attend: {
    type: Number,
    required: true
  },
});

export const Comment = mongoose.model('Comment', commentSchema);

