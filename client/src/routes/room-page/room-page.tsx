import React from "react";
import { RouteComponentProps } from "react-router";
import { Room } from "components/room";

type MatchParams = {
  room: string;
};

export const RoomPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const { room } = match.params;

  return (
    <Room room={room}></Room>
  )
};
