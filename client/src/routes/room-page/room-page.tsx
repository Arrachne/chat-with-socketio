import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import io from "socket.io-client";
import { Redirect } from "react-router";
import Cookies from "universal-cookie";
import { observer } from "mobx-react";
import { useStore } from "store/helpers";
import { TextContainer } from "components/text-container";
import { Messages } from "components/messages";
import { InfoBar } from "components/infobar";
import { Input } from "components/input";
import { TUsers, TRoomData, TMessages, TMessage } from "types/types";

import "routes/room-page/room-page.css";

const socket = io();

type MatchParams = {
  room: string;
};

const cookies = new Cookies();

export const RoomPage = observer(
  ({ match }: RouteComponentProps<MatchParams>) => {
    const { room } = match.params;

    const store = useStore();
    const { name, setName } = store;

    const [users, setUsers] = useState<TUsers>([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<TMessages>([]);
    const [flag, setFlag] = useState(0);

    const cookieName = cookies.get("name");

    useEffect(() => {
      if (cookieName) {
        setName(cookieName);
      }
    }, [cookieName, setName]);

    useEffect(() => {
      socket.emit("join", { name, room }, (error: string) => {
        if (error) {
          setFlag(1);
          alert(error);
        }
      });
    }, [name, room]);

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

    if (flag) {
      return <Redirect to="/" />;
    }

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
  }
);
