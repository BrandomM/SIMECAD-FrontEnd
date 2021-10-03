import styles from "./Sales.module.scss";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import { MainTitle } from "../MainTitle/MainTitle";
import { SaleDetail } from "./SaleDetail/SaleDetail";
import { SalesTable } from "./SalesTable/SalesTable";

export function Sales() {
  let match = useRouteMatch();
  return (
    <div className={styles.sales}>
      <MainTitle label="Ventas" />
      <Switch>
        <Route exact path={`${match.path}/:ventaId`}>
          <SaleDetail />
        </Route>
        <Route path={`${match.path}`}>
          <SalesTable />
        </Route>
      </Switch>
    </div>
  );
}
