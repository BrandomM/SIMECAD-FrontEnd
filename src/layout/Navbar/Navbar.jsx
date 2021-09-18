import styles from "./Navbar.module.scss";

import { NavbarContainer } from "./NavbarContainer/NavbarContainer";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavbarContainer />
    </nav>
  );
}
