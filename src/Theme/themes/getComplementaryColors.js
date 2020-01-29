import Color from "./Color";

export default function getCompletaryColors(color) {
  const primary = new Color(color);

  return [45, 90, 135, 180, 225, 270, 315].map(num => {
    return primary.spin(num).toHex();
  });
}
