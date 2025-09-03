import { useState } from "react";
import data from "../data/chargingEssentialsData.jsx";
import Slider from "./Slider.jsx";

function ChargingEssentials() {
  const [index, setIndex] = useState(0);
  return (
    <div className="py-8 my-8 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">Charging Essentials</h2>
      <div className="grid gap-4">
        <Slider
          index={index}
          setIndex={setIndex}
          data={data}
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

export default ChargingEssentials;
