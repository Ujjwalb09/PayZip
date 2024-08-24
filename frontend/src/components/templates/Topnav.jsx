import React, { useEffect, useState } from "react";
import { useRef } from "react";

const Topnav = () => {
  const [showLogout, setShowLogout] = useState(false);

  const buttonContainerRef = useRef();

  const handleClickOutside = (e) => {
    if (
      buttonContainerRef.current &&
      !buttonContainerRef.current.contains(e.target)
    ) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="w-full h-[7vh] flex justify-between border-b border-gray-200 shadow-md items-center relative z-50 bg-white">
      <div className="px-6 flex items-center gap-1 text-xl">
        <i className="ri-currency-fill text-2xl"></i>
        PayZip
      </div>
      <div className="flex gap-4 px-4 text-center">
        <div className="flex items-center">Hello</div>
        <button
          ref={buttonContainerRef}
          onClick={() => setShowLogout(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-xl font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
        >
          U
        </button>
      </div>
      {showLogout && (
        <div className="absolute right-3 top-[69px] bg-gray-200 h-[60px] w-[8%] rounded-md flex items-center justify-center shadow-lg">
          <button className="bg-black px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 shadow-md text-indigo-100 duration-150">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Topnav;
