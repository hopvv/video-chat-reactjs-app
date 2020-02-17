import React from 'react';
import "./styles/styles.scss";
import {Redirect, Switch} from "react-router-dom";
import routes, {RouteWithSubRoutes} from "./routes";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";
import * as Const from "./constants/constants";
import {myFirebase} from './firebase/myFirebase';
import {verify} from "./actions/AuthActions";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import NavBarView from "./views/NavBarView";
import {pathHomePage, pathLoginPage, pathSignUp} from "./constants/routesConstant";

// any of the brand icons in package may be referenced by icon name as a string anywhere else in our app
library.add(fas, fab);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInProcessingStatus: this.props.authReducer.signInProcessingStatus,
      signOnProcessingStatus: this.props.authReducer.signOnProcessingStatus,
    };
    this.getSwitchRouter = this.getSwitchRouter.bind(this);
  }
  
  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (props.authReducer.signInProcessingStatus !== state.signInProcessingStatus) {
      newState.signInProcessingStatus = props.authReducer.signInProcessingStatus;
      props.history.push(pathHomePage);
    } else
    if (props.authReducer.signOnProcessingStatus !== state.signOnProcessingStatus) {
      newState.signOnProcessingStatus = props.authReducer.signOnProcessingStatus;
      props.history.push(pathLoginPage);
    }
    
    if (Object.keys(newState).length > 0) {
      return newState;
    }
    return null;
  }
  
  componentDidMount() {
    if (localStorage.getItem(Const.ACCESS_TOKEN)) {
      this.props.verify();
    }
  }
  
  getSwitchRouter() {
    const {routes} = this.props;
    return (
      <Switch>
        {routes && routes.length > 0 && routes.map((route, i) => {
          return (
            <RouteWithSubRoutes key={i} {...route} loggedIn={this.props.authReducer.loggedIn} {...this.props}/>
          );
        })}
      </Switch>
    );
  }
  
  renderNavBar() {
    if (
      this.props.location.pathname === pathLoginPage ||
      this.props.location.pathname === pathSignUp
    ) return null;
    return (
      <NavBarView/>
    );
  }

  render() {
    return (
      <div className={"container-fluid h-100 app"}>
        {this.renderNavBar()}
        {
          this.props.authReducer.loading ?
          <LoadingPage isFullScreen/> : this.getSwitchRouter()
        }
      </div>
    );
  }
}


export default connect(
  (state) => ({
    authReducer: state.authReducer
  }),
  {verify}
)(App);