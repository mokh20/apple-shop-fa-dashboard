import Slider from "../ui/Slider.jsx";
import { useProducts } from "../../context/ProductsProvider.jsx";
import { useTranslation } from "react-i18next";

function PlayPicks() {
  const { products } = useProducts();
  const { t } = useTranslation("home");
  const filteredProducts = products.filter(
    (product) => product.category === "playPick"
  );
  return (
    <div className="my-4 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">{t(`playPicks.title`)}</h2>
      <div className="grid gap-4">
        <Slider data={filteredProducts} />
      </div>
      <p className="text-[#06c] mt-12">{t(`playPicks.more`)} &gt;</p>
    </div>
  );
}

export default PlayPicks;
