import styles from "./Main.module.scss";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { Switch, Route } from "react-router";
import { Home } from "../../components/Home/Home";
import { Contact } from "../../components/Contact/Contact";
import { Users } from "../../components/Users/Users";
import { About } from "../../components/About/About";
import { Products } from "../../components/Products/Products";
import { ShoppingCart } from "../../components/ShoppingCart/ShoppingCart";
import { Purchases } from "../../components/Purchases/Purchases";
import { Sales } from "../../components/Sales/Sales";
import { Statistics } from "../../components/Statistics/Statistics";
import { NotFound } from "../../components/NotFound/NotFound";

export function Main() {
  const { user } = useContext(UserContext);

  return (
    <main className={styles.main}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* Administrador */}
        {user?.rol === "Administrador" && (
          <Route path="/reportes">
            <Statistics />
          </Route>
        )}
        {user?.rol === "Administrador" && (
          <Route path="/usuarios">
            <Users />
          </Route>
        )}
        {user?.rol === "Administrador" && (
          <Route path="/ventas">
            <Sales />
          </Route>
        )}
        {/* Cliente */}
        {user?.rol === "Cliente" && (
          <Route path="/compras">
            <Purchases />
          </Route>
        )}
        {user?.rol === "Cliente" && (
          <Route path="/carrito">
            <ShoppingCart />
          </Route>
        )}
        {/* Todos */}
        <Route path="/productos">
          <Products />
        </Route>
        <Route path="/nosotros">
          <About />
        </Route>
        <Route path="/contacto">
          <Contact />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}
