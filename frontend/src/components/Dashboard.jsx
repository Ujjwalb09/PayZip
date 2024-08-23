import React from "react";
import Topnav from "./templates/Topnav";

const Dashboard = () => {
  const data = [{ name: "Ujjwal" }, { name: "Harkirat" }];

  return (
    <div className="w-full h-screen">
      <Topnav />
      <div className="px-10">
        <div className="h-[9vh] flex items-center text-lg font-semibold mt-4">
          Your Balance: Rs 10,000
        </div>

        <div>
          <div className="font-semibold">Users</div>
          <input
            className="w-full mt-2 border px-2 py-1"
            type="text"
            placeholder="Search Users..."
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {data.map((data) => (
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-gray-300 rounded-full h-11 w-11 flex items-center justify-center">
                  {data.name.split("")[0]}
                </div>
                <div>{data.name}</div>
              </div>
              <button className="bg-black text-white px-5 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Send Money
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
