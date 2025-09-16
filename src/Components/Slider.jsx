import { useEffect } from "react";
import { Link, useLocation } from "react-router";

export default function Slider({ data, index, setIndex, name }) {
  const nextBtn = () => setIndex((prev) => prev + 1);
  const prevBtn = () => setIndex((prev) => prev - 1);
  return (
    <>
      <div className="flex justify-center h-[400px] ">
        <div className="flex overflow-hidden w-[350px] relative sm:w-[640px] md:w-[780px] lg:w-[940px]">
          <button
            className={`${
              index >= data.length - 1 ? "hidden" : "block"
            } absolute right-4 top-1/2 z-10 sm:${
              index >= 3 ? "hidden" : "block"
            }`}
            onClick={nextBtn}
          >
            <i className="fi fi-rr-angle-small-right text-3xl"></i>
          </button>
          <button
            className={`${
              index === 0 ? "hidden" : "block"
            } absolute left-10 top-1/2 z-10 sm:left-4`}
            onClick={prevBtn}
          >
            <i className="fi fi-rr-angle-small-left text-3xl"></i>
          </button>
          <div
            className="flex gap-4 w-full items-center h-[400px] transition-transform duration-700 ease-in-out"
            style={{
              transform:
                window.innerWidth < 767
                  ? `translateX(calc(-${index * 100}% - ${index * 1}rem))`
                  : window.innerWidth < 1024
                  ? `translateX(calc(-${index * 100}% - ${index * 0.8}rem))`
                  : `translateX(calc(-${index * 100}% - ${index * 0.5}rem))`,
            }}
          >
            <RenderData data={data} />
          </div>
        </div>
      </div>
      <NavigateButton
        index={index}
        setIndex={setIndex}
        data={data}
        name={name}
      />
    </>
  );
}

function RenderData({ data }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {data.map((item) => (
        <Link
          to={`/products/${item.id}`}
          className="grid justify-items-center justify-evenly items-center min-w-full h-full bg-lightGray my-4 mx-0 rounded-2xl md:min-w-[250px] lg:min-w-[300px]"
          key={item.id}
        >
          <img src={item.img} alt={item.name} className="w-[150px]" />
          <p className="grid w-full text-center text-sm font-medium xl:text-base hover:underline hover:text-blue-700">
            {item.name}
          </p>
          <p className="text-[#8E8E90] text-sm font-medium xl:text-base">
            ${item.price.toFixed(2)}
          </p>
        </Link>
      ))}
    </>
  );
}

function NavigateButton({ data, index, setIndex, name }) {
  const isMobile = window.innerWidth < 760;
  const limitBtn = isMobile ? 10 : 4;
  return (
    <section className="flex justify-center w-full gap-4 mt-4">
      {data
        .slice(0, limitBtn)
        .map(
          (_, i) =>
            i < 10 && (
              <input
                type="radio"
                name={name}
                key={i}
                onClick={() => setIndex(i)}
                className={`text-sm  rounded-md accent-gray-700`}
                checked={index === i}
                readOnly
              />
            )
        )}
    </section>
  );
}
