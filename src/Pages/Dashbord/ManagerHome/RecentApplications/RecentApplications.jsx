import React from 'react';
import { Link } from 'react-router';
import { FaEye } from 'react-icons/fa';

const RecentApplications = ({ applications }) => {
    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6 h-[400px] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Recent Applications</h3>
                <Link to="/dashboard/pending-loans" className="btn btn-xs btn-outline">View All</Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <tr key={app._id}>
                                    <td>
                                        <div className="font-bold">{app.applicantName || "User"}</div>
                                        <div className="text-xs opacity-50">{new Date(app.createdAt).toLocaleDateString()}</div>
                                    </td>
                                    <td className="font-medium">৳{app.loanAmount}</td>
                                    <td>
                                        <div className={`badge badge-sm ${
                                            app.status === 'pending' ? 'badge-warning' : 
                                            app.status === 'approved' ? 'badge-success' : 'badge-error'
                                        }`}>
                                            {app.status}
                                        </div>
                                    </td>
                                    <td>
                                        <Link to="/dashboard/pending-loans" className="btn btn-ghost btn-xs">
                                            <FaEye />
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-10 text-base-content/50">
                                    No recent applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentApplications;