import React, { useMemo } from "react";
import ColorSchemeSwatch from "./ColorSchemeSwatch";

function filter(arr) {
  const hash = {};

  return arr.filter(({ hex }) => {
    if (hash[hex]) {
      return false;
    }

    hash[hex] = hex;
    return true;
  });
}

export default function ColorPickerCategory({
  wheel,
  colors,
  label,
  setColor
}) {
  const filtered = useMemo(() => {
    return filter(colors);
  }, [colors]);

  return colors.length ? (
    <div className="color-picker-category">
      {label && <p className="color-picker-label">{label}</p>}
      <div className="color-layout-wrapper">
        {filtered.map(({ hex }, i) => {
          return (
            <ColorSchemeSwatch
              key={i}
              start={hex}
              end={hex}
              handleClick={() => {
                setColor(hex);
              }}
            />
          );
        })}
        {wheel}
      </div>
    </div>
  ) : null;
}
