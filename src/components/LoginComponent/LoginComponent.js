import React from "react";
import "./styles.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {login, loginGoogleAccount, loginFacebookAccount} from "../../actions/AuthActions";
import {connect} from "react-redux";
import {CUSTOM_CONFIG_LOGIN} from "../../constants/config";
import {pathSignUp} from "../../constants/routesConstant";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleProcessLoginGoogleAccount = this.handleProcessLoginGoogleAccount.bind(this);
    this.handleProcessLoginFacebookAccount = this.handleProcessLoginFacebookAccount.bind(this);
    this.handleLoginByEmail = this.handleLoginByEmail.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSignUpNewAccount = this.handleSignUpNewAccount.bind(this);
  }
  
  async handleProcessLoginGoogleAccount() {
    this.props.loginGoogleAccount();
  }
  
  handleProcessLoginFacebookAccount() {
    this.props.loginFacebookAccount();
  }
  
  handleSignUpNewAccount() {
    this.props.history.push(pathSignUp)
  }
  
  async handleLoginByEmail() {
    this.props.login(this.state.email, this.state.password);
  }
  
  onChangeEmail(event) {
    event.preventDefault();
    this.setState({email: event.target.value});
  }
  
  onChangePassword(event) {
    event.preventDefault();
    this.setState({password: event.target.value});
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <div className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoFocus
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>
                  
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  
                  {/*<div className="custom-control custom-checkbox mb-3">*/}
                  {/*  <input type="checkbox" className="custom-control-input" id="customCheck1"/>*/}
                  {/*    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>*/}
                  {/*</div>*/}
                  
                  <hr className="my-4"/>
                  
                  {CUSTOM_CONFIG_LOGIN.LOGIN_BY_EMAIL && <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={this.handleLoginByEmail}
                  >Sign in
                  </button>}
                  
                  <hr className="my-4"/>
                  
                  {CUSTOM_CONFIG_LOGIN.LOGIN_BY_GOOGLE_ACCOUNT && <button
                    className="btn btn-lg btn-google btn-block text-uppercase btn-flex-icon"
                    onClick={this.handleProcessLoginGoogleAccount}
                  >
                    <FontAwesomeIcon icon={['fab', 'google']}/> Sign in with Google
                  </button>}
                  
                  {CUSTOM_CONFIG_LOGIN.LOGIN_BY_FACEBOOK_ACCOUNT && <button
                    className="btn btn-lg btn-facebook btn-block text-uppercase"
                    onClick={this.handleProcessLoginFacebookAccount}
                  >
                    <FontAwesomeIcon icon={['fab', 'facebook']}/> Sign in with Facebook
                  </button>}
  
                  <hr className="my-4"/>
                  
                  <button
                    className="btn btn-lg btn-light btn-block text-uppercase"
                    onClick={this.handleSignUpNewAccount}
                  >
                    Register new account
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

LoginComponent.propTypes = {};

export default connect(
  // state => (state),
  state => ({authReducer: state.authReducer}),
  {login, loginGoogleAccount, loginFacebookAccount},
)(LoginComponent)
