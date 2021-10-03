import styles from "./Purchases.module.scss";

import { MainTitle } from "../MainTitle/MainTitle";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { PurchasesTable } from "./PurchasesTable/PurchasesTable";
import { PurchaseDetail } from "./PurchaseDetail/PurchaseDetail";

export function Purchases() {
  let match = useRouteMatch();

  return (
    <div className={styles.purchases}>
      <MainTitle label="Compras" />
      <Switch>
        <Route exact path={`${match.path}/:compraId`}>
          <PurchaseDetail />
        </Route>
        <Route path={`${match.path}`}>
          <PurchasesTable />
        </Route>
      </Switch>
    </div>
  );
}
