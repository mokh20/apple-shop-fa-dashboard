import { useEffect, useState } from "react";
import Slider from "./Slider.jsx";
import axios from "axios";

function ChargingEssentials() {
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getData({ setProduct });
  }, []);
  return (
    <div className="py-8 my-8 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">Charging Essentials</h2>
      <div className="grid gap-4">
        <Slider
          index={index}
          setIndex={setIndex}
          data={product}
          name="charging slider"
        />
      </div>
      <a
        href="https://www.apple.com/shop/iphone/accessories"
        className="text-[#06c] mt-12"
      >
        Shop Charging Essentials &gt;
      </a>
    </div>
  );
}
async function getData({ setProduct }) {
  try {
    const { data } = await axios.get(
      "http://localhost:3005/chargingEssentialsData"
    );
    setProduct(data);
  } catch (error) {
    console.log(error);
  }
}
export default ChargingEssentials;
