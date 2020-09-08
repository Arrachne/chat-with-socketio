import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "pages/login-page/login-page";
import RoomPage from "pages/room-page/room-page";
import { useStore } from "store/helpers";
import { observer } from "mobx-react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AppRouter = () => {
  // const store = useStore();
  // const { cookies, name, setName } = store;

  // setName(cookies.get('name'))
  console.log('router cookies',cookies.get("name"))
  // console.log('router name',name)
  // debugger
  // cookies.get("name") || name
  return (cookies.get("name")) ? (
    <Switch>
      <Route path="/chat/:room" component={RoomPage}></Route>
      <Route path="/" component={LoginPage}></Route>
    </Switch>
  ) : (
    <Switch>
      <Route path="/chat/:room" component={LoginPage}></Route>
      <Route path="/" component={LoginPage}></Route>
    </Switch>
  );
};

export default AppRouter;
