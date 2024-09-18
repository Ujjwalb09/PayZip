import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { accountAxios } from "../../utils/axios";

const SendMoney = () => {
  const navigate = useNavigate();
  const [transferAmount, setTransferAmount] = useState(null);
  const transferDetail = useOutletContext();
  const [transferSuccessful, setTransferSuccessful] = useState(false);
  const [timer, setTimer] = useState(4);
  const [loading, setLoading] = useState(false);

  const transfer = async () => {
    if (transferAmount < 1) {
      toast.info("Payment must be at least ₹1", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const token = localStorage.getItem(transferDetail.payorUsername);
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await accountAxios.post(
          "/transfer",
          {
            to: transferDetail.payeeId,
            amount: transferAmount,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        setTransferSuccessful(true);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: "bottom-center",
        });
        setLoading(false);
      }
    }, 4000);
  };

  useEffect(() => {
    let interval;

    if (transferSuccessful) {
      setTimer(4);

      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);

      setTimeout(() => {
        setTransferSuccessful(false);
      }, 4000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [transferSuccessful]);

  return (
    transferDetail && (
      <div className="fixed z-[100] top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-[rgba(0,0,0,.8)]">
        <Link
          onClick={() => navigate(-1)}
          className="ri-close-line mr-5 absolute text-xl text-white right-5 top-5 hover:scale-110"
        >
          Close
        </Link>
        <div className="bg-white w-[90%] max-w-[20rem] h-[21rem] 2xl:max-w-[30rem] 2xl:h-[30rem] rounded-lg overflow-y-auto">
          {!transferSuccessful ? (
            <div className="flex flex-col gap-[3rem]">
              <div className="flex flex-col items-center justify-center h-[6rem] text-3xl 2xl:h-[10rem] 2xl:text-5xl font-bold pt-[4rem] font-quicksand mb-0">
                <h1>Send Money</h1>
                <img
                  className="h-[7rem] 2xl:h-[10rem]"
                  src="../assets/sendMoney2.jpg"
                  alt=""
                />
              </div>

              <div className="px-10 py-0 2xl:py-10">
                <div className="flex gap-3 items-center mb-1 2xl:mb-3">
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#21C55D] text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 font-quicksand 2xl:text-2xl">
                    {transferDetail.payeeFirstName.split("")[0]}
                  </span>
                  <h3 className="text-[1.20rem] 2xl:text-[2rem] font-bold font-quicksand">
                    {transferDetail.payeeFirstName}{" "}
                    {transferDetail.payeeLastName}
                  </h3>
                </div>
                <div className="flex flex-col gap-1 2xl:gap-2">
                  <h3 className="">Amount (in Rs)</h3>
                  <input
                    type="text"
                    inputMode="numeric"
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-1"
                    placeholder="Enter Amount"
                  />
                  <button
                    onClick={transfer}
                    className="bg-[#21C55D] text-lg py-2 rounded-md text-white font-bold font-quicksand mt-2 hover:scale-105 hover:bg-[#19a34c] duration-150"
                  >
                    {loading ? (
                      <img
                        className="w-full h-6 animate-spin ease-linear mb-1"
                        src="../assets/loading.svg"
                        alt="Loading icon"
                      />
                    ) : (
                      "Initiate transfer"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <div className="flex flex-col items-center justify-center gap-[3rem]">
                <img className="h-[9rem]" src="../assets/success.gif" alt="" />
                <h1 className="font-bold text-xl font-quicksand">
                  Transfer Successful
                </h1>
              </div>
              <span className="text-[0.8rem] text-gray-500">
                Redirecting in {timer}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default SendMoney;
