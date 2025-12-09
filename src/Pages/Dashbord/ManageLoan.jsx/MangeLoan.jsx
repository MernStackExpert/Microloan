import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaSearch, FaDollarSign, FaPercent, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthContext";
import PageTitle from "../../../Components/PageTitle";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosSecure.get("/loans");
        const allLoans = res.data;
        const myLoans = allLoans.filter((loan) => loan.managerEmail === user?.email);

        setLoans(myLoans);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (user?.email) {
      fetchLoans();
    }
  }, [axiosSecure, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/loans/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your loan has been deleted.", "success");
            const remaining = loans.filter((loan) => loan._id !== id);
            setLoans(remaining);
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete loan.", "error");
        }
      }
    });
  };

  const filteredLoans = loans.filter(
    (loan) =>
      loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full bg-base-100 shadow-xl rounded-2xl p-4 md:p-6 border border-base-200">
            <PageTitle title="Manage-Loan" />

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-primary">Manage Loans</h2>
          <p className="text-base-content/60 mt-1">
            You have posted total{" "}
            <span className="font-bold text-secondary">{loans.length}</span> loans.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Title or Category..."
            className="input input-bordered w-full pl-10 focus:input-primary"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="table">
          <thead className="bg-base-200 text-base-content text-sm uppercase">
            <tr>
              <th>#</th>
              <th>Loan Info</th>
              <th>Category</th>
              <th>Interest Rate</th>
              <th>Max Limit</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan, index) => (
                <tr key={loan._id} className="hover:bg-base-50 transition-colors">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={loan.loanImage || loan.image} alt={loan.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{loan.title}</div>
                        <div className="text-sm opacity-50">
                          Added: {new Date(loan.createdAt || Date.now()).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline font-medium">{loan.category}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 font-bold text-orange-500">
                      <FaPercent className="text-xs" /> {loan.interestRate}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 font-bold text-success">
                      <FaDollarSign /> {loan.maxLoanLimit}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/loan-details/${loan._id}`}
                        className="btn btn-sm btn-circle btn-ghost text-green-600 hover:bg-green-100 tooltip"
                        data-tip="Details"
                      >
                        <FaEye className="w-5 h-5" />
                      </Link>
                      <Link
                        to={`/dashboard/update-loan/${loan._id}`}
                        className="btn btn-sm btn-circle btn-ghost text-blue-600 hover:bg-blue-100 tooltip"
                        data-tip="Update"
                      >
                        <FaEdit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(loan._id)}
                        className="btn btn-sm btn-circle btn-ghost text-red-600 hover:bg-red-100 tooltip"
                        data-tip="Delete"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500 text-lg">
                  No loans found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:hidden">
        {filteredLoans.length > 0 ? (
          filteredLoans.map((loan) => (
            <div key={loan._id} className="card bg-base-100 shadow-md border border-base-200">
              <figure className="px-4 pt-4">
                <img
                  src={loan.loanImage || loan.image}
                  alt={loan.title}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-primary">
                  {loan.title}
                  <div className="badge badge-secondary badge-sm">{loan.category}</div>
                </h2>
                <div className="flex justify-between items-center mt-2 text-sm text-base-content/70">
                  <div className="flex items-center gap-1">
                    <FaPercent className="text-orange-500" /> Rate: {loan.interestRate}%
                  </div>
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="text-green-500" /> Max: {loan.maxLoanLimit}
                  </div>
                </div>
                <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                   <Link
                    to={`/loan-details/${loan._id}`}
                    className="btn btn-sm btn-circle btn-ghost text-green-600"
                  >
                    <FaEye className="w-5 h-5" />
                  </Link>
                  <Link
                    to={`/dashboard/update-loan/${loan._id}`}
                    className="btn btn-sm btn-circle btn-ghost text-blue-600"
                  >
                    <FaEdit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(loan._id)}
                    className="btn btn-sm btn-circle btn-ghost text-red-600"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 text-lg">
            No loans found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLoans;