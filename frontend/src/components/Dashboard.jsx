import React, { useEffect, useState } from "react";
import Topnav from "./templates/Topnav";
import UserDetails from "./templates/UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/reducers/userSlice";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.info);

  useEffect(() => {
    return () => {
      dispatch(removeUser());
      user && localStorage.removeItem(user.username);
    };
  }, []);
  return (
    <div className="w-full h-screen relative overflow-auto">
      <div className="sticky top-0 z-10">
        <Topnav user={user} />
      </div>
      <UserDetails />
    </div>
  );
};

export default Dashboard;
