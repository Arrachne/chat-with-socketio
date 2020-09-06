import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "pages/login-page/login-page";
import RoomPage from "pages/room-page/room-page";
import { useStore } from "store/helpers";

const AppRouter = () => {
  const store = useStore();
  const { cookies } = store;
  
  return cookies.get("name") ? (
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
