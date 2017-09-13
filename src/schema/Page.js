const mongoose = require('mongoose');
const postSchema = require('./Post');

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  id: String,
  displayName: String,
  fans: [{
    date: Date,
    count: Number
  }],
  posts: {
    type: [postSchema],
    default: []
  }
});

module.exports = pageSchema;
