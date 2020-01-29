import React from "react";
import { ThemeProvider, theme } from "../";

export default function Page({
  color,
  secondaryColor,
  scheme,
  index,
  children
}) {
  const newTheme = theme({
    color,
    secondaryColor,
    scheme,
    index
  });

  return <ThemeProvider theme={newTheme}>{children}</ThemeProvider>;
}
