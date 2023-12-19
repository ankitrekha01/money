import React from "react";
import Navbar from "../Components/Navbar";
import Payment from "../Components/Payment";
import BatchChange from "../Components/BatchChange";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col md:flex-row flex-1 justify-around items-center">
        <Payment className="md:w-1/2" />
        <BatchChange className="md:w-1/2" />
      </div>
    </div>
  );
};

export default Dashboard;
