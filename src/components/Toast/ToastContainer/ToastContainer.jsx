import styles from "./ToastContainer.module.scss";

import { ToastItem } from "../ToastItem/ToastItem";

export function ToastContainer() {
  const toasts = [
    { id: 1, severity: "success", message: "Mensaje enviado con éxito" },
    { id: 2, severity: "info", message: "Hay un nuevo producto disponible" },
    { id: 3, severity: "warning", message: "Los cambios serán permanentes" },
    { id: 4, severity: "danger", message: "No se pudo eliminar el producto" },
  ];

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
