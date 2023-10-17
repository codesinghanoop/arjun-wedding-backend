import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
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
});

export const Reply = mongoose.model('Reply', replySchema);