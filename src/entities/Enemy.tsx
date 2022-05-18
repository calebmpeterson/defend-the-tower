import { css } from "@emotion/react";
import { FC } from "react";
import type { Enemy as EnemyProps } from "../types";
import { position } from "../utils/Geometry";

const enemyCss = (props: EnemyProps) => css`
  position: absolute;
  width: ${props.size}px;
  height: ${props.size}px;
  border: 1px solid ${props.color};
  box-sizing: border-box;
  border-radius: ${props.size / 2}px;
`;

const Enemy: FC<EnemyProps> = (props) => (
  <div
    css={enemyCss(props)}
    style={position(props.position.x, props.position.y, props.size)}
  />
);

export default Enemy;
