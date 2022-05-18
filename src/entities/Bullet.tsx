import { css } from "@emotion/react";
import { FC } from "react";
import type { Bullet as BulletProps } from "../types";
import { position } from "../utils/Geometry";

const COLOR = "0, 255, 128";
const SIZE = 3;

export const BULLET_SIZE = SIZE;

export const BULLET_SPEED = 200;

const bulletCss = (props: BulletProps) => css`
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  box-sizing: border-box;
  border-radius: ${SIZE}px;
  background-color: rgb(${COLOR});
  box-shadow: 0 0 3px 1px rgba(${COLOR}, 0.33);
`;

const Bullet: FC<BulletProps> = (props) => (
  <div
    css={bulletCss(props)}
    style={position(props.position.x, props.position.y, SIZE)}
  />
);

export default Bullet;
