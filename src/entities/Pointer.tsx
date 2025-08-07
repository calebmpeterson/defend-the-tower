import { css } from "@emotion/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { pointerPositionState } from "../input";
import { position } from "../utils/Geometry";

const SIZE = 3;

const pointerCss = css`
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  box-sizing: border-box;
  border-radius: ${SIZE}px;
  background-color: rgb(var(--fg));
  box-shadow: 0 0 3px 1px rgba(var(--fg), 0.33);
`;

const Pointer: FC = () => {
  const pointerPosition = useRecoilValue(pointerPositionState);
  return (
    <div
      css={pointerCss}
      style={position(pointerPosition.x, pointerPosition.y, SIZE)}
    />
  );
};

export default Pointer;
