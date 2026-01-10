import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut, FiZap, FiUser, FiLayout } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Provider/AuthContext";

const AppNavbar = () => {
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

  const navLinkClasses = ({ isActive }) =>
    `relative px-5 py-2.5 text-sm font-medium transition-all duration-300 group ${
      isActive ? "text-primary" : "text-base-content/70 hover:text-primary"
    }`;

  const menuItems = (
    <>
      <li><NavLink to="/" className={navLinkClasses} onClick={() => setOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/all-loans" className={navLinkClasses} onClick={() => setOpen(false)}>All Loans</NavLink></li>
      <li><NavLink to="/about" className={navLinkClasses} onClick={() => setOpen(false)}>About</NavLink></li>
      <li><NavLink to="/contact" className={navLinkClasses} onClick={() => setOpen(false)}>Contact</NavLink></li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl shadow-2xl shadow-indigo-500/30 group-hover:scale-110 transition-all duration-300">
              <FiZap className="w-7 h-7 text-white rotate-12" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl"></div>
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-2xl font-black bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent leading-none">
                LoanLink
              </h1>
              <p className="text-[10px] text-base-content/60 tracking-widest uppercase">Micro Finance</p>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-2">
            {menuItems}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={toggleTheme} className="p-3 rounded-2xl bg-base-200/50 hover:bg-base-300 transition-all duration-300">
              {theme === "light" ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5 text-yellow-500" />}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar online cursor-pointer">
                  <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || "User"}&background=6366f1&color=fff`} alt="user" />
                  </div>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow-2xl bg-base-100 rounded-2xl w-60 mt-4 border border-base-300">
                  <div className="px-2 pb-3 mb-3 border-b border-base-300">
                    <p className="font-bold text-base-content">{user.displayName || "User"}</p>
                    <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                  </div>
                  <li><Link to="/dashboard" className="py-3 flex items-center gap-3 hover:text-primary"><FiLayout className="w-5 h-5" /> Dashboard</Link></li>
                  <li><Link to="/dashboard/profile" className="py-3 flex items-center gap-3 hover:text-primary"><FiUser className="w-5 h-5" /> My Profile</Link></li>
                  <div className="mt-3 pt-3 border-t border-base-300">
                    <button onClick={handleLogout} className="btn btn-error btn-sm w-full rounded-xl gap-2 font-bold">
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login" className="btn btn-ghost rounded-xl font-bold">Login</Link>
                <Link to="/register" className="btn btn-primary rounded-xl shadow-lg shadow-primary/30 font-bold">Register</Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-base-200/50 hover:bg-base-300 transition-all">
              {theme === "light" ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5 text-yellow-500" />}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2.5 rounded-xl bg-base-200/50 hover:bg-base-300 transition-all">
              {open ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden absolute top-full left-0 w-full bg-base-100/95 backdrop-blur-2xl border-t border-base-300 shadow-2xl transition-all duration-500 ease-out ${open ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}`}>
        <div className="px-6 py-8 space-y-6">
          <ul className="space-y-4">
            {menuItems}
            {user && (
              <>
                <li><Link to="/dashboard" className="px-5 py-2.5 block text-sm font-medium hover:text-primary border-t border-base-300 pt-4" onClick={() => setOpen(false)}>Dashboard</Link></li>
                <li><Link to="/dashboard/profile" className="px-5 py-2.5 block text-sm font-medium hover:text-primary" onClick={() => setOpen(false)}>My Profile</Link></li>
              </>
            )}
          </ul>

          <div className="pt-6 border-t border-base-300">
            {user ? (
              <div className="space-y-5">
                <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl">
                  <div className="avatar">
                    <div className="w-14 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                      <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=6366f1&color=fff`} />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{user.displayName || "User"}</p>
                    <p className="text-sm text-base-content/60">{user.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="btn btn-error w-full rounded-xl font-bold">
                  <FiLogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link to="/login" onClick={() => setOpen(false)} className="btn btn-ghost rounded-xl font-bold">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn btn-primary rounded-xl font-bold">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;