import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductCardContainer.module.scss";

import { ProductoService } from "../../../services/ProductoService";

export function ProductCardContainer() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductoService.listarProductos();
      setProductos(response);
    };
    fetchProducts();
  }, []);

  return (
    <ul className={styles.productCardContainer}>
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </ul>
  );
}
