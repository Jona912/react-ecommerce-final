import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartWidget() {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Link to="/cart">
      🛒 {totalQuantity() > 0 && <span>{totalQuantity()}</span>}
    </Link>
  );
}
