import styles from "./Users.module.scss";

import { useTranslation } from "react-i18next";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { MainTitle } from "../MainTitle/MainTitle";
import { UsersTable } from "./UsersTable/UsersTable";
import { CreateUser } from "./CreateUser/CreateUser";
import { EditUser } from "./EditUser/EditUser";

export function Users() {
  const { t } = useTranslation();
  let match = useRouteMatch();

  return (
    <div className={styles.users}>
      <MainTitle label={t("users.title")} />
      <Switch>
        <Route path={`${match.path}/registrar`}>
          <CreateUser />
        </Route>
        <Route exact path={`${match.path}/editar/:usuarioId`}>
          <EditUser />
        </Route>
        <Route path={`${match.path}`}>
          <UsersTable />
        </Route>
      </Switch>
    </div>
  );
}
