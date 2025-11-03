import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageProvider";
import toPersianDigits from "../../utils/toPersianDigits";

function Footer() {
  const [items, setItems] = useState([]);
  const { t } = useTranslation("footer");
  const { language } = useLanguage();
  const getCart = useCallback(async () => {
    try {
      const { data } = await supabase.from("footer").select();
      setItems(data);
    } catch (error) {
      throw new Error(error);
    }
  }, []);
  useEffect(() => {
    getCart();
  }, [getCart]);
  return (
    <footer
      className="bg-lightGray  h-full  mt-auto"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <Delivery t={t} />
      <div className="border-b-2 mx-8 py-4 mb-4 border-b-gray-200 gap-4 grid">
        <p>{t("information.p1")}</p>
        <p>{t("information.p2")}</p>
        <p>{t("information.p3")}</p>
      </div>
      <Navigate language={language} />
      <QuickAccess items={items} language={language} />
    </footer>
  );
}

function Delivery({ t }) {
  const data = [
    {
      name: "fastDelivery.title",
      icon: <i className="fi fi-rs-truck-moving"></i>,
      detail: "fastDelivery.detail",
      more: "more",
      id: 1,
    },
    {
      name: "easyReturns.title",
      icon: <i className="fi fi-bs-box-circle-check"></i>,
      detail: "easyReturns.detail",
      more: "more",
      id: 2,
    },
    {
      name: "shopAppleCard.title",
      icon: <i className="fi fi-rr-credit-card"></i>,
      detail: "shopAppleCard.detail",
      more: "more",
      id: 3,
    },
    {
      name: "makeThemYours.title",
      icon: <i className="fi fi-rs-circle-ellipsis"></i>,
      detail: "makeThemYours.detail",
      more: "more",
      id: 4,
    },
  ];
  return (
    <div className="grid justify-center justify-items-center text-center sm:grid-cols-2 xl:flex">
      {data.map((d) => (
        <div key={d.id} className="grid w-[60%] p-4 m-8 gap-4 sm:w-full">
          <span className="text-4xl">{d.icon}</span>
          <h3 className="text-xl font-medium">{t(`delivery.${d.name}`)}</h3>
          <p>{t(`delivery.${d.detail}`)}</p>
          <a href="" className="text-[#06c]">
            {t(`delivery.${d.more}`)}
          </a>
        </div>
      ))}
    </div>
  );
}

function Navigate({ language }) {
  return (
    <section
      className="flex gap-4 items-center justify-items-center text-[#818182] mx-2"
      dir="ltr"
    >
      <i className="fi fi-brands-apple ml-8 sm:text-2xl  text-black"></i>
      <span>&gt;</span>
      <span>{language === "en" ? "iPhone" : "آیفون"}</span>
      <span>&gt;</span>
      <span>
        {language === "en" ? "iPhone Accessories" : "لوازم جانبی آیفون"}
      </span>
    </section>
  );
}

function QuickAccess({ items, language }) {
  const groups = [
    [0, 2],
    [2, 4],
    [4, 5],
    [6, 9],
    [9, 11],
  ];
  const [isOpenId, setIsOpenId] = useState(false);
  function handlerOpen(id) {
    setIsOpenId((prev) => (prev === id ? null : id));
  }
  const sortedItems = items.sort((a, b) => a.id - b.id);
  return (
    <div className="block flex-wrap items-start justify-between gap-4 mx-8 mt-4 border-b-2 border-b-gray-200 sm:flex">
      {groups.map(([start, end], groupId) => (
        <div key={groupId}>
          {sortedItems?.slice(start, end).map((data) => (
            <div
              key={data.id}
              className="grid my-8 border-b-2 border-gray-200 pb-4 sm:border-none sm:pb-0"
              onClick={() => handlerOpen(data.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="mb-4 text-xl font-bold">
                  {language === "en" ? data.title : data.title_fa}
                </h3>
                <i
                  className={`fi fi-rr-angle-small-down ${
                    isOpenId === data.id ? "fi-rr-angle-small-up" : ""
                  } text-2xl sm:hidden`}
                ></i>
              </div>
              <ul
                className={`transition-all overflow-hidden ${
                  isOpenId === data.id ? "max-h-[500px]" : "max-h-0"
                } gap-4 transition-all text-[#000000b8] p-0 text-normal sm:grid sm:visible sm:max-h-full`}
              >
                {(language === "en" ? data.nav : data.nav_fa)?.map(
                  (nav, navId) => (
                    <li key={navId}>
                      {language !== "en" ? toPersianDigits(nav) : nav}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Footer;
