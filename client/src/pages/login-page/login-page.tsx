import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import { useStore } from "store/helpers";
import io from "socket.io-client";
import Cookies from "universal-cookie";

import "pages/login-page/login-page.css";

// const SOCKET_IO_URL = "http://localhost:3000";
// const socket = io(SOCKET_IO_URL);

const cookies = new Cookies();

type MatchParams = {
  room: string;
};

const LoginPage = observer(({ match }: RouteComponentProps<MatchParams>) => {
  const store = useStore();
  console.log('login store',store)

  const { name, setName, roomS, setRoom } = store;

  const { room } = match.params;

  const cookieName = cookies.get('name');
   

  // const [localName, setLocalName] = useState(cookies.get("name"));
  // const [roomName, setRoomName] = useState(roomS); 
  // const [localName, setLocalName] = useState('');
  // const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (room) {
      setRoom(room)
    } 
  }, [room, setRoom]);

  useEffect(() => {
    if (cookieName) {
      setName(cookieName)
    } 
    console.log('useEffect name',name)
  }, [cookieName, name, setName]);

  const onJoinClick = (event: any) => {
    if (!name || !roomS) {
      event.preventDefault();
      return;
    }

    if (name) {
      cookies.set("name", name, { path: "/" });
      // setName(localName);
    }

    console.log('cookies',cookies.get("name"))
    console.log('storage',name)
  };

  const onLogoutClick = () => {
    cookies.remove("name");
    setName("");
    // setLocalName("");
  };

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
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            value={roomS}
          />
        </div>
        <Link
          onClick={onJoinClick}
          // to={`/chat?name=${name}&room=${room}`}
          to={`/chat/${roomS}`}
        >
          <button className={"button mt-20"} type="submit">
            Join
          </button>
        </Link>
        {cookies.get("name") && (
          <div className={"logout mt-20"} onClick={onLogoutClick}>
            Log out
          </div>
        )}
      </div>
    </div>
  );
});

export default LoginPage;
