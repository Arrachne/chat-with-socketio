import Cookies from "universal-cookie";

export function createStore() {
  return {
    name: '',
    roomS: '',

    rooms: ["JS", "PHP"],

    setName(name: string) {
      this.name = name;
      console.log('storage name',this.name)
    },

    setRoom(room: string) {
      this.roomS = room;
      console.log('storage room',this.roomS)
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
