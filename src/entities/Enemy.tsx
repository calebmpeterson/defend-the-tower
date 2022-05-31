import { css } from "@emotion/react";
import { FC } from "react";
import { selectorFamily } from "recoil";
import { targetingRangeState, towerPositionState } from "../state/tower";
import type { Enemy as EnemyProps, Position } from "../types";
import { position } from "../utils/Geometry";
import { distance } from "../utils/Trigonometry";

const enemyCss = (props: EnemyProps) => css`
  position: absolute;
  width: ${props.size}px;
  height: ${props.size}px;
  border: 1px solid ${props.color};
  box-sizing: border-box;
  border-radius: ${props.size / 2}px;
  box-shadow: 0 0 ${props.size / 3}px 1px ${props.color}6;
`;

const enemyStyle = (props: EnemyProps, isInRange: boolean) => ({
  ...position(props.position.x, props.position.y, props.size),
  opacity: isInRange ? 1 : 0.33,
});

export const isInRangeState = selectorFamily<boolean, Position>({
  key: "isInRange",
  get:
    (position) =>
    ({ get }) => {
      const towerPosition = get(towerPositionState);
      const targetingRange = get(targetingRangeState);
      return distance(towerPosition, position) < targetingRange;
    },
});

const Enemy: FC<EnemyProps> = (props) => {
  const isInRange = true; //useRecoilValue(isInRangeState(props.position));
  return <div css={enemyCss(props)} style={enemyStyle(props, isInRange)} />;
};

export default Enemy;
