import styles from "./Contact.module.scss";

import { useTranslation } from "react-i18next";
import { MainTitle } from "../MainTitle/MainTitle";
import { ContactInformation } from "./ContactInformation/ContactInformation";
import { ContactForm } from "./ContactForm/ContactForm";

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className={styles.contact}>
      <MainTitle label={t("contact.title")} />
      <ContactInformation />
      <ContactForm />
    </div>
  );
}
