import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageProvider";
import { useProducts } from "../../context/ProductsProvider";
import { Link } from "react-router";

function Accessories() {
  const { language } = useLanguage();
  const { products } = useProducts();
  const { t } = useTranslation("home");

  const filteredProducts = products.filter(
    (product) => product.category === "accessory"
  );
  return (
    <section
      className="m-4 grid text-center justify-items-center md:justify-items-stretch md:m-8"
      dir="ltr"
    >
      <h2 className="text-3xl font-bold m-4">{t("accessories.title")}</h2>
      <RenderData data={filteredProducts} t={t} language={language} />
      <a
        href="https://www.apple.com/shop/iphone/accessories"
        className="text-[#06c] mt-12"
        dir={language === "fa" && "rtl"}
      >
        {t("accessories.more")} &gt;
      </a>
    </section>
  );
}

function RenderData({ data, t, language }) {
  //  convert digit to persian
  function toPersianDigits(order) {
    return String(order).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  const tagClass = [
    "iPhone-pink",
    "iPhone-gold",
    "iPhone-wallet",
    "airpods",
    "iPhone-blue",
  ];
  return (
    <div className="grid layout-dashboard gap-2">
      {data.map((item, index) => (
        <Link
          className={`grid area-${tagClass[index]} justify-items-center items-center w-full h-full bg-lightGray py-4 my-4 mx-0 rounded-2xl`}
          key={item.id}
          to={`products/${item.id}`}
        >
          <img
            src={item.img}
            alt={item.category}
            className="w-[150px]"
            loading="lazy"
          />
          <p
            className="grid w-full text-center text-sm font-medium xl:text-base"
            dir={language === "fa" && "rtl"}
          >
            {language === "en" ? t(item.name) : item.name_fa}
          </p>
          <p
            className="text-[#8E8E90] text-sm font-medium xl:text-base"
            dir={language === "fa" && "rtl"}
          >
            {language === "en"
              ? `$${item.price.toFixed(2)}`
              : `${toPersianDigits(
                  (item.price * 100000).toLocaleString()
                )} تومان`}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default Accessories;
