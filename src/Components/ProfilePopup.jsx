import { Link } from "react-router";

function LoginPopup({ isLoginOpen, setIsLoginOpen }) {
  return (
    <div
      className={`absolute right-12 top-2.5 rounded-md shadow-2xl z-10 ${
        isLoginOpen ? "visible" : "invisible"
      } bg-white transition-all mt-12 p-4`}
      onMouseEnter={() => setIsLoginOpen(true)}
      onMouseLeave={() => setIsLoginOpen(false)}
    >
      <div className="grid items-center w-52 h-40 justify-items-center">
        <i className="fi fi-sr-employee-man-alt text-3xl rounded-full border-2 border-black w-12 h-12 flex justify-center items-center"></i>
        <p>Hasan Akbari</p>
        <div className="flex justify-between text-sm w-full">
          <button>Sign out</button>
          <button>
            <Link to="/dashboard">Dashboard</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
