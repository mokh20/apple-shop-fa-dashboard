import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { useState, useEffect } from "react";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";

function App() {
  const [showCart, setShowCart] = useState(false);
  // create condition for dashboard page
  const location = useLocation();
  const dashboardPath = ["/dashboard"];
  const hideLayout = dashboardPath.includes(location.pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
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
