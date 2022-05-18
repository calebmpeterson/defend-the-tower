import { css } from "@emotion/react";
import { ChangeEvent, FC, useCallback, PropsWithChildren } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { useBulletsCount } from "../state/bullets";
import { useGameState } from "../state/game";
import { rateOfFireState, useTowerHealth } from "../state/tower";
import { useElapsed } from "../state/update";

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

const rangeCss = css`
  width: 50%;
`;

const valueCss = css`
  width: 10%;
  text-align: right;
`;

interface DataProps {
  label: string;
  value: number | string | boolean;
}

const Data: FC<DataProps> = ({ label, value }) => (
  <div css={controlLayoutCss}>
    <div>{label}</div>
    <div>{value}</div>
  </div>
);

interface RangeDisplayProps {
  label: string;
  max: number;
  value: number;
}

const RangeDisplay: FC<RangeDisplayProps> = ({ label, value, max }) => (
  <div css={controlLayoutCss}>
    <div>{label}</div>
    <progress max={max} value={value} css={rangeCss} />
    <div css={valueCss}>{value}</div>
  </div>
);

interface RangeControlProps {
  label: string;
  min: number;
  max: number;
  recoilState: RecoilState<number>;
}

const RangeControl: FC<RangeControlProps> = ({
  label,
  recoilState,
  min,
  max,
}) => {
  const [value, setValue] = useRecoilState(recoilState);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(parseInt(event.target.value, 10));
    },
    [setValue]
  );

  return (
    <div css={controlLayoutCss}>
      <div>{label}</div>
      <input
        css={rangeCss}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
      <div css={valueCss}>{value}</div>
    </div>
  );
};

const headerCss = css`
  margin: 20px 0 0 0;
`;

const Header: FC<PropsWithChildren<{}>> = ({ children }) => (
  <h3 css={headerCss}>{children}</h3>
);

const Controls = () => {
  const elapsed = useElapsed();
  const health = useTowerHealth();
  const gameState = useGameState();
  const bulletsCount = useBulletsCount();

  return (
    <div css={layoutCss}>
      <Header>Defend the Tower</Header>
      <Data label="Game state" value={gameState} />
      <Data label="Elapsed" value={(elapsed / 1000).toFixed(2)} />

      <Header>Defense</Header>
      <RangeDisplay label="Tower health" max={100} value={health} />

      <Header>Offense</Header>
      <Data label="Bullets (active)" value={bulletsCount} />
      <RangeControl
        label="Rate of fire"
        recoilState={rateOfFireState}
        min={50}
        max={500}
      />
    </div>
  );
};

export default Controls;
