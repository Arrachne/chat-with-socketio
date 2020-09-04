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
      <h3>{`Room: ${room}`}</h3>
    </div>
    {
      users
        ? (
          <div>
            <h3>Users</h3>
            <div className="activeContainer">
              <div className="usersList">
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;
