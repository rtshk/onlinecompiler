import React from "react";
import { NavLink } from "react-router";
import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="bg-[#151515] shadow-md">
      <div className="container mx-auto flex justify-between items-center py-2 px-6">
        <NavLink to="/" end>
          <div className="text-white text-xl font-bold">CodeX</div>
        </NavLink>
        <ul className="flex text-white">
          <SignedOut>
              <li className="px-3 py-2 rounded-md text-sm text-[#CCCCCC] hover:bg-gray-600 hover:text-white"><SignInButton/></li>
              <li className="px-3 py-2 rounded-md text-sm text-[#CCCCCC] hover:bg-gray-600 hover:text-white"><SignUpButton/></li>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </ul>
      </div>  
    </nav>
  );
};

export default Navbar;
