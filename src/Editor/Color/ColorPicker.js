import React, { useEffect, useRef, useState } from "react";
import ColorSchemeSwatch from "./ColorSchemeSwatch";
import ColorPickerCategory from "./ColorPickerCategory";
import ColorInput, { ColorWheel } from "./ColorInput";
// import ColorPalette from "./ColorPalette";
const labelMap = {
  primary: {
    label: "Main Color",
    colorLabel: "More Colors"
  },
  secondary: {
    label: "Secondary Color",
    colorLabel: "Complemtary Colors"
  }
};

export default function ColorPicker({
  color,
  setColor,
  imgColors = [],
  heroColors = [],
  type = "primary",
  hues = [
    "#E02020",
    "#FA6400",
    "#F7B500",
    "#44D7B6",
    "#32C5FF",
    "#6236FF",
    "#B620E0"
  ]
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = e => {
      const el = ref.current;
      if (el && el.contains(e.target)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (imgColors.length || heroColors.length) {
      setIsOpen(true);
    }
  }, [imgColors, heroColors]);

  const wheel = <ColorWheel color={color} setColor={setColor} />;

  return (
    <div ref={ref} className="picker-wrapper">
      <ColorSchemeSwatch
        label={labelMap[type].label}
        start={color}
        end={color}
      />
      {isOpen && (
        <div className="color-picker">
          <p className="section-label">Suggested Colors</p>
          <ColorPickerCategory
            label="Colors from Logo"
            colors={imgColors.map(hex => ({ hex }))}
            setColor={setColor}
          />
          <ColorPickerCategory
            label="Colors from Cover Image"
            colors={heroColors.map(hex => ({ hex }))}
            setColor={setColor}
          />
          <ColorPickerCategory
            label={labelMap[type].colorLabel}
            colors={hues.map(hex => ({ hex }))}
            setColor={setColor}
            wheel={wheel}
          />
          <ColorInput color={color} setColor={setColor} />
          <button className="done-btn" onClick={() => setIsOpen(false)}>
            Done
          </button>
        </div>
      )}
    </div>
  );
}
