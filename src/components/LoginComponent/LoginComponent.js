import React from "react";
import Proptypes from "prop-types";

import myFirebase from "../../firebase/myFirebase";

class LoginComponent extends React.Component{
  constructor(props) {
    super(props);
    this.handleProcessLoginGoogleAccount = this.handleProcessLoginGoogleAccount.bind(this);
  }

  handleProcessLoginGoogleAccount() {
    myFirebase
      .auth()
      .signInWithPopup(new myFirebase.auth.GoogleAuthProvider())
      .then(async result => {})
      .catch(err => {})
  }

  render() {
    return (
      <div className="login-page">
        <div
          className="button-login"
          onClick={this.handleProcessLoginGoogleAccount}
        >
          SIGNIN WITH GGOGLE ACCOUNT
        </div>
      </div>
    );
  };
}

LoginComponent.propTypes = {
};

export default LoginComponent;