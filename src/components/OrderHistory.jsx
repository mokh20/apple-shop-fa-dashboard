import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { supabase } from "../lib/supabaseClient";
import Spinner from "./ui/Spinner";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageProvider";
import toPersianDigits from "../utils/toPersianDigits";

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
  const { t } = useTranslation("dashboard");
  const { language } = useLanguage();

  function formatByLang(value) {
    return language === "en" ? value : toPersianDigits(value);
  }

  return (
    <div>
      <p
        className={`font-medium text-xl m-8 ${
          language === "en" ? "text-left" : "text-right"
        }`}
      >
        {t("orderHistory.title")}
      </p>
      <table className="w-full table-fixed bg-white">
        <thead>
          <tr className="h-20 border border-gray-400 text-xs sm:text-base">
            <th>{t("orderHistory.row")}</th>
            <th className="w-2/10 sm:w-3/10">
              {t("orderHistory.invoiceDate")}
            </th>
            <th>{t("orderHistory.invoiceNumber")}</th>
            <th className="w-2/10 sm:w-3/10">{t("orderHistory.amount")}</th>
            <th>{t("orderHistory.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order, index) => (
            <tr
              key={order.orderId}
              className="text-xs sm:text-sm md:text-lg lg:m-2 border-b border-gray-400"
            >
              {/* ردیف  */}
              <td className="p-2 text-center">{formatByLang(index + 1)}</td>

              {/* تاریخ  */}
              <td className="p-2 text-center" dir="ltr">
                <div className="flex flex-wrap text-[.6rem] sm:text-sm md:text-lg sm:block">
                  <span className="mr-2">
                    {formatByLang(order.date.split("T")[0].replace(/-/g, "/"))}
                  </span>
                  |
                  <span className="ml-2">
                    {formatByLang(order.date.split("T")[1].slice(0, 5))}
                  </span>
                </div>
              </td>

              {/* شماره فاکتور  */}
              <td className="p-2 text-center">{formatByLang(order.orderId)}</td>

              {/* مبلغ  */}
              <td className="p-2 text-center">
                {language === "en"
                  ? `$${(order.totalPrice / 100000).toFixed(2)}`
                  : `${toPersianDigits(
                      order.totalPrice.toLocaleString()
                    )} تومان`}
              </td>

              {/* عملیات  */}
              <td className="py-8 px-2 text-center align-middle font-medium text-xs md:text-xl lg:text-2xl">
                <i
                  className="fi fi-tr-overview mx-2 cursor-pointer hover:text-blue-500 xl:mx-4"
                  title={t("orderHistory.viewInvoice")}
                  onClick={() => {
                    setShowOrder(true);
                    setOrderId(order.id);
                  }}
                ></i>
                <i
                  className="fi fi-ts-print mx-2 cursor-pointer hover:text-blue-500 xl:mx-4"
                  title={t("orderHistory.print")}
                  onClick={() => {
                    setShowOrder(true);
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
  const { t } = useTranslation("dashboard");
  // translate
  const { language } = useLanguage();
  function formatByLang(value) {
    return language === "en" ? value : toPersianDigits(value);
  }
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

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-[#00000075]"
        onClick={() => setShowOrder(false)}
      ></div>
      {/* orderInfo popup */}
      <div className="relative w-[calc(100dvw-2rem)] max-h-[90vh] bg-white p-6 rounded-xl shadow-lg flex flex-col gap-2 items-center z-40 scrollbar-hide cursor-grab box-border lg:max-w-7xl">
        <div className="flex justify-between w-full">
          <i
            className="fi fi-rr-cross-small text-3xl cursor-pointer hover:text-blue-500"
            onClick={() => setShowOrder(false)}
            title={t("invoice.closeBtn")}
          ></i>
          <i
            className="fi fi-ts-print mx-2 cursor-pointer text-3xl hover:text-blue-500 xl:mx-4"
            title={t("invoice.print")}
            onClick={printBtn}
          ></i>
        </div>
        <div
          className="overflow-x-auto scrollbar-hide w-full"
          ref={printOrder}
          dir={language === "fa" && "rtl"}
        >
          <h3 className="my-2 text-center">{t("invoice.title")}</h3>
          <table className="border border-gray-200 min-w-[600px] text-right text-sm sm:w-full ">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className={`${language === "en" && "text-left"} p-4`}>
                  {t("invoice.invoiceInfo.number")} :{" "}
                  {formatByLang(orderItem.orderId)}
                </td>
                <td className="w-1/3">
                  <div className="py-4 px-2 flex justify-end gap-2 text-right">
                    <h4 className="w-22">{t("invoice.invoiceInfo.date")} : </h4>
                    <div className="flex gap-4 flex-row-reverse">
                      <span>
                        {formatByLang(
                          orderItem.date.split("T")[0].replace(/-/g, "/")
                        )}
                      </span>
                      <span>
                        {formatByLang(orderItem.date.split("T")[1].slice(0, 5))}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td>
                  <div className="py-4 px-2 flex gap-4">
                    <h4>{t("invoice.invoiceInfo.customerName")} :</h4>
                    <span>{orderItem.userName}</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200 w-full">
                <td colSpan={3}>
                  <div
                    className={`${
                      language === "en" && "flex justify-between"
                    } py-4 px-2 flex gap-2`}
                  >
                    <h4 className="w-26 md:w-22 lg:w-16">
                      {t("invoice.invoiceInfo.address")} :
                    </h4>
                    <p dir="rtl">{orderItem.address}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="border border-gray-200 min-w-[600px] text-sm text-center mt-4 lg:w-full">
            <thead className="bg-lightGray">
              <tr className="h-20">
                <th className="order-item w-1/12">
                  {t("invoice.tableInvoice.row")}
                </th>
                <th className="order-item w-3/12">
                  {t("invoice.tableInvoice.productName")}
                </th>
                <th className="order-item">
                  {t("invoice.tableInvoice.quantity")}
                </th>
                <th className="order-item w-2/12">
                  {t("invoice.tableInvoice.price")}
                </th>
                <th className="order-item">
                  {t("invoice.tableInvoice.discount")}
                </th>
                <th className="order-item">{t("invoice.tableInvoice.tax")}</th>
                <th className="order-item">
                  {t("invoice.tableInvoice.total")}
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItem.items.map((item, index) => (
                <tr key={item.id} className="order-item">
                  <td>{toPersianDigits(index + 1)}</td>
                  <td
                    className={`${
                      language === "en" ? "text-left" : "text-right"
                    } order-item`}
                  >
                    {language === "en" ? item.name : item.name_fa}
                  </td>
                  <td>{item.quantity}</td>
                  <td className="order-item">
                    {language === "en"
                      ? `$${item.price.toFixed(2)}`
                      : `${toPersianDigits(
                          (item.price * 100000).toLocaleString()
                        )} تومان`}
                  </td>
                  <td> - </td>
                  <td className="order-item">-</td>
                  <td>
                    {language === "en"
                      ? `$${(item.price * item.quantity).toFixed(2)}`
                      : `${toPersianDigits(
                          (item.price * 100000 * item.quantity).toLocaleString()
                        )} تومان`}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="order-item" colSpan={2}>
                  {t("invoice.tableInvoice.total")}
                </td>
                <td className="order-item">{formatByLang(totalQuantity)}</td>
                <td className="order-item">
                  {language === "en"
                    ? `$${totalPrice.toFixed(2)}`
                    : `${toPersianDigits(
                        (totalPrice * 100000).toLocaleString()
                      )} تومان`}
                </td>
                <td className="order-item" colSpan={2}>
                  {" "}
                  -{" "}
                </td>

                <td className="order-item">
                  {language === "en"
                    ? `$${grandTotalPrice.toFixed(2)}`
                    : `${toPersianDigits(
                        (grandTotalPrice * 100000).toLocaleString()
                      )} تومان`}
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
