import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Login from "../pages/User/Login/Login";
import Register from "../pages/User/Register/Register";
import List from "../pages/Data/List/List";
import Detail from "../pages/Data/Detail/Detail";

const routerList = [
  {
    path: "/",
    component: App,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/list/:id",
    component: List,
  },
  {
    path: "/Detail",
    component: Detail,
  },
];

function BasicRoute() {
  return (
    <BrowserRouter>
      <Switch>
        {routerList.map((item, index) => {
          return (
            <Route
              key="index"
              exact
              path={item.path}
              component={item.component}
            ></Route>
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default BasicRoute;
