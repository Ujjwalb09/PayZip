import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userAxios from "../utils/axios";
import { loadUser } from "../store/reducers/userSlice";
import { toast } from "react-toastify";

const Edit = () => {
  const user = useSelector((state) => state.user.info);
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [showToolTip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const update = (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem(user.username);
    const payload = {
      firstName,
      lastName,
    };

    if (password) payload.password = password;

    setTimeout(async () => {
      try {
        const response = await userAxios.put("/update", payload, {
          headers: {
            authorization: token,
          },
        });

        toast.success(response.data.message, {
          position: "bottom-center",
        });
        dispatch(
          loadUser({
            firstName,
            lastName,
            username: user.username,
          })
        );

        setPassword("");
        setLoading(false);
      } catch (error) {
        error &&
          toast.error(error.response.data.message, {
            position: "bottom-center",
          });
        setLoading(false);
      }
    }, 2000);
  };
  return (
    <div className="bg-[rgba(0,0,0,.8)] absolute z-[100] top-[-4.9rem] left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="ri-close-line mr-5 absolute text-2xl text-white left-[20%] top-[20%] hover:scale-110"
      >
        Close
      </Link>{" "}
      <div className="SIGN IN CARD bg-white rounded-lg shadow-2xl border p-6 w-[25%]">
        <h2 className="text-3xl font-bold mb-2 text-center font-quicksand">
          Update User
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Please enter the details you want to update
        </p>
        <form onSubmit={update}>
          <div className="mb-4">
            <label
              for="email"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Firstname
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="firstname"
              name="firstName"
              placeholder="John"
              value={firstName}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <label
              for="lastname"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Lastname
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Doe"
              value={lastName}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={visibility ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            <i
              onClick={() => setVisibility(!visibility)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className={`${
                visibility ? "ri-eye-line" : "ri-eye-close-line"
              } absolute right-2 top-9 cursor-pointer`}
            >
              {showToolTip && (
                <span className="absolute right-0 top-0 transform -translate-y-full bg-gray-800 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap transition duration-1000 delay-1000 ease-in-out">
                  {visibility ? "Hide Password" : "Show Password"}
                </span>
              )}
            </i>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-raleway text-lg"
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear"
                src="../assets/loading.svg"
                alt="Loading icon"
              ></img>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
