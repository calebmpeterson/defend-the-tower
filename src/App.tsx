import { css } from "@emotion/react";
import { useState } from "react";
import GameOver from "./components/GameOver";
import GamePaused from "./components/GamePaused";
import HUD from "./components/HUD";
import UpgradeSelection from "./components/UpgradeSelection";
import { GameLoop } from "./engine";
import Bullets from "./entities/Bullets";
import Enemies from "./entities/Enemies";
import Explosions from "./entities/Explosions";
import Pointer from "./entities/Pointer";
import TargetingRangeIndicator from "./entities/TargetingRangeIndicator";
import Tower from "./entities/Tower";
import { useGameState } from "./state/game";
import { useInitializeScreen } from "./state/screen";
import { useInitializeTower } from "./state/tower";
import { ThemeProvider } from "./styles/Theme";

const layoutCss = css`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  background: #222;
  color: #fff;
  font-family: monospace;
`;

const overlayCss = (state: string) =>
  state !== "running" &&
  css`
    filter: blur(4px);
    box-shadow: 0 0 4px 4px rgb(var(--bg));
  `;

const sceneCss = css`
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: none;
`;

function App() {
  const [sceneElement, setScreenRef] = useState<HTMLDivElement | null>(null);

  useInitializeScreen(sceneElement);
  useInitializeTower(sceneElement);

  const state = useGameState();

  return (
    <ThemeProvider>
      <GameLoop>
        <div css={[layoutCss, overlayCss(state)]}>
          <div css={sceneCss} ref={setScreenRef}>
            <Tower />
            <Pointer />
            <TargetingRangeIndicator />
            <Enemies />
            <Bullets />
            <Explosions />
            <HUD />
          </div>
        </div>

        {state === "paused" && <GamePaused />}
        {state === "upgrading" && <UpgradeSelection />}
        {state === "defeat" && <GameOver />}
      </GameLoop>
    </ThemeProvider>
  );
}

export default App;
