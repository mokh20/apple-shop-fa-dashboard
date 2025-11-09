import { Link } from "react-router";
import { useLanguage } from "../context/LanguageProvider";
import { UserAuth } from "../context/AuthProvider";

function LoginPopup({ isLoginOpen, setIsLoginOpen }) {
  const { language } = useLanguage();
  const { userData, signOut } = UserAuth();
  return (
    <>
      {userData && userData.length !== 0 && (
        <div
          className={`absolute top-2.5 rounded-md shadow-2xl z-10 bg-white transition-all mt-12 p-4 ${
            isLoginOpen ? "visible" : "invisible"
          } ${language === "en" ? "right-12" : "left-12"}`}
          onMouseEnter={() => setIsLoginOpen(true)}
          onMouseLeave={() => setIsLoginOpen(false)}
        >
          <div className="grid items-center w-52 h-40 justify-items-center">
            <i className="fi fi-sr-employee-man-alt text-3xl rounded-full border-2 border-black w-12 h-12 flex justify-center items-center"></i>
            <Link to={"/dashboard"} className="hover:text-blue-500">
              {userData.userName}
            </Link>
            <div className="flex justify-between text-sm w-full" dir="ltr">
              <button
                onClick={signOut}
                className="cursor-pointer hover:text-blue-500"
              >
                {language === "en" ? "Sign Out" : "خروج از حساب"}
              </button>
              <button>
                <Link
                  to="/dashboard"
                  className="cursor-pointer hover:text-blue-500"
                >
                  {language === "en" ? "Dashboard" : "پنل کاربری"}
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPopup;
