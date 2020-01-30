import { rgbToHsl, hslToRgb } from "./colorUtils";

export function grayscale(data) {
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  return data;
}

/*
 * Saturation value expected to be from -100 to 100.
 */
export function saturate(data, saturation) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const [h, s, l] = rgbToHsl([r, g, b]);
    const [newR, newG, newB] = hslToRgb([
      h,
      Math.min(1, Math.max(s + saturation / 100, 0)),
      l
    ]);
    data[i] = newR; // red
    data[i + 1] = newG; // green
    data[i + 2] = newB; // blue
  }
  return data;
}
