import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "../";
import { ThemeProvider, theme } from "../";
import ColorPickerCategory from "../../Editor/Color/ColorPickerCategory";
import { getColorPalette, generatePalette } from "../themes/getColorPalette";
import Layer from "../../Editor/Layer";
import Align from "../../Editor/Align";

const icon = (
  <svg width={16} height={16}>
    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <path
        fillOpacity={0.36}
        fill="#FFF"
        fillRule="nonzero"
        d="M0 13.3333333L16 13.3333333 16 16 0 16z"
      />
      <path
        d="M12.889 7.884s-1.333 1.44-1.333 2.33c0 .737.595 1.333 1.333 1.333s1.333-.596 1.333-1.334c0-.88-1.333-2.329-1.333-2.329zm-1.591-1.848L5.253 0l-.942.942 1.413 1.414-3.688 3.68a.885.885 0 000 1.253l4 4c.177.178.4.267.63.267a.91.91 0 00.632-.258l4-4a.896.896 0 000-1.262zm-7.556.186l2.925-2.924L9.59 6.222H3.742z"
        fill="#FFF"
        fillRule="nonzero"
      />
      <path d="M0 0L16 0 16 16 0 16z" />
    </g>
  </svg>
);

export default function Widget({ color, overlay = false, index, children }) {
  const [colorOverride, setColorOverride] = useState(color);

  const [showPicker, setShowPicker] = useState(false);
  const [ref, setRef] = useState(null);
  const { colors, scheme } = useTheme();

  const newTheme = theme({
    color: colors.primary,
    secondaryColor: colors.secondary,
    colorOverride: color || colorOverride,
    scheme: colorOverride ? "primary" : scheme,
    index,
    overlay
  });

  useEffect(() => {
    setColorOverride(undefined);
  }, [colors.primary, scheme]);

  useEffect(() => {
    setColorOverride(color);
  }, [color]);

  const onRefSet = useCallback(ref => {
    setRef(ref);
  }, []);

  const show = showPicker && !overlay;
  const picker = show ? (
    <Layer>
      <Align index={index} node={ref}>
        <div className="accent-picker">
          <div className="flex-center peak">
            <span className="accent-icon">{icon}</span>
            <span>Accent:</span>
          </div>

          <ColorPickerCategory
            colors={getColorPalette(colors.primary, colors.secondary)}
            setColor={setColorOverride}
          />
        </div>
      </Align>
    </Layer>
  ) : null;

  return (
    <div ref={onRefSet} className="widget">
      {picker}
      <ThemeProvider theme={newTheme}>{children}</ThemeProvider>
    </div>
  );
}
