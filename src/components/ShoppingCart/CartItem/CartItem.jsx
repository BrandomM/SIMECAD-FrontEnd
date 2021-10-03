import styles from "./CartItem.module.scss";

import { useContext } from "react";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";

export function CartItem({ producto, cantidad }) {
  const { shoppingCartDispatch } = useContext(ShoppingCartContext);

  const increase = (id) => {
    if (cantidad >= producto.disponibilidad) {
      return;
    }
    shoppingCartDispatch({ type: "INCREASE_ONE", payload: id });
  };

  const decrease = (id) => {
    if (cantidad <= 1) {
      return;
    }
    shoppingCartDispatch({ type: "REDUCE_ONE", payload: id });
  };

  const remove = (id) => {
    shoppingCartDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <li className={styles.cartItem}>
      <h3>{producto.nombre}</h3>
      <img src={producto.imagen} alt={producto.nombre} />
      <h4>${producto.precio}</h4>
      <h3>Cantidad: {cantidad}</h3>
      <button onClick={() => decrease(producto.id)}>[-]</button>
      <button onClick={() => increase(producto.id)}>[+]</button>
      <button onClick={() => remove(producto.id)}>Remover del carrito</button>
    </li>
  );
}
