import { useMemo, useRef, SyntheticEvent } from "react";
import { Handlers, InputEvents } from "./types";

const EVENTS = `onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onWheel onTouchCancel onTouchEnd onTouchMove onTouchStart onKeyDown onKeyPress onKeyUp`;

const useInputHandlers = () => {
  const events = useRef<InputEvents>([]);

  const handlers = useMemo(() => {
    const inputHandlers = EVENTS.split(" ")
      .map((name) => ({
        name,
        handler: (payload: SyntheticEvent) => {
          payload.persist();
          events.current.push({ name, payload });
        },
      }))
      .reduce((acc, val) => {
        acc[val.name] = val.handler;
        return acc;
      }, {} as Handlers);
    return inputHandlers;
  }, []);

  return {
    handlers,
    events,
  };
};

export default useInputHandlers;
