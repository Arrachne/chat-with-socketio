import React from "react";
import { StoreProvider } from "store/helpers";
import { AppRouter } from "components/app-router";

export const App = () => (
  <StoreProvider>
    <AppRouter />
  </StoreProvider>
);
