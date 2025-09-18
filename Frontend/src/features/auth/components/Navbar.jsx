import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Logout from "./Logout";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <header className="bg-red-500 shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Brand / Logo */}
        <div className="text-white font-bold text-xl">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white text-lg transition duration-200 ${
                isActive ? "font-bold underline" : "hover:opacity-80"
              }`
            }
          >
            My App
          </NavLink>
        </div>
        {user ? (
          <div className="flex space-x-6">
            <Logout />
            <NavLink
              to="/addPost"
              className={({ isActive }) =>
                `text-white text-lg transition duration-200 ${
                  isActive ? "font-bold underline" : "hover:opacity-80"
                }`
              }
            >
              Create Post
            </NavLink>
          </div>
        ) : (
          <div className="flex space-x-6">
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `text-white text-lg transition duration-200 ${
                  isActive ? "font-bold underline" : "hover:opacity-80"
                }`
              }
            >
              Sign In
            </NavLink>

            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `text-white text-lg transition duration-200 ${
                  isActive ? "font-bold underline" : "hover:opacity-80"
                }`
              }
            >
              Create Account
            </NavLink>
          </div>
        )}

        {/* Nav Links */}
      </nav>
    </header>
  );
};

export default Navbar;
