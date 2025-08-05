import { css } from "@emotion/react";
import { mdiKeyboard } from "@mdi/js";
import { FC } from "react";
import { usePointerPosition } from "../input";
import { useTowerPosition } from "../state/tower";
import Header from "./Header";

const containerCss = css``;

const DevTools: FC = () => {
  const pointerPosition = usePointerPosition();
  const towerPosition = useTowerPosition();

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div css={containerCss}>
      <Header iconPath={mdiKeyboard}>Dev Tools</Header>
      <div>
        Pointer: <code>{JSON.stringify(pointerPosition)}</code>
      </div>
      <div>
        Tower: <code>{JSON.stringify(towerPosition)}</code>
      </div>
    </div>
  );
};

export default DevTools;
