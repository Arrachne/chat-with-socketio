import React from "react";

import closeIcon from "icons/closeIcon.png";
import onlineIcon from "icons/onlineIcon.png";
import "components/infobar/infobar.css";

type Props = {
  room: string | null | undefined;
};

const InfoBar = ({ room }: Props) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online" />
      <h3>{room ? room : ""}</h3>
    </div>
    <a href="/" className="rightInnerContainer">
      Leave room
    </a>
  </div>
);

export default InfoBar;
