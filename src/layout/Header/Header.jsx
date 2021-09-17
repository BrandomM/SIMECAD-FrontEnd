import styles from "./Header.module.scss";

import Logotipo from "../../assets/img/Logotipo.png";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={Logotipo} alt={t("header.logo")} />
      </Link>
      <Link className={`btn btn-blanco ${styles.login}`} to="/">{t("header.login")}</Link>
    </header>
  );
}
