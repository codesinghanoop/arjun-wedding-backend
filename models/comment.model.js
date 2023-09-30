import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
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
  replies: [{
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    replyingTo: {
      type: String,
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
    showReplyForm: {
      type: Boolean,
      required: true
    }
  }],
  showReplyForm: {
    type: Boolean,
    required: true
  }
});

export const Comment = mongoose.model('Comment', commentSchema);

