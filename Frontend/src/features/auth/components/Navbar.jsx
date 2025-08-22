import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-red-500 shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Brand / Logo */}
        <h1 className="text-white font-bold text-xl">MyApp</h1>

        {/* Nav Links */}
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white text-lg transition duration-200 ${
                isActive ? "font-bold underline" : "hover:opacity-80"
              }`
            }
          >
            Dashboard
          </NavLink>

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
      </nav>
    </header>
  );
};

export default Navbar;
