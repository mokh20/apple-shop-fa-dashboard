import "@flaticon/flaticon-uicons/css/all/all.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import { Link } from "react-router";
import { useState } from "react";
import { useCart } from "../../context/CartProvider";
import LoginPopup from "../ProfilePopup";
import MiniCartHandler from "../MiniCartHandler";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageProvider";
import toPersianDigits from "../../utils/toPersianDigits";
import { UserAuth } from "../../context/AuthProvider";

function Navbar({ showCart, setShowCart }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { userData } = UserAuth();
  // return object
  const navbarItems = t("navbar", { returnObjects: true });
  return (
    <section
      className="sticky top-0 z-20 flex justify-between items-center py-8 bg-[#f9f9fc] border-b border-b-[#d1d1d3]"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <div className="flex items-center sm:text-lg  lg:text-2xl lg:ml-1 xl:ml-2">
        <LanguageSwitcher />
        <Link to={"/"}>
          <i className="fi fi-brands-apple sm:text-lg lg:mr-4 lg:text-2xl"></i>
        </Link>
      </div>
      <div className="hidden justify-center text-[#2F2F2F] text-xs md:flex md:w-full md:justify-around lg:text-sm">
        <RenderData navbarItems={navbarItems} />
      </div>
      <div
        className={`flex flex-col fixed top-0 text-2xl font-medium bg-white w-full h-screen z-30 transition-all duration-500 md:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } ${language === "en" ? "pl-12" : "pr-12"} `}
      >
        <i
          className={`fi fi-rr-cross-small m-4 text-2xl ${
            language === "en" ? "text-right" : "text-left"
          } lg:hidden`}
          onClick={() => setIsMenuOpen(false)}
        ></i>
        <RenderData navbarItems={navbarItems} />
      </div>
      <div className="flex gap-6 mx-4 sm:text-xl md:text-lg lg:text-2xl lg:mr-12">
        <i className="fi fi-rr-search"></i>
        {/* <Link to={cartItems?.length ?? 0 && "/cart"}> */}
        <i
          className="fi fi-rr-basket-shopping-simple relative cursor-pointer"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <span className="absolute flex items-center justify-center top-2 left-2 h-4 w-4 text-[10px] bg-black text-white text-center font-medium rounded-full md:text-sm md:w-5 md:h-5 md:left-3 md:top-4">
            {language === "en"
              ? cartItems?.length ?? 0
              : toPersianDigits(cartItems?.length ?? 0)}
          </span>
        </i>
        {/* </Link> */}
        <div
          className={`fixed inset-0 bg-[#0000002c] top-32 ${
            showCart ? "visible" : "invisible"
          }`}
          onClick={() => setShowCart(false)}
        ></div>
        <Link to={userData && userData.length === 0 && "/signUp"}>
          <i
            className="fi fi-sr-user cursor-pointer"
            onMouseEnter={() => {
              setShowCart(false);
              setIsLoginOpen(true);
            }}
            onMouseLeave={() => setIsLoginOpen(false)}
          ></i>
        </Link>
        <div className="block md:hidden" onClick={() => setIsMenuOpen(true)}>
          <i className="fi fi-rr-menu-burger"></i>
        </div>
      </div>
      <LoginPopup isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
      <MiniCartHandler showCart={showCart} setShowCart={setShowCart} />
    </section>
  );
}

function RenderData({ navbarItems }) {
  return (
    <div className="w-full grid gap-4 m-4 sm:m-0 md:flex md:justify-evenly">
      {navbarItems.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  );
}

export default Navbar;
