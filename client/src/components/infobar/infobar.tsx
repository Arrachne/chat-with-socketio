import React from "react";

import "components/infobar/infobar.css";

type Props = {
  room: string | null | undefined;
};

export const InfoBar = ({ room }: Props) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{`Room: ${room ? room : ""}`}</h3>
    </div>
    <a href="/" className="rightInnerContainer">
      Leave room
    </a>
  </div>
);
