import { css } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

const layoutCss = css`
  display: flex;
  align-items: stretch;
  gap: 10px;
`;

const ControlRow: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div css={layoutCss}>{children}</div>
);

export default ControlRow;
