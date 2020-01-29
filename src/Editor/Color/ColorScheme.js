import React from "react";
import { getColorData } from "./getColorData";
import ColorSchemeSwatch from "./ColorSchemeSwatch";

export default function ColorScheme({ color, setScheme }) {
  return (
    <div className="color-schemes">
      <div className="color-scheme-swatch-wrapper">
        {getColorData(color).map(colorProps => (
          <ColorSchemeSwatch
            key={colorProps.id}
            {...colorProps}
            handleClick={() => {
              setScheme(colorProps.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ColorSchemeIndicator({ color, scheme, setScheme }) {
  const { label, start, end, ...colorProps } = getColorData(color).find(
    item => item.id === scheme
  );
  return <ColorSchemeSwatch start={start.hex} end={end.hex} {...colorProps} />;
}
