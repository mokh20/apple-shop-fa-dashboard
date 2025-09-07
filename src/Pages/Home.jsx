import Accessories from "../Components/Accessories";
import PlayPicks from "../Components/PlayPicks";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import ChargingEssentials from "../Components/ChargingEssentials";
import BuyPods from "../Components/BuyPods";
import AirTags from "../Components/AirTags";
import Footer from "../Components/footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <Accessories />
      <PlayPicks />
      <ChargingEssentials />
      <BuyPods />
      <AirTags />
      <Footer />
    </div>
  );
}

export default Home;
