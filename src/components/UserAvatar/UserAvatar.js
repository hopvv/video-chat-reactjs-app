import React from "react";
import Proptypes from "prop-types";
import cn from "classnames";
import "./styles.scss";
import Images from "../../themes/Images";

class UserAvatar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: !this.props.user.photoURL || false
    };
    this.handleLoadImage = this.handleLoadImage.bind(this);
    this.handleOnLoadImageError = this.handleOnLoadImageError.bind(this);
  }

  handleOnLoadImageError() {
    this.setState({hasError: true})
  }

  handleLoadImage() {
    this.setState({hasError: false})
  }

  render() {
    const {
      onClick,
      user,
      isOnline,
      className,
      hideStatus
    } = this.props;
    return (
      <div className={cn("user-avatar", {[className]: className})} onClick={onClick}>
        <img
          className={cn("rounded-circle user-avatar__img", {"hidden": this.state.hasError})}
          src={user.photoURL}
          onError={this.handleOnLoadImageError}
          onLoad={this.handleLoadImage}
        />
        <img
          className={cn("rounded-circle user-avatar__img", {"hidden": !this.state.hasError})}
          src={Images.noProfile}
        />
        {!hideStatus && <span className={cn("user-avatar__online-icon", {"offline": !isOnline})}/>}
      </div>
    );
  }
}

UserAvatar.propTypes = {
  onClick: Proptypes.func,
  user: Proptypes.object,
  isOnline: Proptypes.bool,
  hideStatus: Proptypes.bool,
  className: Proptypes.string,
};

UserAvatar.defaultProps = {
  user: {},
  hideStatus: false
};

export default UserAvatar;