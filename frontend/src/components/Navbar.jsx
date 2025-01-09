/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const Navbar = ({ Username, icon }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="h-20 shadow flex justify-between px-12 items-center text-2xl">
      <h1 className="font-bold">Payment app</h1>
      <div className="flex items-center gap-6">
        <h2 className="flex gap-3 items-center">
          Hello {Username}{" "}
          <span className="bg-gray-300 px-3 py-1 rounded-full">{icon}</span>
        </h2>
        <button
          onClick={handleLogout}
          className="text-base bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
