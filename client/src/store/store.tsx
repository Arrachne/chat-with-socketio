export function createStore() {
  return {
    users: [{
      userName: "Jane",
      room: "JS",
    },
    {
      userName: "Mark",
      room: "JS",
    }],
    rooms: ['JS', 'PHP']
  }
}

export type TStore = ReturnType<typeof createStore>;
