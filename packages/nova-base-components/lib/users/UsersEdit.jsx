import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import NovaForm from "meteor/nova:forms";
//import { Messages } from "meteor/nova:core";
import Users from 'meteor/nova:users';

const UsersEdit = (props, context) => {

  const user = props.document;
  const currentUser = props.currentUser;

  return (
    <Telescope.components.CanDo 
      action="users.edit"
      document={user}
      displayNoPermissionMessage={true}
    >
      <div className="page users-edit-form">
        <h2 className="page-title users-edit-form-title"><FormattedMessage id="users.edit_account"/></h2>
        <NovaForm 
          collection={Users} 
          document={user} 
          methodName="users.edit"
          successCallback={(user)=>{
            context.messages.flash(context.intl.formatMessage({id: "users.edit_success"}, {name: Users.getDisplayName(user)}), 'success')
          }}
        />
      </div>
    </Telescope.components.CanDo>
  )
};

  
UsersEdit.propTypes = {
  document: React.PropTypes.object,
};

UsersEdit.contextTypes = {
  currentUser: React.PropTypes.object,
  messages: React.PropTypes.object,
  intl: intlShape
};

UsersEdit.displayName = "UsersEdit";

module.exports = UsersEdit;
export default UsersEdit;