import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Product from "./Pages/Product";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* <Home /> */}
      <Route path="/products/:id" element={<Product />} />
    </Routes>
  );
}

export default App;
