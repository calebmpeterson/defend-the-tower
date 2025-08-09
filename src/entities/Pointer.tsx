import { css } from "@emotion/react";
import { FC } from "react";
import { selector, useRecoilValue } from "recoil";
import { pointerPositionState } from "../input";
import { towerPositionState } from "../state/tower";
import { position } from "../utils/Geometry";
import { distance } from "../utils/Trigonometry";
import { TOWER_SIZE } from "./Tower";

const SIZE = 3;

const pointerCss = css`
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  box-sizing: border-box;
  border-radius: ${SIZE}px;
  background-color: rgb(var(--fg));
  box-shadow: 0 0 3px 1px rgba(var(--fg), 0.33);
  opacity: 0.75;
`;

const isVisibleState = selector<boolean>({
  key: "pointer/isVisible",
  get: ({ get }) => {
    const pointerPosition = get(pointerPositionState);
    const towerPosition = get(towerPositionState);

    return distance(pointerPosition, towerPosition) > TOWER_SIZE;
  },
});

const Pointer: FC = () => {
  const pointerPosition = useRecoilValue(pointerPositionState);
  const isVisible = useRecoilValue(isVisibleState);
  return (
    <div
      css={pointerCss}
      style={{
        ...position(pointerPosition.x, pointerPosition.y, SIZE),
        opacity: isVisible ? 0.1 : 0,
      }}
    />
  );
};

export default Pointer;
