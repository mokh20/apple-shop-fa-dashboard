import { Link } from "react-router";
import { useCart } from "../context/CartProvider";
import { useRef, useState } from "react";
import axios from "axios";

function Dashboard() {
  const { cartItems } = useCart();
  const [editOpen, setEditOpen] = useState(false);
  const nameUser = "محمد یوسفی";
  return (
    <div className="relative">
      <nav className="flex justify-between px-2 py-6 text-sm bg-[#F5F5F7] sm:p-6 sm:text-xl md:text-2xl md:p-8 ">
        <div className="flex gap-4 md:gap-8">
          <i className="fi fi-rr-basket-shopping-simple relative cursor-pointer">
            <Link to="/cart">
              <span className="absolute flex items-center justify-center top-3 left-2 h-3 w-3 text-[10px] bg-black text-white text-center font-medium rounded-full md:text-sm md:w-4 md:h-4 md:left-3 md:top-4">
                {cartItems.length}
              </span>
            </Link>
          </i>
          <i className="fi fi-sr-employee-man-alt"></i>
          <div className="flex gap-2" onClick={() => setEditOpen(true)}>
            <i className="fi fi-rr-pencil"></i>
            <span>ویرایش اطلاعات</span>
          </div>
        </div>
        <h2> سلام ؛ {nameUser}</h2>
      </nav>
      <main className="grid justify-center">
        <div className="flex flex-row-reverse gap-1 p-4 items-center justify-center">
          <span>{nameUser} </span>
          <span>خوش آمدید </span>
          <span className="text-red-500 text-3xl">♥</span>
        </div>
        {editOpen && <FormEdit nameUser={nameUser} setEditOpen={setEditOpen} />}
      </main>
    </div>
  );
}

function FormEdit({ nameUser, setEditOpen }) {
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
    if (imgFile) {
      data.append("uploadImg", imgFile);
    }
    const value = Object.fromEntries(data.entries());
    // final validation
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
    if (Object.keys(allErrorValid).length === 0) {
      addNewInfo({ value });
      formRef.current.reset();
      setImgPreviewUrl(null);
    }
  }
  async function addNewInfo({ value }) {
    const newInfo = {
      userName: value.nameuser,
      nationCode: value.nationcode,
      number: value.number,
      email: value.emailuser,
      profilePic: value.uploadImg,
    };

    try {
      await axios.post("http://localhost:3006/productsData", newInfo);
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <>
      <div className="grid items-center justify-center gap-4 text-center text-sm sm:text-xl mb-8">
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
                defaultValue={nameUser}
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
                <p className="text-red-500 text-sm">
                  {newErrorValid.nationCode}
                </p>
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
                onClick={() => setEditOpen(false)}
                className="border-2 border-gray-400 rounded-lg px-6 py-1"
              >
                بستن
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default Dashboard;
