import { flattenDeep, range, sample } from "lodash";
import { Enemy, Position } from "../types";

type EnemyVariant = Pick<
  Enemy,
  "size" | "speed" | "health" | "color" | "points"
>;

const variant = (weight: number, props: EnemyVariant) =>
  range(0, weight).map(() => props);

const VARIANTS: EnemyVariant[] = flattenDeep([
  variant(25, {
    size: 10,
    speed: 100,
    color: "#f03",
    points: 10,
    health: 20,
  }),

  variant(10, {
    size: 6,
    speed: 160,
    color: "#f04",
    points: 15,
    health: 20,
  }),

  variant(5, {
    size: 20,
    speed: 60,
    color: "#f05",
    points: 25,
    health: 40,
  }),

  variant(1, {
    size: 40,
    speed: 20,
    color: "#f06",
    points: 50,
    health: 400,
  }),
]);

const createEnemy = (target: Position, distance: number): Enemy => {
  const angle = Math.random() * 2 * Math.PI;
  const x = target.x + Math.cos(angle) * distance;
  const y = target.y + Math.sin(angle) * distance;
  const newEnemy = {
    id: `enemy-${Date.now()}`,
    position: {
      x,
      y,
    },
    ...sample(VARIANTS)!,
  };

  return newEnemy;
};

export default createEnemy;
