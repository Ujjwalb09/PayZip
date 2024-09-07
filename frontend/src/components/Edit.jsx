import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import userAxios from "../utils/axios";
import { loadUser } from "../store/reducers/userSlice";
import { toast } from "react-toastify";
import { X, Eye, EyeOff } from "lucide-react";

export default function Edit() {
  const user = useSelector((state) => state.user?.info);
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [showToolTip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const update = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("User information not available", {
        position: "bottom-center",
      });
      return;
    }
    setLoading(true);
    const token = localStorage.getItem(user.username);
    const payload = {
      firstName,
      lastName,
    };

    if (password) payload.password = password;

    setTimeout(async () => {
      try {
        const response = await userAxios.put("/update", payload, {
          headers: {
            authorization: token,
          },
        });

        toast.success(response.data.message, {
          position: "bottom-center",
        });
        dispatch(
          loadUser({
            firstName,
            lastName,
            username: user.username,
          })
        );

        setPassword("");
        setLoading(false);
      } catch (error) {
        error &&
          toast.error(error.response?.data?.message || "An error occurred", {
            position: "bottom-center",
          });
        setLoading(false);
      }
    }, 2000);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
        <h2 className="mb-2 text-center text-3xl font-bold font-quicksand">
          Update User
        </h2>
        <p className="mb-4 text-center text-sm text-gray-500">
          Please enter the details you want to update
        </p>
        <form onSubmit={update} className="space-y-4">
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-bold text-gray-700"
            >
              Firstname
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="firstname"
              name="firstName"
              placeholder="John"
              value={firstName}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-bold text-gray-700"
            >
              Lastname
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Doe"
              value={lastName}
              className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={visibility ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                onClick={() => setVisibility(!visibility)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {visibility ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {showToolTip && (
              <div className="absolute right-0 top-full mt-1 rounded-md bg-gray-800 px-2 py-1 text-xs text-white">
                {visibility ? "Hide Password" : "Show Password"}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black py-2 px-4 font-raleway text-lg text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:scale-105"
          >
            {loading ? (
              <img
                className="mx-auto h-6 w-6 animate-spin"
                src="/placeholder.svg?height=24&width=24"
                alt="Loading icon"
              />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
