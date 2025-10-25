import { useLanguage } from "../context/LanguageProvider";

function PopupMessage({ setMessage, message }) {
  const { language } = useLanguage();
  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 bg-blue-500 z-20 w-2xs text-sm  text-white p-3 rounded-lg shadow-md font-medium  transition-all flex items-center justify-between ${
        message
          ? "translate-y-8 transition-all"
          : "-translate-y-30 transition-all"
      } ${
        message === "added" ? "bg-green-500" : ""
      } sm:w-sm sm:text-base md:px-6`}
    >
      <div>
        {message === "added"
          ? `${language === "en" ? "Added to Cart" : "به سبد خرید اضافه شد"}`
          : `${
              language === "en"
                ? "Already in Cart"
                : "این محصول در سبد خرید ثبت شده است"
            }`}
      </div>
      <i
        className="fi fi-rr-cross-small mt-2 text-lg lg:text-2xl"
        onClick={() => setMessage(false)}
      ></i>
    </div>
  );
}

export default PopupMessage;
