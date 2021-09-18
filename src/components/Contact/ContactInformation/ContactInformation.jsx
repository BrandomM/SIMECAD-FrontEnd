import styles from "./ContactInformation.module.scss";

import { useTranslation } from "react-i18next";

export function ContactInformation() {
  const { t } = useTranslation();
  const T = (key) => t("contact.information."+key);

  return (
    <div className={styles.contactInformation}>
      <h2>{T("title")}</h2>
      <p>{T("p1")}</p>
      <p>
        <i class="bi bi-telephone" />
        <strong>{T("phone.label")}: </strong>
        <span>{T("phone.value")}</span>
      </p>
      <p>
        <i class="bi bi-phone" />
        <strong>{T("mobile.label")}: </strong>
        <span>{T("mobile.value")}</span>
      </p>
      <p>
        <i class="bi bi-envelope" />
        <strong>{T("email.label")}: </strong>
        <span>{T("email.value")}</span>
      </p>
      <p>
        <i class="bi bi-map" />
        <strong>{T("address.label")}: </strong>
        <span>{T("address.value")}</span>
      </p>
      <p>{T("p2")}</p>
    </div>
  );
}
