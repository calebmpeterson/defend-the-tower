import { css } from "@emotion/react";
import { FC, memo, PropsWithChildren } from "react";

const layoutCss = css`
  display: flex;
  align-items: stretch;
  gap: 10px;
  margin-bottom: 10px;
`;

const ControlRow: FC<PropsWithChildren<{}>> = ({ children }) => (
  <div css={layoutCss}>{children}</div>
);

export default memo(ControlRow);
