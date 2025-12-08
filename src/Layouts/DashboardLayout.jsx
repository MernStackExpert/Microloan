import React from "react";
import { Link, NavLink, Outlet } from "react-router"; // react-router-dom v6 হলে 'react-router-dom'
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaHandHoldingUsd,
  FaUserTie,
  FaFileInvoiceDollar,
  FaHistory,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const DashboardLayout = () => {

  const isAdmin = false;
  const isManager = true; 
  const isBorrower = false;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center bg-base-100">
        {/* Mobile Toggle Button */}
        <div className="w-full navbar bg-base-300 lg:hidden">
            <div className="flex-none">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="flex-1 px-2 mx-2 text-xl font-bold">LoanLink Dashboard</div>
        </div>
        
        {/* Main Content Here */}
        <div className="w-full h-full p-5 lg:p-10">
            <Outlet />
        </div>
      
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg space-y-2">
          {/* Sidebar Header */}
          <div className="mb-6 text-center">
             <Link to="/" className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                <MdDashboard /> LoanLink
             </Link>
          </div>

          {/* ================= ADMIN ROUTES ================= */}
          {isAdmin && (
            <>
              <li><NavLink to="/dashboard/admin-home"><FaHome /> Admin Home</NavLink></li>
              <li><NavLink to="/dashboard/manage-users"><FaUsers /> Manage Users</NavLink></li>
              <li><NavLink to="/dashboard/all-loans"><FaClipboardList /> All Loans</NavLink></li>
              <li><NavLink to="/dashboard/loan-applications"><FaFileInvoiceDollar /> Loan Applications</NavLink></li>
            </>
          )}

          {/* ================= MANAGER ROUTES ================= */}
          {isManager && (
            <>
              <li><NavLink to="/dashboard/manager-home"><FaHome /> Manager Home</NavLink></li>
              <li><NavLink to="/dashboard/add-loan"><FaHandHoldingUsd /> Add Loan</NavLink></li>
              <li><NavLink to="/dashboard/manage-loans"><FaClipboardList /> Manage Loans</NavLink></li>
              <li><NavLink to="/dashboard/pending-loans"><FaHistory /> Pending Applications</NavLink></li>
              <li><NavLink to="/dashboard/approved-loans"><FaFileInvoiceDollar /> Approved Applications</NavLink></li>
              <li><NavLink to="/dashboard/profile"><FaUserTie /> My Profile</NavLink></li>
            </>
          )}

          {/* ================= BORROWER (USER) ROUTES ================= */}
          {isBorrower && (
            <>
              <li><NavLink to="/dashboard/user-home"><FaHome /> User Home</NavLink></li>
              <li><NavLink to="/dashboard/my-loans"><FaHandHoldingUsd /> My Loans</NavLink></li>
              <li><NavLink to="/dashboard/profile"><FaUserTie /> My Profile</NavLink></li>
            </>
          )}

          {/* ================= SHARED / COMMON ROUTES ================= */}
          <div className="divider"></div>
          <li><NavLink to="/"><FaHome /> Home</NavLink></li>
          <li><NavLink to="/all-loans"><FaClipboardList /> Available Loans</NavLink></li>
        </ul>
      
      </div>
    </div>
  );
};

export default DashboardLayout;