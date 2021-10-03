import { useEffect, createContext, useReducer } from "react";

export const ShoppingCartContext = createContext();

const initialShoppingCart = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter(
        (cartItem) => cartItem.producto.id !== action.payload
      );
    case "INCREASE_ONE":
      return state.map((cartItem) =>
        cartItem.producto.id === action.payload
          ? { ...cartItem, cantidad: cartItem.cantidad + 1 }
          : cartItem
      );
    case "REDUCE_ONE":
      return state.map((cartItem) =>
        cartItem.producto.id === action.payload
          ? { ...cartItem, cantidad: cartItem.cantidad - 1 }
          : cartItem
      );
    case "RESET_CART":
      return [];
    default:
      return state;
  }
};

export function ShoppingCartProvider({ children }) {
  const [shoppingCart, shoppingCartDispatch] = useReducer(
    reducer,
    initialShoppingCart
  );
  const data = { shoppingCart, shoppingCartDispatch };

  useEffect(() => {
    if (localStorage.getItem("shoppingCart")) {
      const cart = JSON.parse(localStorage.getItem("shoppingCart"));
      shoppingCartDispatch({ type: "SET_CART", payload: cart });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  return (
    <ShoppingCartContext.Provider value={data}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
