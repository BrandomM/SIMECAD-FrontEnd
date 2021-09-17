import styles from "./Navbar.module.scss";

import { NavbarContainer } from "../../components/NavbarContainer.jsx/NavbarContainer";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavbarContainer />
    </nav>
  );
}
