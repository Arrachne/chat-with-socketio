import React, { ReactNode } from "react";
import { createStore, TStore } from "store/store";
import { useLocalStore } from "mobx-react";

interface IProps {
    children: ReactNode;
}

const storeContext = React.createContext<TStore | null>(null);

export const StoreProvider = ({ children }: IProps) => {
  const store = useLocalStore(createStore);
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
