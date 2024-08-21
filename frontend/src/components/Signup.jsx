import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAxios } from "../utils/axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visibility, setVisibility] = useState(false);

  const navigate = useNavigate();

  const signUp = async (event) => {
    event.preventDefault();
    userAxios
      .post("/signup", {
        firstName,
        lastName,
        username: email,
        password,
      })
      .then((response) => {
        if (response.data.message === "User created successfully") {
          navigate("/dashboard");
        }

        toast.success(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black">
      <div className="bg-white rounded-lg shadow-md p-6 w-[21%]">
        <h2 className="text-3xl font-bold mb-2 text-center">Sign Up</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your information to create an account
        </p>

        <form onSubmit={signUp}>
          <div className="mb-4">
            <label
              for="firstName"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              required={true}
              id="firstName"
              name="firstName"
              placeholder="John"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              for="lastName"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              required={true}
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              for="email"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              required={true}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={visibility === false ? "password" : "text"}
              id="password"
              name="password"
              required={true}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <i
              onClick={() => {
                setVisibility(!visibility);
              }}
              className={`${
                visibility === false ? "ri-eye-off-line" : "ri-eye-line"
              } absolute right-2 top-9 cursor-pointer`}
            ></i>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?
          <Link to="/signin" className="ml-1 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
