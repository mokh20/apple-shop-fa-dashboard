import Slider from "../ui/Slider.jsx";
import { useProducts } from "../../context/ProductsProvider.jsx";
import { useTranslation } from "react-i18next";

function ChargingEssentials() {
  const { products } = useProducts();
  const { t } = useTranslation("home");

  const filteredProducts = products.filter(
    (product) => product.category === "chargingEssentials"
  );
  return (
    <div className="py-8 my-8 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">
        {t(`chargingEssentials.title`)}
      </h2>
      <div className="grid gap-4">
        <Slider data={filteredProducts} />
      </div>
      <p className="text-[#06c] mt-12">{t(`chargingEssentials.more`)} &gt;</p>
    </div>
  );
}

export default ChargingEssentials;
