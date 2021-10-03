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
      <div className={styles.namePrice}>
        <h4>{producto.nombre}</h4>
        <h5>Precio unitario: ${producto.precio}</h5>
      </div>
      <img
        className={styles.picture}
        src={producto.imagen}
        alt={producto.nombre}
      />
      <div className={styles.quantity}>
        <button
          className={`btn btn-azulClaro ${styles.button}`}
          onClick={() => decrease(producto.id)}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
        <h3>{cantidad}</h3>
        <button
          className={`btn btn-azulClaro ${styles.button}`}
          onClick={() => increase(producto.id)}
        >
          <i className="bi bi-plus-lg" />
        </button>
      </div>
      <button className="btn btn-naranja text-white" onClick={() => remove(producto.id)}>Remover del carrito</button>
    </li>
  );
}
