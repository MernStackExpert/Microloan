import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaHome, FaUserTie, FaSearch, FaFilter } from 'react-icons/fa';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const AdminAllLoans = () => {
    const axiosSecure = useAxiosSecure();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    const fetchLoans = async () => {
        try {
            const res = await axiosSecure.get('/loans');
            setLoans(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, [axiosSecure]);

    const filteredLoans = loans.filter(loan => {
        const matchesSearch = loan.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              loan.managerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "all" || loan.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const uniqueCategories = [...new Set(loans.map(loan => loan.category))];

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/loans/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Loan has been deleted.", "success");
                        const remaining = loans.filter(loan => loan._id !== id);
                        setLoans(remaining);
                    }
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete loan.", "error");
                }
            }
        });
    };

    const handleToggleHome = async (id, currentStatus) => {
        try {
            const updatedLoans = loans.map(loan => 
                loan._id === id ? { ...loan, showOnHome: !currentStatus } : loan
            );
            setLoans(updatedLoans);

            const res = await axiosSecure.patch(`/loans/toggle-home/${id}`);
            if(res.data.modifiedCount > 0){
                toast.success(currentStatus ? "Removed from Home Page" : "Added to Home Page");
            }
        } catch (error) {
            toast.error("Failed to update status");
            fetchLoans();
        }
    };

    if (loading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full bg-base-100 shadow-xl rounded-2xl p-6 border border-base-200">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary">All System Loans</h2>
                    <p className="text-base-content/60">Manage all loans posted by managers.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search Title or Manager Email"
                            className="input input-bordered w-full pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    
                    <div className="relative w-full sm:w-48">
                        <select 
                            className="select select-bordered w-full pl-10"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {uniqueCategories.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-sm font-semibold opacity-70">Showing {filteredLoans.length} of {loans.length} loans</span>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full align-middle">
                    <thead className="bg-base-200 text-base-content text-sm uppercase">
                        <tr>
                            <th>#</th>
                            <th>Loan Info</th>
                            <th>Created By</th>
                            <th>Interest</th>
                            <th className="text-center">Show on Home</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {filteredLoans.length > 0 ? (
                            filteredLoans.map((loan, index) => (
                                <tr key={loan._id}>
                                    <th>{index + 1}</th>
                                    
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={loan.loanImage || loan.image} alt={loan.title} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{loan.title}</div>
                                                <div className="text-xs badge badge-ghost badge-sm">{loan.category}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaUserTie className="text-secondary"/>
                                            <span className="truncate w-32" title={loan.managerEmail}>
                                                {loan.managerEmail || "Unknown"}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="font-bold text-orange-500">
                                        {loan.interestRate}%
                                    </td>

                                    <td className="text-center">
                                        <label className="cursor-pointer label justify-center">
                                            <input 
                                                type="checkbox" 
                                                className="toggle toggle-success toggle-sm" 
                                                checked={loan.showOnHome || false}
                                                onChange={() => handleToggleHome(loan._id, loan.showOnHome)}
                                            />
                                        </label>
                                        <span className="text-[10px] opacity-60">
                                            {loan.showOnHome ? "Visible" : "Hidden"}
                                        </span>
                                    </td>

                                    <td className="text-center">
                                        <div className="flex justify-center gap-2">
                                            <Link 
                                                to={`/dashboard/update-loan/${loan._id}`}
                                                className="btn btn-sm btn-circle btn-ghost text-blue-600 tooltip"
                                                data-tip="Update Info"
                                            >
                                                <FaEdit className="w-5 h-5" />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(loan._id)}
                                                className="btn btn-sm btn-circle btn-ghost text-red-600 tooltip"
                                                data-tip="Delete Loan"
                                            >
                                                <FaTrash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500">
                                    No loans match your search criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAllLoans;