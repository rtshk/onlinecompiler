import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-[#151515] shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <NavLink to="/" end>
          <div className="text-white text-xl font-bold">CodeX</div>
        </NavLink>
        <ul className="flex text-white">
          <NavLink to="/login" end>
            <li className="px-3">Login</li>
          </NavLink>
          <NavLink to="/signup" end>
            <li className="px-3">Signup</li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
