import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Footer from "./Components/footer";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import Cart from "./Pages/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);
  return (
    <div>
      <Navbar showCart={showCart} setShowCart={setShowCart} />
      <main className={`${showCart ? "blur-xs" : ""}`}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer className={`${showCart ? "blur-xs" : ""}`} />
    </div>
  );
}

export default App;
