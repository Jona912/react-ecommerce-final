import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { ProductContext } from "../../context/ProductContext";


export default function NavBar() {
  const { products } = useContext(ProductContext);

  // Generar categorías únicas
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set); // Convertir Set → Array
  }, [products]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">MiEcommerce</Link>
      
      <ul className="nav-links">
        <Link to="/" className="home-link">Todas las categorías</Link>
        {categories.map(cat => (
          <li key={cat}>
            <Link to={`/category/${cat}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      <CartWidget />
    </nav>
  );
}
