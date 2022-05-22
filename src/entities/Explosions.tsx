import { FC, Fragment } from "react";
import { useExplosions } from "../state/explosions";
import Explosion from "./Explosion";

const Explosions: FC = () => {
  const explosions = useExplosions();

  return (
    <Fragment>
      {explosions.map((explosion) => (
        <Explosion key={explosion.id} {...explosion} />
      ))}
    </Fragment>
  );
};

export default Explosions;
