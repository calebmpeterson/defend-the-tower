import { SyntheticEvent } from "react";

export type InputEvent = {
  name: string;
  payload: SyntheticEvent;
};

export type InputEvents = InputEvent[];

export type Handler = (event: SyntheticEvent) => void;
export type Handlers = Record<string, Handler>;

export type Update = {
  events: InputEvents;
};
export type UpdateFn = (deltaT: number, update: Update) => void;
