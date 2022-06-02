import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useUpdate } from "../state/update";
import Timer from "../utils/Timer";
import useInputHandlers from "./useInputHandlers";

const GameLoop: FC<PropsWithChildren<{}>> = ({ children }) => {
  const container = useRef<HTMLDivElement>(null);
  const timer = useMemo(() => new Timer(), []);
  const input = useInputHandlers();
  const update = useUpdate();

  const onTick = useCallback(
    (deltaT: number) => {
      update(deltaT, { events: input.events.current });
      input.events.current = [];

      if (document.activeElement === document.body && container.current) {
        container.current.focus();
      }
    },
    [update, input.events]
  );

  useEffect(() => {
    timer.subscribe(onTick);
    timer.start();

    if (container.current) {
      container.current.focus();
    } else {
      console.warn(`Unable to focus container`);
    }

    return () => {
      timer.stop();
      timer.unsubscribe(onTick);
    };
  }, [timer, onTick]);

  return (
    <div ref={container} tabIndex={0} {...input.handlers}>
      {children ?? null}
    </div>
  );
};

export default GameLoop;
