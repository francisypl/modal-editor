import React from "react";
import cx from "classnames";

export function List({ className, children, ...props }) {
  return (
    <ul className={cx("list", className)} {...props}>
      {children}
    </ul>
  );
}

export function ListItem({ className, children, ...props }) {
  return (
    <li className={cx("list-item", className)} {...props}>
      {children}
    </li>
  );
}
