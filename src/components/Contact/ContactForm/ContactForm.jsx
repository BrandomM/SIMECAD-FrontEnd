import styles from "./ContactForm.module.scss";

import { useTranslation } from "react-i18next";

export function ContactForm() {
  const { t } = useTranslation();
  const T = (key) => t("contact.form." + key);

  return (
    <div className={styles.contactForm}>
      <form action="">
        <div>
          <label className={`form-label ${styles.label}`} htmlFor="nombre">
            {T("name")}
          </label>
          <input type="text" className="form-control" id="nombre" />
        </div>
        <div>
          <label className={`form-label ${styles.label}`} htmlFor="correo">
            {T("email")}
          </label>
          <input type="text" className="form-control" id="nombre" />
        </div>
        <div>
          <label className={`form-label ${styles.label}`} htmlFor="mensaje">
            {T("message")}
          </label>
          <textarea className="form-control" id="mensaje" />
        </div>
        <div className={styles.buttonContainer}>
          <button className="btn btn-azulOscuro">{T("send")}</button>
        </div>
      </form>
    </div>
  );
}
