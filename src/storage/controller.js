const mongodb = require('./mongodb');
const Page = require('../model/Page');

class StorageController {
  constructor() {
    this.db = mongodb.connect();
  }

  savePage(pageId, page) {
    const pageData = {
      _id: pageId,
      name: page.name,
      likes: page.fan_count,
    };

    return Page.createIfNeeded(pageData);
  }
}

module.exports = StorageController;
