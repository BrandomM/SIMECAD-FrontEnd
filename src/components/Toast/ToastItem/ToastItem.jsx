import styles from "./ToastItem.module.scss";

export function ToastItem({ message, severity }) {
  const iconClasses = {
    success: "bi bi-check-circle",
    info: "bi bi-info-circle",
    warning: "bi bi-exclamation-circle",
    danger: "bi bi-x-circle",
  };

  return (
    <div className={styles.toastItem}>
      <div className={`${styles.icon} ${styles[severity]}`}>
        <i className={`${iconClasses[severity]}`} />
      </div>
      <p className={styles.message}>{message}</p>
      <div className={styles.button}>
        <button type="button" className={`btn-close ${styles.button}`} />
      </div>
    </div>
  );
}
