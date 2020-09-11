import React from "react";
import { TUsers } from "types/types";

import "components/text-container/text-container.css";

type Props = {
  users: TUsers;
  room: string;
};

export const TextContainer = ({ users, room }: Props) => (
  <div className="textContainer">
    <h3>Users in room</h3>
    {users ? (
      <div className="activeContainer">
        <div className="usersList">
          {users.map(({ name }) => (
            <div key={name} className="activeItem">
              {name}
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </div>
);
