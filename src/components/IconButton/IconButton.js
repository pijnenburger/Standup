import React from "react";
import styles from "./IconButton.module.css";
import clsx from "clsx";

function IconButton({ children, variant = "primary", ...props }) {
  return (
    <button className={styles.pushable} {...props}>
      <span className={styles.shadow}></span>
      <span
        className={
          variant === "primary"
            ? styles.edge
            : clsx(styles.edgeSecondary, styles.edge)
        }
      ></span>
      <span
        className={
          variant === "primary"
            ? styles.front
            : clsx(styles.frontSecondary, styles.front)
        }
      >
        {children}
      </span>
    </button>
  );
}

export default IconButton;
