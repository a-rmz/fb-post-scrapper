const FB = require('fb');
const Post = require('./schema/Post');

const { numberWithCommas } = require('./utils');

class Scrapper {
  constructor(configuration) {
    this.fields = configuration.fields || ['name'];
    this.accessToken = configuration.accessToken || '';
    this.apiVersion = configuration.apiVersion || 'v2.9';
    this.extendedReactions = configuration.post.extendedReactions || false;
    this.commentCount = configuration.post.commentCount || false;

    this.postLimit = configuration.post.limit || 10;
    this.startDate = configuration.post.since || null;

    let postsField = `posts.limit(${this.postLimit})`;
    if (this.startDate) {
      postsField = `${postsField}.since(${this.startDate})`;
    }
    this.fields.push(postsField);
  
    // Initialize FB API instance
    this.fb = new FB.Facebook({
      accessToken: this.accessToken,
      version: this.apiVersion
    });
  }

  setPageList(pageList = []) {
    this.pageList = pageList;
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
      'reactions.type(ANGRY).limit(0).summary(1).as(angry)'
    ];

    if (this.extendedReactions) {
      fields.push('reactions.type(THANKFUL).limit(0).summary(1).as(thankful)');
      fields.push('reactions.type(PRIDE).limit(0).summary(1).as(pride)');
    }

    const options = {
      fields 
    };

    const data = await this.fb.api(postId, options);
    delete data.id;

    post.comment_count = data.comments.summary.total_count;
    
    delete data.comments;
    const reactions = {};

    for(let reaction in data) {
      reactions[reaction] = data[reaction].summary.total_count;
    }
  
    post.reactions = reactions;
    return post;
  }

  async scrape() {
    const options = {
      fields: this.fields
    }

    const promises = this.pageList.map(page => {
      return this.fb.api(page, options)
        .then(data => {
          const pageData = {
            page,
            posts: [],
            name: data.name,
            likes: data.fan_count,
          };

          if (data.posts) {
            const rawPosts = data.posts.data.filter(post => post.message);
  
            const postPromises = rawPosts.map(post => this.fetchPostInformation(post));
            const posts = Promise.all(postPromises);

            return posts
              .then(postList => {
                pageData.posts = postList;
                return pageData;
              });
          }

          return pageData;
        })
        .catch(err => {
          console.log(err);
          return {};
        });

      });

    const rawData = Promise.all(promises);

    return rawData;
  }
}

module.exports = Scrapper;
