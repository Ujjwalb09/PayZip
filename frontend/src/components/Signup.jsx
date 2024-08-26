import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visibility, setVisibility] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/otp/send-otp",
        {
          username: email,
          password,
        }
      );
      toast.success(response.data.message);
      navigate("/signup/send-otp");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#F7EFE5]">
      <div className="bg-white rounded-lg shadow-md p-6 w-[21%]">
        <h2 className="text-3xl font-bold mb-2 text-center">Sign Up</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your information to create an account
        </p>

        <form onSubmit={sendOtp}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              required
              id="firstName"
              name="firstName"
              placeholder="John"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              required
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
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
              {showTooltip && (
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
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?
          <Link to="/signin" className="ml-1 underline">
            Login
          </Link>
        </p>
      </div>
      <Outlet context={{ firstName, lastName, email, password }} />
    </div>
  );
};

export default Signup;
