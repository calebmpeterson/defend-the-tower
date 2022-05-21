export const transitionDuration = 500;
export const transitionTimingFunction = "ease-in-out";

export const transition = (...attrs: string[]) =>
  attrs
    .map((attr) => `${attr} ${transitionDuration} ${transitionTimingFunction}`)
    .join(", ");
