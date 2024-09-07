import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPageTopNav = ({ btnText }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const topNavVariants = {
    hidden: { opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  useEffect(() => {
    // Function to handle screen size change
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setIsVisible(true); // Automatically show nav links on large screens
      } else {
        setIsVisible(false); // Hide nav links on small screens
      }
    };

    // Add event listener for screen resize
    window.addEventListener("resize", handleResize);

    // Call handleResize on initial load
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="TOPNAV w-full mx-auto h-[12vh] flex justify-between border-gray-200 items-center relative z-50 bg-[#FCFCFC] shadow-md px-4 lg:px-10 lg-h700:h-[11vh] xl-minh700:h-[9vh] xl-minh700:px-[5rem]">
      <div className="pb-2">
        <Link to={"/"}>
          <img
            className="h-[70px] w-auto sm-h700:h-[60px] sm:h-[80px] lg-h700:h-[63px] md:h-[3.9rem] xl-minh700:h-[78px] md-h700:h-[3.7rem] md-lg-minh800:h-[5rem] lg-xl-minh800:h-[5rem] xl-h700:h-[60px] bsm-h600:h-[3.7rem]"
            src="../../assets/payzip.png"
            alt=""
          />
        </Link>
      </div>

      {/* Responsive nav links and button*/}
      <motion.ul
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={topNavVariants}
        className={`${
          isVisible ? "flex" : "hidden"
        } lg:flex flex-col lg:flex-row items-center justify-center border-b shadow-lg gap-[3rem] font-semibold font-raleway w-full mt-0 lg:mt-0 sm:text-[20px] absolute lg:static bg-white lg:bg-transparent min-h-[50vh] left-0 top-[100%] lg:min-h-[10vh] lg:gap-24 lg:w-auto z-40 transition-all duration-300 lg:text-[16px] lg:border-b-0 lg:shadow-none md:gap-[3rem] md:text-[25px] xl:text-[17px] md-h700:gap-[2rem]`}
      >
        <li>
          <NavLink
            className={(e) =>
              [e.isActive ? "font-bold scale-110" : "", "hover:scale-105"].join(
                " "
              )
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(e) =>
              [e.isActive ? "font-bold scale-110" : "", "hover:scale-105"].join(
                " "
              )
            }
            to={"/contactUs"}
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink>About</NavLink>
        </li>
        <li>
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                btnText === "Sign Up"
                  ? navigate("/signup")
                  : navigate("/signin");
              }, 1000);
            }}
            className="w-[110px] bg-black text-white py-[0.5rem] rounded-3xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 font-quicksand duration-200 sm:w-[130px] sm:text-xl flex items-center text-center justify-center lg:w-[7rem] lg:py-[0.4rem] lg:text-lg md:w-[150px] md:text-2xl md:py-[0.5rem]"
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear"
                src="../assets/loading.svg"
                alt="Loading icon"
              />
            ) : (
              btnText
            )}
          </button>
        </li>
      </motion.ul>

      {/* Hamburger icon for small and medium screens */}
      <i
        onClick={toggleVisibility}
        className={`${
          isVisible ? "ri-close-large-line rotate-180" : "ri-menu-line"
        } text-[20px] transition-transform duration-500 lg:hidden md:text-[25px]`}
      ></i>
    </nav>
  );
};

export default LandingPageTopNav;
