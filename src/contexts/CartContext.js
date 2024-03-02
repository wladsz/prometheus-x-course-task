import { createContext, useContext } from "react";

const CartContext = createContext();
const CartContextProvider = CartContext.Provider;
const useCart = () => useContext(CartContext);

export {CartContextProvider, useCart};