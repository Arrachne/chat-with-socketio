import React from "react";
// @ts-ignore
import ReactEmoji from "react-emoji";

import "components/message/message.css";
import { TMessage } from "types/users";

type Props = {
  message: TMessage;
  name: string | null | undefined;
};

const Message = ({ message: { text, user }, name }: Props) => {
  let isSentByCurrentUser = false;

  const trimmedName = name ? name.trim().toLowerCase() : '';

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;
