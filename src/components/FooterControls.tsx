import { css } from "@emotion/react";
import { FC } from "react";

const containerCss = css`
  text-align: center;
  opacity: 0.66;
`;

const FooterControls: FC = () => (
  <div css={containerCss}>
    <small>Copyright Caleb Peterson</small>
  </div>
);

export default FooterControls;
