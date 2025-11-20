import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import "./App.css";
export default function App() {
  return (
    <ProductProvider>
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
        <footer>
          <p>Ecommerce en react</p>
        </footer>
      </BrowserRouter>
    </CartProvider>
    </ProductProvider>
  );
}
