import React from "react";
import Topnav from "./templates/Topnav";

const Dashboard = () => {
  const data = [
    { firstName: "Ujjwal", lastName: "Bhatt" },
    { firstName: "Harkirat", lastName: "Singh" },
  ];

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
            className="w-full mt-2 border px-2 py-1 rounded-lg"
            type="text"
            placeholder="Search Users..."
          />
        </div>

        {data.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {data.map((data) => (
              <div className="p-3 flex justify-between border-t-0 border-b border-l shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-300 rounded-full h-11 w-11 flex items-center justify-center">
                    {data.firstName.split("")[0]}
                  </div>
                  <div>
                    {data.firstName} {data.lastName}
                  </div>
                </div>
                <button className="bg-black text-white px-5 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105">
                  Send Money
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
