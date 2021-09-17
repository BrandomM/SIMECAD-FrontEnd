import styles from "./NavbarContainer.module.scss";

import { useTranslation } from "react-i18next";
import { NavbarItem } from "../NavbarItem/NavbarItem";

export function NavbarContainer() {
  const { t } = useTranslation();

  return (
    <ul className={styles.navbarContainer}>
      <NavbarItem
        iconClassName="bi bi-house"
        to="/"
        exact
        description={t("navbar.home")}
      />
      <NavbarItem
        iconClassName="bi bi-box-seam"
        to="/productos"
        description={t("navbar.products")}
      />
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
