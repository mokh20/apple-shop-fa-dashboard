import Accessories from "../components/home/Accessories";
import PlayPicks from "../components/home/PlayPicks";
import Header from "../components/home/Header";
import ChargingEssentials from "../components/home/ChargingEssentials";
import BuyPods from "../components/home/BuyPods";
import AirTags from "../components/home/AirTags";

function Home() {
  return (
    <div>
      <Header />
      <Accessories />
      <PlayPicks />
      <ChargingEssentials />
      <BuyPods />
      <AirTags />
    </div>
  );
}

export default Home;
