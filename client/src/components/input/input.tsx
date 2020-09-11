import React from "react";
import "components/input/input.css";

type Props = {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: (event: any) => void;
};

export const Input = ({ message, setMessage, sendMessage }: Props) => (
  <form className="form">
    <div className="input-container">
      <input className="input"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
    </div>
    <button className="sendButton" onClick={(event) => sendMessage(event)}>
      Send
    </button>
  </form>
);
