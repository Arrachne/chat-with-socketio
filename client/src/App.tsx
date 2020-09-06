import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "store/helpers";
import AppRouter from "app-router";

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StoreProvider>
);

export default App;
