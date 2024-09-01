import React, { useRef, useState } from "react";
import LandingPageTopNav from "./templates/LandingPageTopNav";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
        className="fixed w-full"
      >
        <LandingPageTopNav btnText={"Sign In"} />
      </motion.div>

      <div className="w-screen h-[91vh] flex mt-[4.9rem]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftPanelVariants}
          className="LEFT w-[45%] h-full flex items-center justify-center"
        >
          <div class="max-w-md w-full rounded-lg shadow-2xl border p-6 mb-[3rem] mr-[2rem]">
            <h2 class="text-5xl font-quicksand font-bold mb-6 text-black">
              Contact Us
            </h2>
            <form ref={form} onSubmit={sendEmail}>
              <div class="mb-4">
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
              <div class="mb-4">
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
              <div class="mb-3">
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightPanelVariants}
          className="RIGHT flex justify-center items-center w-[55%] h-full"
        >
          <img
            className="h-[80%] mb-[10rem] mr-[6rem]"
            src="../../assets/contactUs.jpg"
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
