import { FC, Fragment } from "react";
import { useBullets } from "../state/bullets";
import Bullet from "./Bullet";

const Bullets: FC = () => {
  const bullets = useBullets();

  return (
    <Fragment>
      {bullets.map((bullet) => (
        <Bullet key={bullet.id} {...bullet} />
      ))}
    </Fragment>
  );
};

export default Bullets;
