import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, ChevronDown } from "lucide-react";
import { OctagonAlert } from "lucide-react";
import { LogOut } from "lucide-react";
import { UserPen } from "lucide-react";

export default function Topnav({ user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  const handleDeleteAccount = () => {
    setTimeout(() => {
      navigate("/dashboard/delete-account");
    }, 1000);
  };

  return (
    <nav className="w-full h-16 flex justify-between items-center px-4 md:px-6 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <img
          src="../../assets/payzip.png"
          alt="PayZip Logo"
          className="h-14 w-auto"
        />
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <span className="hidden md:inline-block font-medium">
                {user.firstName}
              </span>
              <ChevronDown size={20} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="text-xs text-gray-500">{user.username}</p>
                </div>
                <Link
                  to="/dashboard/edit"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Update Profile
                  <UserPen className="text-blue-500 mb-[2px]" size={16} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  {loading ? (
                    "Logging out..."
                  ) : (
                    <>
                      Logout
                      <LogOut className="text-red-500 mb-[2px]" size={16} />
                    </>
                  )}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  Delete Account{" "}
                  <OctagonAlert className="text-red-500 mb-[2px]" size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              setLoading(true);
              setTimeout(() => navigate("/signin"), 1000);
            }}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {loading ? (
              <img
                className="w-full h-6 animate-spin ease-linear"
                src="../assets/loading.svg"
                alt="Loading icon"
              ></img>
            ) : (
              "Sign In"
            )}
          </button>
        )}
      </div>
    </nav>
  );
}
