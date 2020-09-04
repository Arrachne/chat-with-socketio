import React from 'react';

import onlineIcon from 'icons/onlineIcon.png';
import { TUsers } from 'types/users';

import 'components/text-container/text-container.css';

type Props = {
  users: TUsers;
  room: string;
}

const TextContainer = ({ users, room }: Props) => (
  <div className="textContainer">
    <div>
      <h1>{`Room: ${room}`}</h1>
    </div>
    {
      users
        ? (
          <div>
            <h1>Users</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;
