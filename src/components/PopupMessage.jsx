function PopupMessage({ setMessage, message }) {
  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 bg-blue-500 z-20 w-2xs text-sm  text-white p-3 rounded-lg shadow-md font-medium  transition-all flex items-center justify-between ${
        message
          ? "translate-y-8 transition-all"
          : "-translate-y-30 transition-all"
      } ${
        message === "added" ? "bg-green-500" : ""
      } sm:w-sm sm:text-base md:px-6`}
    >
      <div>{message === "added" ? "Added to Cart" : "Already in Cart"}</div>
      <i
        className="fi fi-rr-cross-small mt-2 text-lg lg:text-2xl"
        onClick={() => setMessage(false)}
      ></i>
    </div>
  );
}

export default PopupMessage;
