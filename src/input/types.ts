import { SyntheticEvent } from "react";

export type InputEvent = {
  name: string;
  payload: SyntheticEvent<HTMLDivElement>;
};

export type InputEvents = InputEvent[];

export type Handler = (event: SyntheticEvent<HTMLDivElement>) => void;
export type Handlers = Record<string, Handler>;
