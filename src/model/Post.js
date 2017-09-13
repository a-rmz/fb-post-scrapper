const mongoose = require('mongoose');
const postSchema = require('../schema/Post');

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
