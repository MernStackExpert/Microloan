import React from 'react';
import { FaHandHoldingUsd, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

const ManagerStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-primary">
                    <FaHandHoldingUsd className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Total Loans</div>
                <div className="stat-value text-primary">{stats.totalLoans}</div>
                <div className="stat-desc">Posted by you</div>
            </div>
            
            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-secondary">
                    <FaUsers className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Applications</div>
                <div className="stat-value text-secondary">{stats.totalApplications}</div>
                <div className="stat-desc">Total received</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-warning">
                    <FaClock className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Pending</div>
                <div className="stat-value text-warning">{stats.totalPending}</div>
                <div className="stat-desc">Needs Action</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-success">
                    <FaCheckCircle className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Approved</div>
                <div className="stat-value text-success">{stats.totalApproved}</div>
                <div className="stat-desc">Sanctioned Loans</div>
            </div>
        </div>
    );
};

export default ManagerStats;