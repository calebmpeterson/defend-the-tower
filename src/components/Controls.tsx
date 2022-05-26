import { css } from "@emotion/react";
import { ChangeEvent, FC, useCallback, PropsWithChildren } from "react";
import { RecoilState, useRecoilState } from "recoil";
import Icon from "@mdi/react";
import {
  bulletDamageState,
  useBulletsCount,
  targetingCapabilityState,
} from "../state/bullets";
import { enemySpawnRateState } from "../state/enemies";
import { useGameState } from "../state/game";
import { useScore } from "../state/score";
import {
  maxHealthState,
  rateOfFireState,
  regenerationRateState,
  targetingRangeState,
  useTowerHealth,
} from "../state/tower";
import { useElapsed } from "../state/update";
import {
  mdiAtomVariant,
  mdiChessRook,
  mdiShield,
  mdiSwordCross,
} from "@mdi/js";
import ControlRow from "./ControlRow";
import UpgradeButton from "./UpgradeButton";

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
      <div css={valueCss}>{value.toFixed(2)}</div>
    </div>
  );
};

const headerCss = css`
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #bbb;
`;

interface HeaderProps {
  iconPath: string;
}
const Header: FC<PropsWithChildren<HeaderProps>> = ({ children, iconPath }) => (
  <h3 css={headerCss}>
    <Icon color="currentColor" path={iconPath} size={0.7} />
    {children}
  </h3>
);

const Controls = () => {
  const elapsed = useElapsed();
  const health = useTowerHealth();
  const gameState = useGameState();
  const bulletsCount = useBulletsCount();
  const score = useScore();

  const [maxHealth, setMaxHealth] = useRecoilState(maxHealthState);
  const onUpgradeMaxHealth = () => {
    setMaxHealth((m) => m + 10);
  };

  const [regenerationRate, setRegenerationRate] = useRecoilState(
    regenerationRateState
  );
  const onUpgradeRegenerationRate = () => {
    setRegenerationRate((r) => r + 0.2);
  };

  const [rateOfFire, setRateOfFire] = useRecoilState(rateOfFireState);
  const onUpgradeRateOfFire = () => {
    setRateOfFire((r) => r + 0.1);
  };

  const [bulletDamage, setBulletDamage] = useRecoilState(bulletDamageState);
  const onUpgradeBulletDamage = () => {
    setBulletDamage((r) => r + 1);
  };

  const [targetingRange, setTargetingRange] =
    useRecoilState(targetingRangeState);
  const onUpgradeTargetingRange = () => {
    setTargetingRange((r) => r + 2);
  };

  const [targetingCapability, setTargetingCapability] = useRecoilState(
    targetingCapabilityState
  );
  const onUpgradeTargetingCapability = () => {
    setTargetingCapability((c) => c + 1);
  };

  return (
    <div css={layoutCss}>
      <Header iconPath={mdiChessRook}>Defend the Tower</Header>
      <Data label="Game state" value={gameState} />
      <Data label="Score" value={score} />
      <Data label="Elapsed time" value={(elapsed / 1000).toFixed(0)} />

      <Header iconPath={mdiAtomVariant}>Enemies</Header>
      <RangeControl
        label="Spawn rate"
        recoilState={enemySpawnRateState}
        min={1}
        max={66}
      />

      <Header iconPath={mdiShield}>Defense</Header>
      <ControlRow>
        <UpgradeButton
          property="max-health"
          label="Health"
          value={`${health.toFixed(0)} / ${maxHealth.toFixed(0)}`}
          onUpgrade={onUpgradeMaxHealth}
        />
        <UpgradeButton
          property="regeneration-rate"
          label="Health regeneration"
          value={regenerationRate.toFixed(2)}
          onUpgrade={onUpgradeRegenerationRate}
        />
      </ControlRow>

      <Header iconPath={mdiSwordCross}>Offense</Header>
      <Data label="Bullets (active)" value={bulletsCount} />

      <ControlRow>
        <UpgradeButton
          property="rate-of-fire"
          label="Rate of fire"
          value={rateOfFire.toFixed(2)}
          onUpgrade={onUpgradeRateOfFire}
        />
        <UpgradeButton
          property="bullet-damage"
          label="Shot damage"
          value={bulletDamage.toFixed(0)}
          onUpgrade={onUpgradeBulletDamage}
        />
      </ControlRow>

      <ControlRow>
        <UpgradeButton
          property="targeting-range"
          label="Targeting range"
          value={targetingRange.toFixed(0)}
          onUpgrade={onUpgradeTargetingRange}
        />
        <UpgradeButton
          property="target-capability"
          label="Maximum targets"
          value={targetingCapability.toFixed(0)}
          onUpgrade={onUpgradeTargetingCapability}
        />
      </ControlRow>
    </div>
  );
};

export default Controls;
