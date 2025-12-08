import React, { useEffect, useState } from 'react';
import { FaEye, FaFilter, FaSearch, FaFileInvoiceDollar, FaUser } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const LoanApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [applications, setApplications] = useState([]);
    const [filteredApps, setFilteredApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedApp, setSelectedApp] = useState(null);

    // 1. Fetch All Applications
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                // Admin can see ALL applications
                const res = await axiosSecure.get('/applications'); 
                setApplications(res.data);
                setFilteredApps(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchApplications();
    }, [axiosSecure]);

    // 2. Handle Filter Logic
    useEffect(() => {
        if (filterStatus === 'all') {
            setFilteredApps(applications);
        } else {
            const filtered = applications.filter(app => app.status === filterStatus);
            setFilteredApps(filtered);
        }
    }, [filterStatus, applications]);

    // 3. View Details Modal
    const handleViewDetails = (app) => {
        setSelectedApp(app);
        document.getElementById('admin_app_details_modal').showModal();
    };

    if (loading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full bg-base-100 shadow-xl rounded-2xl p-6 border border-base-200">
            
            {/* Header & Filter Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary">Loan Applications</h2>
                    <p className="text-base-content/60">Monitor all loan requests from users.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
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
                    <div className="badge badge-lg badge-primary badge-outline">
                        Total: {filteredApps.length}
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full align-middle">
                    {/* Head */}
                    <thead className="bg-base-200 text-base-content text-sm uppercase">
                        <tr>
                            <th>Loan ID</th>
                            <th>Applicant</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    
                    {/* Body */}
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

                                    <td>
                                        <div className="badge badge-ghost badge-sm">{app.category}</div>
                                    </td>

                                    <td className="font-bold text-secondary">
                                        ৳{app.loanAmount}
                                    </td>

                                    <td>
                                        <div className={`badge text-white ${
                                            app.status === 'pending' ? 'badge-warning' :
                                            app.status === 'approved' ? 'badge-success' : 'badge-error'
                                        }`}>
                                            {app.status}
                                        </div>
                                    </td>

                                    <td className="text-center">
                                        <button 
                                            onClick={() => handleViewDetails(app)}
                                            className="btn btn-sm btn-ghost text-blue-600 tooltip"
                                            data-tip="View Full Details"
                                        >
                                            <FaEye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No applications found for this filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for View Details */}
            <dialog id="admin_app_details_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-primary mb-4 flex items-center gap-2">
                        <FaFileInvoiceDollar /> Application Details
                    </h3>
                    {selectedApp && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-base-200 p-3 rounded-lg grid grid-cols-2 gap-2">
                                <span className="opacity-60">Status:</span>
                                <span className={`font-bold uppercase ${
                                    selectedApp.status === 'approved' ? 'text-success' : 
                                    selectedApp.status === 'rejected' ? 'text-error' : 'text-warning'
                                }`}>{selectedApp.status}</span>
                                
                                <span className="opacity-60">Applied Date:</span>
                                <span>{new Date(selectedApp.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div className="divider">Loan Info</div>
                            <p><strong>Title:</strong> {selectedApp.loanTitle}</p>
                            <p><strong>Category:</strong> {selectedApp.category}</p>
                            <p><strong>Amount:</strong> <span className="text-lg font-bold text-secondary">৳{selectedApp.loanAmount}</span></p>
                            <p><strong>Term:</strong> {selectedApp.emiPlans || "N/A"}</p>

                            <div className="divider">Applicant Info</div>
                            <p><strong>Name:</strong> {selectedApp.applicantName}</p>
                            <p><strong>Email:</strong> {selectedApp.email}</p>
                            <p><strong>Phone:</strong> {selectedApp.phone}</p>
                            <p><strong>Income Source:</strong> {selectedApp.incomeSource} (৳{selectedApp.monthlyIncome}/mo)</p>
                            <p><strong>Address:</strong> {selectedApp.address}</p>
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

export default LoanApplications;