import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeItem, clear, totalPrice } = useContext(CartContext);

  if (cart.length === 0) return <p className="empty">No hay productos en el carrito</p>;

  return (
    <div className="cart-container">
      {cart.map(p => (
        <div key={p.id} className="cart-item">
          <div className="cart-item-info">
            <img className="cart-item-image" src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>Precio: ${p.price.toLocaleString()}</p>
            <p>Cantidad: {p.quantity}</p>
            <p>Subtotal: ${(p.price * p.quantity).toLocaleString()}</p>
          </div>
          <button className="cart-item-btn" onClick={() => removeItem(p.id)}>Eliminar</button>
        </div>
      ))}

      <h2 className="cart-total">Total: ${totalPrice().toLocaleString()}</h2>

      <button className="cart-remove-btn" onClick={clear}>Vaciar carrito</button>
      <Link className="cart-checkout-btn" to="/checkout">Finalizar compra</Link>
    </div>
  );
}
