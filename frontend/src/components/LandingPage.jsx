import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LandingPageTopNav from "./templates/LandingPageTopNav";
import ReactFloaterJs from "react-floaterjs";
import TypeIt from "typeit-react";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

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

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.3, duration: 0.5, ease: "easeOut" },
    }),
  };

  useEffect(() => {
    if (!animationComplete) {
      setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);
    }
  }, [animationComplete]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={topNavVariants}
        className="fixed w-full z-40 lg:relative"
      >
        <LandingPageTopNav btnText={"Sign In"} />
      </motion.div>

      <div className="LEFT-RIGHT PANEL CONTAINER w-screen h-[90vh] flex flex-col lg:flex-row mt-[5.9rem] lg:mt-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftPanelVariants}
          className="LEFT PANEL flex items-center justify-center w-full h-[50%] lg:h-full lg:w-[45%] xl-minh700:w-[40%]"
        >
          <div className="WELCOME-TEXT-CONTAINER belowSm:flex belowSm:flex-col sm:flex sm:flex-row text-center belowSm:gap-[1.2rem] sm:gap-[1.7rem] md:gap-[6rem] items-center justify-center mt-1 lg:flex-col lg:gap-[2rem] lg-h700:gap-[1.5rem] xl-minh700:mb-[3.6rem] xl-minh700:ml-[2rem]">
            {/* WELCOME TO PAYZIP */}
            <div className="WELCOME_TEXT font-kalam font-bold flex flex-col gap-1">
              <h1 className="text-5xl sm:text-[62px] lg:text-[70px] lg-h700:text-[60px] xl-minh700:text-[75px]">
                <TypeIt
                  options={{
                    strings: [
                      `Welcome<br /><span class="text-4xl sm:text-5xl md:text-5xl lg:text-3xl xl:text-[3.2rem]">To</span><br /> Payzip`,
                    ],
                    speed: 100,
                    lifeLike: false,
                    cursorSpeed: 1000,
                    waitUntilVisible: true,
                  }}
                />
              </h1>
            </div>

            {/* paragraph and button container */}
            <div className="belowSm:flex belowSm:flex-col items-center justify-center belowSm:gap-4 sm:gap-[1.6rem] lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-8 md:flex md:flex-col flex flex-col">
              {/* PARAGRAPH */}
              <div className="PARAGRAPH-DIV w-[300px] text-wrap font-semibold font-quicksand text-[17px] sm:text-[20px] sm:w-[350px] lg:text-[1.7rem] lg:w-[450px] lg-h700:text-[1.3rem] lg-h700:w-[350px] md:text-[1.4rem]">
                <p>
                  A seamless and secure payment interface for your online
                  transactions
                </p>
              </div>
              {/* GET START BUTTON */}
              <div className="BTN-DIV flex items-center">
                <button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      navigate("/signup");
                    }, 1000);
                  }}
                  type="submit"
                  className="w-[10rem] sm:w-[9rem] sm:text-xl bg-black text-white py-[0.63rem] rounded-3xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 flex justify-center gap-2 items-center font-caveat text-xl lg:text-md "
                >
                  {loading ? (
                    <img
                      className="w-full h-7 animate-spin ease-linear"
                      src="../assets/loading.svg"
                      alt="Loading icon"
                    ></img>
                  ) : (
                    "Get Started"
                  )}
                  {!loading && <i className="ri-arrow-right-line"></i>}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        {/* //RIGHT IMAGE PANEL */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightPanelVariants}
          className="IMAGE RIGHT PANEL flex justify-center items-center w-full h-[50%] lg:w-[55%] lg:h-full  xl-minh700:w-[60%]"
        >
          <ReactFloaterJs>
            <img
              className="h-[230px] 
             sm:h-[400px] 
             sm-h700:h-[260px] 
             md-h700:h-[300px] 
             lg:h-[500px] 
             lg:w-[950px] 
             lg:mb-[30px] 
             lg-h700:h-[400px]
             xl:h-[60%] 
             xl-h700:h-[440px] 
             xl-minh700:mb-[6rem] 
             xl-minh700:mr-12 
             xl-minh700:h-[600px]
             bsm-h600:h-[12rem]"
              src="../assets/landing-image1.jpg"
              alt=""
            />
          </ReactFloaterJs>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
