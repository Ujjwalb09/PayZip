import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      <div className="bg-white rounded-lg shadow-md p-6 w-[21%]">
        <h2 className="text-3xl font-bold mb-2 text-center">Sign In</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your credentials to access your account
        </p>

        <form>
          <div className="mb-4">
            <label
              for="email"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 relative">
            <label
              for="password"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type={visibility === false ? "password" : "text"}
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <i
              onClick={() => setVisibility(!visibility)}
              class={`absolute ${
                visibility === false ? "ri-eye-off-line" : "ri-eye-line"
              } right-2 top-9 cursor-pointer`}
            ></i>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Sign In
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
