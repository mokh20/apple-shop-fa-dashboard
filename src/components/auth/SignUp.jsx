import { useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { useTranslation } from "react-i18next";
import toPersianDigits from "../../utils/toPersianDigits";
import { Link, useNavigate } from "react-router";
import { UserAuth } from "../../context/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

function SignUp() {
  const { t } = useTranslation("auth");
  const { language } = useLanguage();
  return (
    <div className="grid justify-center items-center gap-4 my-8">
      <h2 className="text-lg font-medium" dir={language === "fa" ? "rtl" : ""}>
        {t("signUp")}
      </h2>
      <FormData />
    </div>
  );
}
function FormData() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const { language } = useLanguage();
  const { t } = useTranslation("auth");
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const [newErrorValid, setNewErrorValid] = useState({
    userName: false,
    email: false,
    password: false,
  });

  // validation email
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleInput(e, input) {
    const value = e.target.value;
    // Check userName
    if (input === "userName") {
      setUserName(value);
      if (value.length === 0) {
        setNewErrorValid((prev) => ({
          ...prev,
          userName: true,
        }));
      } else {
        setNewErrorValid((prev) => ({
          ...prev,
          userName: false,
        }));
      }
    }

    // Check email
    if (input === "email") {
      setEmail(value);
      if (!isValidEmail(value)) {
        setNewErrorValid((prev) => ({
          ...prev,
          email: true,
        }));
      } else {
        setNewErrorValid((prev) => ({
          ...prev,
          email: false,
        }));
      }
    }
    // Check password field
    if (input === "password") {
      setPassword(value);
      if (value.length < 6) {
        setNewErrorValid((prev) => ({
          ...prev,
          password: true,
        }));
      } else {
        setNewErrorValid((prev) => ({
          ...prev,
          password: false,
        }));
      }
    }
  }
  // clear input on focus
  function handleFocus(input) {
    setNewErrorValid((prev) => ({
      ...prev,
      // clear only the specific field error
      [input]: "",
    }));
  }
  async function handleSignUp(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const result = await signUp({
        userName,
        email,
        password,
        setUserName,
        setEmail,
        setPassword,
      });
      if (result.success) {
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNewErrorValid({
        userName: true,
        email: true,
        password: true,
      });
    }
  }
  return (
    <div
      className={`grid justify-center items-center ${
        language === "en" ? "text-left" : "text-right"
      }`}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={language === "fa" && true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <form className="grid justify-center gap-4" onSubmit={handleSignUp}>
        {/* userName */}
        <div className="relative">
          <input
            id="userName"
            type="text"
            className={`peer border-2 pl-4 rounded-sm border-gray-300 bg-transparent pt-5 pb-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none w-full sm:w-xs ${
              language === "en" ? "pl-4" : "pr-4"
            }`}
            placeholder=" "
            onChange={(e) => handleInput(e, "userName")}
            onBlur={(e) => handleInput(e, "userName")}
            onFocus={() => handleFocus("userName")}
            value={userName}
          />
          <label
            htmlFor="userName"
            className={`absolute top-2  -translate-y-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:text-xs peer-focus:text-blue-500 ${
              language === "en" ? "left-0 pl-4" : "right-0 pr-4"
            }`}
          >
            {t("userName")}
          </label>
          {newErrorValid.userName && (
            <p
              className="text-red-500 text-sm pb-2 pt-1"
              dir={language === "fa" && "rtl"}
            >
              {t("errors.userNameEmpty")}
            </p>
          )}
        </div>
        {/* email */}
        <div className="relative">
          <input
            id="email"
            type="email"
            className={`peer border-2 pl-4 rounded-sm border-gray-300 bg-transparent pt-5 pb-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none w-full sm:w-xs ${
              language === "en" ? "pl-4" : "pr-4"
            }`}
            placeholder=" "
            onChange={(e) => handleInput(e, "email")}
            onBlur={(e) => handleInput(e, "email")}
            onFocus={() => handleFocus("email")}
            value={email}
          />
          <label
            htmlFor="email"
            className={`absolute top-2  -translate-y-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:text-xs peer-focus:text-blue-500 ${
              language === "en" ? "left-0 pl-4" : "right-0 pr-4"
            }`}
          >
            {t("email")}
          </label>
          {newErrorValid.email && (
            <p
              className="text-red-500 text-sm pb-2 pt-1"
              dir={language === "fa" && "rtl"}
            >
              {t("errors.email")}
            </p>
          )}
        </div>
        {/* password */}
        <div className="relative">
          <input
            id="password"
            type="text"
            className={`peer border-2 pl-4 rounded-sm border-gray-300 bg-transparent pt-5 pb-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none w-full sm:w-xs ${
              language === "en" ? "pl-4" : "pr-4"
            }`}
            placeholder=" "
            onChange={(e) => handleInput(e, "password")}
            onBlur={(e) => handleInput(e, "password")}
            onFocus={() => handleFocus("password")}
            value={password}
          />
          <label
            htmlFor="password"
            className={`absolute top-2 text-right -translate-y-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:text-xs peer-focus:text-blue-500 ${
              language === "en" ? "left-0 pl-4" : "right-0 pr-4"
            }`}
          >
            {t("password")}
          </label>
          {newErrorValid.password && (
            <p
              className="text-red-500 text-sm py-1 w-xs"
              dir={language === "fa" && "rtl"}
            >
              {language === "en"
                ? t("errors.password")
                : toPersianDigits(t("errors.password"))}
            </p>
          )}
        </div>
        <button className="bg-[#6faafd] text-white rounded-sm py-2 w-xs">
          {t("signUp")}
        </button>
      </form>
      <div className="flex gap-2 py-2" dir={language === "fa" && "rtl"}>
        <p>{t("haveAccount")}</p>
        <Link to={"/signin"} className="text-blue-500">
          {t("signIn")}!
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
