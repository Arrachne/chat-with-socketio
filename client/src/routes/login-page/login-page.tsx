import React from "react";
import { RouteComponentProps } from "react-router";
import { Login } from "components/login";

type OwnProps = {
  isAuthed: boolean;
};

type MatchParams = {
  room: string;
};

interface IProps extends RouteComponentProps<MatchParams>, OwnProps {}

export const LoginPage = ({ match, isAuthed }: IProps) => {
  const { room } = match.params;

  return (
    <Login room={room} isAuthed={isAuthed}></Login>
  );
};
