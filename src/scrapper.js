const FB = require('fb');
const querystring = require('querystring');

const buildPostFields = options => `?${querystring.stringify(options)}`;

class Scrapper {
  constructor(configuration) {
    this.fields = {
      page: configuration.page.fields,
      post: configuration.post.fields,
    };

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

  async fetchPageInformation(pageId) {
    const pageOptions = {
      fields: this.fields.page,
    };

    const data = await this.fb.api(pageId, pageOptions);
    const posts = await this.fetchPosts(pageId);
    console.log(posts);

    const pageData = {
      posts,
      page: pageId,
      name: data.name,
      likes: data.fan_count,
    };

    return pageData;
  }

  async fetchPosts(pageId) {
    let posts = [];

    let data = await this.fb.api(`${pageId}/posts${buildPostFields(this.fields.post)}`);

    do {
      const rawPosts = data.data.filter(post => post.message);

      const fetchedPosts = await Promise.all(
        rawPosts.map(post => this.fetchPostInformation(post))
      );
      posts = posts.concat(fetchedPosts);

      const { after } = data.paging.cursors;
      this.fields.post.after = after;

      data = await this.fb.api(`${pageId}/posts${buildPostFields(this.fields.post)}`);
    } while (data.paging.next);

    return posts;
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

  async scrape() {
    const rawData = await Promise.all(
      this.pageList.map(async page => this.fetchPageInformation(page))
    );

    console.log(rawData);


    // const rawData = this.pageList.map(async page => {
      // let data = await this.fb.api(page, options);
      // const pageData = {
        // page,
        // posts: [],
        // name: data.name,
        // likes: data.fan_count,
      // };

      // let posts = [];

      // do {
        // if (data.posts) {
          // const rawPosts = data.posts.data.filter(post => post.message);

          // const fetchedPosts = await Promise.all(
            // rawPosts.map(post => this.fetchPostInformation(post))
          // );

          // posts = posts.concat(fetchedPosts);
        // }
        
        // const next = data.posts.paging.cursors.after;
        // const postOptions = this.postOptions;
        // postOptions.after = next;
        // options.fields = buildFields(this.rawFields, postOptions);
        // data = await this.fb.api(page, options);

      // } while (data.posts.paging.next);

      // pageData.posts = posts;
     
      // return pageData;
    // });

    return Promise.all(rawData);
  }
}

module.exports = Scrapper;
