import { Fragment, FC, PropsWithChildren, useEffect, useMemo } from "react";
import { useUpdate } from "../state/update";
import Timer from "../utils/Timer";

const GameLoop: FC<PropsWithChildren<{}>> = ({ children }) => {
  const timer = useMemo(() => new Timer(), []);
  const update = useUpdate();

  useEffect(() => {
    console.warn(`Updated update callback`);
    timer.subscribe(update);
    timer.start();

    return () => {
      timer.stop();
      timer.unsubscribe(update);
    };
  }, [timer, update]);

  return <Fragment>{children ?? null}</Fragment>;
};

export default GameLoop;
