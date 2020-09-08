import React from "react";
import { StoreProvider } from "store/helpers";
import AppRouter from "app-router";

const App = () => (
  <StoreProvider>
    <AppRouter />
  </StoreProvider>
);

export default App;
