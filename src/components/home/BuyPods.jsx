function BuyPods() {
  return (
    <div className="bg-lightGray text-center grid justify-center p-4 gap-4">
      <h2 className="text-3xl font-bold m-4">Say it in a way only you can.</h2>
      <p>
        Discover new engraving options for AirPods. Mix emoji, names, initials,
        and numbers.
      </p>
      <a
        href="https://www.apple.com/shop/iphone/accessories"
        className="text-[#06c] my-4"
      >
        Buy AirPods &gt;
      </a>
      <img src="/imgs/buy-airpods/airpods-engraving.jpg" alt="airpods" />
    </div>
  );
}

export default BuyPods;
