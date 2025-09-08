import { useProducts } from "../context/ProductsProvider";

function Footer() {
  const products = useProducts();

  const filteredProducts = products.filter(
    (product) => product.category === "airTags"
  );
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
      <QuickAccess data={filteredProducts} />
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

function QuickAccess() {
  const groups = [
    [0, 2],
    [2, 4],
    [4, 5],
    [6, 9],
    [9, 11],
  ];
  const data = [
    {
      title: "Shop and Learn",
      nav: [
        "Store",
        "Mac",
        "ipad",
        "iPhone",
        "Watch",
        "Vision",
        "AirPods",
        " TV & Home",
        "AirTag",
        "Accessories",
        "Gift Cards",
      ],
      id: 31,
      category: "quickAccess",
    },
    {
      title: "Apple Wallet",
      nav: ["Wallet", "Apple Card", "Apple Pay", "Apple Cash"],
      id: 32,
      category: "quickAccess",
    },

    {
      title: "Account",
      nav: [
        "Manage Your Apple Account",
        "Apple Store Account",
        "iCloud.com",
        "iPhone",
        "Watch",
      ],
      id: 33,
      category: "quickAccess",
    },
    {
      title: "Entertainment",
      nav: [
        "Apple One",
        "Apple TV+",
        "Apple Music",
        "Apple Arcade",
        "Apple Fitness+",
        "Apple Music",
        "Apple News+",
        "Apple Podcasts",
        "Apple Books",
        "App Store",
      ],
      id: 34,
      category: "quickAccess",
    },

    {
      title: "Apple Store",
      nav: [
        "Find a Store",
        "Genius Bar",
        "Today at Apple",
        "Apple Camp",
        "Apple Store App",
        "Certified Refurbished",
        "Apple Trade In",
        "Financing",
        "Carrier Deals at Apple",
        "Order Status",
        "Shopping Help",
      ],
      id: 35,
      category: "quickAccess",
    },
    {
      title: "For Business",
      nav: ["Apple and Business", "Shop for Business"],
      id: 36,
      category: "quickAccess",
    },
    {
      title: "For Education",
      nav: ["Apple and Education", "Shop for K-12", "Shop for College"],
      id: 37,
      category: "quickAccess",
    },
    {
      title: "For Healthcare",
      nav: [
        "Apple in Healthcare",
        "Health on Apple Watch",
        ">Health Records on iPhone",
      ],
      id: 38,
      category: "quickAccess",
    },
    {
      title: "For Government",
      nav: ["Shop for Government", "Shop for Veterans and Military"],
      id: 39,
      category: "quickAccess",
    },
    {
      title: "Apple Values",
      nav: [
        "Accessibility",
        "Education",
        "Environment",
        "Inclusion and Diversity",
        "Privacy",
        "Racial Equity and Justice",
        "Supply Chain",
      ],
      id: 40,
      category: "quickAccess",
    },
    {
      title: "About Apple",
      nav: [
        "Newsroom",
        "Apple Leadership",
        "Career Opportunities",
        "Investors",
        "Ethics & Compliance",
        "Events",
        "Contact Apple",
      ],
      id: 41,
      category: "quickAccess",
    },
  ];
  console.log(data.map((d) => d.name));
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mx-8 mt-4 border-b-2 border-b-gray-200">
      {groups.map(([start, end], groupId) => (
        <div key={groupId}>
          {data.slice(start, end).map((d) => (
            <div key={d.id} className="grid my-8">
              <h3 className="mb-4 text-xl font-bold">{d.title}</h3>
              <ul className="grid gap-4 h-full transition-all text-[#000000b8] p-0 text-normal">
                {d.nav?.map((nav, navId) => (
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
