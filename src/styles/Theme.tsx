import { css, Global } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

interface Theme {
  fg: string;
  bg: string;
  player: string;
  bullet: string;
  enemy1: string;
  enemy2: string;
  enemy3: string;
  enemy4: string;
}

export const themeVariablesCss = (theme: Theme) => css`
  :root {
    --fg: ${theme.fg};
    --bg: ${theme.bg};
    --player: ${theme.player};
    --bullet: ${theme.bullet};
    --enemy1: ${theme.enemy1};
    --enemy2: ${theme.enemy2};
    --enemy3: ${theme.enemy3};
    --enemy4: ${theme.enemy4};
  }
`;

export const DEFAULT_THEME: Theme = {
  fg: "",
  bg: "",
  player: "",
  bullet: "0, 255, 128",
  enemy1: "255, 0, 34",
  enemy2: "255, 0, 51",
  enemy3: "255, 0, 68",
  enemy4: "255, 0, 85",
};

export const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div>
      <Global styles={themeVariablesCss(DEFAULT_THEME)} />
      {children}
    </div>
  );
};
