// src/context/ProductContext.jsx
import { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Cargar productos desde Firebase
  useEffect(() => {
    const loadProducts = async () => {
      const ref = collection(db, "products");
      const snapshot = await getDocs(ref);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setProducts(data);
    };

    loadProducts();
  }, []);

  // Obtener POR ID (del state, más rápido)
  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  // Obtener categoría desde firebase ✔️
  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  return (
    <ProductContext.Provider value={{
      products,
      getProductById,
      getProductsByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
}
