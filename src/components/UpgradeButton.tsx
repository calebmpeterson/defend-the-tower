import { css } from "@emotion/react";
import { noop } from "lodash";
import { FC, memo, ReactNode } from "react";
import { useRecoilState } from "recoil";
import {
  upgradeState,
  useCanAffordUpgrade,
  usePayForUpgrade,
} from "../state/score";
import { transition } from "../styles/Animation";
import getUpgradeCost from "../utils/getUpgradeCost";

interface Props {
  label: string;
  value: string | number | ReactNode;
  property: string;
  onUpgrade: () => void;
}

const buttonCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  background-color: transparent;
  border: 1px solid rgb(var(--fg));
  border-radius: 3px;

  cursor: pointer;
  user-select: none;

  transition: ${transition("background-color")};

  &:hover {
    background-color: rgba(var(--fg), 0.05);
  }

  &:focus {
    outline: none;
  }
`;

const labelCss = css`
  padding-top: 10px;
`;

const valueCss = css`
  font-size: 24px;
`;

const costOfUpgradeCss = (canUpgrade: boolean) => css`
  width: 100%;
  text-align: center;
  border-top: 1px solid rgb(var(--fg));
  padding: 5px 0;
  color: rgb(var(${canUpgrade ? "--allowed" : "--prohibited"}));
  transition: ${transition("color")};
`;

const UpgradeButton: FC<Props> = ({ label, value, property, onUpgrade }) => {
  const [level, setLevel] = useRecoilState(upgradeState(property));
  const costOfUpgrade = getUpgradeCost(property, level);
  const canUpgrade = useCanAffordUpgrade(costOfUpgrade);
  const payForUpgrade = usePayForUpgrade();

  const onClick = () => {
    setLevel((l) => l + 1);
    payForUpgrade(costOfUpgrade);
    onUpgrade();
  };

  return (
    <div
      css={buttonCss}
      tabIndex={0}
      role="button"
      onClick={canUpgrade ? onClick : noop}
    >
      <div css={labelCss}>{label}</div>
      <div css={valueCss}>{value}</div>
      <div css={costOfUpgradeCss(canUpgrade)}>
        <small>$</small>
        {costOfUpgrade}
      </div>
    </div>
  );
};

export default memo(UpgradeButton);
