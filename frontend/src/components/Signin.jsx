import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userAxios from "../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../store/reducers/userSlice";
import LandingPageTopNav from "./templates/LandingPageTopNav";
import { motion } from "framer-motion";
import ReactFloaterJs from "react-floaterjs";
import TypeIt from "typeit-react";

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

    userAxios
      .post("/signin", {
        username: email,
        password,
      })
      .then((response) => {
        localStorage.setItem(email, response.data.token);
        console.log(response);
        dispatch(
          loadUser({
            firstName: response.data.userData.firstName,
            lastName: response.data.userData.lastName,
            username: response.data.userData.username,
          })
        );
        toast.success(response.data.message);
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        error.response
          ? toast.error(error.response.data.message)
          : console.log(error);
        setLoading(false);
      });
  };

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

  return (
    <div className="w-screen h-screen overflow-hidden ">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={topNavVariants}
        className="fixed w-full z-40 md:relative"
      >
        <LandingPageTopNav btnText={"Sign Up"} />
      </motion.div>

      {/* LEFT AND RIGHT PANEL CONTAINER */}
      <div className="w-full h-screen bg-white flex mt-[4.2rem] md:flex md:flex-col md:mt-0 lg:flex-row">
        {/* LEFT PANEL */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftPanelVariants}
          className="LEFT PANEL flex items-center justify-center h-screen md:h-[60%] w-full lg:min-h-screen lg:w-[50%] md-h700:h-full"
        >
          {/* SIGN IN FORM CARD */}
          <div className="SIGN IN CARD bg-white rounded-lg shadow-2xl border p-6 w-[90%] mb-[5.5rem] md:mb-2 md:w-[42%] md:h-[29rem] md:mt-[1rem] lg:mb-[7rem] lg:h-[27rem] lg:w-[62%] xl:w-[50%] 2xl:w-[39%] 2xl:mb-[9rem] 2xl:ml-[4rem] md-h700:mb-[5rem] sm:w-[50%] xl-h700:h-[25rem] xl-h700:mt-[4rem]">
            <h2 className="text-3xl font-bold mb-2 text-center md:text-4xl md:mb-5 md:font-poppins lg:text-3xl lg:mb-2 2xl:mb-4">
              <TypeIt
                options={{
                  strings: [`Sign In`],
                  speed: 50,
                  lifeLike: true,
                  cursorSpeed: 1000,
                  waitUntilVisible: true,
                  cursor: false,
                }}
              />
            </h2>
            <p className="text-gray-500 text-center mb-6 md:text-base lg:text-base xl-h700:mb-3 xl-h700:text-sm 2xl:mb-3">
              Enter your credentials to access your account
            </p>

            <form onSubmit={signIn}>
              <div className="mb-4 md:mb-5 lg:mb-4">
                <label
                  for="email"
                  className="block text-sm md:text-md font-bold text-gray-700 mb-3 lg:text-sm"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black md:py-2 lg:py-2"
                />
              </div>

              <div className="mb-6 md:mb-6 lg:mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-gray-700 mb-2 md:text-md lg:text-sm"
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
                  {showToolTip && (
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
                  "Sign In"
                )}
              </button>
            </form>

            <p className="mt-4 lg:text-sm text-center text-sm lg:mt-3">
              Don't have an account?
              <Link to="/signup" className="ml-1 underline">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightPanelVariants}
          className="RIGHT PANEL hidden md:flex w-full bg-white items-center justify-center md:h-[30%] lg:h-full lg:w-[50%] md-h700:hidden"
        >
          <ReactFloaterJs>
            <img
              className="h-[300px] md:h-[200px] md:mb-[0rem] lg:h-[85%] lg:mb-[6rem] 2xl:h-[42rem] 2xl:mr-[4rem] 2xl:mb-[9rem] xl-h700:h-[32rem] xl-h700:mt-[3rem]"
              src="../assets/signIn.jpg"
              alt=""
            />
          </ReactFloaterJs>
        </motion.div>
      </div>
    </div>
  );
};

export default Signin;
