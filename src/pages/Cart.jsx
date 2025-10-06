import { useCart } from "../context/CartProvider";
import { Link } from "react-router";
import { supabase } from "../lib/supabaseClient";

function Cart({ thumbnailSize }) {
  const { deleteItem, cartItems, setCartItems } = useCart();

  // count total price cart
  const totalPrice = cartItems.length
    ? cartItems.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      )
    : 0;
  // title of table
  const titleName = [
    { name: "ردیف", className: "w-1/12" },
    { name: "عکس کالا", className: "w-1/12" },
    { name: "نام کالا", className: "w-2/12 sm:w-5/12" },
    { name: "تعداد", className: "w-1/12" },
    { name: "قیمت", className: "w-1/12" },
    { name: "عملیات", className: "w-1/12" },
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
  return (
    <table
      dir="rtl"
      className="w-full table-fixed text-xs sm:text-sm md:text-base "
    >
      <thead className=" bg-gray-100 h-24">
        <tr>
          {titleName.map((title) => (
            <th
              key={title.name}
              className={`p-4 border-b ${title.className} text-center`}
            >
              {title.name}
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
              Your Bag is empty.
            </td>
          </tr>
        ) : (
          <>
            {cartItems.map((data, index) => (
              <tr key={data.id} className="border-b">
                <td>{index + 1}</td>
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
                    {data.name}
                  </Link>
                </td>
                <td className="p-4">
                  <select
                    value={data.quantity}
                    onChange={(e) => handleQuantity(e, data.id)}
                    className="outline-0"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>
                <td className="p-4 font-medium">${data.price?.toFixed(2)}</td>
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
                  <div>${totalPrice.toFixed(2)}</div>
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
