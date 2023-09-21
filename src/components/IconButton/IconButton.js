import React from "react";
import styles from "./IconButton.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

function IconButton({ children, label, variant = "primary", ...props }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={240} className={styles.Action}>
        <Tooltip.Trigger>
          <div className={styles.pushable} {...props}>
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
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={12} className={styles.TooltipContent}>
            {label}
            <Tooltip.Arrow className={styles.TooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default IconButton;
