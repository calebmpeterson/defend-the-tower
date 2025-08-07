import { css } from "@emotion/react";
import { FC } from "react";
import { useTargetingRange, useTowerPosition } from "../state/tower";
import { position } from "../utils/Geometry";

const towerCss = (size: number) => css`
  position: absolute;
  width: ${size}px;
  height: ${size}px;
  border: 1px solid rgba(var(--bullet), 0.1);
  box-shadow: inset 0 0 50px 1px rgba(var(--bullet), 0.1);
  border-radius: ${size}px;
`;

const TargetingRangeIndicator: FC = () => {
  const { x, y } = useTowerPosition();
  const targetingRange = useTargetingRange();
  const size = targetingRange * 2;
  return <div css={towerCss(size)} style={position(x, y, size)} />;
};

export default TargetingRangeIndicator;
