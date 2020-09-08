import React from "react";
// @ts-ignore
import ReactEmoji from "react-emoji";

import "components/message/message.css";
import { TMessage } from "types/users";

type Props = {
  message: TMessage;
  name: string | null | undefined;
};

const Message = ({ message: { text, user, time }, name }: Props) => {
  let isSentByCurrentUser = false;

  const trimmedName = name ? name.trim() : "";
  console.log('user', user)

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundBlue">
        <div className="meta">{`${user}, ${time}`}</div>
        <div className="messageText">{ReactEmoji.emojify(text)}</div>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <div className="meta">{`${user}, ${time}`}</div>
        <div className="messageText">{ReactEmoji.emojify(text)}</div>
      </div>
    </div>
  );
};

export default Message;
