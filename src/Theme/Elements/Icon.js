import React, { useState } from "react";
import cx from "classnames";

const crop = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14 4H6V2H16V12H14V4ZM4 14V0H2V2H0V4H2V16H14V18H16V16H18V14H4Z"
      fill="white"
    />
  </svg>
);

const square = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="18"
      height="18"
      rx="1"
      stroke="#444444"
      stroke-width="2"
    />
  </svg>
);

const horizontal = (
  <svg
    width="21"
    height="12"
    viewBox="0 0 21 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="19"
      height="10"
      rx="1"
      stroke="#444444"
      stroke-width="2"
    />
  </svg>
);

const vertical = (
  <svg
    width="13"
    height="20"
    viewBox="0 0 13 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1"
      width="11"
      height="18"
      rx="1"
      stroke="#444444"
      stroke-width="2"
    />
  </svg>
);

const freeform = (
  <svg
    width="17"
    height="20"
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.89 17.01L16.95 8.16001L11 7.27001V3.01001C11 1.36001 9.64998 0.0100098 7.99998 0.0100098C6.34998 0.0100098 4.99998 1.36001 4.99998 3.01001V8.46001L4.40998 8.19001L4.30998 8.15001C2.80998 7.65001 1.18998 8.46001 0.68998 9.96001C0.30998 11.09 0.68998 12.35 1.62998 13.11L6.65998 17H15.89V17.01ZM2.58998 10.6C2.73998 10.16 3.19998 9.92001 3.63998 10.04L6.99998 11.56V3.01001C6.99998 2.46001 7.44998 2.01001 7.99998 2.01001C8.54998 2.01001 8.99998 2.46001 8.99998 3.01001V8.99001L14.73 9.85001L14.11 15.01H7.33998L2.85998 11.55C2.57998 11.32 2.46998 10.94 2.58998 10.6ZM16.03 17.98V19.98L5.99998 20V18L16.03 17.98Z"
      fill="#444444"
    />
  </svg>
);

const close = (
  <svg
    enable-background="new 0 0 413.348 413.348"
    height="20"
    viewBox="0 0 413.348 413.348"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z" />
  </svg>
);

const ICON_MAP = { crop, square, horizontal, vertical, freeform, close };

export function Icon({ name, className, children, ...props }) {
  return (
    <div className={cx("flex-center peak", className)} {...props}>
      <span className={`icon ${name}-icon`}>{ICON_MAP[name]}</span>
      {children}
    </div>
  );
}

export function ToolbarIcon({ children, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <Icon onClick={() => setShow(!show)} {...props}>
      {show && children}
    </Icon>
  );
}
