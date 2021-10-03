import styles from "./ShoppingCart.module.scss";

import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { UserContext } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";

import { VentaService } from "../../services/VentaService";

import { MainTitle } from "../MainTitle/MainTitle";
import { CartItem } from "./CartItem/CartItem";

export function ShoppingCart() {
  const { shoppingCart, shoppingCartDispatch } =
    useContext(ShoppingCartContext);
  const { user } = useContext(UserContext);
  const toast = useToast();

  const buy = async () => {
    const venta = {
      usuario: user,
      productosVenta: shoppingCart,
    };
    const success = await VentaService.registrarVenta(venta);
    if (success) {
      toast("success", "Compra exitosa");
      shoppingCartDispatch({ type: "RESET_CART" });
    } else {
      toast("danger", "No se pudo realizar la compra");
    }
  };

  return (
    <div className={styles.cart}>
      <MainTitle label="Carrito de compra" />
      <ul className={styles.cartList}>
        {shoppingCart.map((shoppingItem) => (
          <CartItem
            key={shoppingItem.producto.id}
            producto={shoppingItem.producto}
            cantidad={shoppingItem.cantidad}
          />
        ))}
      </ul>
      <button onClick={() => buy()}>Comprar</button>
    </div>
  );
}
