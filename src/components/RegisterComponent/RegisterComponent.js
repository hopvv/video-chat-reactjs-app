import React from "react";
import "./styles.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {login, loginGoogleAccount, loginFacebookAccount} from "../../actions/AuthActions";
import {connect} from "react-redux";
import {pathLoginPage} from "../../constants/routesConstant";
import {MIN_LENGTH_USER_NAME, MIN_LENGTH_PASSWORD, MIN_LENGTH_PHONE_NUMBER} from "../../constants/config";
import cn from "classnames";

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      phoneNumber: "",
      inValidDisplayName: false,
      inValidEmail: false,
      inValidPassword: false,
      inValidPhoneNumber: false
    };
    this.isValidDisplayName = this.isValidDisplayName.bind(this);
    this.isValidEmail = this.isValidEmail.bind(this);
    this.isValidPassword = this.isValidPassword.bind(this);
    this.isValidPhoneNumber = this.isValidPhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.handleSignUpNewAccount = this.handleSignUpNewAccount.bind(this);
    this.handleNavigateToLoginPage = this.handleNavigateToLoginPage.bind(this);
  }
  
  isValidDisplayName() {
    const invalid = !this.state.displayName || this.state.displayName.length < MIN_LENGTH_USER_NAME;
    this.setState({inValidDisplayName: invalid});
    return invalid;
  }
  
  isValidEmail() {
    const invalid = !this.state.email;
    this.setState({inValidEmail: invalid});
    return invalid;
  }
  
  isValidPassword() {
    const invalid = !this.state.password || this.state.password.length < MIN_LENGTH_PASSWORD;
    this.setState({inValidPassword: invalid});
    return invalid;
  }
  
  isValidPhoneNumber() {
    const invalid = !this.state.phoneNumber || this.state.phoneNumber.length < MIN_LENGTH_PHONE_NUMBER;
    this.setState({inValidPhoneNumber: invalid});
    return invalid;
  }
  
  handleSignUpNewAccount() {
    if (!this.isValidDisplayName() || !this.isValidEmail() || !this.isValidPassword() || !this.isValidPhoneNumber()) {
      return;
    }
    console.log("REGISTER");
  }
  
  handleNavigateToLoginPage() {
    this.props.history.push(pathLoginPage);
  }
  
  onChangeEmail(event) {
    event.preventDefault();
    this.setState({email: event.target.value}, () => {
      this.state.inValidEmail && this.isValidEmail();
    });
  }
  
  onChangeDisplayName(event) {
    event.preventDefault();
    this.setState({displayName: event.target.value}, () => {
      this.state.inValidDisplayName && this.isValidDisplayName();
    });
  }
  
  onChangePhoneNumber(event) {
    event.preventDefault();
    this.setState({phoneNumber: event.target.value}, () => {
      this.state.inValidPhoneNumber && this.isValidPhoneNumber();
    });
  }
  
  onChangePassword(event) {
    event.preventDefault();
    this.setState({password: event.target.value}, () => {
      this.state.inValidPassword && this.isValidPassword();
    });
  }
  
  render() {
    const {
      inValidDisplayName,
      inValidEmail,
      inValidPassword,
      inValidPhoneNumber
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Register new account</h5>
                <div className="form-signup">
                  <div className={cn("form-label-group", {"warning-wrapper": inValidDisplayName})}>
                    <input
                      type="name"
                      id="inputName"
                      className="form-control"
                      placeholder="User name"
                      required
                      autoFocus
                      autoComplete="new-password"
                      value={this.state.displayName}
                      onChange={this.onChangeDisplayName}
                    />
                    <label htmlFor="inputName">Name</label>
                    {inValidDisplayName && <div className="warning-label">User name is incorrect</div>}
                  </div>
  
                  <div className={cn("form-label-group", {"warning-wrapper": inValidPassword})}>
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      autoComplete="new-password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                    <label htmlFor="inputPassword">Password</label>
                    {inValidPassword && <div className="warning-label">Password is incorrect</div>}
                  </div>
  
                  <div className={cn("form-label-group", {"warning-wrapper": inValidEmail})}>
                    <input
                      type="email"
                      id="inputEmail"
                      autoComplete="new-password"
                      className="form-control"
                      placeholder="Input you email"
                      required
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                    <label htmlFor="inputEmail">Email</label>
                    {inValidEmail && <div className="warning-label">Email is incorrect</div>}
                  </div>
  
                  <div className={cn("form-label-group", {"warning-wrapper": inValidPhoneNumber})}>
                    <input
                      type="number"
                      id="inputPhoneNumber"
                      className="form-control"
                      autoComplete="new-password"
                      placeholder="Your phone number"
                      required
                      value={this.state.phoneNumber}
                      onChange={this.onChangePhoneNumber}
                    />
                    <label htmlFor="inputPhoneNumber">Phone number</label>
                    {inValidPhoneNumber && <div className="warning-label">Phone number is incorrect</div>}
                  </div>
                  
                  <hr className="my-4"/>
                  
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={this.handleSignUpNewAccount}
                  >
                    Register
                  </button>
  
                  <hr className="my-4"/>
                  
                  <button
                    className="btn btn-lg btn-light btn-block text-uppercase"
                    onClick={this.handleNavigateToLoginPage}
                  >
                    Have an account?
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

RegisterComponent.propTypes = {};

export default connect(
  // state => (state),
  state => ({authReducer: state.authReducer}),
  {login, loginGoogleAccount, loginFacebookAccount},
)(RegisterComponent)
