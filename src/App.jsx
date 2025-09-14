import { Route, Routes, useLocation } from "react-router";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Footer from "./Components/footer";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import Cart from "./Pages/Cart";
function App() {
  const [showCart, setShowCart] = useState(false);
  // create condition for dashboard page
  const location = useLocation();
  const dashboardPath = ["/dashboard"];
  const hideLayout = dashboardPath.includes(location.pathname);
  return (
    <div>
      {!hideLayout && <Navbar showCart={showCart} setShowCart={setShowCart} />}
      <main className={`${showCart & !hideLayout ? "blur-xs" : ""}`}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
