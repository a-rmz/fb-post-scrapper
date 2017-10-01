const Schema = require('mongoose');

const reactionsSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  reactions: {
    like: {
      type: Number,
      required: true,
    },
    love: {
      type: Number,
      required: true,
    },
    wow: {
      type: Number,
      required: true,
    },
    haha: {
      type: Number,
      required: true,
    },
    sad: {
      type: Number,
      required: true,
    },
    angry: {
      type: Number,
      required: true,
    },
    thankful: Number,
    pride: Number,
  },
});

module.exports = reactionsSchema;
