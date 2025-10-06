import { useEffect, useState } from "react";
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
      <p className="my-6 font-medium text-xl">سفارشات</p>
      <table className="w-full table-fixed bg-white">
        <thead>
          <tr className="h-20 border border-gray-400 text-xs sm:text-base">
            <th>ردیف</th>
            <th className="w-2/10 sm:w-3/10">تاریخ فاکتور</th>
            <th>شماره فاکتور</th>
            <th className="w-3/10">مبلغ</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order, index) => (
            <tr
              key={order.orderId}
              className="text-xs sm:text-sm md:text-lg lg:m-2 border-b border-gray-400"
            >
              {/* ردیف  */}
              <td className="p-2 text-center">{toPersianDigits(index + 1)}</td>

              {/* تاریخ  */}
              <td className="p-2 text-center" dir="ltr">
                <span className="mr-2">
                  {toPersianDigits(order.date.split("T")[0].replace(/-/g, "/"))}
                </span>
                |
                <span className="ml-2">
                  {toPersianDigits(order.date.split("T")[1].slice(0, 5))}
                </span>
              </td>

              {/* شماره فاکتور  */}
              <td className="p-2 text-center">
                {toPersianDigits(order.orderId)}
              </td>

              {/* مبلغ  */}
              <td className="p-2 text-center">
                {toPersianDigits(order.totalPrice.toLocaleString("en-US"))}{" "}
                تومان
              </td>

              {/* عملیات  */}
              <td className="py-8 px-2 text-center align-middle font-medium text-xs md:text-xl lg:text-2xl">
                <i
                  className="fi fi-tr-overview mx-2 cursor-pointer hover:text-blue-500 xl:mx-4"
                  title="مشاهده فاکتور"
                ></i>
                <i
                  className="fi fi-ts-print mx-2 cursor-pointer hover:text-blue-500 xl:mx-4"
                  title="پرینت فاکتور"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default OrderHistory;
