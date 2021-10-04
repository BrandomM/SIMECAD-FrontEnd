import styles from "./Statistics.module.scss";

import { MainTitle } from "../MainTitle/MainTitle";
import { ProductStatistics } from "./ProductStatistics/ProductStatistics";
import { CategoryStatistics } from "./CategoryStatistics/CategoryStatistics";
import { CustomerStatistics } from "./CustomerStatistics/CustomerStatistics";

export function Statistics() {
  return (
    <div className={styles.statistics}>
      <MainTitle label="Reportes" />
      <div>
        <ProductStatistics />
        <CategoryStatistics />
        <CustomerStatistics />
      </div>
    </div>
  );
}
