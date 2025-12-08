import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaEye, FaTrashAlt, FaCreditCard, FaCheckCircle, FaHourglassStart, FaTimesCircle } from 'react-icons/fa';
import { AuthContext } from '../../../../Provider/AuthContext';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const MyLoans = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLoan, setSelectedLoan] = useState(null); // ফর মডাল

    // 1. Fetch Data
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/applications/${user.email}`)
                .then(res => {
                    setApplications(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email, axiosSecure]);

    // 2. Handle Cancel Application
    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to cancel this application?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/applications/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Cancelled!', 'Your application has been cancelled.', 'success');
                            const remaining = applications.filter(app => app._id !== id);
                            setApplications(remaining);
                        }
                    })
                    .catch(err => Swal.fire('Error', 'Failed to cancel', 'error'));
            }
        });
    };

    // 3. Handle View Modal
    const handleViewDetails = (loan) => {
        setSelectedLoan(loan);
        document.getElementById('loan_details_modal').showModal();
    };

    if (loading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full bg-base-100 shadow-xl rounded-2xl p-6 border border-base-200">
            <h2 className="text-3xl font-bold text-primary mb-6">My Loan Applications</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* Head */}
                    <thead className="bg-base-200 text-base-content text-sm uppercase">
                        <tr>
                            <th>#</th>
                            <th>Loan Info</th>
                            <th>Amount Request</th>
                            <th>Status</th>
                            <th>Fee Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Body */}
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((app, index) => (
                                <tr key={app._id}>
                                    <th>{index + 1}</th>
                                    
                                    <td>
                                        <div className="font-bold">{app.loanTitle || "Loan Name"}</div>
                                        <div className="text-xs opacity-50">{app.category || "Category"}</div>
                                    </td>
                                    
                                    <td className="font-semibold text-secondary">৳{app.loanAmount}</td>
                                    
                                    <td>
                                        {app.status === 'pending' && <span className="badge badge-warning gap-1"><FaHourglassStart/> Pending</span>}
                                        {app.status === 'approved' && <span className="badge badge-success gap-1 text-white"><FaCheckCircle/> Approved</span>}
                                        {app.status === 'rejected' && <span className="badge badge-error gap-1 text-white"><FaTimesCircle/> Rejected</span>}
                                    </td>

                                    <td>
                                        {/* Challenge Requirement: Show Button if Unpaid, Badge if Paid */}
                                        {/* আপাতত ডিফল্ট 'unpaid' ধরে নিচ্ছি, পরে পেমেন্ট গেটওয়ে অ্যাড হলে এটা আপডেট হবে */}
                                        {app.feeStatus === 'paid' ? (
                                            <span className="badge badge-outline badge-success font-bold">Paid</span>
                                        ) : (
                                            <button className="btn btn-xs btn-outline btn-accent gap-1">
                                                <FaCreditCard /> Pay Fee
                                            </button>
                                        )}
                                    </td>

                                    <td className="text-center">
                                        <div className="flex justify-center gap-2">
                                            {/* View Button */}
                                            <button 
                                                onClick={() => handleViewDetails(app)}
                                                className="btn btn-sm btn-circle btn-ghost text-blue-600 tooltip"
                                                data-tip="View Details"
                                            >
                                                <FaEye className="w-5 h-5" />
                                            </button>

                                            {/* Cancel Button - Only visible if Pending */}
                                            {app.status === 'pending' && (
                                                <button 
                                                    onClick={() => handleCancel(app._id)}
                                                    className="btn btn-sm btn-circle btn-ghost text-red-600 tooltip"
                                                    data-tip="Cancel Application"
                                                >
                                                    <FaTrashAlt className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    You have no loan applications yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for View Details */}
            <dialog id="loan_details_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-primary mb-4">Application Details</h3>
                    {selectedLoan && (
                        <div className="space-y-3">
                            <p><strong>Loan ID:</strong> <span className="opacity-70">{selectedLoan._id}</span></p>
                            <p><strong>Title:</strong> <span className="opacity-70">{selectedLoan.loanTitle}</span></p>
                            <p><strong>Category:</strong> <span className="opacity-70">{selectedLoan.category}</span></p>
                            <p><strong>Amount:</strong> <span className="text-secondary font-bold">৳{selectedLoan.loanAmount}</span></p>
                            <p><strong>Applied Date:</strong> <span className="opacity-70">{new Date(selectedLoan.createdAt).toLocaleDateString()}</span></p>
                            <div className="divider">Applicant Info</div>
                            <p><strong>Name:</strong> {selectedLoan.applicantName}</p>
                            <p><strong>Email:</strong> {selectedLoan.email}</p>
                            <p><strong>Phone:</strong> {selectedLoan.phone}</p>
                            <p><strong>Address:</strong> {selectedLoan.address}</p>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default MyLoans;