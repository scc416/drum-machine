export const getVolume = (num) => {
  const position = document
    .getElementById("volume-bar-background")
    .getBoundingClientRect().left;

  const newNum = num - position;
  if (newNum > 160) return 1;
  if (newNum < 0) return 0;
  return newNum / 160;
};