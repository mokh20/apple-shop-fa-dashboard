import Accessories from "../Components/Accessories";
import PlayPicks from "../Components/PlayPicks";
import Header from "../Components/Header";
import ChargingEssentials from "../Components/ChargingEssentials";
import BuyPods from "../Components/BuyPods";
import AirTags from "../Components/AirTags";

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
