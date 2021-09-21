import styles from "./Header.module.scss";

import Logotipo from "../../assets/img/Logotipo.png";
import defaultUserPicture from "../../assets/img/defaultUserPicture.png";

import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext";

import { LoginService } from "../../services/LoginService";

import { Link } from "react-router-dom";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";



export function Header() {
  const { user, setUser } = useContext(UserContext);

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
  };

  const hideRegister = () => {
    setShowRegister(false);
  };

  const logout = () => {
    LoginService.logout();
    setUser(null);
  };

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <img className={styles.logo} src={Logotipo} alt={t("header.logo")} />
        </Link>

        {user?.nombre && (
          <>
            <div className={styles.userInformation}>
              <p className={styles.username}>{user.nombre}</p>
              <img
                className={styles.userPicture}
                src={user.imagen !== "" ? user.imagen : defaultUserPicture}
                alt={user.nombre}
                onClick={() => logout()}
              />
            </div>
          </>
        )}

        {!user?.nombre && (
          <button
            onClick={() => displayLogin()}
            className={`btn btn-blanco ${styles.login}`}
          >
            <span>{t("header.login")}</span>
            <i className={`bi bi-person-circle ${styles.icon}`}></i>
          </button>
        )}
      </header>

      {!user?.nombre && (
        <>
          <Login
            show={showLogin}
            cancel={hideLogin}
            showRegister={displayRegister}
          />
          <Register
            show={showRegister}
            cancel={hideRegister}
            showLogin={displayLogin}
          />
        </>
      )}
    </>
  );
}
