import { css } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

const containerCss = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #0008;
  color: #fff;
  z-index: 1;
`;

const Overlay: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div css={containerCss}>{children}</div>
);

export default Overlay;
