const { Schema } = require('mongoose');

const postSchema = require('./Post');

const pageSchema = new Schema({
  _id: String,
  name: String,
  fans: [{
    date: Date,
    count: Number,
  }],
  posts: {
    type: [postSchema],
    default: [],
  },
});

module.exports = pageSchema;
