import styles from "./ShoppingCart.module.scss";

import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { UserContext } from "../../context/UserContext";
import { useToast } from "../../hooks/useToast";

import { VentaService } from "../../services/VentaService";

import { MainTitle } from "../MainTitle/MainTitle";
import { CartItem } from "./CartItem/CartItem";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";

export function ShoppingCart() {
  const { shoppingCart, shoppingCartDispatch } =
    useContext(ShoppingCartContext);
  const { user } = useContext(UserContext);
  const toast = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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
    setShowConfirmDialog(false);
  };

  const cancel = () => {
    setShowConfirmDialog(false);
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
      <div className={styles.buttonContainer}>
        <button
          className={`btn btn-azulClaro ${styles.buyButton}`}
          onClick={() => setShowConfirmDialog(true)}
        >
          Comprar
        </button>
      </div>
      <ConfirmDialog
        show={showConfirmDialog}
        cancel={cancel}
        type="confirm"
        message={`¿Desea realizar la compra?`}
        confirm={buy}
      />
    </div>
  );
}
