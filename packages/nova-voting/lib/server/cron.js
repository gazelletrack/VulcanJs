import Telescope from 'meteor/nova:lib';
import Posts from "meteor/nova:posts";
import Comments from "meteor/nova:comments";

Meteor.startup(function () {
  const scoreInterval = parseInt(Telescope.settings.get("scoreUpdateInterval")) || 30;
  if (scoreInterval > 0) {

    // active items get updated every N seconds
    Meteor.setInterval(function () {
      let updatedPosts = 0;
      let updatedComments = 0;

      // console.log('tick ('+scoreInterval+')');
      Posts.find({'status': 2,'inactive': {$ne : true}}).forEach(function (post) { // only run scoring on approved posts
        updatedPosts += Telescope.updateScore({collection: Posts, item: post});
      });
      Comments.find({'inactive': {$ne : true}}).forEach(function (comment) {
        updatedComments += Telescope.updateScore({collection: Comments, item: comment});
      });
      // console.log("Updated "+updatedPosts+"/"+Posts.find().count()+" Posts")
      // console.log("Updated "+updatedComments+"/"+Comments.find().count()+" Comments")
    }, scoreInterval * 1000);

    // inactive items get updated every hour
    Meteor.setInterval(function () {
      let updatedPosts = 0;
      let updatedComments = 0;

      Posts.find({'inactive': true}).forEach(function (post) {
        updatedPosts += Telescope.updateScore({collection: Posts, item: post});
      });
      Comments.find({'inactive': true}).forEach(function (comment) {
        updatedComments += Telescope.updateScore({collection: Comments, item: comment});
      });
    }, 3600 * 1000);

  }
});
