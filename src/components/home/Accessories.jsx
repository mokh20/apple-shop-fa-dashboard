const datas = [
  {
    name: "iPhone 16 Plus Silicone Case with MagSafe-Peony",
    price: 49.0,
    img: "/imgs/featured-iphone/iphone16-pink.png",
    tag: "iPhone-pink",
    id: 1,
  },
  {
    name: "iPhone 16 Pro Max Clear Case with MagSafe",
    price: 49.0,
    img: "/imgs/featured-iphone/iphone16-gold.png",
    tag: "iPhone-gold",
    id: 2,
  },
  {
    name: "iPhone FineWoven Wallet with MagSafe - Deep Blue",
    price: 59.0,
    img: "/imgs/featured-iphone/iphone16-wallet.png",
    tag: "iPhone-wallet",
    id: 3,
  },
  {
    name: "iPhone 16 Plus Silicone Case with MagSafe-Peony",
    price: 249.0,
    img: "/imgs/featured-iphone/airpods-pro2.png",
    tag: "airpods",
    id: 4,
  },
  {
    name: "iPhone 16e Silicone Case - Winter Blue",
    price: 39.0,
    img: "/imgs/featured-iphone/iphone16-blue.png",
    tag: "iPhone-blue",
    id: 5,
  },
];

function Accessories() {
  return (
    <section className="m-4 grid text-center justify-items-center md:justify-items-stretch md:m-8">
      <h2 className="text-3xl font-bold m-4">Featured iPhone Accessories</h2>
      <RenderData />
      <a
        href="https://www.apple.com/shop/iphone/accessories"
        className="text-[#06c] mt-12"
      >
        Show Case & Protection &gt;
      </a>
    </section>
  );
}

function RenderData() {
  return (
    <div className="grid layout-dashboard gap-2">
      {datas.map((data) => (
        <div
          className={`area-${data.tag} grid justify-items-center items-center w-full h-full bg-lightGray my-4 mx-0 rounded-2xl`}
          key={data.id}
        >
          <img
            src={data.img}
            alt={data.name}
            className="w-[150px]"
            loading="lazy"
          />
          <a
            href="https://www.apple.com/shop/iphone/accessories"
            className="grid w-full text-center text-sm font-medium xl:text-base"
          >
            {data.name}
          </a>
          <p className="text-[#8E8E90] text-sm font-medium xl:text-base">
            ${data.price.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Accessories;
