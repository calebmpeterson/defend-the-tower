import { css } from "@emotion/react";
import { FC } from "react";

const containerCss = css`
  margin-top: auto;
  text-align: center;
  opacity: 0.66;
`;

const FooterControls: FC = () => (
  <div css={containerCss}>
    <small>
      source code available on{" "}
      <a
        href="https://github.com/calebmpeterson/defend-the-tower"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </small>
  </div>
);

export default FooterControls;
