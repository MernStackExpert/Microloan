import React from 'react';
import { FaFileContract, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const UserStats = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-primary">
                    <FaFileContract className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Total Applied</div>
                <div className="stat-value text-primary">{stats.totalApplied}</div>
                <div className="stat-desc">Lifetime Applications</div>
            </div>
            
            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-warning">
                    <FaHourglassHalf className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Pending</div>
                <div className="stat-value text-warning">{stats.totalPending}</div>
                <div className="stat-desc">Waiting for Approval</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-success">
                    <FaCheckCircle className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Approved</div>
                <div className="stat-value text-success">{stats.totalApproved}</div>
                <div className="stat-desc">Congratulation!</div>
            </div>

            <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-200">
                <div className="stat-figure text-error">
                    <FaTimesCircle className="text-4xl opacity-80" />
                </div>
                <div className="stat-title">Rejected</div>
                <div className="stat-value text-error">{stats.totalRejected}</div>
                <div className="stat-desc">Try again later</div>
            </div>
        </div>
    );
};

export default UserStats;