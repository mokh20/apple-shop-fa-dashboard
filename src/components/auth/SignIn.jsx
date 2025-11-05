import { useState } from "react";
import { useLanguage } from "../../context/LanguageProvider";
import { useTranslation } from "react-i18next";
import toPersianDigits from "../../utils/toPersianDigits";

function SignIn() {
  const { t } = useTranslation("auth");
  const { language } = useLanguage();
  return (
    <div className="grid justify-center items-center gap-4 my-8">
      <h2 className="text-lg font-medium" dir={language === "fa" && "rtl"}>
        {t("signIn.title")}
      </h2>
      <FormData />
    </div>
  );
}
function FormData() {
  const { language } = useLanguage();
  const { t } = useTranslation("auth");
  const [newErrorValid, setNewErrorValid] = useState({
    emailNumber: "",
    password: "",
  });

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
    if (input === "emailNumber") {
      if (!isValidEmail(value) && !isValidIranianPhone(value)) {
        setNewErrorValid((prev) => ({
          ...prev,
          emailNumber: "Invalid email or phone number",
        }));
      } else {
        setNewErrorValid((prev) => ({
          ...prev,
          emailNumber: "",
        }));
      }
    }
    // Check password field
    if (input === "password") {
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
      [input]: "", // clear only the specific field error
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div
      className={`grid justify-center items-center ${
        language === "en" ? "text-left" : "text-right"
      }`}
    >
      <form className="grid justify-center gap-4" onSubmit={handleSubmit}>
        {/* email */}
        <div class="relative">
          <input
            id="email"
            type="text"
            class={`peer border-2 pl-4 rounded-sm border-gray-300 bg-transparent pt-5 pb-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none w-full sm:w-xs ${
              language === "en" ? "pl-4" : "pr-4"
            }`}
            placeholder=" "
            onChange={(e) => handleInput(e, "emailNumber")}
            onBlur={(e) => handleInput(e, "emailNumber")}
            onFocus={() => handleFocus("emailNumber")}
          />
          <label
            for="email"
            class={`absolute top-2  -translate-y-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:text-xs peer-focus:text-blue-500 ${
              language === "en" ? "left-0 pl-4" : "right-0 pr-4"
            }`}
          >
            {t("signIn.email")}
          </label>
          {newErrorValid.emailNumber && (
            <p
              className="text-red-500 text-sm pb-2 pt-1"
              dir={language === "fa" && "rtl"}
            >
              {t("signIn.signInErrors.emailNumber")}
            </p>
          )}
        </div>
        {/* password */}
        <div class="relative">
          <input
            id="password"
            type="text"
            class={`peer border-2 pl-4 rounded-sm border-gray-300 bg-transparent pt-5 pb-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none w-full sm:w-xs ${
              language === "en" ? "pl-4" : "pr-4"
            }`}
            placeholder=" "
            onChange={(e) => handleInput(e, "password")}
            onBlur={(e) => handleInput(e, "password")}
            onFocus={() => handleFocus("password")}
          />
          <label
            for="password"
            class={`absolute top-2 text-right -translate-y-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-4 peer-focus:text-xs peer-focus:text-blue-500 ${
              language === "en" ? "left-0 pl-4" : "right-0 pr-4"
            }`}
          >
            {t("signIn.password")}
          </label>
          {newErrorValid.password && (
            <p
              className="text-red-500 text-sm py-1 w-xs"
              dir={language === "fa" && "rtl"}
            >
              {language === "en"
                ? t("signIn.signInErrors.password")
                : toPersianDigits(t("signIn.signInErrors.password"))}
            </p>
          )}
        </div>
        <button className="bg-[#6faafd] text-white rounded-sm py-2 w-full sm:w-xs">
          {t("signIn.title")}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
