import { css, keyframes } from "@emotion/react";
import memoize from "micro-memoize";
import { FC, useMemo } from "react";
import type { Enemy as EnemyProps } from "../types";
import { position } from "../utils/Geometry";

const wobblePulse = keyframes`
  0%   { transform: scale(1) rotate(0deg); }
  25%  { transform: scale(1.05) rotate(0.5deg); }
  50%  { transform: scale(0.97) rotate(-0.5deg); }
  75%  { transform: scale(1.07) rotate(0.3deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const enemyCss = memoize(
  (size: number, color: string) => css`
    position: absolute;
    width: ${size}px;
    height: ${size}px;

    & > [data-appearance] {
      width: ${size}px;
      height: ${size}px;
      border: 1px solid var(${color});
      box-sizing: border-box;
      border-radius: ${size / 2}px;
      box-shadow: 0 0 ${size / 3}px 1px rgba(var(${color}), 0.6);

      animation-name: ${wobblePulse};
      animation-duration: 500;
      animation-timing-function: ease-in-out;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-direction: normal;
      animation-fill-mode: none;
      animation-play-state: running;
    }
  `
);

const positionStyle = (props: EnemyProps, isInRange: boolean) => ({
  ...position(props.position.x, props.position.y, props.size),
  opacity: isInRange ? 1 : 0.5,
});

const appearanceStyle = (animationDuration: number) => ({
  animationDuration: `${300 + animationDuration * 200}ms`,
});

const Enemy: FC<EnemyProps> = (props) => {
  const duration = useMemo(() => Math.random(), []);
  return (
    <div
      css={enemyCss(props.size, props.color)}
      style={positionStyle(props, true)}
    >
      <div data-appearance style={appearanceStyle(duration)} />
    </div>
  );
};

export default Enemy;
