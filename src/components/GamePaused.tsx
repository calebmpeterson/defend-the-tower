import { css } from "@emotion/react";
import { FC } from "react";
import { useRecoilCallback } from "recoil";
import { gameState } from "../state/game";
import { useScore } from "../state/score";
import { transition } from "../styles/Animation";
import Overlay from "./Overlay";

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
    <Overlay>
      <div>Game Paused</div>
      <h1>Score {score}</h1>
      <div>
        <button css={buttonCss} onClick={onResume}>
          Resume
        </button>
      </div>
    </Overlay>
  );
};

export default GamePaused;
