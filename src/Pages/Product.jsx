import { useParams } from "react-router";
import { useProducts } from "../context/ProductsProvider";
import Slider from "../Components/Slider";
import { useState } from "react";
import { useCart } from "../context/CartProvider";

function Product() {
  const { id } = useParams();
  const { products } = useProducts();
  const [index, setIndex] = useState(0);
  const filteredProduct = products.find((data) => data.id == id);
  return (
    <div>
      <ProductDetail product={filteredProduct} />
      <ProductInfo product={filteredProduct} />
      <Suggestion
        index={index}
        setIndex={setIndex}
        data={products.slice(0, 10)}
        name={filteredProduct?.category}
      />
    </div>
  );
}

function ProductDetail({ product }) {
  const { addToCart } = useCart();
  return (
    <section className="grid justify-center m-4">
      <div className="border-b-2 border-b-gray-200 md:flex md:border-none lg:gap-12">
        <div className="grid content-around">
          <div className="grid justify-items-center md:flex md:justify-between md:items-start">
            <div className="grid gap-4">
              <h2 className="text-2xl font-medium my-4 sm:font-semibold sm:text-3xl lg:w-[80%]">
                {product?.name}
              </h2>
              <span>${product?.price.toFixed(2)}</span>
              <div className="grid gap-2">
                <span>Color - Black</span>
                <div className="flex gap-4 text-2xl">
                  <i className="fi fi-ss-circle rounded-full text-[#3F3F3F]"></i>
                  <i className="fi fi-ss-circle rounded-full text-[#D0C2B6]"></i>
                  <i className="fi fi-ss-circle rounded-full text-[#656589]"></i>
                  <i className="fi fi-ss-circle rounded-full text-[#3D3D3D]"></i>
                </div>
              </div>
            </div>
            <img src={`${product?.img}`} alt={product?.name} />
          </div>
          <div className="grid my-4 md:items-end gap-4">
            <span className="flex items-center gap-2">
              <i className="fi fi-rs-truck-moving"></i>
              <p>Delivery : In Stock</p>
            </span>
            <div className="flex justify-center md:justify-start">
              <button
                className="min-w-full rounded-md bg-blue-600 text-white px-16 py-2 md:min-w-[350px]"
                onClick={() => addToCart({ product })}
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductInfo({ product }) {
  return (
    <section>
      <div className="grid mx-8">
        <h2 className="text-2xl font-medium mb-8">Product Information</h2>
        <span className="grid items-center gap-4 sm:flex">
          <h4 className="text-xl font-medium">Overview</h4>
          <p>{product?.overview}</p>
        </span>
      </div>
    </section>
  );
}
function Suggestion({ index, setIndex, data, name }) {
  return (
    <div className="text-center my-8 font-medium border-t-2 border-t-gray-200 mx-4 py-4">
      <h3 className="text-2xl mb-4">You may also like</h3>
      <Slider index={index} setIndex={setIndex} data={data} name={name} />
    </div>
  );
}
export default Product;
