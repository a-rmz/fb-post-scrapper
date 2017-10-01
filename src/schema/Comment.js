const { Schema } = require('mongoose');

const reactionsSchema = require('./Reactions');

const commentSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  author: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reactionHistory: {
    type: [reactionsSchema],
    default: [],
    required: true,
  },
});

module.exports = commentSchema;
