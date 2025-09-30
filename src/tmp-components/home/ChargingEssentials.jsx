import Slider from "../ui/Slider.jsx";
import { useProducts } from "../../context/ProductsProvider.jsx";

function ChargingEssentials() {
  const { products } = useProducts();

  const filteredProducts = products.filter(
    (product) => product.category === "chargingEssentials"
  );
  return (
    <div className="py-8 my-8 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">Charging Essentials</h2>
      <div className="grid gap-4">
        <Slider data={filteredProducts} />
      </div>
      <p className="text-[#06c] mt-12">Shop Charging Essentials &gt;</p>
    </div>
  );
}

export default ChargingEssentials;
