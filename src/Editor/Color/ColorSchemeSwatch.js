import React from "react";

const icon = (
  <svg width={32} height={32}>
    <path
      d="M17.6 8h-3.2v6.4H8v3.2h6.4V24h3.2v-6.4H24v-3.2h-6.4V8zM16 0C7.168 0 0 7.168 0 16s7.168 16 16 16 16-7.168 16-16S24.832 0 16 0zm0 28.8C8.944 28.8 3.2 23.056 3.2 16 3.2 8.944 8.944 3.2 16 3.2c7.056 0 12.8 5.744 12.8 12.8 0 7.056-5.744 12.8-12.8 12.8z"
      fill="#fff"
      fillRule="nonzero"
      stroke="none"
      strokeWidth={1}
    />
  </svg>
);

export default function ColorSchemeSwatch({
  start,
  end,
  label,
  handleClick,
  style
}) {
  const styles = {
    "--c-start": start,
    "--c-end": end,
    ...style
  };

  const showIcon = start && end;
  return (
    <div className="swatch-item" onClick={handleClick}>
      {showIcon ? <div className="scheme-swatch" style={styles} /> : icon}
      {label && <label>{label}</label>}
    </div>
  );
}
