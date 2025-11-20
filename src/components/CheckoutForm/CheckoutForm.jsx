import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function CheckoutForm() {
  const { cart, totalPrice, clear } = useContext(CartContext);

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      buyer,
      items: cart,
      total: totalPrice(),
      date: Timestamp.now()
    };

    const ref = await addDoc(collection(db, "orders"), order);

    setOrderId(ref.id);
    clear();
  };

  if (orderId) {
    return (
      <div className="checkout-success">
        <h2>Gracias por tu compra</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
        <div className="order-details">
          <h3>Resumen de tu pedido</h3>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="total">Total pagado: <strong>
            ${(() => {
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
            });
            return total.toFixed(2);
            })()}</strong></p>
          <p className="buyer-info">
            Comprador: {buyer.name} ({buyer.email} / {buyer.phone})
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3>Finalizar compra</h3>
      <input 
        placeholder="Nombre"
        value={buyer.name}
        onChange={(e)=>setBuyer({...buyer, name: e.target.value})}
      />
      <input 
        placeholder="Email"
        value={buyer.email}
        onChange={(e)=>setBuyer({...buyer, email: e.target.value})}
      />
      <input 
        placeholder="Teléfono"
        value={buyer.phone}
        onChange={(e)=>setBuyer({...buyer, phone: e.target.value})}
      />

      <button className="checkout-btn" type="submit" disabled={cart.length === 0}>Confirmar compra</button>
    </form>
  );
}
