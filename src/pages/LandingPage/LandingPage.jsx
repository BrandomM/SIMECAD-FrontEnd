import styles from "./LandingPage.module.scss";

import { Header } from "../../layout/Header/Header";
import { Navbar } from "../../layout/Navbar/Navbar";
import { Main } from "../../layout/Main/Main";

export function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <Header />
      <Navbar />
      <Main />
    </div>
  );
}
