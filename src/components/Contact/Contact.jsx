import styles from './Contact.module.scss';

import { useTranslation } from 'react-i18next';

export function Contact() {
    const {t} = useTranslation();

    return <div className={styles.contact}>
        <h1 className={styles.title}>{t("contact.title")}</h1>
    </div>;
}