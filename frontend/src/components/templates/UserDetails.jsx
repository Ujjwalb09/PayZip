import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAxios from "../../utils/axios";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const UserDetails = () => {
  const [data, setData] = useState("");

  const user = useSelector((state) => state.user.info);
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [query, setQuery] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const getBalance = async () => {
    setLoading(true);
    const token = localStorage.getItem(user.username);

    setTimeout(async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/account/balance",
          {
            headers: {
              authorization: token,
            },
          }
        );

        setBalance(response.data.balance);
        setLoading(false);
      } catch (error) {
        toast.error("Error! Please try again after sometime");
      }
    }, 1000);
  };

  const getUsers = async () => {
    try {
      const response = await userAxios.get("/bulk", {
        params: {
          filter: query,
        },
      });
      console.log(response);
      setData(response.data.users);
    } catch (error) {}
  };

  useEffect(() => {
    query && getUsers();
    isChecked && getUsers();
  }, [query, isChecked]);

  return (
    <div className="px-10 relative">
      <div className="h-[9vh] flex items-center text-lg font-semibold mt-4 font-rubik tracking-wide gap-2">
        <div>Your Balance:</div>
        {!balance ? (
          <button
            onClick={getBalance}
            disabled={!user}
            className={`text-sm text-blue-500 underline pt-1 ${
              !user && "cursor-not-allowed"
            }`}
          >
            {loading ? (
              <img
                className="w-full h-5 animate-spin ease-linear mb-1"
                src="../assets/blackLoading.png"
                alt="Loading icon"
              ></img>
            ) : (
              "Check balance"
            )}
          </button>
        ) : (
          <div className="pt-[1px] flex gap-2">
            ₹ {balance}
            {balance && (
              <>
                <i
                  onClick={() => {
                    setShowTooltip(false);
                    setBalance(false);
                  }}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className="ri-eye-close-line cursor-pointer"
                ></i>
                {showTooltip && (
                  <span className="absolute left-60 top-7 transform -translate-y-full bg-gray-600 text-white text-xs rounded-md py-1 px-1 whitespace-nowrap transition duration-1000 delay-1000 ease-in-out font-light tracking-normal">
                    Hide Balance
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div>
        <div className="font-semibold">Users</div>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className="w-full mt-2 border px-2 py-1 rounded-lg"
          type="text"
          placeholder="Search Users..."
        />
      </div>
      <div className="text-sm flex gap-1 items-center mt-2">
        <input
          disabled={!user}
          onClick={(e) => setIsChecked(e.target.checked)}
          className=""
          type="checkbox"
        />
        <div className="pt-[2px]">All users</div>
      </div>

      {data.length > 0 && (query.length > 0 || isChecked) && (
        <div className="flex flex-col gap-2 mt-4">
          {data.map((data, index) => (
            <div
              key={index}
              className="p-3 flex justify-between border-b border-l shadow-md"
            >
              <div className="flex items-center gap-2">
                <div className="bg-gray-300 rounded-full h-11 w-11 flex items-center justify-center">
                  {data.firstName.split("")[0]}
                </div>
                <div>
                  {data.firstName} {data.lastName}
                </div>
              </div>
              <Link
                to={"/dashboard/send"}
                className="bg-black flex items-center text-indigo-100 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 duration-150"
              >
                Send Money
              </Link>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default UserDetails;
