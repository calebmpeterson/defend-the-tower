import { css } from "@emotion/react";
import { ChangeEvent, FC, useCallback, PropsWithChildren } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { bulletDamageState, useBulletsCount } from "../state/bullets";
import { enemySpawnRateState } from "../state/enemies";
import { useGameState } from "../state/game";
import { useScore } from "../state/score";
import {
  DEFAULT_TOWER_HEALTH,
  maxHealthState,
  rateOfFireState,
  regenerationRateState,
  useTowerHealth,
  useTowerHealthMax,
} from "../state/tower";
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

interface DataProps {
  label: string;
  value: number | string | boolean;
}

const Data: FC<DataProps> = ({ label, value }) => (
  <div css={controlLayoutCss}>
    <div css={labelCss}>{label}</div>
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
    <div css={labelCss}>{label}</div>
    <progress max={max} value={value} css={rangeCss} />
    <div css={valueCss}>{value.toFixed(0)}</div>
  </div>
);

interface RangeControlProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  recoilState: RecoilState<number>;
}

const RangeControl: FC<RangeControlProps> = ({
  label,
  recoilState,
  min,
  max,
  step = 1,
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
  const maxHealth = useTowerHealthMax();
  const gameState = useGameState();
  const bulletsCount = useBulletsCount();
  const score = useScore();

  return (
    <div css={layoutCss}>
      <Header>Defend the Tower</Header>
      <Data label="Game state" value={gameState} />
      <Data label="Score" value={score} />
      <Data label="Elapsed time" value={(elapsed / 1000).toFixed(2)} />

      <Header>Enemies</Header>
      <RangeControl
        label="Spawn rate"
        recoilState={enemySpawnRateState}
        min={1}
        max={66}
      />

      <Header>Defense</Header>
      <RangeDisplay label="Tower health" max={maxHealth} value={health} />
      <RangeControl
        label="Max health"
        recoilState={maxHealthState}
        min={DEFAULT_TOWER_HEALTH}
        max={DEFAULT_TOWER_HEALTH * 10}
      />
      <RangeControl
        label="Regeneration"
        recoilState={regenerationRateState}
        min={0}
        max={20}
      />

      <Header>Offense</Header>
      <Data label="Bullets (active)" value={bulletsCount} />
      <RangeControl
        label="Rate of fire"
        recoilState={rateOfFireState}
        min={1}
        max={10}
      />
      <RangeControl
        label="Bullet damage"
        recoilState={bulletDamageState}
        min={10}
        max={50}
      />
    </div>
  );
};

export default Controls;
