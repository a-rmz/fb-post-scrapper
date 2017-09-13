const mongodb = require('./mongodb');
const Page = require('../model/Page');
const Post = require('../model/Post');

const formatPost = rawPost => {
  const post = Post({
    id: rawPost.id,
    text: rawPost.message,
    commentCount: rawPost.comment_count,
    reactions: rawPost.reactions,
    date: new Date(rawPost.created_time)
  });

  return post;
};

class StorageController {
  constructor(config) {
    this.db = mongodb.connect(); 
  }

  getAll() {
    return Page.find({});
  }

  save(data) {
    const pagePromises = data.map(rawPage => {
      const id = rawPage.page;
      const { posts, name, likes } = rawPage;
      const formattedPosts = posts.map(formatPost);


      const page = Page({
        id: id,
        displayName: name
      });

      return Page.createIfNeeded(id, page)
        .then(() => {
          const fans = {
            date: new Date(),
            count: likes
          };

          return Page.appendFanCount(id, fans)
            .then(() => {
              const promises = formattedPosts.map(post => Page.appendPost(id, post));
              return Promise.all(promises);
            });
        });
     
    });

    return Promise.all(pagePromises);
  }
}

module.exports = StorageController;
