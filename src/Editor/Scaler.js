import React, { useCallback, useState, useEffect } from "react";

const paddingOffset = 48;

export default function Scaler({ scale = 0.6, children }) {
  const [state, setState] = useState({ height: "100%", width: "100%" });
  const setScale = useCallback(() => {
    const { width, height } = document
      .getElementById("scale-container")
      .getBoundingClientRect();

    const parentHeight = height * scale;
    const parentWidth = (width - paddingOffset) * scale;
    setState({
      height: parentHeight,
      width: parentWidth
    });
  }, [scale]);

  useEffect(() => {
    window.addEventListener("resize", setScale);
    window.requestAnimationFrame(setScale);

    return () => {
      window.removeEventListener("resize", setScale);
    };
  }, [setScale]);

  const scaleVal = 100 / scale;

  const scaleChild = {
    transform: `scale(${scale})`,
    width: `${scaleVal}%`,
    height: `${scaleVal}%`,
    transformOrigin: "center top",
    transition: "transform .2s ease-out",
    willChange: "transform"
  };

  return (
    <div className="scaler" style={state}>
      <div style={scaleChild}>{children}</div>
    </div>
  );
}
