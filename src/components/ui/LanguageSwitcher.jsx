import Select from "react-select";
import { useLanguage } from "../../context/LanguageProvider";

function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const options = [
    { value: "fa", label: "فارسی" },
    { value: "en", label: "EN" },
  ];
  const selectedOption = options.find((opt) => opt.value === language);

  return (
    <div className="mx-4" dir="ltr">
      <Select
        value={selectedOption}
        onChange={(option) => changeLanguage(option.value)}
        options={options}
        className="w-23 sm:w-24 md:w-26 text-left appearance-none outline-none text-xs cursor-pointer xl:text-base hover:text-blue-500"
        placeholder={language}
        isSearchable={false}
      />
    </div>
  );
}

export default LanguageSwitcher;
