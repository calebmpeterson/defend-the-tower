import { css } from "@emotion/react";
import { FC } from "react";
import { useResources, useScore } from "../state/score";

const containerCss = css`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const HUD: FC = () => {
  const score = useScore();
  const resources = useResources();

  return (
    <div css={containerCss}>
      <div>SCORE {score}</div>
      <div>
        <small>$</small>
        {resources}
      </div>
    </div>
  );
};

export default HUD;
