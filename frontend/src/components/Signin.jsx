import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAxios from "../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../store/reducers/userSlice";
import Topnav from "./templates/Topnav";

const Signin = () => {
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToolTip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signIn = (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      userAxios
        .post("/signin", {
          username: email,
          password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem(email, response.data.token);
          dispatch(
            loadUser({
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              username: response.data.user.username,
            })
          );
          toast.success(response.data.message);
          navigate("/dashboard");
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#F7EFE5]">
      <div className="bg-white rounded-lg shadow-md p-6 w-[20%]">
        <h2 className="text-3xl font-bold mb-2 text-center">Sign In</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={signIn}>
          <div className="mb-4">
            <label
              for="email"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
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
              required
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
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear"
                src="../assets/loading.svg"
                alt="Loading icon"
              ></img>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?
          <Link to="/signup" className="ml-1 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
