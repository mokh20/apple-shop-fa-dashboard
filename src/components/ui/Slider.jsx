import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLanguage } from "../../context/LanguageProvider";

// Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Slider({ data }) {
  const { language } = useLanguage();
  return (
    <div className="relative" dir={language === "fa" && "rtl"}>
      <div className="flex justify-center h-[400px] w-full">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={15}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={
            language === "en"
              ? {
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }
              : {
                  nextEl: ".custom-prev",
                  prevEl: ".custom-next",
                }
          }
          breakpoints={{
            640: { slidesPerView: 3, slidesPerGroup: 3 },
          }}
          className="w-[350px] min-h-[440px] rounded-2xl sm:w-[640px] md:w-[780px] lg:w-[940px]"
          style={{
            paddingBottom: "3rem",
            "--swiper-navigation-size": "30px",
            "--swiper-navigation-color": "#000",
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <RenderData item={item} language={language} />
            </SwiperSlide>
          ))}

          {/* prev slide */}
          <button className="custom-prev absolute left-4 top-4/9 z-10 cursor-pointer hover:text-blue-500 disabled:invisible">
            <i className="fi fi-rr-angle-small-left text-3xl"></i>
          </button>
          {/* next slide */}
          <button className="custom-next absolute right-4 top-4/9 z-10 cursor-pointer hover:text-blue-500 disabled:invisible">
            <i className="fi fi-rr-angle-small-right text-3xl"></i>
          </button>
        </Swiper>
      </div>
    </div>
  );
}

function RenderData({ item, language }) {
  const { pathname } = useLocation();
  //  convert digit to persian
  function toPersianDigits(order) {
    return String(order).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Link
        to={`/products/${item.id}`}
        className="grid justify-items-center justify-evenly items-center min-w-full h-full bg-lightGray mx-0 rounded-2xl md:min-w-[250px] lg:min-w-[300px]"
        key={item.id}
      >
        <img src={item.img} alt={item.name} className="w-[150px]" />
        <p
          className="grid w-full text-center text-sm font-medium px-4 xl:text-base hover:underline hover:text-blue-700"
          dir={language === "fa" && "rtl"}
        >
          {language === "en" ? item.name : toPersianDigits(item.name_fa)}
        </p>
        <p
          className="text-[#8E8E90] text-sm font-medium xl:text-base"
          dir={language === "fa" && "rtl"}
        >
          {language === "en"
            ? `$${item.price.toFixed(2)}`
            : `${toPersianDigits(
                (item.price * 100000).toLocaleString()
              )} تومان`}
        </p>
      </Link>
    </>
  );
}
