import React from "react";
// @ts-ignore
import ReactEmoji from "react-emoji";
import { TMessage } from "types/types";

import "components/message/message.css";

type Props = {
  message: TMessage;
  name: string | null | undefined;
};

export const Message = ({ message: { text, user, time }, name }: Props) => {
  let isSentByCurrentUser = false;

  const trimmedName = name ? name.trim() : "";

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
