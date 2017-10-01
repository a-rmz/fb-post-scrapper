const mongoose = require('mongoose');
const pageSchema = require('../schema/Page');

const Page = mongoose.model('Page', pageSchema);

const createIfNeeded = page => Page
  .findOneAndUpdate(
    { id: page._id },
    page,
    {
      upsert: true,
      new: true,
    },
  );

const appendFanCount = (id, fanCount) => Page
  .update(
    { _id: id },
    {
      $push: {
        fans: [
          fanCount,
        ],
      },
    },
    { upsert: true },
  );

const appendPost = (id, post) => Page
  .update(
    { _id: id },
    {
      $push: {
        posts: [
          post,
        ],
      },
    },
    { upsert: true },
  );

// Add the extra metods to the model
Page.createIfNeeded = createIfNeeded;
Page.appendFanCount = appendFanCount;
Page.appendPost = appendPost;

module.exports = Page;
