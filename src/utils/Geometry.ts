export const position = (x: number, y: number, size: number) => ({
  transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
});
