import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { LoginPage } from "routes/login-page";
import { RoomPage } from "routes/room-page";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function AppRouter() {
  const cookieName = cookies.get("name");
  const [isCookie, setIsCookie] = useState<boolean>();

  useEffect(() => {
    if (cookieName) {
      setIsCookie(true);
    } else {
      setIsCookie(false);
    }
  }, [cookieName, setIsCookie]);

  // if user not logged in, show login page
  return (
    <BrowserRouter>
      {isCookie ? (
        <Switch>
          <Route path="/chat/:room" component={RoomPage}></Route>
          <Route
            path="/"
            render={(props) => <LoginPage {...props} isAuthed={true} />}
          ></Route>
        </Switch>
      ) : (
        <Switch>
          <Route
            path="/chat/:room"
            render={(props) => <LoginPage {...props} isAuthed={false} />}
          ></Route>
          <Route path="/" component={LoginPage}></Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}
