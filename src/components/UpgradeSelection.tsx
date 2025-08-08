import { css } from "@emotion/react";
import { FC } from "react";
import { useRecoilCallback } from "recoil";
import { gameState } from "../state/game";
import { useResources } from "../state/score";
import { transition } from "../styles/Animation";
import Controls from "./Controls";
import ScreenOverlay from "./ScreenOverlay";

const layoutCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: fit-content;
`;

const buttonCss = css`
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;

  transition: ${transition("background-color")};

  &:hover,
  &:focus {
    background-color: #fff3;
  }
`;

const UpgradeSelection: FC = () => {
  const onResume = useRecoilCallback(
    ({ set }) =>
      () => {
        set(gameState, "running");
      },
    []
  );

  const resources = useResources();

  return (
    <ScreenOverlay>
      <div />

      <div css={layoutCss}>
        <div>Choose Your Upgrades</div>
        <h1>
          <small>$</small>
          {resources}
        </h1>
        <Controls />
        <div>
          <button css={buttonCss} onClick={onResume}>
            Done
          </button>
        </div>
      </div>

      <div />
    </ScreenOverlay>
  );
};

export default UpgradeSelection;
