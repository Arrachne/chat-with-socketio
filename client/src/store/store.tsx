import Cookies from "universal-cookie";

export function createStore() {
  return {
    name: "",
    cookies: new Cookies(),

    rooms: ["JS", "PHP"],

    setName(name: string) {
      this.name = name;
    },
  };
}

export type TStore = ReturnType<typeof createStore>;
