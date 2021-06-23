export const interpolateHSL = (
  startHue: number,
  endHue: number,
  count: number,
  saturation = 100,
  lightness = 50
): Array<{ h: number; s: number; l: number }> => {
  const result = [];
  const gap = Math.abs(startHue - endHue) / (count - 1);

  for (let i = 0; i < count; i++) {
    result.push({
      h: startHue + gap * i,
      s: saturation,
      l: lightness,
    });
  }

  return result;
};

export default { interpolateHSL };
