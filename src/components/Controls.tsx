import { css } from "@emotion/react";
import DefenseControls from "./DefenseControls";
import OffenseControls from "./OffenseControls";

const layoutCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 10px;
  min-width: 480px;
  color: #fff;
`;

const Controls = () => {
  return (
    <div css={layoutCss}>
      <DefenseControls />
      <OffenseControls />
    </div>
  );
};

export default Controls;
