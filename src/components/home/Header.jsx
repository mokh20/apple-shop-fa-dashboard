function Header() {
  return (
    <section>
      <div className="w-full bg-lightGray bg-center relative min-h-[350px]">
        <span className="object-center  flex justify-center">
          <img
            src="/imgs/header-accessories.png"
            alt=""
            className="max-h-[200px] absolute bottom-0 md:right-0 md:max-h-[250px] lg:max-h-[300px] xl:max-h-[350px]"
            loading="lazy"
          />
        </span>
        <div className="absolute top-6 left-0 w-full flex flex-col justify-center text-sm text-center items-center gap-4 md:w-[60%] md:left-[10%] md:items-start md:justify-center md:h-full md:top-0  md:text-left md:gap-12">
          <h1 className="text-3xl font-medium sm:text-4xl lg:text-5xl">
            Accessorize in a snap.
          </h1>
          <h5 className="text-[#6c6c6e] w-[60%] sm:text-xl sm:font-medium md:text-2xl">
            Find a MagSafe case, wallet, or charger that's right for you.
          </h5>
          <a
            href="https://www.apple.com/shop/iphone/accessories"
            className="text-[#06c] text-xs sm:text-sm md:text-xl"
          >
            Shop MagSafe &gt;
          </a>
        </div>
      </div>
    </section>
  );
}

export default Header;
