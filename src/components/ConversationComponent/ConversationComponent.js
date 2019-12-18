import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import Proptypes from "prop-types";
import "./styles.scss";

class ConversationComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      conversation,
      conversation: {
        user
      }
    } = this.props;
    return (
      <div className="conversation">
        <UserAvatar
          user={user}
          onClick={() => {alert("Clicked avatar")}}
          isOnline
        />
        <div className="conversation__user-info">
          <span className="conversation__user-name">{user.displayName}</span>
          <span className="conversation__user-status">{user.statusText}</span>
        </div>
      </div>
    );
  }
}

ConversationComponent.propTypes = {
  conversation: Proptypes.object
};

export default ConversationComponent;