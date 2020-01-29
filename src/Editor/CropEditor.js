import React, { useState, useCallback, useEffect, useRef } from "react";

import { Image } from "../Theme/Elements";

const cropHandlerStyles = {
  width: 20,
  height: 5
};

const cropPositions = ["top", "right", "bottom", "left"];

function parseStyles({ top, left } = {}) {
  return { top: `${top}px`, left: `${left}px` };
}

export default function CropEditor({
  cropStyle,
  src,
  frameDimension,
  children
}) {
  const styles = {};
  const [handleStyles, setHandleStyles] = useState({});
  const [cropImgDimension, setCropImgDimension] = useState();
  const [orgImgDimension, setOrgImgDimension] = useState();
  const [imgStyles, setImgStyles] = useState({});
  const [cropStyles, setCropStyles] = useState({});

  useEffect(() => {
    const newImg = new window.Image();

    newImg.onload = function() {
      setOrgImgDimension({ width: newImg.width, height: newImg.height });
    };

    newImg.src = src;
  }, [src]);

  function handleImageLoad(e) {
    const { width, height } = e.target.getBoundingClientRect();
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const offsetX = cropHandlerStyles.width * 0.5;
    const offsetY = cropHandlerStyles.height * 0.5;
    setCropImgDimension({ width, height });
    setHandleStyles({
      top: {
        top: 0 - offsetY,
        left: centerX - offsetX
      },
      right: {
        top: centerY - offsetY,
        left: width - offsetX
      },
      bottom: {
        top: height - offsetY,
        left: centerX - offsetX
      },
      left: {
        top: centerY - offsetY,
        left: 0 - offsetX
      }
    });
  }

  function getImgContainerStyles() {}

  function getCropContainerStyles() {}

  return (
    <div className="crop-container" style={getCropContainerStyles()}>
      {cropPositions.map(position => (
        <div
          style={parseStyles(handleStyles[position])}
          className={`crop-handle ${position}`}
        />
      ))}
      <div className="img-container" style={getImgContainerStyles()}>
        {React.cloneElement(children, { onLoad: handleImageLoad })}
      </div>
    </div>
  );
}
