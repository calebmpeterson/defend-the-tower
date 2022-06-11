import { css } from "@emotion/react";
import { mdiKeyboard } from "@mdi/js";
import { isEmpty } from "lodash";
import { FC } from "react";
import { useActiveKeys } from "../input";
import Header from "./Header";

const containerCss = css``;

const KeyboardEvents: FC = () => {
  const activeKeys = useActiveKeys();

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div css={containerCss}>
      <Header iconPath={mdiKeyboard}>Active Keys</Header>
      {activeKeys.map((activeKey) => (
        <div key={activeKey}>{activeKey === " " ? "␣" : activeKey}</div>
      ))}
      {isEmpty(activeKeys) && <em>none</em>}
    </div>
  );
};

export default KeyboardEvents;
