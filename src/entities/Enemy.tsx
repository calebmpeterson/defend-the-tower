import { css } from "@emotion/react";
import memoize from "micro-memoize";
import { FC } from "react";
import type { Enemy as EnemyProps } from "../types";
import { position } from "../utils/Geometry";

const enemyCss = memoize(
  (size: number, color: string) => css`
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    border: 1px solid var(${color});
    box-sizing: border-box;
    border-radius: ${size / 2}px;
    box-shadow: 0 0 ${size / 3}px 1px rgba(var(${color}), 0.6);
  `
);

const enemyStyle = (props: EnemyProps, isInRange: boolean) => ({
  ...position(props.position.x, props.position.y, props.size),
  opacity: isInRange ? 1 : 0.5,
});

const Enemy: FC<EnemyProps> = (props) => {
  return (
    <div
      css={enemyCss(props.size, props.color)}
      style={enemyStyle(props, true)}
    />
  );
};

export default Enemy;
