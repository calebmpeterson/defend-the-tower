import { css } from "@emotion/react";
import { mdiKeyboard } from "@mdi/js";
import { isNumber } from "lodash";
import { FC } from "react";
import { usePointerPosition } from "../input";
import { useTowerPosition } from "../state/tower";
import Header from "./Header";

const containerCss = css``;

const formatValue = (key: string, value: any) => {
  if (isNumber(value)) {
    return value.toFixed(2);
  }

  return value;
};

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
        Pointer: <code>{JSON.stringify(pointerPosition, formatValue)}</code>
      </div>
      <div>
        Tower: <code>{JSON.stringify(towerPosition, formatValue)}</code>
      </div>
    </div>
  );
};

export default DevTools;
