import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff, Search, IndianRupee } from "lucide-react";
import userAxios, { accountAxios } from "../../utils/axios";
import { motion } from "framer-motion";

export default function UserDetails() {
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [query, setQuery] = useState("");
  const [isAllUsers, setIsAllUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [outletDetails, setOutletDetails] = useState(null);

  const user = useSelector((state) => state.user.info);
  const navigate = useNavigate();
  console.log(loading);

  const getBalance = async () => {
    setLoading(true);
    const token = localStorage.getItem(user.username);

    try {
      const response = await accountAxios.get("/balance", {
        headers: { authorization: token },
      });
      setBalance(response.data.balance);
      setShowBalance(true);
    } catch (error) {
      toast.error("Error! Please try again after sometime");
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      const response = await userAxios.get("/bulk", {
        params: { filter: query },
      });
      setUsers(response.data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    if (query || isAllUsers) {
      getUsers();
    }
  }, [query, isAllUsers]);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-bold mb-2 font-poppins">Your Balance</h2>
        <div className="flex items-center justify-between">
          {showBalance ? (
            <>
              <span className="text-3xl font-bold font-barlow flex items-center gap-1">
                <IndianRupee className="mt-1" size={21} /> {balance}
              </span>
              <button
                onClick={() => setShowBalance(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <EyeOff size={24} />
              </button>
            </>
          ) : (
            <button
              onClick={getBalance}
              disabled={!user || loading}
              className="text-blue-500 font-semibold"
            >
              {loading ? "Fetching balance..." : "Check balance"}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4 font-poppins">Users</h2>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Users..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="allUsers"
            checked={isAllUsers}
            onChange={(e) => setIsAllUsers(e.target.checked)}
            disabled={!user}
            className="mr-2"
          />
          <label htmlFor="allUsers" className="text-sm text-gray-600">
            All users
          </label>
        </div>
        {users.length > 0 && (query.length > 0 || isAllUsers) && (
          <div className="space-y-3">
            {users.map(
              (data) =>
                data.username !== user.username && (
                  <div
                    key={data._id}
                    className="flex flex-col md:flex-row md:justify-between py-3 border-b border-gray-200 last:border-b-0 gap-2"
                  >
                    <div className="flex items-center space-x-3 flex-grow mr-2 mb-2 md:mb-0">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                        {data.firstName[0]}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-medium truncate font-barlow">{`${data.firstName} ${data.lastName}`}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {data.username}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => {
                          const obj = {
                            payeeFirstName: data.firstName,
                            payeeLastName: data.lastName,
                            payeeId: data._id,
                            payorUsername: user.username,
                          };
                          setOutletDetails(obj);
                          navigate("/dashboard/send");
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-nowrap font-barlow font-semibold w-full"
                      >
                        Send Money
                      </button>
                    </motion.div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <Outlet context={outletDetails} />
    </div>
  );
}
