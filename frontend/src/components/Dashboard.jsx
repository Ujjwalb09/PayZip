import React from "react";
import Topnav from "./templates/Topnav";
import UserDetails from "./templates/UserDetails";

const Dashboard = () => {
  return (
    <div className="w-full h-screen relative overflow-auto">
      <div className="sticky top-0 z-10">
        <Topnav />
      </div>
      <UserDetails />
    </div>
  );
};

export default Dashboard;
