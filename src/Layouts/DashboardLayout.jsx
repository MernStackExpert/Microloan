import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaHandHoldingUsd,
  FaUserTie,
  FaFileInvoiceDollar,
  FaHistory,
  FaBars,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";

const DashboardLayout = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Fetch user role from database
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          setRole(res.data?.role);
          setRoleLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch role", err);
          setRoleLoading(false);
        });
    } else {
      setRoleLoading(false);
    }
  }, [user?.email, axiosSecure]);

  // Determine user status
  const isAdmin = role === "admin";
  const isManager = role === "manager";
  // Default to borrower if logged in but no specific role assigned yet
  const isBorrower = role === "borrower" || (user && !isAdmin && !isManager);

  // Theme Toggling Logic
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Loading State
  if (authLoading || roleLoading) {
    return (
      <div className="flex h-screen justify-center items-center bg-base-100">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-100">
        {/* Mobile Navbar */}
        <div className="w-full navbar bg-base-100 border-b border-base-300 lg:hidden sticky top-0 z-50">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <FaBars className="text-xl" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-bold text-primary">
            LoanLink Dashboard
          </div>
        </div>

        {/* Main Content Outlet */}
        <div className="w-full min-h-screen p-5 lg:p-10 bg-base-200/30">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-100 border-r border-base-300 text-base-content text-base font-medium space-y-1">
          {/* Sidebar Header */}
          <div className="mb-8 mt-2 text-center">
            <Link
              to="/"
              className="text-2xl font-black flex items-center justify-center gap-2 text-primary"
            >
              <MdDashboard className="text-3xl" /> LoanLink
            </Link>
            {/* Role Badge */}
            <div className="badge badge-outline badge-primary mt-2 uppercase text-xs font-bold">
              {role || "User"} Panel
            </div>
          </div>

          {/* ================= ADMIN ROUTES ================= */}
          {isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard/admin-home">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-loans">
                  <FaClipboardList /> All Loans
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/loan-applications">
                  <FaFileInvoiceDollar /> Loan Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUserTie /> My Profile
                </NavLink>
              </li>
            </>
          )}

          {/* ================= MANAGER ROUTES ================= */}
          {isManager && (
            <>
              <li>
                <NavLink to="/dashboard/manager-home">
                  <FaHome /> Manager Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-loan">
                  <FaHandHoldingUsd /> Add Loan
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-loans">
                  <FaClipboardList /> Manage Loans
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pending-loans">
                  <FaHistory /> Pending Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/approved-loans">
                  <FaFileInvoiceDollar /> Approved Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUserTie /> My Profile
                </NavLink>
              </li>
            </>
          )}

          {/* ================= BORROWER ROUTES ================= */}
          {isBorrower && (
            <>
              <li>
                <NavLink to="/dashboard/user-home">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-loans">
                  <FaHandHoldingUsd /> My Loans
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history">
                  <FaHistory /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <FaUserTie /> My Profile
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Links */}
          <div className="divider my-4"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-loans">
              <FaClipboardList /> Available Loans
            </NavLink>
          </li>

          {/* Theme Toggle */}
          <li>
            <button onClick={toggleTheme} className="flex gap-3 items-center">
              {theme === "light" ? (
                <FiMoon />
              ) : (
                <FiSun className="text-yellow-500" />
              )}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
