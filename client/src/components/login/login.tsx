import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "store/helpers";
import Cookies from "universal-cookie";

import "components/login/login.css";

const cookies = new Cookies();

type Props = {
  room: string;
  isAuthed: boolean;
};

export const Login = observer(({ room, isAuthed }: Props) => {
  const store = useStore();

  const { name, setName, storeRoom, setStoreRoom } = store;

  const cookieName = cookies.get("name");

  useEffect(() => {
    if (room) {
      setStoreRoom(room);
    }
  }, [room, setStoreRoom]);

  useEffect(() => {
    if (cookieName) {
      setName(cookieName);
    }
  }, [cookieName, setName]);

  const onJoinClick = (event: any) => {
    if (!name || !storeRoom) {
      event.preventDefault();
      return;
    }

    if (name) {
      cookies.set("name", name, { path: "/" });
    }
  };

  const onLogoutClick = () => {
    cookies.remove("name");
    setName("");
  };

  return (
    <div className="login__layout">
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Welcome to chat!</h1>
          {isAuthed === false && (
            <div className="no-auth-warn">{`Please log in to join room "${room}"`}</div>
          )}
          <div>
            <input
              placeholder="Name"
              className="join-input"
              type="text"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div>
            <input
              placeholder="Room"
              className="join-input mt-20"
              type="text"
              onChange={(event) => setStoreRoom(event.target.value)}
              value={storeRoom}
            />
          </div>
          <a onClick={onJoinClick} href={`/chat/${storeRoom}`}>
            <button className={"button mt-20"} type="submit">
              Join
            </button>
          </a>
          {cookies.get("name") && (
            <div className={"logout mt-20"} onClick={onLogoutClick}>
              Log out
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
