import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Footer() {
  const [items, setItems] = useState([]);
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
    <section className="bg-lightGray mt-8 h-full">
      <Delivery />

      <div className="border-b-2 mx-8 py-4 mb-4 border-b-gray-200 gap-4 grid">
        <p>
          To access and use all Apple Card features and products available only
          to Apple Card users, you must add Apple Card to Wallet on an iPhone or
          iPad that supports and has the latest version of iOS or iPadOS. Apple
          Card is subject to credit approval, available only for qualifying
          applicants in the United States, and issued by Goldman Sachs Bank USA,
          Salt Lake City Branch.
        </p>
        <p>
          Apple Payments Services LLC, a subsidiary of Apple Inc., is a service
          provider of Goldman Sachs Bank USA for Apple Card and Savings
          accounts. Neither Apple Inc. nor Apple Payments Services LLC is a
          bank.
        </p>
        <p>
          If you reside in the U.S. territories, please call Goldman Sachs at
          877-255-5923 with questions about Apple Card. We approximate your
          location from your internet IP address by matching it to a geographic
          region or from the location entered during your previous visit to
          Apple.
        </p>
      </div>
      <Navigate />
      <QuickAccess items={items} />
    </section>
  );
}

function Delivery() {
  const data = [
    {
      name: "Fast delivery or pickup",
      icon: <i className="fi fi-rs-truck-moving"></i>,
      detail: "Complete your return online or take it to an Apple Store.",
      more: "Learn more >",
      id: 1,
    },
    {
      name: "Fast delivery or pickup",
      icon: <i className="fi fi-bs-box-circle-check"></i>,
      detail: "Complete your return online or take it to an Apple Store.",
      more: "Learn more >",
      id: 2,
    },
    {
      name: "Fast delivery or pickup",
      icon: <i className="fi fi-rr-credit-card"></i>,
      detail: "Complete your return online or take it to an Apple Store.",
      more: "Learn more >",
      id: 3,
    },
    {
      name: "Fast delivery or pickup",
      icon: <i className="fi fi-rs-circle-ellipsis"></i>,
      detail: "Complete your return online or take it to an Apple Store.",
      more: "Learn more >",
      id: 4,
    },
  ];
  return (
    <div className="grid justify-center justify-items-center text-center sm:grid-cols-2 xl:flex">
      {data.map((d) => (
        <div key={d.id} className="grid w-[60%] p-4 m-8 gap-4 sm:w-full">
          <span className="text-4xl">{d.icon}</span>
          <h3 className="text-xl font-medium">{d.name}</h3>
          <p>{d.detail}</p>
          <a href="" className="text-[#06c]">
            {d.more}
          </a>
        </div>
      ))}
    </div>
  );
}

function Navigate() {
  return (
    <section className="flex gap-4 items-center justify-items-center text-[#818182] mx-2">
      <i className="fi fi-brands-apple ml-8 sm:text-2xl  text-black"></i>
      <span>&gt;</span>
      <span>iPhone</span>
      <span>&gt;</span>
      <span>iPhone Accessories</span>
    </section>
  );
}

function QuickAccess({ items }) {
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
  return (
    <div className="block flex-wrap items-start justify-between gap-4 mx-8 mt-4 border-b-2 border-b-gray-200 sm:flex">
      {groups.map(([start, end], groupId) => (
        <div key={groupId}>
          {items?.slice(start, end).map((data) => (
            <div
              key={data.id}
              className="grid my-8 border-b-2 border-gray-200 pb-4 sm:border-none sm:pb-0"
              onClick={() => handlerOpen(data.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="mb-4 text-xl font-bold">{data.title}</h3>
                <i
                  className={`fi fi-rr-angle-small-down ${
                    isOpenId === data.id ? "fi-rr-angle-small-up" : ""
                  } text-2xl sm:hidden`}
                ></i>
              </div>
              <ul
                className={`${
                  isOpenId === data.id ? "visible h-full" : "invisible h-0"
                } gap-4 transition-all text-[#000000b8] p-0 text-normal sm:grid sm:visible sm:h-full`}
              >
                {data.nav?.map((nav, navId) => (
                  <li key={navId}>{nav}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Footer;
