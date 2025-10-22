import { useTranslation } from "react-i18next";

function BuyPods() {
  const { t } = useTranslation("home");

  return (
    <div className="bg-lightGray text-center grid justify-center p-4 gap-4">
      <h2 className="text-3xl font-bold m-4">{t(`buyPods.title`)}</h2>
      <p>{t(`buyPods.detail`)}</p>
      <a
        href="https://www.apple.com/shop/iphone/accessories"
        className="text-[#06c] my-4"
      >
        {t(`buyPods.more`)} &gt;
      </a>
      <img
        src="/imgs/buy-airpods/airpods-engraving.jpg"
        alt="airpods"
        loading="lazy"
      />
    </div>
  );
}

export default BuyPods;
