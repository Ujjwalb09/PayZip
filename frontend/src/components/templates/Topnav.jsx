import React from "react";

const Topnav = () => {
  return (
    <div className="w-full h-[7vh] flex justify-between border-b border-gray-200 shadow-md items-center">
      <div className="px-6 flex items-center gap-1 text-xl">
        <i class="ri-currency-fill text-2xl"></i>
        PayZip
      </div>
      <div className="flex gap-4 px-4 text-center">
        <div className="flex items-center">Hello</div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-xl font-medium text-gray-700">
          U
        </div>
      </div>
    </div>
  );
};

export default Topnav;
