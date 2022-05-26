const getUpgradeCost = (property: string, level: number) => {
  switch (property) {
    case "target-capability":
      return level * 100;

    default:
      return level * 2 + 3;
  }
};

export default getUpgradeCost;
