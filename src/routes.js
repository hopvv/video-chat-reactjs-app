import LoginComponent from "./components/LoginComponent";
import LogoutComponent from "./components/LogoutComponent";
import HomePage from "./pages/HomePage";
import {Route, Redirect} from "react-router-dom";
import {pathLoginPage, pathLogoutPage, pathHomePage, pathAbout, pathProfile, pathProfiles} from "./constants/routesConstant";
import React from "react";


const routes = [
  {exact: true, path: '/', component: LoginComponent, authRequire: false},
  {exact: true, path: pathLoginPage, component: LoginComponent},
  {exact: true, path: pathLogoutPage, component: LogoutComponent},
  {exact: true, path: pathHomePage, component: HomePage, routes: [], authRequire: true},
  {exact: true, path: pathAbout, component: () => <div>ABOUT PAGE</div>},
  {exact: true, path: pathProfile, component: () => <div>PROFILE PAGE</div>},
  {exact: true, path: pathProfiles, component: () => <div>LIST PROFILES</div>},
  {exact: false, path: "*", component: () => <Redirect to={pathLoginPage}/>},
];

export default routes;

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        if (route.authRequire && !route.loggedIn) {
          return (
            <Redirect to={pathLoginPage}/>
          );
        }
        return (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes}/>
        );
      }}
    />
  );
}