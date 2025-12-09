import React, { useEffect, useState } from 'react';
import { FaEye, FaFilter, FaSearch, FaFileInvoiceDollar, FaUser, FaCheck, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import PageTitle from '../../../../Components/PageTitle';

const LoanApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [applications, setApplications] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState(null);

    const fetchApplications = async () => {
        try {
            const res = await axiosSecure.get('/applications');
            setApplications(res.data);
            setFilteredApps(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [axiosSecure]);

    useEffect(() => {
        let result = applications;

        if (filterStatus !== 'all') {
            result = result.filter(app => app.status === filterStatus);
        }

        if (searchTerm) {
            result = result.filter(app => 
                app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                app.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredApps(result);
    }, [filterStatus, searchTerm, applications]);

    const handleViewDetails = (app) => {
        setSelectedApp(app);
        document.getElementById('admin_app_details_modal').showModal();
    };

    const handleStatusUpdate = (id, newStatus) => {
        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to ${newStatus} this application.`,
            icon: newStatus === 'approved' ? 'success' : 'warning',
            showCancelButton: true,
            confirmButtonColor: newStatus === 'approved' ? '#36D399' : '#F87272',
            cancelButtonColor: '#3085d6',
            confirmButtonText: `Yes, ${newStatus} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/applications/status/${id}`, { status: newStatus });
                    
                    if (res.data.modifiedCount > 0) {
                        toast.success(`Application ${newStatus} successfully!`);
                        fetchApplications();
                    }
                } catch (error) {
                    toast.error("Failed to update status");
                }
            }
        });
    };

    if (loading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full bg-base-100 shadow-xl rounded-2xl p-4 md:p-6 border border-base-200">

            <PageTitle title="Loan Application" />
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="w-full md:w-auto">
                    <h2 className="text-3xl font-bold text-primary">Loan Applications</h2>
                    <p className="text-base-content/60">Monitor and manage all loan requests.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <input 
                            type="text" 
                            placeholder="Search Name or Email..." 
                            className="input input-bordered w-full pl-10 focus:input-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>

                    <div className="relative w-full sm:w-48">
                        <select 
                            className="select select-bordered w-full pl-10 focus:select-primary"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="hidden lg:block overflow-x-auto">
                <table className="table table-zebra w-full align-middle">
                    <thead className="bg-base-200 text-base-content text-sm uppercase">
                        <tr>
                            <th>Loan ID</th>
                            <th>Applicant</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApps.length > 0 ? (
                            filteredApps.map((app) => (
                                <tr key={app._id}>
                                    <td className="font-mono text-xs opacity-70">
                                        {app._id.slice(-6).toUpperCase()}...
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-neutral text-neutral-content rounded-full w-8">
                                                    <span className="text-xs"><FaUser /></span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{app.applicantName}</div>
                                                <div className="text-xs opacity-50">{app.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><div className="badge badge-ghost badge-sm">{app.category}</div></td>
                                    <td className="font-bold text-secondary">৳{app.loanAmount}</td>
                                    <td>
                                        <div className={`badge text-white ${
                                            app.status === 'pending' ? 'badge-warning' :
                                            app.status === 'approved' ? 'badge-success' : 'badge-error'
                                        }`}>
                                            {app.status}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => handleViewDetails(app)}
                                                className="btn btn-sm btn-ghost text-blue-600 tooltip"
                                                data-tip="View Details"
                                            >
                                                <FaEye className="w-5 h-5" />
                                            </button>
                                            
                                            {app.status === 'pending' && (
                                                <>
                                                    <button 
                                                        onClick={() => handleStatusUpdate(app._id, 'approved')}
                                                        className="btn btn-sm btn-success text-white tooltip"
                                                        data-tip="Approve"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                        className="btn btn-sm btn-error text-white tooltip"
                                                        data-tip="Reject"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:hidden">
                {filteredApps.length > 0 ? (
                    filteredApps.map((app) => (
                        <div key={app._id} className="card bg-base-100 border border-base-200 shadow-sm p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="bg-neutral/10 p-2 rounded-full text-neutral"><FaUser /></div>
                                    <div>
                                        <h3 className="font-bold text-base">{app.applicantName}</h3>
                                        <p className="text-xs text-base-content/60">{app.email}</p>
                                    </div>
                                </div>
                                <div className={`badge text-white text-xs ${
                                    app.status === 'pending' ? 'badge-warning' :
                                    app.status === 'approved' ? 'badge-success' : 'badge-error'
                                }`}>
                                    {app.status}
                                </div>
                            </div>
                            
                            <div className="bg-base-200/50 p-3 rounded-lg mb-3 space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="opacity-70">Category:</span>
                                    <span className="font-medium">{app.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-70">Amount:</span>
                                    <span className="font-bold text-secondary">৳{app.loanAmount}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => handleViewDetails(app)}
                                    className="btn btn-sm btn-outline btn-primary w-full"
                                >
                                    <FaEye />
                                </button>
                                {app.status === 'pending' ? (
                                    <>
                                        <button 
                                            onClick={() => handleStatusUpdate(app._id, 'approved')}
                                            className="btn btn-sm btn-success text-white w-full"
                                        >
                                            <FaCheck />
                                        </button>
                                        <button 
                                            onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                            className="btn btn-sm btn-error text-white w-full"
                                        >
                                            <FaTimes />
                                        </button>
                                    </>
                                ) : (
                                    <div className="col-span-2 flex items-center justify-center text-xs opacity-50 bg-base-200 rounded">
                                        Action Taken
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        No applications found.
                    </div>
                )}
            </div>

            <dialog id="admin_app_details_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-2xl text-primary mb-4 flex items-center gap-2 border-b pb-2">
                        <FaFileInvoiceDollar /> Full Application Details
                    </h3>
                    {selectedApp && (
                        <div className="space-y-4 text-sm md:text-base">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-base-200 p-4 rounded-xl">
                                    <h4 className="font-bold text-lg mb-3">Loan Information</h4>
                                    <div className="space-y-2">
                                        <p className="flex justify-between"><span>Title:</span> <span className="font-medium">{selectedApp.loanTitle}</span></p>
                                        <p className="flex justify-between"><span>Category:</span> <span className="font-medium">{selectedApp.category}</span></p>
                                        <p className="flex justify-between"><span>Amount:</span> <span className="font-bold text-secondary">৳{selectedApp.loanAmount}</span></p>
                                        <p className="flex justify-between"><span>Interest:</span> <span className="font-medium">{selectedApp.interestRate}%</span></p>
                                        <p className="flex justify-between"><span>EMI Plan:</span> <span className="font-medium">{selectedApp.emiPlans || "N/A"}</span></p>
                                        <p className="flex justify-between"><span>Applied Date:</span> <span className="font-medium">{new Date(selectedApp.createdAt).toLocaleDateString()}</span></p>
                                    </div>
                                </div>

                                <div className="bg-base-200 p-4 rounded-xl">
                                    <h4 className="font-bold text-lg mb-3">Applicant Information</h4>
                                    <div className="space-y-2">
                                        <p className="flex justify-between"><span>Name:</span> <span className="font-medium">{selectedApp.applicantName}</span></p>
                                        <p className="flex justify-between"><span>Email:</span> <span className="font-medium truncate w-32 text-right" title={selectedApp.email}>{selectedApp.email}</span></p>
                                        <p className="flex justify-between"><span>Phone:</span> <span className="font-medium">{selectedApp.phone}</span></p>
                                        <p className="flex justify-between"><span>NID/Passport:</span> <span className="font-medium text-info">{selectedApp.nid}</span></p>
                                        <p className="flex justify-between"><span>Income:</span> <span className="font-medium">৳{selectedApp.monthlyIncome} ({selectedApp.incomeSource})</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-base-200 p-4 rounded-xl">
                                <h4 className="font-bold text-lg mb-2">Address & Reason</h4>
                                <p className="mb-2"><span className="opacity-70 font-semibold">Address:</span> {selectedApp.address}</p>
                                <p><span className="opacity-70 font-semibold">Reason for Loan:</span> <span className="italic">"{selectedApp.reason}"</span></p>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-neutral">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default LoanApplications;