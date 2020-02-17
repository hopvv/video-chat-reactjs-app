import React from "react";
import "./styles.scss";
import {login, loginGoogleAccount, signOn} from "../../actions/AuthActions";
import {connect} from "react-redux";
import {pathLoginPage} from "../../constants/routesConstant";
import {
  MIN_LENGTH_PHONE_NUMBER,
  USER_NAME_REGEX, MAX_LENGTH_USER_NAME, PASSWORD_REGEX, EMAIL_REGEX
} from "../../constants/config";
import cn from "classnames";
import HelperButton from "../buttons/HelperButton";
import Tooltip from "react-bootstrap/Tooltip";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
      inValidPhoneNumber: false,
      signOnProcessingStatus: this.props.authReducer.signOnProcessingStatus
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
    const invalid = !this.state.displayName.match(USER_NAME_REGEX);
    this.setState({inValidDisplayName: invalid});
    return !invalid;
  }
  
  isValidEmail() {
    const invalid = !this.state.email.match(EMAIL_REGEX);
    this.setState({inValidEmail: invalid});
    return !invalid;
  }
  
  isValidPassword() {
    const invalid = !this.state.password.match(PASSWORD_REGEX);
    this.setState({inValidPassword: invalid});
    return !invalid;
  }
  
  isValidPhoneNumber() {
    const invalid = !this.state.phoneNumber || this.state.phoneNumber.length < MIN_LENGTH_PHONE_NUMBER;
    this.setState({inValidPhoneNumber: invalid});
    return !invalid;
  }
  
  handleSignUpNewAccount() {
    if (!this.isValidEmail() || !this.isValidPassword() || !this.isValidDisplayName() || !this.isValidPhoneNumber()) {
      return;
    }
    this.props.signOn({
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
    });
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
                  
                  <div className={cn("form-label-group", {"warning-wrapper": inValidEmail})}>
                    <input
                      type="email"
                      id="inputEmail"
                      autoComplete="new-password"
                      className="form-control"
                      placeholder="Input you email"
                      required
                      autoFocus
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                    {inValidEmail && <div className="warning-label">Email is incorrect</div>}
                    {inValidEmail && <HelperButton
                      overlay={(props) => {
                        return (<Tooltip {...props} show={props.show.toString()}>
                          <ul style={{listStylePosition: "inside", textAlign: "start"}}>
                            <li>From 5 to 32 characters in email name</li>
                            <li>Has to start by character, not number</li>
                            <li>Allow a-z, A-Z, number, '._' for name email</li>
                          </ul>
                        </Tooltip>);
                      }}
                    >
                      <Button variant=""><FontAwesomeIcon icon={['fas', 'question-circle']}/></Button>
                    </HelperButton>}
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
                    {inValidPassword && <HelperButton
                      overlay={(props) => {
                        return (<Tooltip {...props} show={props.show.toString()}>
                          <ul style={{listStylePosition: "inside", textAlign: "start"}}>
                            <li>From 8 - 30 characters</li>
                            <li>Allow a-z, A-Z, number, do not allow some of chars #$^+=!*()@%&</li>
                          </ul>
                        </Tooltip>);
                      }}
                    >
                      <Button variant=""><FontAwesomeIcon icon={['fas', 'question-circle']}/></Button>
                    </HelperButton>}
                  </div>
                  
                  <div className={cn("form-label-group", {"warning-wrapper": inValidDisplayName})}>
                    <input
                      type="name"
                      id="inputName"
                      className="form-control"
                      placeholder="User name"
                      required
                      autoComplete="new-password"
                      value={this.state.displayName}
                      onChange={this.onChangeDisplayName}
                      maxLength={MAX_LENGTH_USER_NAME}
                    />
                    <label htmlFor="inputName">Display name</label>
                    {inValidDisplayName && <div className="warning-label">User name is incorrect</div>}
                    {inValidDisplayName && <HelperButton
                      overlay={(props) => {
                        return (<Tooltip {...props} show={props.show.toString()}>
                          <ul style={{listStylePosition: "inside", textAlign: "start"}}>
                            <li>From 6 - 12 characters</li>
                            <li>No _ or . at the beginning</li>
                            <li>No __ or _. or ._ or .. inside</li>
                            <li>No _ or . at the end</li>
                          </ul>
                        </Tooltip>);
                      }}
                    >
                      <Button variant=""><FontAwesomeIcon icon={['fas', 'question-circle']}/></Button>
                    </HelperButton>}
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
                    {inValidPhoneNumber && <HelperButton
                      overlay={(props) => {
                        return (<Tooltip {...props} show={props.show.toString()}>
                          <ul style={{listStylePosition: "inside", textAlign: "start"}}>
                            <li>Minimum 9 characters</li>
                            <li>Only allow number</li>
                          </ul>
                        </Tooltip>);
                      }}
                    >
                      <Button variant=""><FontAwesomeIcon icon={['fas', 'question-circle']}/></Button>
                    </HelperButton>}
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
  {login, loginGoogleAccount, signOn},
)(RegisterComponent)
