import { css } from "@emotion/react";
import Controls from "./components/Controls";
import GameOver from "./components/GameOver";
import GamePaused from "./components/GamePaused";
import HUD from "./components/HUD";
import Bullets from "./entities/Bullets";
import Enemies from "./entities/Enemies";
import Explosions from "./entities/Explosions";
import TargetingRangeIndicator from "./entities/TargetingRangeIndicator";
import Tower from "./entities/Tower";
import { useGameState } from "./state/game";
import { useScreenRef } from "./state/screen";
import { GameLoop } from "./engine";

const layoutCss = css`
  display: flex;
  height: 100vh;
  width: 100%;
  background: #222;
  color: #fff;
  font-family: monospace;

  a {
    color: #fff;
  }
  a:visited {
    color: #fff;
  }
`;

const overlayCss = (state: string) =>
  state === "defeat" &&
  css`
    filter: blur(4px);
  `;

const sceneCss = css`
  width: 66%;
  position: relative;
  overflow: hidden;
`;

const controlsCss = css`
  width: 34%;
`;

function App() {
  const state = useGameState();
  const setScreenRef = useScreenRef();
  return (
    <GameLoop>
      <div css={[layoutCss, overlayCss(state)]}>
        <div css={sceneCss} ref={setScreenRef}>
          <Tower />
          <TargetingRangeIndicator />
          <Enemies />
          <Bullets />
          <Explosions />
          <HUD />
        </div>
        <div css={controlsCss}>
          <Controls />
        </div>
      </div>
      {state === "defeat" && <GameOver />}
      {state === "paused" && <GamePaused />}
    </GameLoop>
  );
}

export default App;
