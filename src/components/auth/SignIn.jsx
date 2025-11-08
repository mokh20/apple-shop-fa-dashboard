import { useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { useTranslation } from "react-i18next";
import toPersianDigits from "../../utils/toPersianDigits";
import { Link, useNavigate } from "react-router";
import { UserAuth } from "../../context/AuthProvider";

function SignIn() {
  const { t } = useTranslation("auth");
  const { language } = useLanguage();
  return (
    <div className="grid justify-center items-center gap-4 my-8">
      <h2 className="text-lg font-medium" dir={language === "fa" && "rtl"}>
        {t("signIn")}
      </h2>
      <FormData />
    </div>
  );
}
function FormData() {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newErrorValid, setNewErrorValid] = useState({
    email: "",
    password: "",
  });

  const { language } = useLanguage();
  const { signIn } = UserAuth();
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  // validation email
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function isValidIranianPhone(number) {
    return /^09\d{9}$/.test(number);
  }
  function handleInput(e, input) {
    const value = e.target.value;
    // Check email/phone field
    if (input === "email") {
      setEmail(value);
      if (!isValidEmail(value) && !isValidIranianPhone(value)) {
        setNewErrorValid((prev) => ({
          ...prev,
          email: "Invalid email or phone number",
        }));
      } else {
        setNewErrorValid((prev) => ({
          ...prev,
          email: "",
        }));
      }
    }
    // Check password field
    if (input === "password") {
      setPassword(value);
      if (value.length < 6) {
        setNewErrorValid((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters",
        }));
      } else {
        setNewErrorValid((prev) => ({
          ...prev,
          password: "",
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
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { success } = await signIn(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      setEmail("");
      setPassword("");
      setNewErrorValid({
        email: "Invalid email",
        password: "Password must be at least 6 characters",
      });
    }
  }
  return (
    <div
      className={`grid justify-center items-center ${
        language === "en" ? "text-left" : "text-right"
      }`}
    >
      <form className="grid justify-center gap-4" onSubmit={handleSubmit}>
        {/* email */}
        <div className="relative">
          <input
            id="email"
            type="text"
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
          {t("signIn")}
        </button>
      </form>
      <div className="flex gap-2 py-2" dir={language === "fa" && "rtl"}>
        <p>{t("noAccount")} </p>
        <Link to={"/signup"} className="text-blue-500">
          {t("signUp")}!
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
