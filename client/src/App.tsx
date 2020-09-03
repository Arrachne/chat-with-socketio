import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StoreProvider } from "store/helpers";
import LoginPage from "pages/login-page/login-page";
import RoomPage from "pages/room-page/room-page";

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/room" component={RoomPage}></Route>
        <Route path="/" component={LoginPage}></Route>
      </Switch>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
