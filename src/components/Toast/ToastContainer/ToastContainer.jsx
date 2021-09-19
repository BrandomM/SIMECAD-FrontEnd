import styles from "./ToastContainer.module.scss";

import { useToastStateContext } from "../../../context/ToastContext";

import { ToastItem } from "../ToastItem/ToastItem";

export function ToastContainer() {
    const {toasts} = useToastStateContext();

  return (
    <div className={styles.toastContainer}>
      {toasts &&
        toasts.map((toast) => (
          <ToastItem
            id={toast.id}
            key={toast.id}
            severity={toast.severity}
            message={toast.message}
          />
        ))}
    </div>
  );
}
