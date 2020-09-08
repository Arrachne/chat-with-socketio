import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import { useStore } from "store/helpers";
import Cookies from "universal-cookie";

import "pages/login-page/login-page.css";

const cookies = new Cookies();

type MatchParams = {
  room: string;
};

const LoginPage = observer(({ match }: RouteComponentProps<MatchParams>) => {
  const store = useStore();

  const { name, setName, storageRoom, setStorageRoom } = store;

  const { room } = match.params;

  const cookieName = cookies.get('name');

  useEffect(() => {
    if (room) {
      setStorageRoom(room)
    } 
  }, [room, setStorageRoom]);

  useEffect(() => {
    if (cookieName) {
      setName(cookieName)
    } 
  }, [cookieName, setName]);

  const onJoinClick = (event: any) => {
    if (!name || !storageRoom) {
      event.preventDefault();
      return;
    }

    if (name) {
      cookies.set("name", name, { path: "/" });
    }

    console.log('cookies',cookies.get("name"))
    console.log('storage',name)
  };

  const onLogoutClick = () => {
    cookies.remove("name");
    setName("");
  };

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
            onChange={(event) => setStorageRoom(event.target.value)}
            value={storageRoom}
          />
        </div>
        <a
          onClick={onJoinClick}
          href={`/chat/${storageRoom}`}
        >
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
  );
});

export default LoginPage;
