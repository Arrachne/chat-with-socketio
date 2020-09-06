import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect, RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import { useStore } from "store/helpers";
import io from "socket.io-client";

import "pages/login-page/login-page.css";

const SOCKET_IO_URL = "http://localhost:3000";
const socket = io(SOCKET_IO_URL);

type MatchParams = {
  room: string;
};

const LoginPage = observer(({ match }: RouteComponentProps<MatchParams>) => {
  const store = useStore();
  // const { curUsername, setUsername } = store;
  const { name, setName, cookies } = store;

  // if (cookies.get("name")) {
  //   setName(cookies.get("name"));
  // }

  const { room } = match.params;

  const [localName, setLocalName] = useState(cookies.get("name"));
  const [roomName, setRoom] = useState(room);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    // setRoom(room)
  });

  const onJoinClick = (event: any) => {
    if (!localName || !roomName) {
      event.preventDefault();
      return;
    }

    if (localName) {
      cookies.set("name", localName, { path: "/" });
      setName(localName);
    }

    socket.emit("join", { localName, roomName }, (error: string) => {
      if (error) {
        setFlag(1);
        alert(error);
      }
    });
  };

  // if (flag) {
  //   return <Redirect to="/" />;
  // }

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     socket.emit("salutations", "----------- Hello! ------------------");
  //   });
  // });

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Welcome to chat!</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setLocalName(event.target.value)}
            value={localName}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            value={roomName}
          />
        </div>
        <Link
          onClick={onJoinClick}
          // to={`/chat?name=${name}&room=${room}`}
          to={`/chat/${roomName}`}
        >
          <button className={"button mt-20"} type="submit">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
});

export default LoginPage;
