import { useEffect } from "react";
import { useProducts } from "../context/ProductsProvider";
import { Link, useLocation } from "react-router";
import { useCart } from "../context/CartProvider";

function MiniCartHandler({ showCart, setShowCart }) {
  const { products } = useProducts();
  const { cartItems, setCartItems } = useCart();
  const filteredProducts = products.filter(
    (product) => product.category === "cart"
  );
  useEffect(() => {
    setCartItems(filteredProducts);
  }, [products]);

  const pathname = useLocation();

  // Close cart on route change
  useEffect(() => {
    setShowCart(false);
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div
      className={`w-full min-h-[400px] absolute bg-[#F9F9FC] transition-all z-10 ${
        showCart & (cartItems.length >= 3)
          ? "translate-y-72"
          : showCart & (cartItems.length < 3)
          ? "translate-y-56"
          : "invisible translate-y-0"
      }`}
      onMouseLeave={() => setShowCart(false)}
    >
      <div className="m-14">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium mb-8">Bag</h2>
          <Link to="/cart">
            <button className="rounded-full bg-blue-400 text-white px-4 h-10 cursor-pointer">
              Review Bag
            </button>
          </Link>
        </div>
        {!cartItems.length ? (
          <p className="md:text-xl">Your Bag is empty.</p>
        ) : (
          cartItems.slice(0, 3).map((data) => (
            <Link to={`/products/${data.id}`} key={data.id}>
              <div className="flex items-center gap-4">
                <img src={data.img} alt="" className="w-24" />
                <p className="text-xs sm:text-sm md:text-base hover:underline hover:text-blue-700">
                  {data.name}
                </p>
              </div>
            </Link>
          ))
        )}
        {cartItems.length > 3 && (
          <p className="text-gray-500 mt-4">
            {cartItems.length - 3} more items in your bag
          </p>
        )}
      </div>
    </div>
  );
}
export default MiniCartHandler;
