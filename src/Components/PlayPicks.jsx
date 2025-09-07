import { useEffect, useState } from "react";
import Slider from "./Slider.jsx";
import axios from "axios";

function PlayPicks() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getData({ setProduct });
  }, []);

  const [index, setIndex] = useState(0);
  return (
    <div className="my-4 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">Play Picks</h2>
      <div className="grid gap-4">
        <Slider
          index={index}
          setIndex={setIndex}
          data={product}
          name="playPick slider"
        />
      </div>
      <a
        href="https://www.apple.com/shop/iphone/accessories"
        className="text-[#06c] mt-12"
      >
        Playful Picks &gt;
      </a>
    </div>
  );
}
async function getData({ setProduct }) {
  try {
    const { data } = await axios.get("http://localhost:3005/playPickData");
    setProduct(data);
  } catch (error) {
    console.log(error);
  }
}

export default PlayPicks;
