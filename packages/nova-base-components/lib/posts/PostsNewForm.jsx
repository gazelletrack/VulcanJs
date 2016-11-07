import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import NovaForm, { FormWrapper } from "meteor/nova:forms";
import { withRouter } from 'react-router'
import Posts from "meteor/nova:posts";
import update from 'immutability-helper';

const PostsNewForm = (props, context) => {
  return (
    <Telescope.components.CanDo
      action="posts.new"
      noPermissionMessage="users.cannot_post"
      displayNoPermissionMessage={true}
    >
      <div className="posts-new-form">
        <NovaForm
          collection={Posts}
          mutationName="postsNew"
          updateQueries={{
            getPostsView: (prev, { mutationResult }) => {
              const newPost = mutationResult.data.postsNew;
              const newList = update(prev, {
                posts: {
                  $unshift: [newPost],
                },
                postsViewTotal: {
                  $set: prev.postsViewTotal + 1
                }
              });
              return newList;
            }
          }}
          successCallback={post => {
            props.router.push({pathname: Posts.getPageUrl(post)});
            props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
          }}
        />
      </div>
    </Telescope.components.CanDo>
  );
};

PostsNewForm.propTypes = {
  router: React.PropTypes.object,
  flash: React.PropTypes.func,
}

PostsNewForm.contextTypes = {
  currentUser: React.PropTypes.object,
  triggerMainRefetch: React.PropTypes.func,
  intl: intlShape
};

PostsNewForm.displayName = "PostsNewForm";

module.exports = withRouter(PostsNewForm);
