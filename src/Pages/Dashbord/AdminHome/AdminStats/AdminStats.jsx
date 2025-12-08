import React from 'react';
import { FaUsers, FaClipboardList, FaFileInvoiceDollar, FaServer } from 'react-icons/fa';

const AdminStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-primary">
                    <FaUsers className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Total Users</div>
                <div className="stat-value text-primary">{stats.totalUsers}</div>
                <div className="stat-desc">Borrowers & Managers</div>
            </div>
            
            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-secondary">
                    <FaClipboardList className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Total Loans</div>
                <div className="stat-value text-secondary">{stats.totalLoans}</div>
                <div className="stat-desc">Active Loan Offers</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-accent">
                    <FaFileInvoiceDollar className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Applications</div>
                <div className="stat-value text-accent">{stats.totalApplications}</div>
                <div className="stat-desc">Total Loan Requests</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-info">
                    <FaServer className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">System Status</div>
                <div className="stat-value text-info text-2xl">Active</div>
                <div className="stat-desc">Server Running Smoothly</div>
            </div>
        </div>
    );
};

export default AdminStats;