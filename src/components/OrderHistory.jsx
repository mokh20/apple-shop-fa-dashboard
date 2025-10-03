import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase } from "../lib/supabaseClient";
import Spinner from "./ui/Spinner";

function OrderHistory() {
  return (
    <div className="w-full">
      <RenderData />
    </div>
  );
}

function RenderData() {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getData() {
    try {
      const { data } = await supabase.from("orderHistory").select("*");
      setOrderList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  //  convert digit to persian
  function toPersianDigits(order) {
    return String(order).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  if (isLoading) return <Spinner />;
  return (
    <>
      <p className="mb-4 font-medium text-xl">سفارشات</p>
      <div className="grid gap-6 lg:gap-0 lg:flex lg:flex-col lg:bg-white">
        <div className="hidden lg:flex ">
          <div className="flex w-full justify-between mx-8 px-8 py-4 mt-4 border-2  border-gray-300 rounded-lg">
            <span>کالاها</span>
            <span>تاریخ</span>
            <span>جمع کل</span>
            <span>مرحله</span>
          </div>
        </div>
        {orderList.map((order) => (
          <div
            key={order.orderId}
            className="relative bg-white text-xs px-4 py-8 grid gap-4 rounded-lg h-full content-between sm:text-sm md:text-lg lg:m-8 lg:flex lg:flex-row-reverse lg:justify-between lg:items-center lg:bg-lightGray "
          >
            <div className="order-list-item">
              <span className="lg:hidden">وضعیت سفارش :</span>
              <span>تحویل داده شده به مشتری</span>
            </div>
            <div className="order-list-item">
              <span className="lg:hidden">تاریخ ثبت سفارش :</span>
              <div className="flex gap-4 flex-row-reverse">
                <span>
                  {toPersianDigits(order.date.split("T")[0].replace(/-/g, "/"))}
                </span>
                |
                <span>
                  {toPersianDigits(order.date.split("T")[1].slice(0, 5))}
                </span>
              </div>
            </div>
            <div className="order-list-item">
              <span className="lg:hidden">مبلغ سفارش :</span>
              <span>
                {toPersianDigits(order.totalPrice.toLocaleString("en-US"))}{" "}
                تومان
              </span>
            </div>
            <div className="flex gap-2 mt-2">
              {order.items.map((item) => (
                <Link to={`/products/${item.id}`} key={item.id}>
                  <div className="bg-lightGray">
                    <img src={item.img} alt="" className="w-24" />
                  </div>
                </Link>
              ))}
            </div>
            <div className=" flex items-center w-8 justify-center pt-1 border-2 border-gray-300 rounded-md absolute left-0 top-0 cursor-pointer">
              <i className="fi fi-rr-angle-small-left text-base md:text-xl"></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default OrderHistory;
