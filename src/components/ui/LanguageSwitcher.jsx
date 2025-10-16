import { useLanguage } from "../../context/LanguageProvider";

function LanguageSwitcher({ isDashboard }) {
  const { setLanguage } = useLanguage();
  function handlerLanguage(e) {
    const languageValue = e.target.value;
    setLanguage(languageValue);
  }
  return (
    <div className="flex items-center gap-4 relative mr-6" dir="rtl">
      <select
        className="appearance-none outline-none text-xs cursor-pointer ml-2 xl:text-base hover:text-blue-500"
        defaultValue={isDashboard ? "فارسی" : "En"}
        onChange={(e) => handlerLanguage(e)}
      >
        <option value="Fa">فارسی</option>
        <option value="En">EN</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
