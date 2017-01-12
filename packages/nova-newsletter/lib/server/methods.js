import Newsletter from "../namespace.js";
import MailChimpList from "./mailchimp/mailchimp_list.js";
import Users from 'meteor/nova:users';

Meteor.methods({
  'newsletter.send': function () {
    if(Users.isAdminById(this.userId))
      return Newsletter.scheduleNextWithMailChimp(false);
  },
  'newsletter.test': function () {
    if(Users.isAdminById(this.userId))
      return Newsletter.scheduleNextWithMailChimp(true);
  },
  'newsletter.addUser'(user){
    const currentUser = Users.findOne({_id: this.userId});
    user = Users._transform(user);
    if (!user || !Users.options.mutations.edit.check(currentUser, user)) {
      throw new Meteor.Error(601, 'sorry_you_cannot_edit_this_user');
    }

    try {
      return MailChimpList.add(user, false);
    } catch (error) {
      throw new Meteor.Error(500, error.message);
    }
  },
  'newsletter.removeUser'(user) {
    const currentUser = Users.findOne({_id: this.userId});
    user = Users._transform(user);
    if (!user || !Users.options.mutations.edit.check(currentUser, user)) {
      throw new Meteor.Error(601, 'sorry_you_cannot_edit_this_user');
    }

    try {
      return MailChimpList.remove(user);
    } catch (error) {
      throw new Meteor.Error(500, error.message);
    }
  },
  'newsletter.addEmail'(email) {
    try {
      return MailChimpList.add(email, true);
    } catch (error) {
      throw new Meteor.Error(500, error.message);
    }
  }
});
