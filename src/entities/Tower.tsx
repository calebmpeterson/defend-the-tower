import { css } from "@emotion/react";
import { FC } from "react";
import { useTowerPosition } from "../state/tower";
import { position } from "../utils/Geometry";

const SIZE = 6;

export const TOWER_SIZE = SIZE;

const towerCss = css`
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  border: 2px solid #fff;
  border-radius: ${SIZE}px;
  box-sizing: border-box;
`;

const Tower: FC = () => {
  const { x, y } = useTowerPosition();
  return <div css={towerCss} style={position(x, y, SIZE)} />;
};

export default Tower;
