import styles from "./ToastItem.module.scss";

import { useToastDispatchContext } from "../../../context/ToastContext";

export function ToastItem({ message, severity, id }) {
  const dispatch = useToastDispatchContext();

  const iconClasses = {
    success: "bi bi-check-circle",
    info: "bi bi-info-circle",
    warning: "bi bi-exclamation-circle",
    danger: "bi bi-x-circle",
  };

  const close = () => {
    dispatch({ type: "DELETE_TOAST", id });
  };

  return (
    <div className={styles.toastItem}>
      <div className={`${styles.icon} ${styles[severity]}`}>
        <i className={`${iconClasses[severity]}`} />
      </div>
      <p className={styles.message}>{message}</p>
      <div className={styles.button}>
        <button
          onClick={() => close()}
          type="button"
          className={`btn-close ${styles.button}`}
        />
      </div>
    </div>
  );
}
