import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import Register from "../pages/register";
import ListUsers from "../pages/listusers";
import EditUser from "../pages/edituser";

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Register} />
        <Route path="/users" exact={true} component={ListUsers} />
        <Route path="/edit/:id" exact={true} component={EditUser} />
      </Switch>
    </BrowserRouter>
  );
}
