import React from "react";
import {logout} from "../../actions/AuthActions";
import {connect} from "react-redux";
import {pathLoginPage} from "../../constants/routesConstant";

class LogoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.logout();
    this.props.history.push(pathLoginPage)
  }
  
  render() {
    return (
      <div>LOGOUT PAGE</div>
    );
  }
}

LogoutComponent.propTypes = {};

export default connect(
  state => ({authReducer: state.authReducer}),
  {logout},
)(LogoutComponent)
