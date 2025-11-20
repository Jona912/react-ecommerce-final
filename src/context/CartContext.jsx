// src/context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  const addItem = (item, quantity) => {
    const exists = cart.find(p => p.id === item.id);
    const newQty = exists ? exists.quantity + quantity : quantity;

    if (newQty > item.stock) {
      alert(`No hay suficiente stock. Máximo disponible: ${item.stock}`);
      return;
    }

    if (exists) {
      setCart(cart.map(p =>
        p.id === item.id ? { ...p, quantity: newQty } : p
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeItem = (id) =>
    setCart(cart.filter(i => i.id !== id));

  const clear = () => setCart([]);

  const totalQuantity = () =>
    cart.reduce((acc, i) => acc + i.quantity, 0);

  const totalPrice = () =>
    cart.reduce((acc, i) => acc + i.quantity * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        totalQuantity,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
