export const integerFormat = (int: number): string => {
  return int < 999
    ? String(int)
    : int < 999999
    ? (int / 1000).toFixed(1) + "k"
    : (int / 1000000).toFixed(1) + "m";
};
