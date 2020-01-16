import LoginComponent from "../components/LoginComponent";
import HomePage from "../pages/HomePage";
import {Route, Redirect} from "react-router-dom";
import React from "react";

const routes = [
  {exact: true, path: "/", component: LoginComponent, authRequire: false},
  {exact: true, path: "/login", component: LoginComponent},
  {exact: true, path: "/home-page", component: HomePage, routes: [], authRequire: true},
  {exact: false, path: "*", component: () => <Redirect to="/login"/>}
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
            <Redirect to="/login"/>
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