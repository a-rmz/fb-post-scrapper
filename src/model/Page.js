const mongoose = require('mongoose');
const pageSchema = require('../schema/Page');

const Page = mongoose.model('Page', pageSchema);

const createIfNeeded = (id, page) => {
   return Page.update(
      { id: id },
      page,
      { upsert: true }
    );
}

const appendFanCount = (id, fanCount) => {
  return Page.update(
    { id: id },
    {
      $push: {
        fans: [
          fanCount
        ]
      }
    },
    { upsert: true }
  );
}

const appendPost = (id, post) => {
  return Page.update(
    { id: id },
    {
      $push: {
        posts: [
          post
        ]
      }
    },
    { upsert: true }
  );
}

Page.createIfNeeded = createIfNeeded;
Page.appendFanCount = appendFanCount;
Page.appendPost = appendPost;

module.exports = Page;
