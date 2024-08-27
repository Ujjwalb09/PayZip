import React from "react";

const SendMoney = () => {
  return (
    <div className="bg-[rgba(0,0,0,.8)] absolute z-[100] top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-white w-[30rem] h-[23rem] flex flex-col gap-[3rem] rounded-lg">
        <div className="flex items-center justify-center h-[6rem] text-3xl font-bold">
          <h1>Send Money</h1>
        </div>

        <div className="px-10 py-1">
          <div className="flex gap-3 items-center">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400">
              A
            </span>
            <h1 className="text-xl font-bold">Friend's Name</h1>
          </div>
          <div className="flex flex-col gap-2">
            <h3>Amount (in Rs)</h3>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"
              type="text"
              placeholder="Enter Amount"
            />
            <button className="bg-green-500 font-raleway text-lg py-2 rounded-md text-white font-bold">
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
