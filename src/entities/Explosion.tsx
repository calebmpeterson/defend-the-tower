import { css } from "@emotion/react";
import { FC } from "react";
import { useElapsed } from "../state/update";
import type { Explosion as ExplosionProps } from "../types";
import { position } from "../utils/Geometry";

const explosionCss = (size: number, color: string, opacity: number) => css`
  position: absolute;
  width: ${size}px;
  height: ${size}px;
  box-sizing: border-box;
  border-radius: ${size}px;
  box-shadow: inset 0 0 ${size / 2}px 1px ${color};
  opacity: ${opacity};
`;

const Explosion: FC<ExplosionProps> = (props) => {
  const timeElapsed = useElapsed();
  // How much time has passed since this explosion started?
  const timePassed = timeElapsed - props.startTime;
  const size = timePassed / 2;
  const opacity = 1 - timePassed / props.duration;
  return (
    <div
      css={explosionCss(size, props.color, opacity)}
      style={position(props.position.x, props.position.y, size)}
    />
  );
};

export default Explosion;
