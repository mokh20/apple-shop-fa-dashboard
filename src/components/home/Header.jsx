import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageProvider";

function Header() {
  const { language } = useLanguage();
  const { t } = useTranslation("home");
  return (
    <section>
      <div
        className={`w-full bg-lightGray bg-center relative min-h-[350px] ${
          language === "fa" && "md:flex justify-start items-center"
        }`}
      >
        <span className="object-center  flex justify-center">
          <img
            src="/imgs/header-accessories.png"
            alt=""
            className={`max-h-[200px] absolute bottom-0 md:max-h-[250px] lg:max-h-[300px] xl:max-h-[350px] ${
              language === "en" ? "md:right-0" : "md:left-0"
            }`}
            loading="lazy"
          />
        </span>
        <div
          className={`absolute top-6 left-0 w-full flex flex-col justify-center text-sm text-center items-center gap-4 ${
            language === "en"
              ? " md:w-[60%] md:left-[10%] md:items-start md:justify-center md:h-full md:top-0  md:text-left md:gap-12"
              : " md:w-full md:relative md:left-0 md:text-right md:items-start md:mr-8 md:gap-12 xl:mr-20 "
          }`}
          dir={language === "en" ? "ltr" : "rtl"}
        >
          <h1 className="text-3xl w-full font-medium sm:text-4xl sm:w-7/12 lg:text-5xl xl:w-8/12 ">
            {t(`header.title`)}
          </h1>
          <h5 className="text-[#6c6c6e] w-full sm:text-xl sm:font-medium sm:w-7/12 md:text-2xl xl:w-8/12">
            {t(`header.detail`)}
          </h5>
          <a
            href="https://www.apple.com/shop/iphone/accessories"
            className="text-[#06c] w-full text-xs sm:text-sm sm:w-7/12 md:text-xl xl:w-8/12 "
          >
            {t(`header.more`)} &gt;
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;
