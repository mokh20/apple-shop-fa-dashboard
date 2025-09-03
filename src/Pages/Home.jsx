import Accessories from "../Components/Accessories";
import PlayPicks from "../Components/PlayPicks";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import ChargingEssentials from "../Components/ChargingEssentials";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Accessories />
      <PlayPicks />
      <ChargingEssentials />
    </div>
  );
}

export default Home;
