const mongoose = require('mongoose');
const commentSchema = require('../schema/Comment');

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
