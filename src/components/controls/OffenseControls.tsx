import { FC, memo } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { mdiSwordCross } from "@mdi/js";
import {
  bulletDamageState,
  targetingCapabilityState,
} from "../../state/bullets";

import { rateOfFireState, targetingRangeState } from "../../state/tower";
import Header from "./Header";
import ControlRow from "../ControlRow";
import UpgradeButton from "../UpgradeButton";

const OffenseControls: FC = () => {
  const rateOfFire = useRecoilValue(rateOfFireState);
  const onUpgradeRateOfFire = useRecoilCallback(
    ({ set }) =>
      () => {
        set(rateOfFireState, (r) => r + 0.1);
      },
    []
  );

  const bulletDamage = useRecoilValue(bulletDamageState);
  const onUpgradeBulletDamage = useRecoilCallback(
    ({ set }) =>
      () => {
        set(bulletDamageState, (r) => r + 1);
      },
    []
  );

  const targetingRange = useRecoilValue(targetingRangeState);
  const onUpgradeTargetingRange = useRecoilCallback(
    ({ set }) =>
      () => {
        set(targetingRangeState, (r) => r + 2);
      },
    []
  );

  const targetingCapability = useRecoilValue(targetingCapabilityState);
  const onUpgradeTargetingCapability = useRecoilCallback(
    ({ set }) =>
      () => {
        set(targetingCapabilityState, (c) => c + 1);
      },
    []
  );

  return (
    <div>
      <Header iconPath={mdiSwordCross}>Offense</Header>
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

export default memo(OffenseControls);
