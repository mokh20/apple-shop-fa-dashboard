import { FadeLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex justify-center items-center bg-lightGray h-screen ">
      <FadeLoader color="#00BCFF" radius={6} height={20} width={6} margin={8} />
    </div>
  );
}

export default Spinner;
