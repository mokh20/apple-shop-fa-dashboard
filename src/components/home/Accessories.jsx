import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageProvider";

function Accessories() {
  const { t } = useTranslation("home");
  const { language } = useLanguage();
  const data = [
    {
      name: "item1",
      price: 49.0,
      img: "/imgs/featured-iphone/iphone16-pink.png",
      tag: "iPhone-pink",
      id: 1,
    },
    {
      name: "item2",
      price: 49.0,
      img: "/imgs/featured-iphone/iphone16-gold.png",
      tag: "iPhone-gold",
      id: 2,
    },
    {
      name: "item3",
      price: 59.0,
      img: "/imgs/featured-iphone/iphone16-wallet.png",
      tag: "iPhone-wallet",
      id: 3,
    },
    {
      name: "item4",
      price: 249.0,
      img: "/imgs/featured-iphone/airpods-pro2.png",
      tag: "airpods",
      id: 4,
    },
    {
      name: "item5",
      price: 39.0,
      img: "/imgs/featured-iphone/iphone16-blue.png",
      tag: "iPhone-blue",
      id: 5,
    },
  ];
  return (
    <section
      className="m-4 grid text-center justify-items-center md:justify-items-stretch md:m-8"
      dir="ltr"
    >
      <h2 className="text-3xl font-bold m-4">{t("accessories.title")}</h2>
      <RenderData data={data} t={t} language={language} />
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
  return (
    <div className="grid layout-dashboard gap-2">
      {data.map((item) => (
        <div
          className={`grid area-${item.tag} justify-items-center items-center w-full h-full bg-lightGray py-4 my-4 mx-0 rounded-2xl`}
          key={item.id}
        >
          <img
            src={item.img}
            alt={item.tag}
            className="w-[150px]"
            loading="lazy"
          />
          <a
            href="https://www.apple.com/shop/iphone/accessories"
            className="grid w-full text-center text-sm font-medium xl:text-base"
            dir={language === "fa" && "rtl"}
          >
            {t(`accessories.items.${item.name}`)}
          </a>
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
        </div>
      ))}
    </div>
  );
}

export default Accessories;
