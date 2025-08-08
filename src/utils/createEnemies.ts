import { flattenDeep, range, sample } from "lodash";
import { v4 as uuid4 } from "uuid";
import { Enemy, Position } from "../types";

type EnemyVariant = Pick<
  Enemy,
  "size" | "speed" | "health" | "color" | "points" | "isUpgradeTrigger"
>;

const variant = (weight: number, props: EnemyVariant) =>
  range(0, weight).map(() => props);

const VARIANTS: EnemyVariant[] = flattenDeep([
  variant(50, {
    size: 10,
    speed: 100,
    color: "--enemy1",
    points: 10,
    health: 20,
    isUpgradeTrigger: false,
  }),

  variant(10, {
    size: 6,
    speed: 175,
    color: "--enemy2",
    points: 15,
    health: 20,
    isUpgradeTrigger: false,
  }),

  variant(15, {
    size: 20,
    speed: 100,
    color: "--enemy3",
    points: 25,
    health: 40,
    isUpgradeTrigger: false,
  }),

  variant(1, {
    size: 40,
    speed: 75,
    color: "--enemy4",
    points: 50,
    health: 200,
    isUpgradeTrigger: true,
  }),
]);

const createEnemies = (
  target: Position,
  distance: number,
  quantity: number
): Enemy[] => {
  const baseAngle = Math.random() * 2 * Math.PI;

  return range(0, quantity).map((index) => {
    const angle = baseAngle + Math.random() / Math.PI;
    return {
      id: uuid4(),
      position: {
        x: target.x + Math.cos(angle) * (distance + index),
        y: target.y + Math.sin(angle) * (distance + index),
      },
      ...sample(VARIANTS)!,
    };
  });
};

export default createEnemies;
