import styles from "./Header.module.scss";

import Logotipo from "../../assets/img/Logotipo.png";

import { useTranslation } from "react-i18next";
import { useState } from "react/cjs/react.development";

import { Link } from "react-router-dom";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";

export function Header() {
  const { t } = useTranslation();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const displayLogin = () => {
    setShowLogin(true);
  };

  const hideLogin = () => {
    setShowLogin(false);
  };

  const displayRegister = () => {
    setShowRegister(true);
  }

  const hideRegister = () => {
    setShowRegister(false);
  }

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img className={styles.logo} src={Logotipo} alt={t("header.logo")} />
        </Link>
        <button
          onClick={() => displayLogin()}
          className={`btn btn-blanco ${styles.login}`}
        >
          <span>{t("header.login")}</span>
          <i className={`bi bi-person-circle ${styles.icon}`}></i>
        </button>
      </header>
      <Login show={showLogin} cancel={hideLogin} showRegister={displayRegister} />
      <Register show={showRegister} cancel={hideRegister} showLogin={displayLogin} />
    </>
  );
}
