import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { supabase } from "../lib/supabaseClient";
import Spinner from "./ui/Spinner";

function OrderHistory() {
  const [orderList, setOrderList] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [showOrder, setShowOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // access to print order element
  const printOrder = useRef();
  const printBtn = useReactToPrint({
    documentTitle: "Title",
    contentRef: printOrder,
  });

  // get data from api
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
  // load data
  useEffect(() => {
    getData();
  }, []);
  if (isLoading) return <Spinner />;
  return (
    <div className="w-full relative xl:px-10">
      <div>
        <RenderData
          setShowOrder={setShowOrder}
          setOrderId={setOrderId}
          orderList={orderList}
          printBtn={printBtn}
          printOrder={printOrder}
        />
      </div>
      {showOrder && (
        <OrderInfo
          setShowOrder={setShowOrder}
          orderId={orderId}
          orderList={orderList}
          printOrder={printOrder}
          printBtn={printBtn}
        />
      )}
    </div>
  );
}

function RenderData({
  orderList,
  setShowOrder,
  setOrderId,
  printBtn,
  printOrder,
}) {
  //  convert digit to persian
  function toPersianDigits(order) {
    return String(order).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }

  return (
    <div>
      <p className=" font-medium text-xl text-right m-8">فاکتورها</p>{" "}
      <table className="w-full table-fixed bg-white">
        <thead>
          <tr className="h-20 border border-gray-400 text-xs sm:text-base">
            <th>ردیف</th>
            <th className="w-2/10 sm:w-3/10">تاریخ فاکتور</th>
            <th>شماره فاکتور</th>
            <th className="w-2/10 sm:w-3/10">مبلغ</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order, index) => (
            <tr
              key={order.orderId}
              className=" text-xs sm:text-sm md:text-lg lg:m-2 border-b border-gray-400"
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
                  onClick={() => {
                    setShowOrder(true);
                    setOrderId(order.id);
                  }}
                ></i>
                <i
                  className="fi fi-ts-print mx-2 cursor-pointer hover:text-blue-500 xl:mx-4"
                  title="پرینت فاکتور"
                  onClick={() => {
                    setShowOrder(true); //
                    setOrderId(order.id);
                    printBtn();
                    setTimeout(() => {
                      if (printOrder.current) printBtn();
                    }, 50);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrderInfo({ setShowOrder, orderId, orderList, printBtn, printOrder }) {
  const orderItem = orderList.find((item) => item.id === orderId);
  const totalQuantity = orderItem.items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );
  const totalPrice = orderItem.items.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );
  const grandTotalPrice = orderItem.items.reduce(
    (sum, item) => sum + Number(item.price * item.quantity),
    0
  );

  //  convert digit to persian
  function toPersianDigits(order) {
    return String(order).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  }
  return (
    <div className="w-[calc(100vw-2rem)] absolute left-0 top-0 flex items-center justify-center z-30 lg:left-1/12 xl:fixed xl:inset-0 xl:mx-8">
      {/* backDrop */}
      <div
        className="fixed inset-0 bg-[#00000075]"
        onClick={() => setShowOrder(false)}
      ></div>
      {/* orderInfo */}
      <div className="w-full bg-white p-6 rounded-xl shadow-lg flex flex-col gap-2 items-center z-40 relative h-11/12 overflow-y-scroll scrollbar-hide cursor-grab">
        <div className="flex justify-between w-full">
          <i
            className="fi fi-rr-cross-small text-3xl  cursor-pointer hover:text-blue-500 "
            onClick={() => setShowOrder(false)}
            title="بستن"
          ></i>
          <i
            className="fi fi-ts-print mx-2 cursor-pointer text-3xl hover:text-blue-500  xl:mx-4  "
            title="پرینت فاکتور"
            onClick={printBtn}
          ></i>
        </div>
        <div className="w-full px-8" ref={printOrder} dir="rtl">
          <h3 className="my-2 text-center">فاکتور شما</h3>
          <table className="border border-gray-200 w-full text-right text-sm">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4">
                  شماره فاکتور : {toPersianDigits(orderItem.orderId)}
                </td>
                <td className="w-1/3">
                  <div className=" py-4 px-2 flex flex-col justify-end gap-2 text-right lg:flex-row">
                    <h4> تاریخ فاکتور : </h4>
                    <div className="flex gap-4 flex-row-reverse">
                      <span>
                        {toPersianDigits(
                          orderItem.date.split("T")[0].replace(/-/g, "/")
                        )}
                      </span>
                      <span>
                        {toPersianDigits(
                          orderItem.date.split("T")[1].slice(0, 5)
                        )}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td>
                  <div className="py-4 px-2 flex gap-4">
                    <h4>نام مشتری :</h4>
                    <span>{orderItem.userName}</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200 w-full">
                <td colSpan={3}>
                  <div className="py-4 px-2 flex gap-2 ">
                    <h4 className="w-32 sm:w-16 md:w-12 lg:w-10">آدرس :</h4>
                    <p>{orderItem.address}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="border border-gray-200 w-full text-sm text-center mt-4">
            <thead className="bg-lightGray">
              <tr className="h-20">
                <th className="order-item w-1/12">ردیف</th>
                <th className="order-item w-3/12">نام کالا</th>
                <th className="order-item">تعداد</th>
                <th className="order-item w-2/12">مبلغ</th>
                <th className="order-item">تخفیف</th>
                <th className="order-item">مالیات</th>
                <th className="order-item">جمع کل</th>
              </tr>
            </thead>
            <tbody>
              {orderItem.items.map((item, index) => (
                <tr key={item.id} className="order-item">
                  <td>{toPersianDigits(index + 1)}</td>
                  <td className="text-right order-item">{item.name}</td>
                  <td>{item.quantity}</td>
                  <td className="order-item">
                    {toPersianDigits(
                      (item.price * 100000).toLocaleString("en-US")
                    )}{" "}
                    تومان
                  </td>
                  <td> - </td>
                  <td className="order-item">-</td>
                  <td>
                    {toPersianDigits(
                      (item.price * 100000 * item.quantity).toLocaleString(
                        "en-US"
                      )
                    )}{" "}
                    تومان
                  </td>
                </tr>
              ))}
              <tr>
                <td className="order-item" colSpan={2}>
                  جمع کل :
                </td>
                <td className="order-item">{toPersianDigits(totalQuantity)}</td>
                <td className="order-item">
                  {toPersianDigits(
                    (totalPrice * 100000).toLocaleString("en-US")
                  )}{" "}
                  تومان
                </td>
                <td className="order-item" colSpan={2}>
                  {" "}
                  -{" "}
                </td>

                <td className="order-item">
                  {toPersianDigits(
                    (grandTotalPrice * 100000).toLocaleString("en-US")
                  )}{" "}
                  تومان
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
