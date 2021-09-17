import styles from "./Main.module.scss";

import { Switch, Route } from "react-router";
import { Contact } from "../../components/Contact/Contact";

export function Main() {
  return (
    <main className={styles.main}>
      <Switch>

          <Route path="/contacto">
              <Contact />
          </Route>
      </Switch>
    </main>
  );
}
