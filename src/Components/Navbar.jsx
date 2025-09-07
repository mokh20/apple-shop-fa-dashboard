import "@flaticon/flaticon-uicons/css/all/all.css";
import "@flaticon/flaticon-uicons/css/regular/rounded.css";

const datas = [
  "Store",
  "Mac",
  "iPad",
  "iPhone",
  "Watch",
  "Vision",
  "Airpods",
  "TV & Home",
  "Entertainment",
  "Accessories",
  "Support",
];

function Navbar() {
  return (
    <section className="flex justify-between items-center py-8 bg-[#f9f9fc] border-b border-b-[#d1d1d3] ">
      <i className="fi fi-brands-apple mx-4 sm:text-2xl lg:ml-12"></i>
      <div className="hidden justify-center text-[#2F2F2F] text-sm md:flex md:w-full md:justify-around">
        <RenderData />
      </div>
      <div className="flex gap-8 mx-4 sm:xl md:text-2xl lg:mr-12">
        <i className="fi fi-rr-search"></i>
        <i className="fi fi-rr-basket-shopping-simple"></i>
        <div className="block sm:hidden">
          <i className="fi fi-rr-menu-burger"></i>
        </div>
      </div>
    </section>
  );
}

function RenderData() {
  return (
    <>
      {datas.map((data) => (
        <span key={data}>{data}</span>
      ))}
    </>
  );
}

export default Navbar;
