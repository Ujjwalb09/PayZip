import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LandingPageTopNav from "./templates/LandingPageTopNav";

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
      transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
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
        className="fixed w-full"
      >
        <LandingPageTopNav btnText={"Sign In"} />
      </motion.div>

      <div className="w-screen h-screen flex mt-[5.1rem]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftPanelVariants}
          className="LEFT PANEL flex items-center justify-center w-[40%] h-screen bg-white"
        >
          <div className="WELCOME TEXT flex flex-col text-center gap-[2.2rem] mb-[8rem] w-[30rem] h-[30rem] items-center justify-center">
            <div className="relative font-kalam font-bold flex flex-col gap-3">
              <motion.h1
                initial="hidden"
                animate={animationComplete ? "visible" : "hidden"}
                variants={typewriterVariants}
                custom={0}
                className="text-7xl"
              >
                Welcome
              </motion.h1>
              <motion.h2
                initial="hidden"
                animate={animationComplete ? "visible" : "hidden"}
                variants={typewriterVariants}
                custom={1}
                className="text-6xl"
              >
                To
              </motion.h2>
              <motion.h1
                initial="hidden"
                animate={animationComplete ? "visible" : "hidden"}
                variants={typewriterVariants}
                custom={2}
                className="text-7xl"
              >
                PayZip
              </motion.h1>
            </div>
            <div className="w-[30rem] text-wrap font-semibold font-quicksand text-[1.7rem]">
              <p>
                A seamless and secure payment interface for your online
                transactions
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    navigate("/signup");
                  }, 1000);
                }}
                type="submit"
                className="w-[12rem] bg-black text-white py-[0.65rem] rounded-3xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:scale-105 flex justify-center gap-2 items-center font-caveat text-xl"
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
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightPanelVariants}
          className="IMAGE RIGHT PANEL flex justify-center items-center w-[60%] h-screen bg-white"
        >
          <img
            className="h-[68%] mb-[12rem] mr-[6rem]"
            src="../assets/landing-image1.jpg"
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
