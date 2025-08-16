import { css } from "@emotion/react";
import { motion, useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
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
import { screenShakeState, useInitializeScreen } from "./state/screen";
import { useInitializeTower } from "./state/tower";
import { ThemeProvider } from "./styles/Theme";

const layoutCss = css`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  overscroll-behavior: none;
  background: rgb(var(--bg));
  color: rgb(var(--fg));
`;

const overlayCss = (state: string) =>
  state !== "running" &&
  css`
    filter: blur(4px);
    box-shadow: 0 0 4px 4px rgb(var(--bg));
  `;

const sceneCss = css`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: none;
`;

function App() {
  const [sceneElement, setScreenRef] = useState<HTMLDivElement | null>(null);

  useInitializeScreen(sceneElement);
  useInitializeTower(sceneElement);

  const state = useGameState();

  const [scopeRef, animate] = useAnimate();
  const screenShake = useRecoilValue(screenShakeState);
  useEffect(() => {
    if (screenShake) {
      console.log("triggering screen shake");
      animate(scopeRef.current, {
        scale: [1, 1.01, 1.01, 1.01, 1.01, 1.01, 1],
        x: [0, -2, 3, -1, 2, -1, 0],
        y: [0, 1, -1, 0, 1, -1, 0],
        transition: {
          duration: 0.2,
          ease: "ease",
          times: [0, 0.33, 0.66, 1],
        },
      });
    }
  }, [animate, scopeRef, screenShake]);

  return (
    <ThemeProvider>
      <GameLoop>
        <motion.div ref={scopeRef} css={[layoutCss]}>
          <div css={[sceneCss, overlayCss(state)]} ref={setScreenRef}>
            <Tower />
            <Pointer />
            <TargetingRangeIndicator />
            <Enemies />
            <Bullets />
            <Explosions />
            <HUD />
          </div>
        </motion.div>

        {state === "paused" && <GamePaused />}
        {state === "upgrading" && <UpgradeSelection />}
        {state === "defeat" && <GameOver />}
      </GameLoop>
    </ThemeProvider>
  );
}

export default App;
