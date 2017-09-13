const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  commentCount: Number,
  reactions: {
    like: {
      type: Number,
      required: true
    },
    love: {
      type: Number,
      required: true
    },
    wow: {
      type: Number,
      required: true
    },
    haha: {
      type: Number,
      required: true
    },
    sad: {
      type: Number,
      required: true
    },
    angry: {
      type: Number,
      required: true
    },
    thankful: Number,
    pride: Number
  }
});

module.exports = postSchema;
