Template[getTemplate('comment_form')].helpers({
  canComment: function(){
    return canComment(Meteor.user());
  }
});

Template[getTemplate('comment_form')].events({
  'submit form': function(e, instance){

    e.preventDefault();
    $(e.target).addClass('disabled');
    clearSeenMessages();


    var comment = {};
    var $commentForm = instance.$('#comment');
    var $submitButton = instance.$('.btn-submit');
    var body = $commentForm.val();

    // now that the form is latency compensated, we don't actually need to show this
    // $commentForm.prop('disabled', true);
    // $submitButton.addClass('loading');

    $commentForm.val('');

    if(getCurrentTemplate() == 'comment_reply'){
    
      var parentComment = this.comment;
    
      // child comment
      
      comment = {
        postId: parentComment.postId, 
        parentCommentId: parentComment._id, 
        body: body
      };

      Meteor.call('submitComment', comment, function(error, newComment){

        $commentForm.prop('disabled', false);
        $submitButton.removeClass('loading');

        if (error) {
          console.log(error);
          flashMessage(error.reason, "error");
        } else {
          trackEvent("newComment", newComment);
        }

      });

    }else{
      
      // root comment
      var post = postObject;

      comment = {
        postId: post._id,
        body: body
      }
      
      Meteor.call('submitComment', comment, function(error, newComment){
      
        $commentForm.prop('disabled', false);
        $submitButton.removeClass('loading');

        if(error){
          console.log(error);
          flashMessage(error.reason, "error");
        }else{
          trackEvent("newComment", newComment);
        }
      
      });
    }
  }
});
