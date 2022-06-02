import { css } from "@emotion/react";
import { FC } from "react";
import { useElapsed } from "../systems/update";
import type { Explosion as ExplosionProps } from "../types";
import { position } from "../utils/Geometry";

const explosionCss = css`
  position: absolute;
  box-sizing: border-box;
`;

const explosionStyle = (
  props: ExplosionProps,
  size: number,
  opacity: number
) => ({
  ...position(props.position.x, props.position.y, size),
  width: size,
  height: size,
  borderRadius: size,
  boxShadow: `inset 0 0 ${size / 2}px 1px ${props.color}`,
  opacity,
});

const Explosion: FC<ExplosionProps> = (props) => {
  const timeElapsed = useElapsed();
  // How much time has passed since this explosion started?
  const timePassed = timeElapsed - props.startTime;
  const size = timePassed / 2;
  const opacity = 1 - timePassed / props.duration;
  return (
    <div css={explosionCss} style={explosionStyle(props, size, opacity)} />
  );
};

export default Explosion;
