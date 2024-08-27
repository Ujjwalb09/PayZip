import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../store/reducers/userSlice";

const Topnav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const buttonContainerRef = useRef();
  const logoutBtnContainer = useRef();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.info);
  const dispatch = useDispatch();

  const handleClickOutside = (e) => {
    if (
      buttonContainerRef.current &&
      logoutBtnContainer.current &&
      !buttonContainerRef.current.contains(e.target) &&
      !logoutBtnContainer.current.contains(e.target)
    ) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      user && localStorage.removeItem(user.username);
      dispatch(removeUser());
    };
  }, []);
  return (
    <div className="w-full h-[7vh] flex justify-between border-b border-gray-200 shadow-md items-center relative z-50 bg-white">
      <div className="px-6 pb-1">
        <img className="h-14" src="../../assets/payzip.png" alt="" />
      </div>
      <div className="flex gap-4 px-4 text-center">
        <div className="flex items-center">Hello</div>
        {user ? (
          <button
            ref={buttonContainerRef}
            onClick={() => setShowLogout((prev) => !prev)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-xl font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
          >
            {user.firstName.split("")[0]}
          </button>
        ) : (
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                navigate("/signin");
              }, 2000);
            }}
            className="bg-black px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 shadow-md text-indigo-100 duration-150 font-raleway text-lg"
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear"
                src="../assets/loading.svg"
                alt="Loading icon"
              ></img>
            ) : (
              "Signin"
            )}
          </button>
        )}
      </div>
      {showLogout && user && (
        <div className="absolute right-3 top-[69px] bg-gray-200 h-[60px] w-[8%] rounded-md flex items-center justify-center shadow-lg">
          <button
            ref={logoutBtnContainer}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                navigate("/signin");
              }, 2000);
            }}
            className="bg-black px-4 py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 shadow-md text-indigo-100 duration-150 font-raleway text-lg"
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear"
                src="../assets/loading.svg"
                alt="Loading icon"
              ></img>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Topnav;
