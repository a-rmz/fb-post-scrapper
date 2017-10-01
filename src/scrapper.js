const FB = require('fb');

class Scrapper {
  constructor(configuration, storageController) {
    this.fields = {
      page: configuration.page.fields,
      post: configuration.post.fields,
    };

    this.storageController = storageController;

    this.accessToken = configuration.accessToken || '';
    this.apiVersion = configuration.apiVersion || 'v2.10';
    this.extendedReactions = configuration.post.extendedReactions || false;
    this.commentCount = configuration.post.commentCount || false;

    this.postLimit = configuration.post.limit || 10;
    this.startDate = configuration.post.since || null;

    // Initialize FB API instance
    this.fb = new FB.Facebook({
      accessToken: this.accessToken,
      version: this.apiVersion,
    });
  }

  setPageList(pageList = []) {
    this.pageList = pageList;
  }

  fetchPageInformation(pageId) {
    const pageOptions = {
      fields: this.fields.page,
    };

    const data = this.fb.api(pageId, pageOptions);

    return data
      .then(page => this.storageController.savePage(pageId, page))
      .then(page => this.fetchPosts(page));
  }

  fetchPosts(page) {
    console.log('Downloading posts for', page.id);
    return page;
  }

  fetchComments(postId) {
    
  }

  fetchCommentInformation(commentId) {

  }

  async fetchPostInformation(post) {
    const postId = post.id;

    // Available options
    // NONE, LIKE, LOVE, WOW, HAHA, SAD, ANGRY, THANKFUL, PRIDE
    const fields = [
      'comments.limit(0).summary(1).as(comments)',
      'reactions.type(LIKE).limit(0).summary(1).as(like)',
      'reactions.type(LOVE).limit(0).summary(1).as(love)',
      'reactions.type(WOW).limit(0).summary(1).as(wow)',
      'reactions.type(HAHA).limit(0).summary(1).as(haha)',
      'reactions.type(SAD).limit(0).summary(1).as(sad)',
      'reactions.type(ANGRY).limit(0).summary(1).as(angry)',
    ];

    if (this.extendedReactions) {
      fields.push('reactions.type(THANKFUL).limit(0).summary(1).as(thankful)');
      fields.push('reactions.type(PRIDE).limit(0).summary(1).as(pride)');
    }

    const options = {
      fields,
    };

    const data = await this.fb.api(postId, options);
    delete data.id;

    post.comment_count = data.comments.summary.total_count;

    delete data.comments;
    const reactions = {};

    for (let reaction in data) {
      reactions[reaction] = data[reaction].summary.total_count;
    }

    post.reactions = reactions;

    post.comments = await this.fetchComments(postId);
    return post;
  }

  scrape() {
    const pages = this.pageList.map(page => this.fetchPageInformation(page));
    const rawPages = Promise.all(pages);

    rawPages
      .then(data => console.log(data));
  }
}

module.exports = Scrapper;
