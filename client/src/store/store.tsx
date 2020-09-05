export function createStore() {
  return {
    curUsername: '',
    rooms: ['JS', 'PHP'],

    setUsername(name: string) {
      this.curUsername = name;
    },
  }
}

export type TStore = ReturnType<typeof createStore>;
