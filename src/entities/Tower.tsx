import { css } from "@emotion/react";
import { FC } from "react";
import { useScreen } from "../state/screen";
import { position } from "../utils/Geometry";

const SIZE = 20;

export const TOWER_SIZE = SIZE;

const towerCss = css`
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  border: 2px solid #fff;
  border-radius: ${SIZE}px;
`;

const Tower: FC = () => {
  const screen = useScreen();
  const x = screen.width / 2;
  const y = screen.height / 2;
  return <div css={towerCss} style={position(x, y, SIZE)} />;
};

export default Tower;
