import { css } from "@emotion/react";
import { ChangeEvent, FC, memo, useCallback } from "react";
import { RecoilState, useRecoilState } from "recoil";

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

export default RangeControl;
