import styles from "./ConfirmDialog.module.scss";

import { useTranslation } from "react-i18next";

export function ConfirmDialog({ show, confirm, cancel, type, message }) {
  const { t } = useTranslation();
  const T = (key) => t("confirmDialog." + key);

  if (!show) {
    return <></>;
  }

  return (
    <div className={styles.dialog}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{T(type)}</h5>
            <button
              type="button"
              onClick={() => cancel()}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => cancel()}
              className="btn btn-blanco"
              data-bs-dismiss="modal"
            >
              {T("no")}
            </button>
            <button
              type="button"
              onClick={() => confirm()}
              className={`btn ${
                type === "confirm" ? "btn-azulClaro" : "btn-rojo"
              }`}
            >
              {T("yes")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
