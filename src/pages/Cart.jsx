import { useCart } from "../context/CartProvider";
import { Link } from "react-router";
import { supabase } from "../lib/supabaseClient";

function Cart() {
  const { deleteItem, cartItems, setCartItems } = useCart();

  // count total price cart
  const totalPrice = cartItems.length
    ? cartItems.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      )
    : 0;

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
    <div dir="ltr">
      <div className="m-12">
        {!cartItems.length ? (
          <p className="text-center font-medium sm:text-xl">
            Your Bag is empty.
          </p>
        ) : (
          <>
            <p className="text-center font-medium sm:text-xl">
              Your bag total ${totalPrice.toFixed(2)} .
            </p>
            <div className="grid justify-items-center lg:justify-center">
              {cartItems?.map((data) => (
                <div
                  key={data.id}
                  className="grid items-center justify-items-center justify-evenly w-full border-b-2 border-b-gray-200 pb-4 sm:flex sm:justify-between lg:gap-12"
                >
                  <img src={data.img} alt="" className="w-40" />
                  <p className="hover:underline hover:text-blue-700">
                    <Link to={`/products/${data.id}`}>{data.name}</Link>
                  </p>
                  <div className=" text-blue-500 text-xl sm:text-2xl">
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
                  </div>
                  <div>
                    <p className="font-medium text-xl mb-4 sm:text-2xl">
                      ${data.price?.toFixed(2)}
                    </p>
                    <p
                      className="text-blue-500 cursor-pointer text-center"
                      onClick={() => deleteItem(data.id)}
                    >
                      <i className="fi fi-rr-trash text-lg"></i>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end w-[70%] m-8 gap-8 font-medium sm:text-xl">
              <span>Total : </span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
