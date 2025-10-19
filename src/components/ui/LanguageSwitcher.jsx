import { useLanguage } from "../../context/LanguageProvider";

function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  function handlerLanguage(e) {
    changeLanguage(e.target.value);
  }
  return (
    <div className="flex items-center gap-4 relative mr-6" dir="rtl">
      <select
        className="appearance-none outline-none text-xs cursor-pointer ml-2 xl:text-base hover:text-blue-500"
        value={language}
        onChange={(e) => handlerLanguage(e)}
      >
        <option value="fa">فارسی</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
