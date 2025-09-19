import { useState } from "react";
import Slider from "./Slider.jsx";
import { useProducts } from "../context/ProductsProvider.jsx";

function ChargingEssentials() {
  const { products } = useProducts();
  const [index, setIndex] = useState(0);

  const filteredProducts = products.filter(
    (product) => product.category === "chargingEssentials"
  );
  return (
    <div className="py-8 my-8 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">Charging Essentials</h2>
      <div className="grid gap-4">
        <Slider
          index={index}
          setIndex={setIndex}
          data={filteredProducts}
          name="charging slider"
        />
      </div>
      <p className="text-[#06c] mt-12">Shop Charging Essentials &gt;</p>
    </div>
  );
}

export default ChargingEssentials;
