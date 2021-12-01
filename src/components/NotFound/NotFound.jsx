import { MainTitle } from "../MainTitle/MainTitle";
import styles from "./NotFound.module.scss";


export function NotFound() {
  return (
    <div className={styles.notFound}>
      <MainTitle label="Error 404" />
      <p>Página no encontrada</p>
    </div>
  );
}
