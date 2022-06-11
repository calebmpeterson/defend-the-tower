import { css } from "@emotion/react";
import OffenseControls from "./OffenseControls";
import DefenseControls from "./DefenseControls";
import TitleControls from "./TitleControls";
import FooterControls from "./FooterControls";
import KeyboardEvents from "./KeyboardEvents";

const layoutCss = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-left: 1px solid #444;
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  color: #fff;
`;

const Controls = () => {
  return (
    <div css={layoutCss}>
      <TitleControls />
      <DefenseControls />
      <OffenseControls />
      <KeyboardEvents />
      <FooterControls />
    </div>
  );
};

export default Controls;
