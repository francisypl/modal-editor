import React from "react";

export default function ZoomSelector({ zoomLevel, setZoomLevel }) {
  return (
    <div className="zoom-controls">
      <button
        disabled={zoomLevel <= 0}
        onClick={() => {
          setZoomLevel({ type: "toggle" });
        }}
      >
        {zoomLevel >= 1 ? "Zoom out" : "Zoom in"}
      </button>
    </div>
  );
}
