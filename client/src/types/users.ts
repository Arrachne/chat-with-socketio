export type TUser = {
  id: number | string;
  name: string;
  room: string;
};

export type TUsers = TUser[];

export type TRoomData = {
  room: string;
  users: TUsers;
};

export type TMessage = {
  text: string;
  user: string;
};

export type TMessages = TMessage[];
