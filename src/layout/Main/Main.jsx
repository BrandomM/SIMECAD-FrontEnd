import styles from "./Main.module.scss";

import { Switch, Route } from "react-router";
import { Home } from "../../components/Home/Home";
import { Contact } from "../../components/Contact/Contact";
import { Users } from "../../components/Users/Users";
import { About } from "../../components/About/About";
import { Products } from "../../components/Products/Products";
import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";
import { Purchases } from "../../components/Purchases/Purchases";

export function Main() {
  return (
    <main className={styles.main}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/compras">
          <Purchases />
        </Route>
        <Route path="/carrito">
          <ShoppingCart />
        </Route>
        <Route path="/productos">
          <Products />
        </Route>
        <Route path="/usuarios">
          <Users />
        </Route>
        <Route path="/nosotros">
          <About />
        </Route>
        <Route path="/contacto">
          <Contact />
        </Route>
      </Switch>
    </main>
  );
}
