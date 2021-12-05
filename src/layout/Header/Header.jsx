import styles from "./Header.module.scss";

import Logotipo from "../../assets/img/Logotipo.png";
import defaultUserPicture from "../../assets/img/defaultUserPicture.png";

import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router";

import { LoginService } from "../../services/LoginService";

import { Link } from "react-router-dom";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";

export function Header() {
  const { user, setUser } = useContext(UserContext);

  const { t } = useTranslation();

  const history = useHistory();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

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

  const confirm = async () => {
    setShowDialog(false);
    LoginService.logout();
    setUser(null);
    history.push("/");
  };

  const cancel = () => {
    setShowDialog(false);
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
              <Link className={styles.profileLink} to="/perfil">
                <p className={styles.username}>{user.nombre}</p>
                <img
                  className={styles.userPicture}
                  src={user.imagen !== "" ? user.imagen : defaultUserPicture}
                  alt={user.nombre}
                />
              </Link>
              <div className={styles.logout}>
                <i
                  className="bi bi-box-arrow-right"
                  onClick={() => setShowDialog(true)}
                />
              </div>
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

      {user?.nombre && (
        <ConfirmDialog
          show={showDialog}
          confirm={() => confirm()}
          cancel={() => cancel()}
          type="confirm"
          message="¿Desea cerrar sesión?"
        />
      )}

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
