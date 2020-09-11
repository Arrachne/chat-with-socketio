import React from "react";
// @ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";
import { Message } from "components/message";
import { TMessage, TMessages } from "types/types";

import "components/messages/messages.css";

type Props = {
  messages: TMessages;
  name: string | null | undefined;
};

export const Messages = ({ messages, name }: Props) => (
  <ScrollToBottom className="messages">
    {messages.map((message: TMessage, i: number) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);
