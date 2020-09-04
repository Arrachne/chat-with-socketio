import React from "react";
import "components/input/input.css";

type Props = {
    message: string;
    setMessage: any;
    sendMessage: any;
}

const Input = ({ message, setMessage, sendMessage }: Props) => (
  <form className="form">
    <input
      className="input"
      placeholder="Type a message..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}>
      Send
    </button>
  </form>
);

export default Input;
