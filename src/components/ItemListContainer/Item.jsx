import { Link } from "react-router-dom";

export default function Item({ item }) {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>${item.price.toLocaleString()}</p>
      <Link className="detail-link" to={`/item/${item.id}`}>Ver detalle</Link>
    </div>
  );
}
