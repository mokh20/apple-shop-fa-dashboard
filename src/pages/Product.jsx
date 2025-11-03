import { useParams } from "react-router";
import { useProducts } from "../context/ProductsProvider";
import Slider from "../components/ui/Slider";
import { useCart } from "../context/CartProvider";
import { useEffect, useState } from "react";
import PopupMessage from "../components/PopupMessage";
import { useLanguage } from "../context/LanguageProvider";
import toPersianDigits from "../utils/toPersianDigits";

function Product() {
  const { id } = useParams();
  const { products } = useProducts();
  const filteredProduct = products.find((data) => data.id == id);
  const { language } = useLanguage();
  //  states
  const [message, setMessage] = useState("");
  // popup message status
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div className="relative" dir={language === "fa" && "rtl"}>
      <PopupMessage setMessage={setMessage} message={message} />
      <ProductDetail
        product={filteredProduct}
        setMessage={setMessage}
        language={language}
      />
      <ProductInfo product={filteredProduct} language={language} />
      <Suggestion
        data={products.slice(0, 10)}
        language={language}
        name={filteredProduct?.category}
      />
    </div>
  );
}

function ProductDetail({ product, setMessage, language }) {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((item) => item.id === product.id);

  return (
    <section className="grid justify-center m-4">
      <div className="border-b-2 border-b-gray-200 flex md:border-none justify-center lg:gap-12">
        <div
          className={`grid content-around ${
            language === "fa" && "md:max-w-[85%]"
          }`}
        >
          <div className="grid justify-items-center md:flex md:justify-between md:items-start">
            <div className="grid gap-4 md:ml-8">
              <h2 className="text-2xl font-medium my-4 sm:font-semibold sm:text-3xl lg:w-[80%]">
                {language === "en" ? product?.name : product?.name_fa}
              </h2>
              <span>
                {language === "en"
                  ? `$${product?.price.toFixed(2)}`
                  : `${toPersianDigits(
                      (product?.price * 100000).toLocaleString()
                    )} تومان`}
              </span>
              <div className="grid gap-2">
                <span>{language === "en" ? "Color - Black" : "رنگ مشکی"}</span>
                <div className="flex gap-4 text-2xl">
                  <i className="fi fi-ss-circle rounded-full text-[#3F3F3F]"></i>
                  <i className="fi fi-ss-circle rounded-full text-[#D0C2B6]"></i>
                  <i className="fi fi-ss-circle rounded-full text-[#656589]"></i>
                  <i className="fi fi-ss-circle rounded-full text-[#3D3D3D]"></i>
                </div>
              </div>
            </div>
            <img src={`${product?.img}`} alt={product?.name} loading="lazy" />
          </div>
          <div className="grid my-4 gap-4 md:items-end md:ml-8">
            <span className="flex items-center gap-2">
              <i className="fi fi-rs-truck-moving"></i>
              <p>
                {language === "en" ? "Delivery : In Stock" : "وضعیت : در انبار"}
              </p>
            </span>
            <div className="flex justify-center md:justify-start">
              <button
                className={`min-w-full rounded-md  text-white ${
                  isInCart
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 cursor-pointer"
                } px-16 py-2  md:min-w-[350px]`}
                onClick={() => {
                  !isInCart
                    ? (addToCart({ product }), setMessage("added"))
                    : setMessage("InCart");
                }}
              >
                {isInCart
                  ? `${language === "en" ? "In Cart" : "موجود در سبد خرید"}`
                  : `${
                      language === "en" ? "Add to Bag" : "افزودن به سبد خرید"
                    }`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductInfo({ product, language }) {
  return (
    <div className="grid mx-8 md:ml-12">
      <h2 className="text-2xl font-medium mb-8">
        {language === "en" ? "Product Information" : "اطلاعات محصول"}
      </h2>
      <span className="grid items-center gap-4 sm:flex">
        <h4 className="text-xl font-medium min-w-20">
          {language === "en" ? "Overview" : "نگاه کلی"}
        </h4>
        <p>{language === "en" ? product?.overview : product?.overview_fa}</p>
      </span>
    </div>
  );
}
function Suggestion({ data, language }) {
  return (
    <div className="text-center my-8 font-medium border-t-2 border-t-gray-200 mx-4 py-4">
      <h3 className="text-2xl mb-4">
        {language === "en" ? "You may also like" : "محصولات پیشنهادی"}
      </h3>
      <Slider data={data} />
    </div>
  );
}
export default Product;
