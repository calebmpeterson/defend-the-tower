import { css } from "@emotion/react";
import Controls from "./components/Controls";
import Bullets from "./entities/Bullets";
import Enemies from "./entities/Enemies";
import Explosions from "./entities/Explosions";
import TargetingRangeIndicator from "./entities/TargetingRangeIndicator";
import Tower from "./entities/Tower";
import { useScreenRef } from "./state/screen";
import GameLoop from "./systems/GameLoop";

const layoutCss = css`
  display: flex;
  height: 100vh;
  width: 100%;
  background: #222;
  color: #fff;
  font-family: monospace;
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
  const setScreenRef = useScreenRef();
  return (
    <GameLoop>
      <div css={layoutCss}>
        <div css={sceneCss} ref={setScreenRef}>
          <Tower />
          <TargetingRangeIndicator />
          <Enemies />
          <Bullets />
          <Explosions />
        </div>
        <div css={controlsCss}>
          <Controls />
        </div>
      </div>
    </GameLoop>
  );
}

export default App;
