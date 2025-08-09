import { css, keyframes } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1) }
`;

const containerCss = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background-color: rgba(var(--bg), 0.1);
  color: rgb(var(--fg));
  z-index: 1;
  cursor: auto;

  animation: ${fadeIn} 200ms ease-in-out;
`;

const ScreenOverlay: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div css={containerCss}>{children}</div>
);

export default ScreenOverlay;
