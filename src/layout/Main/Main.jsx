import styles from "./Main.module.scss";

import { Switch, Route } from "react-router";
import { Home } from "../../components/Home/Home";
import { Contact } from "../../components/Contact/Contact";


export function Main() {
  return (
    <main className={styles.main}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/contacto">
          <Contact />
        </Route>
      </Switch>
    </main>
  );
}
