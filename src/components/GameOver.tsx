import { css } from "@emotion/react";
import { FC } from "react";
import { useReset } from "../state/reset";
import { useScore } from "../state/score";
import { transition } from "../styles/Animation";

const containerCss = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #0008;
  color: #fff;
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

const GameOver: FC = () => {
  const score = useScore();

  const onReset = useReset();

  return (
    <div css={containerCss}>
      <div>Game Over</div>
      <h1>Final score {score}</h1>
      <div>
        <button css={buttonCss} onClick={onReset}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
