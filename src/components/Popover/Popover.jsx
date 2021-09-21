import styles from "./Popover.module.scss";
import React from "react";

export const Popover =  React.forwardRef(({ show, baseRef, children, className}, ref) => {
  if (!show) {
    return <></>;
  }

  const coordinates = baseRef.current.getBoundingClientRect();

  return (
    <div
    ref={ref}
      className={styles.popover}
      style={{ top: coordinates.bottom, left: coordinates.right }}
    >
      <div className={`${styles.content} ${className}`}>
        {children}
      </div>
    </div>
  );
})
