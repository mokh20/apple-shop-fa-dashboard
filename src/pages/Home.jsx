import Accessories from "../components/home/Accessories";
import PlayPicks from "../components/home/PlayPicks";
import Header from "../components/home/Header";
import ChargingEssentials from "../components/home/ChargingEssentials";
import BuyPods from "../components/home/BuyPods";
import AirTags from "../components/home/AirTags";
import { useLanguage } from "../context/LanguageProvider";

function Home() {
  const { language } = useLanguage();
  return (
    <div dir={language === "fa" && "rtl"}>
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
