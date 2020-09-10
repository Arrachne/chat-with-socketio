import Cookies from "universal-cookie";

export function createStore() {
  return {
    name: '',
    storeRoom: '',

    setName(name: string) {
      this.name = name;
    },

    setStoreRoom(room: string) {
      this.storeRoom = room;
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
