import React from "react";
import "./styles.scss";
import {myFirebase} from "../../firebase/myFirebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleProcessLoginGoogleAccount = this.handleProcessLoginGoogleAccount.bind(this);
    this.handleProcessLoginFacebookAccount = this.handleProcessLoginFacebookAccount.bind(this);
  }

  handleProcessLoginGoogleAccount() {
    myFirebase
      .auth()
      .signInWithPopup(new myFirebase.auth.GoogleAuthProvider())
      .then(async result => {
        console.log("result", result);
      })
      .catch(err => {
        console.log("Error auth Google Account: ", err);
      })
  }

  handleProcessLoginFacebookAccount() {

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin">
                  <div className="form-label-group">
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                           autoFocus/>
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  {/*<div className="custom-control custom-checkbox mb-3">*/}
                  {/*  <input type="checkbox" className="custom-control-input" id="customCheck1"/>*/}
                  {/*    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>*/}
                  {/*</div>*/}
                  <hr className="my-4"/>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase">Sign in</button>
                  <hr className="my-4"/>
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase btn-flex-icon"
                    onClick={this.handleProcessLoginGoogleAccount}
                  >
                    <FontAwesomeIcon icon={['fab', 'google']}/> Sign in with Google
                  </button>
                  <button
                    className="btn btn-lg btn-facebook btn-block text-uppercase"
                    onClick={this.handleProcessLoginFacebookAccount}
                  >
                    <FontAwesomeIcon icon={['fab', 'facebook']}/> Sign in with Facebook
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

LoginComponent.propTypes = {};

export default LoginComponent;