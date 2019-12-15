import React from 'react';
import "./styles/styles.scss";
import {Route, Switch,} from "react-router-dom";
import routes from "./constants/routes";
import APODComponent from "./components/APODComponent";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'

// any of the brand icons in package may be referenced by icon name as a string anywhere else in our app
library.add(fas, fab);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getSwitchRouter = this.getSwitchRouter.bind(this);
  }

  componentDidMount() {
  }

  getSwitchRouter() {
    return (
      <Switch>
        {routes && routes.length > 0 && routes.map((route, index) => {
          return (
            <Route path={route.path} component={route.component} exact={route.exact} key={index}/>
          );
        })}
      </Switch>
    );
  }

  render() {
    return (
      <div className={"app"}>
        {this.getSwitchRouter()}
        {/*<APODComponent/>*/}
      </div>
    );
  }
}
