import React from "react";
import Navbar from "./Navbar";

const Signup = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        {/* Right Section */}
        <div className="hidden lg:flex w-1/2 bg-[#151515] items-center justify-center">
          <div className="text-gray-400 text-center text-xs">
            Add your custom content or illustration here.
          </div>
        </div>
        {/* Left Section */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 bg-[#151515] text-white p-6">
          <div className="max-w-sm mx-auto">
            {/* Page Title */}
            <h2 className="text-xl font-bold mb-2 text-center">
              Create your account
            </h2>
            <p className="text-gray-400 text-xs mb-4 text-center">
              Enter your email and password to create your account.
            </p>

            {/* Signup Form */}
            <form className="space-y-3">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-2 py-1 border border-gray-700 rounded-md bg-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-2 py-1 border border-gray-700 rounded-md bg-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-1.5 bg-white hover:bg-gray-300 text-black text-sm rounded font-medium focus:ring focus:ring-blue-400"
              >
                Sign Up
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="mx-2 text-xs text-gray-400">Or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            {/* Secondary Options */}
            <div>
              <button
                type="button"
                className="w-full py-1.5 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 text-sm text-white font-medium"
              >
                Continue with Gmail
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-gray-400 text-xs mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
