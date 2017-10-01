const { Schema } = require('mongoose');

const reactionsSchema = require('./Reactions');
const commentSchema = require('./Comment');

const postSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  comments: {
    type: [commentSchema],
    default: [],
    required: true,
  },
  reactionsHistory: {
    type: [reactionsSchema],
    default: [],
    required: true,
  },
});

module.exports = postSchema;
