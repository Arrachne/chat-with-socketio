import React from "react";
// @ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "components/message/message";
import { TMessage, TMessages } from "types/users";

import "components/messages/messages.css";

type Props = {
  messages: TMessages;
  name: string;
};

const Messages = ({ messages, name }: Props) => (
  <ScrollToBottom className="messages">
    {messages.map((message: TMessage, i: number) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
