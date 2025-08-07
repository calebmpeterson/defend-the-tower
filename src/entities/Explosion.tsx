import { css, keyframes } from "@emotion/react";
import { FC } from "react";
import type { Explosion as ExplosionProps } from "../types";
import { position } from "../utils/Geometry";

const explosionKeyframes = keyframes`
  from {
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    opacity: 1;
  }
  to {
    left: -50px;
    top: -50px;
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
  transform-origin: center center;
`;

const explosionStyle = (props: ExplosionProps, size: number) => ({
  ...position(props.position.x, props.position.y, size),
  boxShadow: `inset 0 0 10px 1px rgb(var(${props.color}))`,
  animationDuration: `${props.duration}ms`,
});

const Explosion: FC<ExplosionProps> = (props) => {
  return <div css={explosionCss} style={explosionStyle(props, 0)} />;
};

export default Explosion;
