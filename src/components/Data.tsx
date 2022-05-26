import { css } from "@emotion/react";
import { FC, memo } from "react";

const controlLayoutCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const labelCss = css`
  width: 40%;
`;

interface DataProps {
  label: string;
  value: number | string | boolean;
}

const Data: FC<DataProps> = memo(({ label, value }) => (
  <div css={controlLayoutCss}>
    <div css={labelCss}>{label}</div>
    <div>{value}</div>
  </div>
));

export default Data;
