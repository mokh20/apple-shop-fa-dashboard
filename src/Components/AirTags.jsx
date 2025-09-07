import { useState } from "react";
import data from "../data/airTagsData.jsx";
import Slider from "./Slider";

function AirTags() {
  const [index, setIndex] = useState(0);
  return (
    <div className="my-4 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">
        AirTag and Featured Accessories
      </h2>
      <div className="grid gap-4">
        <Slider
          index={index}
          setIndex={setIndex}
          data={data}
          name="airTags slider"
        />
      </div>
      <a
        href="https://www.apple.com/shop/iphone/accessories"
        className="text-[#06c] mt-12"
      >
        Shop all AirTag accessories &gt;
      </a>
    </div>
  );
}

export default AirTags;
