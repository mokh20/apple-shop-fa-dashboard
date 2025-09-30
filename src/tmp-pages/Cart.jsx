import { useCart } from "../context/CartProvider";
import { Link } from "react-router";

function Cart() {
  const { deleteItem, cartItems } = useCart();

  // count total price cart
  const totalPrice = cartItems.length
    ? cartItems.reduce(
        (sum, product) => sum + product.quantity * product.price,
        0
      )
    : 0;

  return (
    <div>
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
                  <div className="flex items-center text-xl h-full sm:text-2xl">
                    <div>{data.quantity}</div>
                    <i className="fi fi-rr-angle-small-down text-blue-500 mt-4"></i>
                  </div>
                  <div>
                    <p className="font-medium text-xl mb-4 sm:text-2xl">
                      ${data.price?.toFixed(2)}
                    </p>
                    <p
                      className="underline text-blue-500 cursor-pointer"
                      onClick={() => deleteItem(data.id)}
                    >
                      Remove
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
