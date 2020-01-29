import React from "react";
import {
  getColorPalette,
  generatePalette
} from "../../Theme/themes/getColorPalette";

export default function ColorPalette({ color, secondary, scheme }) {
  return (
    <div className="color-palette">
      {getColorPalette(color, secondary).map(({ hex, scheme: s }, i) => {
        // const style =
        //   s === "secondary"
        //     ? { flexGrow: ".5" }
        //     : // : s === scheme
        //       // ? { flexGrow: "3" }
        //       {};
        return (
          <div
            key={i}
            className="palette-item"
            style={{ backgroundColor: hex }}
          />
        );
      })}
    </div>
  );
}
