export function getColorData() {
  // const [light, lightAlt, primary, darkAlt, dark] = getColorPalette(color);
  return [
    {
      id: "light",
      label: "Light"
      // start: light,
      // end: light
    },
    {
      id: "lightAlt",
      label: "Light / Alt"
      // start: light,
      // end: lightAlt
    },
    {
      id: "lightPop",
      label: "Light / Pop"
      // start: light,
      // end: primary
    },
    {
      id: "pop",
      label: "Pop"
      // start: primary,
      // end: primary
    },
    {
      id: "darkPop",
      label: "Dark / Pop"
      // start: primary,
      // end: dark
    },
    {
      id: "darkAlt",
      label: "Dark / alt"
      // start: darkAlt,
      // end: dark
    },
    {
      id: "dark",
      label: "Dark"
      // start: dark,
      // end: dark
    }
  ];
}
