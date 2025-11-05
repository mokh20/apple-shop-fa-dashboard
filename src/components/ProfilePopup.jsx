import { Link } from "react-router";
import { useLanguage } from "../context/LanguageProvider";

function LoginPopup({ isLoginOpen, setIsLoginOpen }) {
  const { language } = useLanguage();
  return (
    <div
      className={`absolute top-2.5 rounded-md shadow-2xl z-10 bg-white transition-all mt-12 p-4 ${
        isLoginOpen ? "visible" : "invisible"
      } ${language === "en" ? "right-12" : "left-12"}`}
      onMouseEnter={() => setIsLoginOpen(true)}
      onMouseLeave={() => setIsLoginOpen(false)}
    >
      <div className="grid items-center w-52 h-40 justify-items-center">
        <i className="fi fi-sr-employee-man-alt text-3xl rounded-full border-2 border-black w-12 h-12 flex justify-center items-center"></i>
        <Link to={"dashboard"} className="hover:text-blue-500">
          محمد یوسفی
        </Link>
        <div className="flex justify-between text-sm w-full" dir="ltr">
          {/* <button>{language === "en" ? "Sign out" : "خروج از حساب"}</button>
          <button>
            <Link to="/dashboard">
              {language === "en" ? "Dashboard" : "پنل کاربری"}
            </Link>
          </button> */}
          <button>
            <Link to="/signin" className="hover:text-blue-500">
              {language === "en" ? "Signin" : "ورود"}
            </Link>
          </button>
          <button>
            <Link to="/signup" className="hover:text-blue-500">
              {language === "en" ? "Signup" : "ثبت نام"}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
