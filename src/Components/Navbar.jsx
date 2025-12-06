import { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Provider/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, signOutUser } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  const navLinkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? "bg-primary text-primary-content shadow-md"
        : "text-base-content hover:bg-base-200"
    }`;

  // menuItems variable
  const menuItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyles} onClick={() => setOpen(false)}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-loans" className={navLinkStyles} onClick={() => setOpen(false)}>
          All Loans
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkStyles} onClick={() => setOpen(false)}>
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about" className={navLinkStyles} onClick={() => setOpen(false)}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navLinkStyles} onClick={() => setOpen(false)}>
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-base-100 border-b border-base-300 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group border border-transparent dark:border-gray-600 p-1 rounded-lg"
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-2xl font-sans">L</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 tracking-tight hidden sm:block">
              LoanLink
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-1">{menuItems}</ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex gap-4 items-center">
            <button onClick={toggleTheme} className="btn btn-ghost btn-circle" title="Toggle Theme">
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-base-300">
                <div className="tooltip tooltip-bottom" data-tip={user.displayName} title={user.displayName}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary cursor-pointer hover:ring-secondary transition-all"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md cursor-pointer">
                      {user.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="btn btn-error gap-2">
                  <FiLogOut /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle">
              {open ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute w-full bg-base-100 border-b border-base-300 shadow-xl transition-all duration-300 ease-in-out origin-top z-40 ${
          open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0 overflow-hidden"
        }`}
      >
        <div className="p-6 space-y-4">
          <ul className="space-y-2 flex flex-col">{menuItems}</ul>
          <div className="pt-4 mt-4 border-t border-base-300">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-base-200 p-3 rounded-xl">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {user.displayName?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-base-content">{user.displayName || "User"}</p>
                    <p className="text-sm text-base-content/70">{user.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn btn-error w-full gap-2">
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" onClick={() => setOpen(false)} className="btn btn-ghost w-full">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
