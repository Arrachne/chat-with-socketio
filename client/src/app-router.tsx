import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "pages/login-page/login-page";
import RoomPage from "pages/room-page/room-page";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AppRouter = () => {
  const cookieName = cookies.get("name");
  const [isCookie, setIsCookie] = useState<boolean>();

  useEffect(() => {
    if (cookieName) {
      setIsCookie(true);
    } else {
      setIsCookie(false);
    }
  }, [cookieName, setIsCookie]);

  return (
    <BrowserRouter>
      {isCookie ? (
        <Switch>
          <Route path="/chat/:room" component={RoomPage}></Route>
          <Route path="/" component={LoginPage}></Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/chat/:room" component={LoginPage}></Route>
          <Route path="/" component={LoginPage}></Route>
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
