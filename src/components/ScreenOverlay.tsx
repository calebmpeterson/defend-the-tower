import { css } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

const containerCss = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: rgba(var(--bg), 0.1);
  color: rgb(var(--fg));
  z-index: 1;
  cursor: auto;
`;

const ScreenOverlay: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div css={containerCss}>{children}</div>
);

export default ScreenOverlay;
