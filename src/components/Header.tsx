import { css } from "@emotion/react";
import Icon from "@mdi/react";
import { FC, memo, PropsWithChildren } from "react";

const headerCss = css`
  margin: 20px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #bbb;
`;

interface HeaderProps {
  iconPath?: string;
}

const Header: FC<PropsWithChildren<HeaderProps>> = ({ children, iconPath }) => (
  <h3 css={headerCss}>
    {iconPath && <Icon color="currentColor" path={iconPath} size={0.7} />}
    {children}
  </h3>
);

export default memo(Header);
