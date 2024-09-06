import React, { useRef, useState } from "react";
import LandingPageTopNav from "./templates/LandingPageTopNav";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ReactFloaterJs from "react-floaterjs";
import TypeIt from "typeit-react";

const ContactUs = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

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

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm("service_ww0gyid", "template_04hesdw", form.current, {
        publicKey: "rkLjK67YrpwCxwD6X",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Email sent Successfully");
          setLoading(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setLoading(false);
        }
      );
  };
  return (
    <div className="w-screen h-screen overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={topNavVariants}
        className="fixed w-full z-40 md:relative"
      >
        <LandingPageTopNav btnText={"Sign In"} />
      </motion.div>

      {/* LEFT AND RIGHT PANEL CONTAINER */}
      <div className="w-full h-screen bg-white flex mt-[4.2rem] md:flex md:flex-col md:mt-0 lg:flex-row">
        {/* LEFT PANEL */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftPanelVariants}
          className="LEFT PANEL flex items-center justify-center h-screen md:h-[60%] w-full lg:min-h-screen lg:w-[45%] md-h700:h-full"
        >
          {/* contact us FORM CARD */}
          <div class="bg-white rounded-lg shadow-2xl border p-6 w-[90%] mb-[5.5rem] md:mb-2 md:w-[38%] md:h-[31rem] md:mt-[1rem] lg:mb-[7rem] lg:h-[30rem] lg:w-[62%] xl:w-[50%] 2xl:w-[45%] 2xl:mb-[9rem] 2xl:ml-[4rem] md-h700:mb-[5rem] sm:w-[50%] xl-h700:h-[29rem] xl-h700:mt-[4rem] lg-h700:h-[29rem] lg-h700:mt-[3rem] md-h700:w-[35%] md-h700:p-4 md-h700:h-[30rem]">
            <h2 class="text-3xl font-bold mb-2 text-center md:text-4xl md:mb-5 md:font-poppins lg:text-3xl lg:mb-2 2xl:mb-4">
              <TypeIt
                options={{
                  strings: [`Contact Us`],
                  speed: 50,
                  lifeLike: true,
                  cursorSpeed: 1000,
                  waitUntilVisible: true,
                  cursor: false,
                }}
              />
            </h2>
            <form ref={form} onSubmit={sendEmail}>
              <div class="mb-4 md:mb-5 lg:mb-4">
                <label
                  class="block text-black text-sm font-bold mb-2"
                  for="name"
                >
                  Name
                </label>
                <input
                  class="shadow appearance-none border border-gray-300 rounded-xl w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div class="mb-4 md:mb-5 lg:mb-4">
                <label
                  class="block text-black text-sm font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="shadow appearance-none border border-gray-300 rounded-xl w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div class="mb-4 md:mb-5 lg:mb-4">
                <label
                  class="block text-black text-sm font-bold mb-2"
                  for="message"
                >
                  Message
                </label>
                <textarea
                  class="shadow appearance-none border border-gray-300 rounded-xl w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                  id="message"
                  rows="4"
                  name="message"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div class="flex items-center justify-between">
                <button
                  type="submit"
                  value="send"
                  class="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-raleway text-lg flex gap-1 hover:scale-105"
                >
                  {loading ? (
                    <img
                      className="w-full h-6 animate-spin ease-linear"
                      src="../assets/loading.svg"
                      alt="Loading icon"
                    ></img>
                  ) : (
                    <>
                      <i class="ri-send-plane-fill"></i>
                      Send
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightPanelVariants}
          className="RIGHT PANEL hidden md:flex w-full bg-white items-center justify-center md:h-[30%] lg:h-full lg:w-[55%] md-h700:hidden"
        >
          <ReactFloaterJs>
            <img
              className="h-[300px] md:h-[200px] md:mb-[0rem] lg:h-[83%] lg:mb-[9rem] 2xl:h-[35rem] 2xl:mr-[5rem] 2xl:mb-[12rem] xl-h700:h-[30rem] xl-h700:mt-[3rem] lg:mr-[5rem]"
              src="../../assets/contactUs.jpg"
              alt=""
            />
          </ReactFloaterJs>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
