import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import { removeToken } from "../api/storage";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const logout = () => {
    setUser(false);
    removeToken();
  };
  return (
    <nav className="bg-sky-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <span className="font-semibold text-xl text-blue-300 ">
                Royal Bank of Kuwait{" "}
              </span>
              <span className="font-semibold text-xl text-blue-300 ">
                Royal Bank of Kuwait{" "}
              </span>
            </Link>
          </div>
          <div className="block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                className="text-gray-300 hover:bg-sky-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </NavLink>

              {user ? (
                <>
                  <button
                    className="text-gray-300 hover:bg-sky-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={logout}
                  >
                    logout
                  </button>

                  <NavLink
                    to="/profile"
                    className="text-gray-300 hover:bg-sky-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to="/transactions"
                    className="text-gray-300 hover:bg-sky-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Transactions
                  </NavLink>

                  <NavLink
                    to="/DepoWithd"
                    className="text-gray-300 hover:bg-sky-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Balance
                  </NavLink>

                  <NavLink
                    to="/users"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Users
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-300 hover:bg-sky-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-gray-300 hover:bg-sky-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
