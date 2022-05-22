import { css } from "@emotion/react";
import { FC } from "react";
import { useScreen } from "../state/screen";
import { useTargetingRange } from "../state/tower";
import { position } from "../utils/Geometry";

const towerCss = (size: number) => css`
  position: absolute;
  width: ${size}px;
  height: ${size}px;
  border: 1px solid #0f82;
  box-shadow: inset 0 0 50px 1px #0f82;
  border-radius: ${size}px;
`;

const TargetingRangeIndicator: FC = () => {
  const screen = useScreen();
  const targetingRange = useTargetingRange();
  const size = targetingRange * 2;
  const x = screen.width / 2;
  const y = screen.height / 2;
  return <div css={towerCss(size)} style={position(x, y, size)} />;
};

export default TargetingRangeIndicator;
