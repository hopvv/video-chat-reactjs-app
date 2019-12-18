import LoginComponent from "../components/LoginComponent";
import HomePage from "../pages/HomePage";
import {Route} from "react-router-dom";
import React from "react";

const routes = [
  {exact: true, path: "/", component: HomePage},
  {exact: true, path: "/home-page", component: HomePage, routes: []},
  {exact: true, path: "/login", component: LoginComponent},
];

export default routes;

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}