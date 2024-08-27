import React from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, Flip } from "react-toastify";

const SendMoney = () => {
  const navigate = useNavigate();
  const [transferAmount, setTransferAmount] = useState(null);
  const transferDetail = useOutletContext();
  const [transferSuccesfull, setTransferSuccessfull] = useState(false);
  console.log(transferDetail);

  const transfer = async () => {
    if (transferAmount < 1) {
      toast.info("Payment must be atleast ₹1", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Flip,
      });
      return;
    }
    const token = localStorage.getItem(transferDetail.payorUsername);
    console.log(token);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/account/transfer",
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

      console.log(response);
      toast.success("Transfer Successfull");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[rgba(0,0,0,.8)] absolute z-[100] top-[-4.9rem] left-0 w-screen h-screen flex flex-col items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="ri-close-line mr-5 absolute text-2xl text-white left-[20%] top-[20%] hover:scale-110"
      >
        Close
      </Link>{" "}
      <div className="bg-white w-[29rem] h-[24rem]  rounded-lg">
        <div className="flex flex-col gap-[3.1rem]">
          <div className="flex items-center justify-center h-[7rem] text-4xl font-bold pt-2 font-quicksand">
            <h1>Send Money</h1>
          </div>

          <div className="px-10 py-1">
            <div className="flex gap-3 items-center mb-1">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#21C55D] text-xl font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 font-quicksand">
                {transferDetail.payeeFirstName.split("")[0]}
              </span>
              <h1 className="text-[1.40rem] font-bold  font-quicksand">
                {transferDetail.payeeFirstName} {transferDetail.payeeLastName}
              </h1>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="">Amount (in Rs)</h3>
              <input
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"
                type="text"
                placeholder="Enter Amount"
              />
              <button
                onClick={transfer}
                className="bg-[#21C55D] text-lg py-2 rounded-md text-white font-bold font-quicksand mt-1"
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
