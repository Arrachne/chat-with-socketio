import Cookies from "universal-cookie";

export function createStore() {
  return {
    name: '',
    storageRoom: '',

    setName(name: string) {
      this.name = name;
    },

    setStorageRoom(room: string) {
      this.storageRoom = room;
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
