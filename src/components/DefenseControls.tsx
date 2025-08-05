import { mdiShield } from "@mdi/js";
import { FC, memo } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  maxHealthState,
  regenerationRateState,
  towerSpeedState,
  useTowerHealth,
} from "../state/tower";
import ControlRow from "./ControlRow";
import Header from "./Header";
import UpgradeButton from "./UpgradeButton";

const DefenseControls: FC = () => {
  const health = useTowerHealth();

  const maxHealth = useRecoilValue(maxHealthState);
  const onUpgradeMaxHealth = useRecoilCallback(
    ({ set }) =>
      () => {
        set(maxHealthState, (m) => m + 10);
      },
    []
  );

  const regenerationRate = useRecoilValue(regenerationRateState);
  const onUpgradeRegenerationRate = useRecoilCallback(
    ({ set }) =>
      () => {
        set(regenerationRateState, (r) => r + 0.2);
      },
    []
  );

  const towerSpeed = useRecoilValue(towerSpeedState);
  const onUpgradeTowerSpeed = useRecoilCallback(
    ({ set }) =>
      () => {
        set(towerSpeedState, (r) => r + 1);
      },
    []
  );

  return (
    <div>
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
          label="Healing"
          value={regenerationRate.toFixed(2)}
          onUpgrade={onUpgradeRegenerationRate}
        />
        <UpgradeButton
          property="tower-speed"
          label="Speed"
          value={towerSpeed.toFixed(2)}
          onUpgrade={onUpgradeTowerSpeed}
        />
      </ControlRow>
    </div>
  );
};

export default memo(DefenseControls);
