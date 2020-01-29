import React, { useState, useEffect } from "react";

const iconUrl = `https://img1.wsimg.com/blobby/go/static/editor/e66e789e5047a798b3bbe76c66fca86a.png`;

function ColorIndicator({ color, setColor }) {
  return (
    <label className="native-color-input-wrapper" htmlFor="native-color-input">
      <div
        className="color-indicator"
        style={{
          backgroundColor: color,
          // backgroundImage: `url(${iconUrl})`,
          backgroundSize: "cover"
        }}
      />
      <input
        id="native-color-input"
        type="color"
        value={color}
        onChange={({ target }) => setColor(target.value)}
      />
    </label>
  );
}

export function ColorWheel({ color, setColor }) {
  return (
    <label className="color-wheel" htmlFor="native-color-wheel">
      <div
        className="color-indicator"
        style={{
          width: "32px",
          height: "32px",
          backgroundImage: `url(${iconUrl})`,
          backgroundSize: "cover"
        }}
      />
      <input
        id="native-color-wheel"
        type="color"
        value={color}
        onChange={({ target }) => setColor(target.value)}
      />
    </label>
  );
}

function ColorInput({ color, setColor }) {
  const [state, setState] = useState("");

  useEffect(() => {
    setState(color);
  }, [color]);

  return (
    <div className="native-color-inputs">
      <ColorIndicator color={color} setColor={setColor} />
      <form
        onSubmit={e => {
          e.preventDefault();
          setColor(state);
        }}
      >
        <input
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          type="text"
          value={state}
          onChange={({ target }) => setState(target.value)}
        />
      </form>
    </div>
  );
}

export default ColorInput;
