import { css } from "@emotion/react";
import { FC } from "react";
import { useRecoilCallback } from "recoil";
import { gameState } from "../state/game";
import { useScore } from "../state/score";
import { transition } from "../styles/Animation";
import FooterControls from "./FooterControls";
import ScreenOverlay from "./ScreenOverlay";
import TitleControls from "./TitleControls";

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
  border: 1px solid rgb(var(--fg));
  color: rgb(var(--fg));
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;

  transition: ${transition("background-color")};

  &:hover,
  &:focus {
    background-color: rgba(var(--fg), 0.1);
  }
`;

const GamePaused: FC = () => {
  const score = useScore();

  const onResume = useRecoilCallback(
    ({ set }) =>
      () => {
        set(gameState, "running");
      },
    []
  );

  return (
    <ScreenOverlay>
      <TitleControls />

      <div css={layoutCss}>
        <h1>Game Paused</h1>
        <div>
          <button css={buttonCss} onClick={onResume}>
            Resume
          </button>
        </div>
        <h2>Score {score.toLocaleString()}</h2>
      </div>

      <FooterControls />
    </ScreenOverlay>
  );
};

export default GamePaused;
