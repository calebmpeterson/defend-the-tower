import { Fragment, FC, PropsWithChildren, useEffect, useMemo } from "react";
import { useUpdate } from "../state/update";
import Timer from "../utils/Timer";

const GameLoop: FC<PropsWithChildren<{}>> = ({ children }) => {
  const timer = useMemo(() => new Timer(), []);
  const update = useUpdate();

  useEffect(() => {
    timer.subscribe(update);
    timer.start();

    return () => {
      timer.stop();
    };
  }, [timer, update]);

  return <Fragment>{children ?? null}</Fragment>;
};

export default GameLoop;
