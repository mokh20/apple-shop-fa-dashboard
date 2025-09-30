import { Link } from "react-router";
import { useCart } from "../context/CartProvider";
import { useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import { supabase } from "../lib/supabaseClient";
import Spinner from "../components/ui/Spinner";

function Dashboard() {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("cart");
  const [userInfo, setUserInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  async function getData() {
    try {
      const { data } = await supabase.from("usersInfo").select("*");
      setUserInfo(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (activeSection) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="relative grid grid-cols-12" dir="rtl">
        <Sidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
        <section className="flex flex-col col-span-12 lg:col-span-10">
          <Navbar
            userInfo={userInfo}
            cartItems={cartItems}
            setActiveSection={setActiveSection}
            setIsMenuOpen={setIsMenuOpen}
          />
          {isMenuOpen && (
            <div
              className="fixed w-full h-screen opacity-40 bg-black z-10"
              onClick={() => setIsMenuOpen(false)}
            ></div>
          )}
          <div className="grid gap-1 p-4 items-center justify-items-center rounded-tr-3xl bg-lightGray min-h-screen max-h-full text-center">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {activeSection === "form" && (
                  <FormEdit
                    userInfo={userInfo}
                    setActiveSection={setActiveSection}
                  />
                )}
                {activeSection === "paymentInfo" && (
                  <PaymentInfo
                    setActiveSection={setActiveSection}
                    userInfo={userInfo}
                  />
                )}
                {activeSection === "cart" && <Cart />}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function Sidebar({
  activeSection,
  setActiveSection,
  isMenuOpen,
  setIsMenuOpen,
}) {
  return (
    <div
      className={`h-screen bg-white fixed grid grid-cols-1 w-3xs col-span-2 px-8 justify-center items-center text-center pt-10 content-start gap-4 z-20 transition-all duration-500 ${
        isMenuOpen ? "translate-x-0 " : "translate-x-full"
      } lg:w-full lg:relative lg:translate-x-0`}
      dir="ltr"
    >
      <div className="border-b-2 border-gray-200 pb-4 w-full font-medium flex text-center items-center justify-center">
        <i
          className="fi fi-rr-cross-small mt-2 text-2xl absolute left-7 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></i>
        <Link to="/">صفحه اصلی</Link>
      </div>
      <div className="grid gap-6 justify-items-end lg:justify-items-center">
        <span
          onClick={() => {
            setActiveSection(activeSection === "form" ? null : "form");
            setIsMenuOpen(false);
          }}
          className={`cursor-pointer px-4 py-3 text-right ${
            activeSection === "form" ? "active-siderbar-item " : ""
          }`}
        >
          <h4>اطلاعات کاربر</h4>
        </span>
        <span
          onClick={() => {
            setActiveSection(
              activeSection === "paymentInfo" ? null : "paymentInfo"
            );
            setIsMenuOpen(false);
          }}
          className={`cursor-pointer px-4 py-3 text-right ${
            activeSection === "paymentInfo" ? "active-siderbar-item " : ""
          }`}
        >
          <h4>اطلاعات مالی</h4>
        </span>
        <span
          onClick={() => {
            setActiveSection(activeSection === "cart" ? null : "cart");
            setIsMenuOpen(false);
          }}
          className={`cursor-pointer px-4 py-3 text-right ${
            activeSection === "cart" ? "active-siderbar-item " : ""
          }`}
        >
          <h4>سفارشات</h4>
        </span>
        <span className="cursor-pointer px-4 py-3 text-right">
          <h4>فاکتورها</h4>
        </span>
      </div>
    </div>
  );
}

function Navbar({ userInfo, setIsMenuOpen }) {
  return (
    <nav className="flex col-span-full flex-row-reverse justify-between items-center px-2 py-6 text-sm font-medium bg-white sm:p-6 sm:text-xl md:text-2xl md:p-8 ">
      <div className="flex gap-4 md:gap-8">
        <img src={userInfo.profilePic} className="w-10"></img>
      </div>
      <div className="flex gap-8 items-center">
        <i
          className="fi fi-br-bars-staggered mt-2.5 text-lg sm:text-xl md:text-2xl lg:hidden"
          onClick={() => setIsMenuOpen(true)}
        ></i>
        <h2> سلام؛ {userInfo.userName}</h2>
      </div>
    </nav>
  );
}

function FormEdit({ userInfo, setActiveSection }) {
  const [newErrorValid, setNewErrorValid] = useState({});
  // validation nation code
  function isValidNationalCode(input) {
    if (!/^\d{10}$/.test(input)) return false;
    const check = +input[9];
    const sum =
      input
        .split("")
        .slice(0, 9)
        .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
    return sum < 2 ? check === sum : check + sum === 11;
  }
  function handleNationCode(e) {
    const value = e.target.value;
    if (!isValidNationalCode(value)) {
      setNewErrorValid((prev) => ({
        ...prev,
        nationCode: "کد ملی معتبر نیست",
      }));
    } else {
      newErrorValid.nationCode = "";
    }
  }

  // validation number
  function isValidIranianPhone(number) {
    return /^09\d{9}$/.test(number);
  }
  function handleNumber(e) {
    const value = e.target.value;
    if (!isValidIranianPhone(value)) {
      setNewErrorValid((prev) => ({
        ...prev,
        number: "شماره موبایل معتبر نیست",
      }));
    } else {
      newErrorValid.number = "";
    }
  }

  // validation email
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function handleEmail(e) {
    const value = e.target.value;
    if (!isValidEmail(value)) {
      setNewErrorValid((prev) => ({
        ...prev,
        email: "ایمیل معتبر نیست",
      }));
    } else {
      newErrorValid.email = "";
    }
  }

  // validation upload img
  const [imgPreviewUrl, setImgPreviewUrl] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  function isValidImg(img) {
    return /[^\s]+\.(jpe?g|png|gif|bmp)$/i.test(img);
  }
  function handleUploadImg(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!isValidImg(file.name))
      alert(
        "خطا در آپلود عکس ، لطفا از عکسی با فرمت png یا jpg استفاده کنید. "
      );
    setImgPreviewUrl(URL.createObjectURL(e.target.files[0]));
    setImgFile(file.name);
    e.target.value = "";
  }
  // submit info
  const formRef = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    // get img
    if (imgFile) {
      data.append("uploadImg", imgFile);
    }
    const value = Object.fromEntries(data.entries());
    // final validation
    // invalid
    const allErrorValid = {};
    if (!isValidEmail(value.emailuser)) {
      allErrorValid.email = "ایمیل معتبر نیست";
    }
    if (!isValidIranianPhone(value.number)) {
      allErrorValid.number = "شماره موبایل معتبر نیست";
    }

    if (!isValidNationalCode(value.nationcode)) {
      allErrorValid.nationCode = "کدملی معتبر نیست";
    }
    if (!isValidImg(value.uploadImg)) {
      alert(
        "خطا در آپلود عکس ، لطفا از عکسی با فرمت png یا jpg استفاده کنید. "
      );
      return;
    }
    setNewErrorValid(allErrorValid);
    // final validation
    // valid
    if (Object.keys(allErrorValid).length === 0) {
      editInfo({ value });
      formRef.current.reset();
      setImgPreviewUrl(null);
    }
  }
  async function editInfo({ value }) {
    const updatedField = {
      nationCode: value.nationcode,
      number: value.number,
      email: value.emailuser,
      profilePic: `/imgs/${value.uploadImg}`,
    };
    const newUserInfo = { ...userInfo, ...updatedField };
    try {
      await supabase
        .from("usersInfo")
        .update(newUserInfo)
        .eq("id", userInfo.id);
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <div className="grid  max-w-md items-center justify-center gap-4 text-center text-sm mb-8 p-2 rounded-lg bg-lightGray shadow-form sm:text-xl sm:p-6">
      <h3>ویرایش اطلاعات</h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="grid gap-4 justify-center"
      >
        <div className="grid text-center justify-center justify-items-end w-full">
          <div className="flex items-center gap-4 my-2 justify-items-end max-h-14 min-h-14">
            <label htmlFor="nameuser">نام کاربری : </label>
            <input
              type="text"
              id="nameuser"
              name="nameuser"
              defaultValue={userInfo.userName}
              readOnly
              className="input-edit-form text-right"
            />
          </div>
          <div className=" items-center gap-2 my-2 justify-items-end max-h-14 min-h-14">
            <label htmlFor="nationcode">کدملی : </label>
            <input
              type="text"
              id="nationcode"
              name="nationcode"
              onBlur={handleNationCode}
              onChange={handleNationCode}
              className="input-edit-form"
            />
            {isValidNationalCode && (
              <p className="text-red-500 text-sm">{newErrorValid.nationCode}</p>
            )}
          </div>
          <div className="items-center gap-2 my-2 justify-items-end max-h-14 min-h-14">
            <label htmlFor="number">شماره موبایل : </label>
            <input
              type="text"
              id="number"
              name="number"
              onChange={handleNumber}
              onBlur={handleNumber}
              className="input-edit-form"
            />
            {isValidIranianPhone && (
              <p className="text-red-500 text-sm">{newErrorValid.number}</p>
            )}
          </div>
          <div className="items-center my-2 justify-items-end max-h-14 min-h-14">
            <label htmlFor="emailuser">ایمیل : </label>
            <input
              type="email"
              id="emailuser"
              name="emailuser"
              className="input-edit-form"
              onChange={handleEmail}
              onBlur={handleEmail}
            />
            {isValidEmail && (
              <p className="text-red-500 text-sm">{newErrorValid.email}</p>
            )}
          </div>

          <div className="flex items-center justify-center gap-10 sm:gap-20 w-full mr-2">
            <input
              type="file"
              name="uploadImg"
              id="uploadImg"
              className="hidden"
              onChange={handleUploadImg}
            />
            <label
              htmlFor="uploadImg"
              className="flex gap-4 cursor-pointer my-4"
            >
              <span>ویرایش عکس : </span>
              <i className="fi fi-br-add-image text-lg sm:text-4xl"></i>
            </label>

            <img src={imgPreviewUrl} className="w-16 max-h-16 mx-8" alt="" />
          </div>
          <div className="text-sm mt-8 flex gap-8">
            <button
              className="border-2 border-gray-400 rounded-lg px-6 py-1"
              type="submit"
            >
              ویرایش اطلاعات
            </button>
            <button
              onClick={() => setActiveSection(null)}
              className="border-2 border-gray-400 rounded-lg px-6 py-1"
            >
              بستن
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function PaymentInfo({ setActiveSection, userInfo }) {
  const [value, setValue] = useState("");
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    editPaymentInfo({ value });
    formRef.current.reset();
  }

  async function editPaymentInfo({ value }) {
    const updatedField = {
      bankName: value.bankName,
      IBAN: value.IBAN,
    };
    const newUserInfo = { ...userInfo, ...updatedField };
    try {
      await supabase
        .from("usersInfo")
        .update(newUserInfo)
        .eq("id", userInfo.id);
    } catch (error) {
      throw new Error(error);
    }
  }
  function handlePersianInput(e) {
    const inputText = e.target.value;
    const persianText = /^[\u0600-\u06FF\s]*$/;
    if (inputText === "" || persianText.test(inputText)) {
      setValue(inputText);
    }
  }
  return (
    <div className="grid  max-w-md items-center justify-center gap-4 text-center text-sm mb-8 p-2 rounded-lg bg-lightGray shadow-form sm:text-xl sm:p-6">
      <h3>اطلاعات مالی</h3>
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 justify-center"
        ref={formRef}
      >
        <div className="grid text-center justify-center justify-items-end w-full">
          <div className="grid items-center mb-6 justify-items-center max-h-14 min-h-14">
            <label htmlFor="bankName">
              <span className="mx-2">نام بانک :</span>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={value}
                placeholder="ملت"
                className="input-edit-form text-right"
                onChange={handlePersianInput}
              />
            </label>
            <p className="text-gray-500 text-xs text-left mr-6 sm:mr-0 sm:ml-4">
              تنها حروف فارسی مجاز است.
            </p>
          </div>
          <div className="grid items-center mb-6 justify-items-center max-h-14 min-h-14">
            <label htmlFor="IBAN">
              <span className="ml-2">شماره شبا :</span>
              <input
                type="number"
                id="IBAN"
                name="IBAN"
                className="input-edit-form"
              />
            </label>
            <p className="text-gray-500 text-xs text-left mr-10 sm:mr-0">
              تنها استفاده از اعداد مجاز است.
            </p>
          </div>
          <div className="text-sm mt-8 flex gap-8">
            <button
              className="border-2 border-gray-400 rounded-lg px-6 py-1"
              type="submit"
            >
              ویرایش اطلاعات
            </button>
            <button
              onClick={() => setActiveSection(null)}
              className="border-2 border-gray-400 rounded-lg px-6 py-1"
            >
              بستن
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;
