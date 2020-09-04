import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from "store/helpers";
import io from "socket.io-client";

import "pages/login-page/login-page.css";

const SOCKET_IO_URL = "http://localhost:3000";
const socket = io(SOCKET_IO_URL);

const LoginPage: React.FC = observer(() => {
  const store = useStore();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("salutations", "----------- Hello! ------------------");
    });
  });

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
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
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
