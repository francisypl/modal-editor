import Color from "./Color";
import generate from "./generate";
const mapping = ["light", "lightAlt", "pop", "secondary", "darkAlt", "dark"];

export function getColorPalette(color, override) {
  const primary = new Color(color);
  const dark = new Color("#000");
  const darkAlt = primary.setLightness(5).setSaturation(15);
  const light = new Color("#fff");
  const lightAlt = primary.setLightness(95).setSaturation(15);
  const secondary = new Color(override || color);
  return [light, lightAlt, primary, secondary, darkAlt, dark].map((c, i) => ({
    hex: c.toHex(),
    scheme: mapping[i]
  }));
}

export function generatePalette(color) {
  const { hue } = new Color(color);
  const input = {
    specs: {
      // Number of colors
      steps: 6,
      // Hue Start Value (0 - 359)
      hue_start: hue,
      // Hue End Value (0 - 359)
      hue_end: hue,
      // Hue Curve (See Curves Section)
      hue_curve: "easeInQuad",
      // Saturation Start Value (0 - 100)
      sat_start: 0,
      // Saturation End Value (0 - 100)
      sat_end: 90,
      // Saturation Curve (See Curves Section)
      sat_curve: "easeInOutQuad",
      // Saturation Rate (0 - 200)
      sat_rate: 130,
      // Luminosity Start Value (0 - 100)
      lum_start: 100,
      // Luminosity End Value (0 - 100)
      lum_end: 10,
      // Luminosity Curve (See Curves Section)
      lum_curve: "easeOutQuad",
      // Modifier Scale
      // Every generated color gets a modifier (label) that
      // indicates its lightness. A value of 10 results in
      // two-digit modifiers. The lightest color will be 0 (e.g. Red 0)
      // and the darkest color will be 100 (e.g. Red 100), given
      // that you generate 11 colors
      modifier: 10
    }
  };
  return generate(input).map(({ hex }, i) => ({
    hex,
    scheme: mapping[i]
  }));
}
