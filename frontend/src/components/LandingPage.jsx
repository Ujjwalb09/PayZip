import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageTopNav from "./templates/LandingPageTopNav";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen overflow-hidden">
      <LandingPageTopNav btnText={"Sign In"} />
      <div className="w-screen h-screen flex">
        <div className="LEFT PANEL flex items-center justify-center w-[40%] h-screen bg-white">
          <div className="WELCOME TEXT flex flex-col text-center gap-[2.2rem] mb-[8rem] w-[30rem] h-[30rem] items-center justify-center">
            <div className="relative font-kalam font-bold flex flex-col gap-3">
              <h1 className="text-7xl">Welcome</h1>
              <h2 className="text-6xl">To</h2>
              <h1 className="text-7xl">PayZip</h1>
            </div>
            <div className="w-[30rem] text-wrap font-semibold font-quicksand text-[1.7rem]">
              <p>
                A seamless and secure payment interface for your online
                transcations
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
                {!loading && <i class="ri-arrow-right-line"></i>}
              </button>
            </div>
          </div>
        </div>
        <div className="IMAGE PANEL flex justify-center items-center w-[60%] h-screen bg-white">
          <img
            className="h-[69%] mb-[12rem] mr-[6.8rem]"
            src="../assets/landing-image1.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
