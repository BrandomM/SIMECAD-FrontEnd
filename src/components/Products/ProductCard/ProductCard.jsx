import styles from "./ProductCard.module.scss";

import { useContext } from "react";
import { ShoppingCartContext } from "../../../context/ShoppingCartContext";
import { UserContext } from "../../../context/UserContext";
import { useToast } from "../../../hooks/useToast";

export function ProductCard({ producto }) {
  const { shoppingCart, shoppingCartDispatch } =
    useContext(ShoppingCartContext);

  const { user } = useContext(UserContext);

  const toast = useToast();

  const addProduct = (producto) => {
    const payload = {
      cantidad: 1,
      precioUnitario: producto.precio,
      producto: producto,
    };
    shoppingCartDispatch({ type: "ADD_TO_CART", payload: payload });
  };

  const removeProduct = (id) => {
    shoppingCartDispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const shouldLogin = () => {
    toast("info", "Para agregar productos debes iniciar sesión");
  };

  return (
    <li className={`${styles.productCard} card p-5`}>
      <img
        className={styles.picture}
        width={230}
        height={345}
        src={producto.imagen}
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <h4 className="mt-3">{`$ ${producto.precio}`}</h4>
        {user?.rol !== "Cliente" ? (
          <button className="btn btn-azulClaro" onClick={() => shouldLogin()}>
            Agregar al carrito
          </button>
        ) : shoppingCart.filter(
            (cartElement) => cartElement.producto.id === producto.id
          ).length <= 0 ? (
          <button
            className="btn btn-azulClaro"
            onClick={() => addProduct(producto)}
          >
            Agregar al carrito
          </button>
        ) : (
          <button
            className="btn btn-azulClaro"
            onClick={() => removeProduct(producto.id)}
          >
            Remover del carrito
          </button>
        )}
      </div>
    </li>
  );
}
