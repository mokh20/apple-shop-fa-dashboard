import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useCart } from "../context/CartProvider";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageProvider";

function MiniCartHandler({ showCart, setShowCart }) {
  const { cartItems } = useCart();
  const pathname = useLocation();
  const { t } = useTranslation();
  const { language } = useLanguage();
  // Close cart on route change
  useEffect(() => {
    setShowCart(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  //  convert digit to persian
  function toPersianDigits(order) {
    return String(order).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  return (
    <div
      className={`w-full min-h-[400px] absolute bg-[#F9F9FC] transition-all z-10 ${
        showCart & (cartItems.length >= 3)
          ? "translate-y-72"
          : showCart & (cartItems.length < 3)
          ? "translate-y-56"
          : "invisible translate-y-0"
      }`}
      onMouseLeave={() => setShowCart(false)}
    >
      <div className="m-14">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium mb-8">{t("miniCart.title")}</h2>
          <Link to="/cart">
            <button className="rounded-full bg-blue-400 text-white px-4 h-10 cursor-pointer">
              {t("miniCart.review")}
            </button>
          </Link>
        </div>
        {!cartItems.length ? (
          <p className="md:text-xl">{t("miniCart.emptyBag")}</p>
        ) : (
          cartItems.slice(0, 3).map((data) => (
            <Link to={`/products/${data.id}`} key={data.id}>
              <div className="flex items-center gap-4">
                <img src={data.img} alt="" className="w-24" />
                <p className="text-xs sm:text-sm md:text-base hover:underline hover:text-blue-700">
                  {language === "en"
                    ? data.name
                    : toPersianDigits(data.name_fa)}
                </p>
              </div>
            </Link>
          ))
        )}
        {cartItems.length > 3 && (
          <p className="text-gray-500 mt-4">
            +{" "}
            {language === "en"
              ? cartItems.length - 3
              : toPersianDigits(cartItems.length - 3)}{" "}
            {t("miniCart.quantityInfo")}
          </p>
        )}
      </div>
    </div>
  );
}
export default MiniCartHandler;
