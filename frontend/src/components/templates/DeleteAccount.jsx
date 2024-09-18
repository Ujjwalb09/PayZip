import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import userAxios from "../../utils/axios";

const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState("");
  const isDeleteEnabled = confirmText === "delete-my-account";
  const user = useSelector((state) => state.user.info);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log(user);

  const deleteAccount = () => {
    const token = localStorage.getItem(user.username);
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await userAxios.delete("/delete", {
          headers: {
            authorization: token,
          },
        });

        toast.success(response.data.message);
        navigate("/signUp");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
        <button
          onClick={() => navigate(-1)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="px-6 py-4 flex flex-col items-center justify-center">
          <h2 className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-4 text-nowrap font-poppins">
            We are sorry to see you go
          </h2>
          <div className="flex items-center justify-center text-amber-500 mb-4">
            <img
              className="h-[7rem] 2xl:h-[9rem]"
              src="../assets/sorry.jpg"
              alt=""
            />
          </div>
          <p className="text-center text-gray-600 mb-2">
            To confirm account deletion, please type:
          </p>
          <p className="text-center font-mono bg-gray-100 p-2 rounded mb-4 w-full">
            delete-my-account
          </p>
          <input
            type="text"
            placeholder="Type here to confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-3 py-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="px-6 py-4 bg-gray-50">
          <button
            className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
              isDeleteEnabled
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-400 cursor-not-allowed"
            } transition duration-300 ease-in-out`}
            disabled={!isDeleteEnabled}
            onClick={deleteAccount}
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear mb-1"
                src="../assets/loading.svg"
                alt="Loading icon"
              />
            ) : (
              "Delete Account"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
