import { css } from "@emotion/react";
import { FC, Fragment } from "react";
import { useScore } from "../state/score";
import { useTowerHealth, useTowerMaxHealth } from "../state/tower";

const baseContainerCss = css`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  pointer-events: none;
`;

const upperContainerCss = css`
  ${baseContainerCss}
  top: 0px;
`;

const lowerContainerCss = css`
  ${baseContainerCss}
  bottom: 0px;
`;

const HUD: FC = () => {
  const score = useScore();

  const health = useTowerHealth();
  const maxHealth = useTowerMaxHealth();

  return (
    <Fragment>
      <div css={upperContainerCss}>
        <div>SCORE {score}</div>

        <div>
          LIFE {health.toFixed(0)} / {maxHealth.toFixed(0)}
        </div>
      </div>

      <div css={lowerContainerCss}>
        <div />

        <div style={{ textAlign: "center" }}>
          <small>Press ESCAPE to pause</small>
        </div>
        <div />
      </div>
    </Fragment>
  );
};

export default HUD;
