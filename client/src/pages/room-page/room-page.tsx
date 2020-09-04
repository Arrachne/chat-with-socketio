import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { RouteComponentProps } from "react-router";
import io from "socket.io-client";
import { Redirect } from "react-router";

import TextContainer from "components/text-container/text-container";
import Messages from "components/messages/messages";
import InfoBar from 'components/infobar/infobar';
import Input from 'components/input/input';
import { TUsers, TRoomData, TMessages, TMessage } from "types/users";

import "pages/room-page/room-page.css";

interface MatchParams {
  name: string;
  room: string;
}

interface IProps extends RouteComponentProps<MatchParams> {}

const SOCKET_IO_URL = "http://localhost:3000";
const socket = io(SOCKET_IO_URL);

const Chat = ({ location }: RouteComponentProps) => {
  const [name, setName] = useState<string | null | undefined>("");
  const [room, setRoom] = useState<string | null | undefined>("");
  const [users, setUsers] = useState<TUsers>([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<TMessages>([]);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(Array.isArray(name) ? name[0] : name);
    setRoom(Array.isArray(room) ? room[0] : room);

    console.log("joining: ", name, room);

    socket.emit("join", { name, room }, (error: string) => {
      if (error) {
        setFlag(1);
        alert(error);
      }
    });
  }, [SOCKET_IO_URL, location.search]); //, [SOCKET_IO_URL, match.params] <- второй параметр???

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

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  if (flag) {
    return <Redirect to="/" />;
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
