import { FC, Fragment } from "react";
import { useEnemies } from "../state/enemies";
import Enemy from "./Enemy";

const Enemies: FC = () => {
  const enemies = useEnemies();

  return (
    <Fragment>
      {enemies.map((enemy) => (
        <Enemy key={enemy.id} {...enemy} />
      ))}
    </Fragment>
  );
};

export default Enemies;
