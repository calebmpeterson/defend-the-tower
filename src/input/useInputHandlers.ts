import { SyntheticEvent, useMemo, useRef } from "react";
import { Handlers, InputEvents } from "./types";

const EVENTS = `onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onWheel onPointerDown onPointerMove onPointerUp onTouchCancel onTouchEnd onTouchMove onTouchStart onKeyDown onKeyPress onKeyUp`;

const useInputHandlers = () => {
  const events = useRef<InputEvents>([]);

  const handlers = useMemo(() => {
    const inputHandlers = EVENTS.split(" ")
      .map((name) => ({
        name,
        handler: (payload: SyntheticEvent<HTMLDivElement>) => {
          payload.persist();
          if (name.includes("Key")) {
            payload.preventDefault();
          }
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
