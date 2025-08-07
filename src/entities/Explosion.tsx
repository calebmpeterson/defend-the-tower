import { css, keyframes } from "@emotion/react";
import { FC } from "react";
import { useElapsed } from "../systems/update";
import type { Explosion as ExplosionProps } from "../types";
import { position } from "../utils/Geometry";

const explosionKeyframes = keyframes`
  from {
    width: 0;
    height: 0;
    opacity: 1;
  }
  to {
    width: 100px;
    height: 100px;
    opacity: 0;
  }
`;

const explosionCss = css`
  position: absolute;
  box-sizing: border-box;
  border-radius: 50%;
  animation-name: ${explosionKeyframes};
  animation-timing-function: ease-out;
`;

const explosionStyle = (props: ExplosionProps, size: number) => ({
  ...position(props.position.x, props.position.y, size),
  boxShadow: `inset 0 0 10px 1px rgb(var(${props.color}))`,
  animationDuration: `${props.duration}ms`,
});

const Explosion: FC<ExplosionProps> = (props) => {
  const timeElapsed = useElapsed();
  // How much time has passed since this explosion started?
  const timePassed = timeElapsed - props.startTime;
  const size = timePassed / 2;

  return <div css={explosionCss} style={explosionStyle(props, size)} />;
};

export default Explosion;
