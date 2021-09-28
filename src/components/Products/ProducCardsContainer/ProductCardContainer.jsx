import { useState, useEffect } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductCardContainer.module.scss";

import { ProductoService } from "../../../services/ProductoService";

export function ProductCardContainer() {
  const [productos, setProductos] = useState([]);
  const [updateGrid, setUpdateGrid] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ProductoService.listarProductos();
      setProductos(response);
    };
    fetchProducts();
    setUpdateGrid(false);
  }, [updateGrid]);

  return (
    <ul className={styles.productCardContainer}>
      {productos.map((producto) => <ProductCard image={producto.imagen} name={producto.nombre} price={producto.precio} />)}
    </ul>
  );
}
