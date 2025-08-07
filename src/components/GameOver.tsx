import { css } from "@emotion/react";
import { FC } from "react";
import { useReset } from "../state/reset";
import { useScore } from "../state/score";
import { transition } from "../styles/Animation";
import FooterControls from "./FooterControls";
import ScreenOverlay from "./ScreenOverlay";
import TitleControls from "./TitleControls";

const buttonCss = css`
  background-color: transparent;
  border: 1px solid rgba(var(--fg));
  color: rgba(var(--fg));
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;

  transition: ${transition("background-color")};

  &:hover,
  &:focus {
    background-color: rgba(var(--fg), 0.1);
  }
`;

const GameOver: FC = () => {
  const score = useScore();

  const onReset = useReset();

  return (
    <ScreenOverlay>
      <TitleControls />
      <h1>Game Over</h1>
      <div>
        <button css={buttonCss} onClick={onReset}>
          Play again
        </button>
      </div>
      <h2>Final score {score}</h2>
      <FooterControls />
    </ScreenOverlay>
  );
};

export default GameOver;
