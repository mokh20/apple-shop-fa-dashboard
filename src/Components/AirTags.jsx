import { useState } from "react";
import Slider from "./Slider";
import { useProducts } from "../context/ProductsProvider";

function AirTags() {
  const products = useProducts();
  const [index, setIndex] = useState(0);

  const filteredProducts = products.filter(
    (product) => product.category === "airTags"
  );

  return (
    <div className="my-4 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">
        AirTag and Featured Accessories
      </h2>
      <div className="grid gap-4">
        <Slider
          index={index}
          setIndex={setIndex}
          data={filteredProducts}
          name="airTags slider"
        />
      </div>
      <p className="text-[#06c] mt-12">Shop all AirTag accessories &gt;</p>
    </div>
  );
}

export default AirTags;
