import * as baseTheme from "./base";
import { getColorPalette } from "./getColorPalette";
import Color from "./Color";

const lineHeight = baseTheme.lineHeight;

const theme = ({
  color,
  secondaryColor,
  scheme = "light",
  colorOverride,
  overlay = false,
  index = 1
}) => {
  const overrideColor = colorOverride || secondaryColor;
  const [light, lightAlt, primary, override, darkAlt, dark] = getColorPalette(
    color,
    overrideColor
  ).map(({ hex }) => new Color(hex));

  const mapping = {
    pop: primary,
    light,
    lightAlt: index % 2 ? light : lightAlt,
    lightPop: index % 3 ? light : primary,
    dark,
    darkAlt: index % 2 ? dark : darkAlt,
    darkPop: index % 3 ? dark : primary
  };

  const bg = overlay ? dark : colorOverride ? override : mapping[scheme];
  const textDefault = bg.isLight() ? dark : light;

  const primaryDelta = Math.abs(primary.lightness - bg.lightness);
  const buttonBg =
    primaryDelta < 10 ? (primary.isLight(75) ? dark : light) : primary;

  const buttonColor =
    Math.abs(primary.lightness - buttonBg.lightness) < 45
      ? buttonBg.isLight(75)
        ? dark
        : light
      : primary;

  const textHighlight =
    Math.abs(primary.lightness - bg.lightness) < 45
      ? bg.isLight()
        ? dark
        : light
      : primary;

  const textSecondaryHighlight =
    Math.abs(override.lightness - bg.lightness) < 45
      ? bg.isLight()
        ? dark
        : light
      : override;

  return {
    ...baseTheme,
    scheme,
    backgroundColor: bg.toString(),
    colors: {
      primary: primary.toString(),
      secondary: secondaryColor,
      light: light.toString(),
      lightAlt: lightAlt.toString(),
      dark: dark.toString(),
      darkAlt: darkAlt.toString(),
      pageBackground: bg.toString()
    },
    buttons: {
      primary: {
        fontSize: baseTheme.fontSizes[1],
        color: buttonColor.toString(),
        textTransform: "uppercase",
        backgroundColor: buttonBg.toString(),
        border: "none",
        borderRadius: baseTheme.radii[4],
        height: 40,
        paddingLeft: 24,
        paddingRight: 24,
        transition: "opacity .3s ease-in-out",
        "&:hover": {
          opacity: 0.8
        }
      },
      secondary: {
        fontSize: baseTheme.fontSizes[1],
        color: textSecondaryHighlight.toString(),
        textTransform: "uppercase",
        backgroundColor: "transparent",
        border: "none",
        padding: "0px",
        // textDecoration: "underline",
        borderBottom: `2px solid ${textSecondaryHighlight.toString()}`,
        // borderRadius: baseTheme.radii[4],
        // height: 40,
        transition: "opacity .3s ease-in-out",
        "&:hover": {
          opacity: 0.8
        }
      }
    },
    textStyles: {
      h1: {
        color: textDefault.toString(),
        fontSize: "64px",
        fontWeight: "bold",
        lineHeight: `${lineHeight * 3}px`
      },
      h2: {
        color: textHighlight.toString(),
        fontSize: "42px",
        fontWeight: "bold",
        lineHeight: `${lineHeight * 2}px`
      },
      h3: {
        color: textDefault.toString(),
        fontSize: "30px",
        fontWeight: "bold",
        lineHeight: `${lineHeight * 2}px`
      },
      h4: {
        color: textHighlight.toString(),
        fontSize: "22px",
        fontWeight: "bold",
        lineHeight: `${lineHeight}px`
      },
      text: {
        color: textDefault.toString(),
        fontSize: "16",
        lineHeight: `${lineHeight}px`
      },
      link: {
        color: textDefault.toString(),
        fontSize: "16",
        lineHeight: `${lineHeight}px`
      }
    }
  };
};

export default theme;
