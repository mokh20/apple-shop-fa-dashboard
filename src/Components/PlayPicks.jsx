import { useState } from "react";
import Slider from "./Slider.jsx";
import { useProducts } from "../context/ProductsProvider.jsx";

function PlayPicks() {
  const { products } = useProducts();
  const [index, setIndex] = useState(0);

  const filteredProducts = products.filter(
    (product) => product.category === "playPick"
  );
  return (
    <div className="my-4 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">Play Picks</h2>
      <div className="grid gap-4">
        <Slider
          index={index}
          setIndex={setIndex}
          data={filteredProducts}
          name="playPick slider"
        />
      </div>
      <p className="text-[#06c] mt-12">Playful Picks &gt;</p>
    </div>
  );
}

export default PlayPicks;
