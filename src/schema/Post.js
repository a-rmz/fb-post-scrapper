class Post {
  constructor(data) {
    this.id = data.id;
    this.text = data.message;
    this.comment_count = data.comment_count;
    this.reactions = data.reactions;
  }
};

module.exports = Post;