import { useState } from "react";
import data from "../data/playPickData.jsx";
import Slider from "./Slider.jsx";
function PlayPicks() {
  const [index, setIndex] = useState(0);
  return (
    <div className="my-4 grid justify-center text-center">
      <h2 className="text-3xl font-bold m-4">Play Picks</h2>
      <div className="grid gap-4">
        <Slider
          index={index}
          setIndex={setIndex}
          data={data}
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

export default PlayPicks;
