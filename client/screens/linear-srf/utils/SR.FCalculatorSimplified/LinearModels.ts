export const linearModelCorners = (
  nCorners: number,
  linearInches: number,
  a: number,
  b: number,
  c: number
): number => {
  return a * nCorners + b * linearInches + c;
};

export const linearModelNoCorners = (linearInches: number, a2: number, b2: number) => {
  return a2 * linearInches + b2;
};
