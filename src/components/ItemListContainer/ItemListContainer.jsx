import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import ItemList from "./ItemList";

export default function ItemListContainer() {
  const { id } = useParams();
  const { products, getProductsByCategory } = useContext(ProductContext);
  console.log(products);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!id) {
      // Todas las categorías
      setItems(products);
    } else {
      // Filtrado por categoría
      const filtered = getProductsByCategory(id);
      setItems(filtered);
    }
  }, [id, products]);

  return <ItemList items={items} />;
}
