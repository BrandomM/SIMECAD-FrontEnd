import styles from "./NavbarContainer.module.scss";

import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useTranslation } from "react-i18next";

import { NavbarItem } from "../NavbarItem/NavbarItem";

export function NavbarContainer() {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <ul className={styles.navbarContainer}>
      <NavbarItem
        iconClassName="bi bi-house"
        to="/"
        exact
        description={t("navbar.home")}
      />
      {user !== null && (
        <NavbarItem
          iconClassName="bi bi-person"
          to="/perfil"
          description={t("navbar.profile")}
        />
      )}
      <NavbarItem
        iconClassName="bi bi-box-seam"
        to="/productos"
        description={t("navbar.products")}
      />
      {user?.rol === "Administrador" && (
        <>
          <NavbarItem
            iconClassName="bi bi-people"
            to="/usuarios"
            description={t("navbar.users")}
          />
          <NavbarItem
            iconClassName="bi bi-piggy-bank"
            to="/ventas"
            description={t("navbar.sales")}
          />
          <NavbarItem
            iconClassName="bi bi-bar-chart-line"
            to="/reportes"
            description={t("navbar.reports")}
          />
        </>
      )}
      {user?.rol === "Cliente" && (
        <>
          <NavbarItem
            iconClassName="bi bi-cart"
            to="/carrito"
            description="Carrito"
          />
          <NavbarItem
            iconClassName="bi bi-cash-coin"
            to="/compras"
            description="Compras"
          />
        </>
      )}
      <NavbarItem
        iconClassName="bi bi-journal-text"
        to="/nosotros"
        description={t("navbar.about us")}
      />
      <NavbarItem
        iconClassName="bi bi-telephone"
        to="/contacto"
        description={t("navbar.contact")}
      />
    </ul>
  );
}
