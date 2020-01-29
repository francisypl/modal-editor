import { useState, useCallback, useEffect } from "react";

export default function useDimensions(node) {
  const [dimensions, setDimensions] = useState();
  const getDimensions = useCallback(() => {
    if (node) {
      setDimensions(node.getBoundingClientRect());
    }
  }, [node]);

  useEffect(() => {
    window.addEventListener("resize", getDimensions);
    window.addEventListener("scroll", getDimensions);
    window.requestAnimationFrame(getDimensions);

    return () => {
      window.removeEventListener("resize", getDimensions);
      window.removeEventListener("scroll", getDimensions);
    };
  }, [getDimensions]);

  return dimensions;
}
