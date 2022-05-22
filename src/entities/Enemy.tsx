import { css } from "@emotion/react";
import { FC } from "react";
import { useTargetingRange, useTowerPosition } from "../state/tower";
import type { Enemy as EnemyProps } from "../types";
import { position } from "../utils/Geometry";
import { distance } from "../utils/Trigonometry";

const enemyCss = (props: EnemyProps, isInRange: boolean) => css`
  position: absolute;
  width: ${props.size}px;
  height: ${props.size}px;
  border: 1px solid ${props.color};
  box-sizing: border-box;
  border-radius: ${props.size / 2}px;
  box-shadow: 0 0 ${props.size / 3}px 1px ${props.color}6;
  opacity: ${isInRange ? 1 : 0.33};
`;

const Enemy: FC<EnemyProps> = (props) => {
  const towerPosition = useTowerPosition();
  const isInRange =
    distance(towerPosition, props.position) < useTargetingRange();
  return (
    <div
      css={enemyCss(props, isInRange)}
      style={position(props.position.x, props.position.y, props.size)}
    />
  );
};

export default Enemy;
