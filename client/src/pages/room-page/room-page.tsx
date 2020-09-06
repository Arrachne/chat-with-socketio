import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { RouteComponentProps } from "react-router";
import io from "socket.io-client";
import { Redirect } from "react-router";

import { useStore } from "store/helpers";
import TextContainer from "components/text-container/text-container";
import Messages from "components/messages/messages";
import InfoBar from "components/infobar/infobar";
import Input from "components/input/input";
import { TUsers, TRoomData, TMessages, TMessage } from "types/users";

import "pages/room-page/room-page.css";

const SOCKET_IO_URL = "http://localhost:3000";
const socket = io(SOCKET_IO_URL);

type MatchParams = {
  room: string;
};

const Chat = ({ match }: RouteComponentProps<MatchParams>) => {
  const store = useStore();
  const { name, setName } = store;

  const { room } = match.params;

  // const [name, setName] = useState<string | null | undefined>("");
  // const [room, setRoom] = useState<string | null | undefined>("");
  const [users, setUsers] = useState<TUsers>([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<TMessages>([]);
  // const [flag, setFlag] = useState(0);

  // useEffect(() => {
  //   const { name, room } = queryString.parse(location.search);

  //   console.log(location);

  //   setName(Array.isArray(name) ? name[0] : name);
  //   setRoom(Array.isArray(room) ? room[0] : room);

  //   socket.emit("join", { name, room }, (error: string) => {
  //     if (error) {
  //       setFlag(1);
  //       alert(error);
  //     }
  //   });
  // }, [SOCKET_IO_URL, location.search]); //, [SOCKET_IO_URL, match.params] <- второй параметр???

  useEffect(() => {
    socket.on("message", (message: TMessage) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }: TRoomData) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event: any) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  // if (flag) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="layout">
      <div className="chat-container">
        <TextContainer users={users} room={room ? room : ""} />
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
