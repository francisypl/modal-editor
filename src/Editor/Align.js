import React, { useRef, useEffect, useState } from "react";
import useDimensions from "./useDimensions";

export default function Align({ index, node, children, offset }) {
  const [style, setStyle] = useState(index);
  const ref = useRef(null);
  const dimensions = useDimensions(node);

  useEffect(() => {
    if (dimensions && ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setStyle({
        top: dimensions.top + (height - offset.top),
        left: dimensions.right - (width + offset.left)
      });
    }

    return () => {};
  }, [dimensions]);

  return (
    <div
      className="align-container"
      ref={ref}
      style={{ position: "fixed", ...style }}
    >
      {children}
    </div>
  );
}

Align.defaultProps = {
  offset: { left: 24, top: 24 }
};
