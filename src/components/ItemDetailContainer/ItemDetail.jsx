import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";

export default function ItemDetail({ item }) {
  const {cart, addItem } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  

  const handleAdd = (qty) => {
    addItem(item, qty);
    setAdded(true);
  };

  return (
    <div className="item-detail-container">
      <img src={item.image} alt={item.title} />
      <div className="item-detail-info">
        <h2>{item.title}</h2>
        <p className="item-description">{item.description}</p>
        <p>Stock disponible: {item.stock - (cart.find(i => i.id === item.id)?.quantity || 0)}</p>
        <p className="item-price">${item.price.toLocaleString()}</p>
        
        {!added ? (
          <ItemCount item={item} onAdd={handleAdd} /> 

        ) : (
          <Link className="cart-link" to="/cart">Ir al carrito</Link>
        )}
      </div>
    </div>
  );
}
