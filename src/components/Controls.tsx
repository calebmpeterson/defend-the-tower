import { css } from "@emotion/react";
import { ChangeEvent, FC, useCallback, memo } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { enemySpawnRateState } from "../state/enemies";
import { mdiAtomVariant } from "@mdi/js";
import Header from "./Header";
import OffenseControls from "./OffenseControls";
import DefenseControls from "./DefenseControls";
import TitleControls from "./TitleControls";
import FooterControls from "./FooterControls";

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

const controlLayoutCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const labelCss = css`
  width: 40%;
`;

const rangeCss = css`
  width: 40%;
`;

const valueCss = css`
  width: 20%;
  text-align: right;
`;

interface RangeControlProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  recoilState: RecoilState<number>;
}

const RangeControl: FC<RangeControlProps> = memo(
  ({ label, recoilState, min, max, step = 1 }) => {
    const [value, setValue] = useRecoilState(recoilState);

    const onChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(event.target.value, 10));
      },
      [setValue]
    );

    return (
      <div css={controlLayoutCss}>
        <div css={labelCss}>{label}</div>
        <input
          css={rangeCss}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
        />
        <div css={valueCss}>{value.toFixed(2)}</div>
      </div>
    );
  }
);

const Controls = () => {
  return (
    <div css={layoutCss}>
      <TitleControls />

      <Header iconPath={mdiAtomVariant}>Enemies</Header>
      <RangeControl
        label="Spawn rate"
        recoilState={enemySpawnRateState}
        min={1}
        max={66}
      />

      <DefenseControls />

      <OffenseControls />

      <FooterControls />
    </div>
  );
};

export default Controls;
