import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function ItemCount({ item, onAdd }) {
  const [count, setCount] = useState(1);
  const { cart } = useContext(CartContext);

  // Buscar si está en el carrito
  const itemInCart = cart.find(p => p.id === item.id);

  // Calcular stock restante sin useMemo
  const remainingStock = itemInCart
    ? item.stock - itemInCart.quantity
    : item.stock;

  const handleAdd = () => {
    if (count <= remainingStock) {
      onAdd(count);
      setCount(1);
    }
  };

  return (
    <div className="item-count-container">
       
      <button
        className="count-btn"
        disabled={count <= 1}
        onClick={() => setCount(count - 1)}
      >
        -
      </button>

      <span className="count-number">{count}</span>


      <button
        className="count-btn"
        disabled={count >= remainingStock}
        onClick={() => setCount(count + 1)}
      >
        +
      </button>

      <button
        className="count-btn"
        disabled={remainingStock <= 0}
        onClick={handleAdd}
      >
        Agregar
      </button>

      {remainingStock <= 0 && (
        <p className="no-stock">Ya agregaste todo el stock disponible</p>
      )}
    </div>
  );
}
