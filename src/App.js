import React from 'react';
import "./styles/styles.scss";
import {
  Switch,
  Route,
} from "react-router-dom";
import APODComponent from "./components/APODComponent";
import routes from "./constants/routes";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab);

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
            <Route path={route.path} component={route.component} exact={route.exact} key={index} />
          );
        })}
      </Switch>
    );
  }
  
  render() {
    return (
      <div className={"app"}>
        {this.getSwitchRouter()}
        {/*<APODComponent />*/}
      </div>
    );
  }
}
