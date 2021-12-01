import styles from "./Products.module.scss";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import { MainTitle } from "../MainTitle/MainTitle";
import { ProductCardContainer } from "./ProductCardContainer/ProductCardContainer";
import { ProductsTable } from "./ProductsTable/ProductsTable";
import { CreateProduct } from "./CreateProduct/CreateProduct";
import { EditProduct } from "./EditProduct/EditProduct";

export function Products() {
  const { user } = useContext(UserContext);
  let match = useRouteMatch();

  return (
    <div className={styles.products}>
      <MainTitle label="Productos" />

      {(user?.rol !== "Administrador" && user?.rol !== "Empleado") && <ProductCardContainer />}
      {(user?.rol === "Administrador" || user?.rol === "Empleado") && (
        <Switch>
          <Route path={`${match.path}/registrar`}>
            <CreateProduct />
          </Route>
          <Route exact path={`${match.path}/editar/:productoId`}>
            <EditProduct />
          </Route>
          <Route path={`${match.path}`}>
            <ProductsTable />
          </Route>
        </Switch>
      )}
    </div>
  );
}
