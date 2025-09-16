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
  const { cartItems } = useCart();
  return (
    <section className="sticky top-0 z-10 flex justify-between items-center py-8 bg-[#f9f9fc] border-b border-b-[#d1d1d3]">
      <Link to={"/"}>
        <i className="fi fi-brands-apple mx-4 sm:text-2xl lg:ml-12"></i>
      </Link>
      <div className="hidden justify-center text-[#2F2F2F] text-sm md:flex md:w-full md:justify-around">
        <RenderData />
      </div>
      <div className="flex gap-8 mx-4 sm:text-xl md:text-2xl lg:mr-12">
        <i className="fi fi-rr-search"></i>
        <i
          className="fi fi-rr-basket-shopping-simple relative cursor-pointer"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <span className="absolute flex items-center justify-center top-3 left-2 h-3 w-3 text-[10px] bg-black text-white text-center font-medium rounded-full md:text-sm md:w-4 md:h-4 md:left-3 md:top-4">
            {cartItems.length}
          </span>
        </i>
        <i
          className="fi fi-sr-user cursor-pointer"
          onMouseEnter={() => setIsLoginOpen(true)}
          onMouseLeave={() => setIsLoginOpen(false)}
        ></i>
        <div className="block sm:hidden">
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
    <>
      {datas.map((data) => (
        <span key={data}>{data}</span>
      ))}
    </>
  );
}

export default Navbar;
