import "@flaticon/flaticon-uicons/css/all/all.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";
import { Link } from "react-router";
import { useState } from "react";
import { useCart } from "../context/CartProvider";
import LoginPopup from "./ProfilePopup";
import MiniCartHandler from "./MiniCartHandler";

const datas = [
  "Store",
  "Mac",
  "iPad",
  "iPhone",
  "Watch",
  "Vision",
  "Airpods",
  "TV & Home",
  "Entertainment",
  "Accessories",
  "Support",
];

function Navbar({ showCart, setShowCart }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  return (
    <section className="sticky top-0 z-20 flex justify-between items-center py-8 bg-[#f9f9fc] border-b border-b-[#d1d1d3]">
      <Link to={"/"}>
        <i className="fi fi-brands-apple mx-4 sm:text-lg lg:ml-12 lg:text-2xl"></i>
      </Link>
      <div className="hidden justify-center text-[#2F2F2F] text-xs md:flex md:w-full md:justify-around lg:text-sm">
        <RenderData />
      </div>
      <div
        className={`flex flex-col fixed top-0 text-2xl font-medium pl-12 bg-white w-full h-screen z-30 transition-all duration-500 md:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        } `}
      >
        <i
          className="fi fi-rr-cross-small m-4 text-2xl text-right lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></i>
        <RenderData />
      </div>
      <div className="flex gap-6 mx-4 sm:text-xl md:text-lg lg:text-2xl lg:mr-12">
        <i className="fi fi-rr-search"></i>
        <i
          className="fi fi-rr-basket-shopping-simple relative cursor-pointer"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <span className="absolute flex items-center justify-center top-3 left-2 h-3 w-3 text-[10px] bg-black text-white text-center font-medium rounded-full md:text-sm md:w-4 md:h-4 md:left-3 md:top-4">
            {cartItems.length}
          </span>
        </i>
        <div
          className={`fixed inset-0 bg-[#0000002c] top-32 ${
            showCart ? "visible" : "invisible"
          }`}
          onClick={() => setShowCart(false)}
        ></div>
        <i
          className="fi fi-sr-user cursor-pointer"
          onMouseEnter={() => {
            setShowCart(false);
            setIsLoginOpen(true);
          }}
          onMouseLeave={() => setIsLoginOpen(false)}
        ></i>
        <div className="block md:hidden" onClick={() => setIsMenuOpen(true)}>
          <i className="fi fi-rr-menu-burger"></i>
        </div>
      </div>
      <LoginPopup isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
      <MiniCartHandler showCart={showCart} setShowCart={setShowCart} />
    </section>
  );
}

function RenderData() {
  return (
    <div className="w-full grid gap-4 m-4 sm:m-0 md:flex md:justify-evenly">
      {datas.map((data) => (
        <span key={data}>{data}</span>
      ))}
    </div>
  );
}

export default Navbar;
