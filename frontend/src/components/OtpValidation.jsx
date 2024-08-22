import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { userAxios } from "../utils/axios";

function OtpInputWithValidation({ numberOfDigits = 6 }) {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [timeLeft, setTimeLeft] = useState(180);

  const userDetailObj = useOutletContext();

  useEffect(() => {
    if (!userDetailObj.email) navigate("/signup");
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const OTP = otp.join("");
    if (OTP.split("").length < 6) {
      setOtpError("Please enter the complete OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await userAxios.post("/signup", {
        firstName: userDetailObj.firstName,
        lastName: userDetailObj.lastName,
        username: userDetailObj.email,
        password: userDetailObj.password,
        otp: OTP,
      });
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      setOtpError(error.response.data.message);
    }
    setLoading(false);
  };

  const resendOTP = () => {};

  return (
    <form onSubmit={signUp}>
      <div className="bg-[rgba(0,0,0,.8)] absolute z-[100] top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
        <Link
          onClick={() => navigate(-1)}
          className="ri-close-line mr-5 absolute text-2xl text-white left-[20%] top-[30%] hover:scale-110"
        >
          Close
        </Link>{" "}
        <p className="text-2xl font-medium text-white mt-12">
          Please enter the OTP sent to your email
        </p>
        <p className="text-base text-white mt-6 mb-4">
          One Time Password (OTP)
        </p>
        <div className="flex items-center gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              minLength={1}
              value={digit}
              maxLength={1}
              onChange={(e) => {
                handleChange(e.target.value, index);
                setOtpError(null);
              }}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) => (otpBoxReference.current[index] = reference)}
              className={`border w-20 h-auto text-white p-3 rounded-md block bg-black focus:border-2 focus:outline-none appearance-none`}
            />
          ))}
        </div>
        <p className={`text-lg text-white mx-auto mt-4`}>
          {otpError ? otpError : ""}
        </p>
        <div className="flex gap-5">
          <button
            type="submit"
            disabled={timeLeft <= 0}
            className={`bg-black text-white py-3 px-5 rounded-lg  mt-2 ${
              timeLeft <= 0
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-900 hover:scale-105"
            }`}
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear"
                src="../assets/loading.svg"
                alt="Loading icon"
              ></img>
            ) : (
              "Verify"
            )}
          </button>
          <button
            type="button"
            onClick={resendOTP}
            disabled={timeLeft > 0} // Disable button when timer is running
            className={`bg-black text-white py-3 px-5 rounded-lg mt-2 ${
              timeLeft > 0
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-900 hover:scale-105"
            }`}
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear"
                src="../assets/loading.svg"
                alt="Loading icon"
              />
            ) : timeLeft > 0 ? (
              <>
                Resend OTP in{" "}
                <span className="text-white">{formatTime(timeLeft)}</span>{" "}
              </>
            ) : (
              <>Resend OTP</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default OtpInputWithValidation;

//  <span className="text-white">{formatTime(timeLeft)}</span>
