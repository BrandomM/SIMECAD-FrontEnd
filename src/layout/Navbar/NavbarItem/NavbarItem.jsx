import styles from "./NavbarItem.module.scss";

import { NavLink } from "react-router-dom";

export function NavbarItem({ to, exact = false, description, iconClassName }) {
  return (
    <li className={styles.navbarItem}>
      <NavLink
        className={styles.navbarLink}
        activeClassName={styles.navbarLinkActive}
        exact={exact}
        to={to}
      >
        <i className={iconClassName} />
        <span>{description}</span>
      </NavLink>
    </li>
  );
}
