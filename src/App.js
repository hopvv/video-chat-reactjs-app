import React from 'react';
import "./styles/styles.scss";
import {Redirect, Switch} from "react-router-dom";
import {RouteWithSubRoutes} from "./constants/routes";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {connect} from "react-redux";

// any of the brand icons in package may be referenced by icon name as a string anywhere else in our app
library.add(fas, fab);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getSwitchRouter = this.getSwitchRouter.bind(this);
  }

  getSwitchRouter() {
    const {routes} = this.props;
    if (this.props.authReducer.loggedIn) {
      return (
        <Switch>
          {routes && routes.length > 0 && routes.map((route, i) => {
            return (
              <RouteWithSubRoutes key={i} {...route}/>
            );
          })}
        </Switch>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    }
  }

  render() {
    return (
      <div className={"container-fluid h-100 app"}>
        {this.getSwitchRouter()}
      </div>
    );
  }
}


export default connect(
  (state) => ({
    authReducer: state.authReducer
  }),
  {}
)(App);