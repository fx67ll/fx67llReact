import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Login from "../pages/User/Login/Login";
import Register from "../pages/User/Register/Register";
import List from "../pages/Data/List/List";
import TodoList from "../pages/Data/TodoList/TodoList";

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
    path: "/TodoList",
    component: TodoList,
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
              // 如果jsx中没有return虚拟dom出来的话，使用上面的方式引入会报错，不过使用下面的不return也不会报错
              // render={(props) => <item.component {...props} />}
            ></Route>
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default BasicRoute;
