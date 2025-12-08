import React from 'react';
import { Link } from 'react-router';
import { FaEye } from 'react-icons/fa';

const MyRecentLoans = ({ applications }) => {
    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Recent Loan History</h3>
                <Link to="/dashboard/my-loans" className="btn btn-sm btn-outline btn-primary">
                    View All My Loans
                </Link>
            </div>
            
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>#</th>
                            <th>Loan Category</th>
                            <th>Amount</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((app, index) => (
                                <tr key={app._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold">{app.loanTitle || "Loan Application"}</div>
                                        <div className="text-xs opacity-50">{app.category}</div>
                                    </td>
                                    <td className="font-bold">৳{app.loanAmount}</td>
                                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className={`badge ${
                                            app.status === 'pending' ? 'badge-warning' : 
                                            app.status === 'approved' ? 'badge-success' : 'badge-error'
                                        } badge-md`}>
                                            {app.status}
                                        </div>
                                    </td>
                                    <td>
                                        {/* "my-loans" পেজে আমরা ডিটেইলস দেখাব, তাই আপাতত সেখানে রিডাইরেক্ট করছি */}
                                        <Link to="/dashboard/my-loans" className="btn btn-ghost btn-xs text-info">
                                            <FaEye /> View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-base-content/50">
                                    You haven't applied for any loans yet. <br/>
                                    <Link to="/all-loans" className="btn btn-link text-primary mt-2">Browse Loans</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRecentLoans;