const getUpgradeCost = (property: string, level: number) => {
  switch (property) {
    case "target-capability":
    case "probability-of-critical-hit":
    case "probability-of-penetrating-hit":
      return level * 100;

    default:
      return level * 2 + 3;
  }
};

export default getUpgradeCost;
