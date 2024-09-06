import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LandingPageTopNav from "./templates/LandingPageTopNav";
import { motion } from "framer-motion";
import { otpAxios } from "../utils/axios";
import ReactFloaterJs from "react-floaterjs";
import TypeIt from "typeit-react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visibility, setVisibility] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const leftPanelVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const rightPanelVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const topNavVariants = {
    hidden: { y: "-100%" },
    visible: { y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await otpAxios.post("/send-otp", {
        username: email,
        password,
      });
      toast.success(response.data.message);
      navigate("/signup/send-otp");
    } catch (error) {
      console.log(error);
      error.response
        ? toast.error(error.response.data.message)
        : toast.error("Something went wrong");
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={topNavVariants}
        className="fixed w-full z-40 md:relative"
      >
        <LandingPageTopNav btnText={"Sign In"} />
      </motion.div>

      {/* LEFT AND RIGHT PANEL CONTAINER */}
      <div className="w-full h-screen bg-white belowSm:mt-[4rem] flex mt-[4.2rem] md:flex md:flex-col md:mt-0 lg:flex-row">
        {/* LEFT PANEL */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftPanelVariants}
          className="LEFT PANEL flex items-center justify-center h-screen md:h-[70%] w-full lg:min-h-screen lg:w-[50%] md-h700:h-full"
        >
          {/* SIGN UP FORM CARD */}
          <div className="SIGN UP CARD bg-white rounded-lg shadow-2xl border p-6 w-[90%] belowSm:h-[33rem] belowSm:p-3 md:p-3 mb-[5.5rem] md:mb-2 md:w-[42%] md:h-[33rem] lg:mb-[8rem] lg:h-[34rem] lg:w-[62%] xl:w-[50%] 2xl:w-[39%] 2xl:mb-[8rem] 2xl:ml-[4rem] md-h700:mb-[3rem] sm:w-[50%] xl-h700:h-[30rem] xl-h700:ml-8 xl-h700:mt-[5rem] xl:mb-[8rem] lg-h700:h-[30rem] lg-h700:w-[50%]  lg-h700:pt-3 lg-h700:mb-[4rem] md-h700:h-[31rem] md-h700:w-[34%] sm-h700:h-[30rem] sm-h700:w-[44%] sm-h700:pt-2 sm-h700:mt-2">
            <h2 className="text-3xl font-bold mb-2 text-center md:text-4xl md:mb-3 md:font-poppins lg:text-3xl lg:mb-2 xl-h700:mb-1 lg-h700:mb-1 md-h700:mb-2 md-h700:text-3xl sm-h700:text-2xl">
              <TypeIt
                options={{
                  strings: [`Sign Up`],
                  speed: 50,
                  lifeLike: true,
                  cursorSpeed: 1000,
                  waitUntilVisible: true,
                  cursor: false,
                }}
              />
            </h2>
            <p className="text-gray-500 belowSm:mb-2 md:mb-2 text-center mb-6 md:text-base lg:text-base xl-h700:mb-2 xl-h700:text-sm lg-h700:mb-1 md-h700:mb-1 md-h700:text-[15px] sm-h700:text-[14px] sm-h700:mb-1">
              Enter your information to create an account
            </p>

            <form onSubmit={sendOtp}>
              <div className="belowSm:mb-2 mb-4 md:mb-2 lg:mb-4 xl-h700:mb-2 lg-h700:mb-1 md-h700:mb-1 sm-h700:mb-1">
                <label
                  htmlFor="firstName"
                  className="block text-sm belowSm:mb-2 md:mb-2 md:text-md font-bold text-gray-700 mb-3 lg:text-sm xl-h700:mb-1 lg-h700:mb-1 md-h700:mb-1 sm-h700:mb-1"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black md:py-2 lg:py-2"
                />
              </div>

              <div className="belowSm:mb-2 mb-4 md:mb-2 lg:mb-4 xl-h700:mb-1 lg-h700:mb-1 md-h700:mb-1 sm-h700:mb-1">
                <label
                  htmlFor="lastName"
                  className="block text-sm belowSm:mb-2 md:mb-2 md:text-md font-bold text-gray-700 mb-3 lg:text-sm xl-h700:mb-1 lg-h700:mb-1 md-h700:mb-1 sm-h700:mb-1"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black md:py-2 lg:py-2"
                />
              </div>

              <div className="belowSm:mb-2 md:mb-2 mb-4 xl-h700:mb-1 lg-h700:mb-1 md-h700:mb-1 sm-h700:mb-1">
                <label
                  htmlFor="email"
                  className="block text-sm belowSm:mb-2 md:mb-2 md:text-md font-bold text-gray-700 mb-3 lg:text-sm xl-h700:mb-1 lg-h700:mb-1 sm-h700:mb-1"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black md:py-2 lg:py-2"
                />
              </div>

              <div className="belowSm:mb-3 md:mb-3 mb-6 relative xl-h700:mb-2 sm-h700:mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700 mb-2 md:text-md lg:text-sm xl-h700:mb-1  lg-h700:mb-1 md-h700:mb-1 sm-h700:mb-1"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type={visibility ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black lg:py-2"
                />
                <i
                  onClick={() => setVisibility(!visibility)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  className={`${
                    visibility ? "ri-eye-line" : "ri-eye-close-line"
                  } absolute right-2 top-9 lg:text-base lg:top-9 cursor-pointer`}
                >
                  {showTooltip && (
                    <span className="absolute right-0 top-0 transform -translate-y-full bg-gray-800 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap transition duration-1000 delay-1000 ease-in-out lg:text-xs lg:py-1 lg:px-2">
                      {visibility ? "Hide Password" : "Show Password"}
                    </span>
                  )}
                </i>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-raleway text-lg  lg:text-lg lg:py-2"
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

            <p className="mt-4 lg:text-sm text-center text-sm lg:mt-3">
              Already have an account?
              <Link to="/signin" className="ml-1 underline">
                Login
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightPanelVariants}
          className="RIGHT PANEL hidden md:flex w-full bg-white items-center justify-center md:h-[30%] lg:h-full lg:w-[50%] md-h700:hidden"
        >
          <ReactFloaterJs>
            <img
              className="h-[300px] md:h-[200px] lg:h-[35rem] md:mb-[6rem] lg:mb-[8rem] xl:mb-[9rem] 2xl:h-[40rem] 2xl:mr-[6rem] 2xl:mb-[9rem] xl-h700:h-[32rem] xl-h700:mt-[5rem] xl-h700:mr-10  lg-h700:mt-8"
              src="../assets/signup.svg"
              alt=""
            />
          </ReactFloaterJs>
        </motion.div>
      </div>
      <Outlet context={{ firstName, lastName, email, password }} />
    </div>
  );
};

export default Signup;
