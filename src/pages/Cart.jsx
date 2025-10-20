import { useCart } from "../context/CartProvider";
import { Link } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../context/LanguageProvider";
import { useTranslation } from "react-i18next";

function Cart({ thumbnailSize }) {
  const { deleteItem, cartItems, setCartItems } = useCart();
  const { language } = useLanguage();
  const { t } = useTranslation();
  // count total price cart
  const totalPrice = cartItems.length
    ? cartItems.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      )
    : 0;
  // title of table
  const titleName = [
    { key: "row", className: "w-1/12" },
    { key: "image", className: "w-1/12" },
    { key: "name", className: "w-2/12 sm:w-5/12" },
    { key: "quantity", className: "w-1/12" },
    { key: "price", className: "w-1/12" },
    { key: "actions", className: "w-1/12" },
  ];
  // change quantity item
  async function handleQuantity(e, id) {
    const quantity = Number(e.target.value);
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    const { data } = await supabase
      .from("cart")
      .update({ quantity: quantity })
      .eq("id", id)
      .select();
    console.log(data);
  }
  //  convert digit to persian
  function toPersianDigits(order) {
    return String(order).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  return (
    <table
      dir={language === "en" ? "ltr" : "rtl"}
      className="w-full table-fixed text-xs sm:text-sm md:text-base"
    >
      <thead className=" bg-gray-100 h-24">
        <tr>
          {titleName.map((title) => (
            <th
              key={title.key}
              className={`p-4 border-b ${title.className} text-center`}
            >
              {t(`cartTable.${title.key}`, title.key)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="text-center">
        {!cartItems.length ? (
          <tr>
            <td
              colSpan={titleName.length}
              className="text-center font-medium sm:text-xl p-4"
            >
              {`${
                language === "en"
                  ? "Your Bag is empty."
                  : "سبد خرید شما خالی است."
              }`}
            </td>
          </tr>
        ) : (
          <>
            {cartItems.map((data, index) => (
              <tr key={data.id} className="border-b">
                <td>
                  {language === "en" ? index + 1 : toPersianDigits(index + 1)}
                </td>
                <td className="sm:p-4">
                  <img
                    src={data.img}
                    alt={data.title}
                    className={`${
                      thumbnailSize ? "w-12 sm:w-16" : "w-40"
                    } mx-auto`}
                  />
                </td>
                <td className="p-4">
                  <Link
                    to={`/products/${data.id}`}
                    className="hover:underline hover:text-blue-700"
                  >
                    {language === "en"
                      ? data.name
                      : toPersianDigits(data.name_fa)}
                  </Link>
                </td>
                <td className="p-4">
                  <select
                    value={data.quantity}
                    onChange={(e) => handleQuantity(e, data.id)}
                    className="outline-0"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {language === "en" ? num : toPersianDigits(num)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 font-medium">
                  {language === "en"
                    ? `$${data.price?.toFixed(2)}`
                    : `${toPersianDigits(
                        (data.price * 100000).toLocaleString()
                      )} تومان`}
                </td>
                <td className="p-4">
                  <p
                    className="text-blue-500 cursor-pointer text-center"
                    onClick={() => deleteItem(data.id)}
                  >
                    <i className="fi fi-rr-trash text-lg"></i>
                  </p>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={titleName.length}
                className="text-right p-4 font-medium sm:text-xl"
              >
                <div
                  className={`flex justify-between my-4 ${
                    thumbnailSize ? "mx-4" : "mx-8"
                  }`}
                >
                  <span>جمع کل :</span>
                  <div>
                    {language === "en"
                      ? `$${totalPrice.toFixed(2)}`
                      : `${toPersianDigits(
                          (totalPrice * 100000).toLocaleString()
                        )} تومان`}
                  </div>
                </div>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}

export default Cart;
