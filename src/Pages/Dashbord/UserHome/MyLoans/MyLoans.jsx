import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FaEye,
  FaTrashAlt,
  FaCreditCard,
  FaCheckCircle,
  FaHourglassStart,
  FaTimesCircle,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { AuthContext } from "../../../../Provider/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import PageTitle from "../../../../Components/PageTitle";

const MyLoans = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const calculateTimeLeft = (createdAt) => {
    const creationTime = new Date(createdAt).getTime();
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    const deadline = creationTime + threeDaysInMs;
    const now = new Date().getTime();
    const difference = deadline - now;

    if (difference <= 0) return null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h left`;
  };

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/applications/${user.email}`)
        .then(async (res) => {
          const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
          const now = new Date().getTime();
          
          const validApps = [];
          const deletePromises = [];

          res.data.forEach(app => {
            if (app.status === 'rejected') {
              const creationTime = new Date(app.createdAt).getTime();
              if (now - creationTime > threeDaysInMs) {
                deletePromises.push(axiosSecure.delete(`/applications/${app._id}`));
              } else {
                validApps.push(app);
              }
            } else {
              validApps.push(app);
            }
          });

          await Promise.all(deletePromises);

          const sortedApps = validApps.sort((a, b) => {
            if (a.status === 'rejected' && b.status !== 'rejected') return 1;
            if (a.status !== 'rejected' && b.status === 'rejected') return -1;
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          setApplications(sortedApps);
          setFilteredApps(sortedApps);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    let result = applications;

    if (filterStatus !== "all") {
      result = result.filter((app) => app.status === filterStatus);
    }

    if (searchTerm) {
      result = result.filter((app) =>
        app.loanTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApps(result);
  }, [filterStatus, searchTerm, applications]);

  const handleDelete = (id, status) => {
    const actionText = status === "pending" ? "Cancel" : "Delete";
    
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${actionText.toLowerCase()} this application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${actionText} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/applications/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                `${actionText}ed!`,
                `Application has been ${actionText.toLowerCase()}ed.`,
                "success"
              );
              const remaining = applications.filter((app) => app._id !== id);
              setApplications(remaining);
            }
          })
          .catch((err) => Swal.fire("Error", "Failed to remove", "error"));
      }
    });
  };

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    document.getElementById("loan_details_modal").showModal();
  };

  const handlePay = (app) => {
    navigate("/dashboard/payment", { state: { application: app } });
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full bg-base-100 shadow-xl rounded-2xl p-4 md:p-6 border border-base-200">
      <PageTitle title="My-Loans" />
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-primary">My Loan Applications</h2>
          <p className="text-base-content/60">Track your current requests.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by Loan Title..."
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

      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
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
          <tbody>
            {filteredApps.length > 0 ? (
              filteredApps.map((app, index) => (
                <tr key={app._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">
                      {app.loanTitle || "Loan Name"}
                    </div>
                    <div className="text-xs opacity-50">
                      {app.category || "Category"}
                    </div>
                  </td>
                  <td className="font-semibold text-secondary">
                    ৳{app.loanAmount}
                  </td>
                  <td>
                    {app.status === "pending" && (
                      <span className="badge badge-warning gap-1">
                        <FaHourglassStart /> Pending
                      </span>
                    )}
                    {app.status === "approved" && (
                      <span className="badge badge-success gap-1 text-white">
                        <FaCheckCircle /> Approved
                      </span>
                    )}
                    {app.status === "rejected" && (
                      <span className="badge badge-error gap-1 text-white">
                        <FaTimesCircle /> Rejected
                      </span>
                    )}
                  </td>
                  <td>
                    {app.feeStatus === "paid" ? (
                      <span className="badge badge-outline badge-success font-bold">
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePay(app)}
                        className="btn btn-xs btn-outline btn-accent gap-1"
                        disabled={app.status === "rejected"} 
                      >
                        <FaCreditCard /> Pay Fee
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(app)}
                        className="btn btn-sm btn-circle btn-ghost text-blue-600 tooltip"
                        data-tip="View Details"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>
                      
                      {app.status === "pending" && (
                        <button
                          onClick={() => handleDelete(app._id, "pending")}
                          className="btn btn-sm btn-circle btn-ghost text-red-600 tooltip"
                          data-tip="Cancel Application"
                        >
                          <FaTrashAlt className="w-5 h-5" />
                        </button>
                      )}

                      {app.status === "rejected" && (
                        <button
                          onClick={() => handleDelete(app._id, "rejected")}
                          className="btn btn-sm btn-error text-white tooltip w-32"
                          data-tip="Auto delete in 3 days"
                        >
                           {calculateTimeLeft(app.createdAt)} <FaTrashAlt className="ml-1 w-3 h-3" />
                        </button>
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

      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <div
              key={app._id}
              className="card bg-base-100 border border-base-200 shadow-sm p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-primary">
                    {app.loanTitle}
                  </h3>
                  <p className="text-xs text-base-content/60">{app.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary">৳{app.loanAmount}</p>
                  <p className="text-xs text-base-content/60">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center my-3">
                <div>
                  {app.status === "pending" && (
                    <span className="badge badge-warning gap-1 text-xs">
                      <FaHourglassStart /> Pending
                    </span>
                  )}
                  {app.status === "approved" && (
                    <span className="badge badge-success gap-1 text-white text-xs">
                      <FaCheckCircle /> Approved
                    </span>
                  )}
                  {app.status === "rejected" && (
                    <span className="badge badge-error gap-1 text-white text-xs">
                      <FaTimesCircle /> Rejected
                    </span>
                  )}
                </div>
                <div>
                  {app.feeStatus === "paid" ? (
                    <span className="badge badge-outline badge-success text-xs font-bold">
                      Fee Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePay(app)}
                      className="btn btn-xs btn-outline btn-accent gap-1"
                      disabled={app.status === "rejected"}
                    >
                      <FaCreditCard /> Pay Fee
                    </button>
                  )}
                </div>
              </div>

              <div className="divider my-1"></div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleViewDetails(app)}
                  className="btn btn-sm btn-ghost text-blue-600 gap-1"
                >
                  <FaEye /> Details
                </button>
                
                {app.status === "pending" && (
                  <button
                    onClick={() => handleDelete(app._id, "pending")}
                    className="btn btn-sm btn-ghost text-red-600 gap-1"
                  >
                    <FaTrashAlt /> Cancel
                  </button>
                )}

                {app.status === "rejected" && (
                  <button
                    onClick={() => handleDelete(app._id, "rejected")}
                    className="btn btn-sm btn-error text-white gap-1"
                  >
                    {calculateTimeLeft(app.createdAt)} <FaTrashAlt />
                  </button>
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

      <dialog
        id="loan_details_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-primary mb-4">
            Application Details
          </h3>
          {selectedLoan && (
            <div className="space-y-3">
              <p>
                <strong>Loan ID:</strong>{" "}
                <span className="opacity-70">{selectedLoan._id}</span>
              </p>
              <p>
                <strong>Title:</strong>{" "}
                <span className="opacity-70">{selectedLoan.loanTitle}</span>
              </p>
              <p>
                <strong>Category:</strong>{" "}
                <span className="opacity-70">{selectedLoan.category}</span>
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                <span className="text-secondary font-bold">
                  ৳{selectedLoan.loanAmount}
                </span>
              </p>
              <p>
                <strong>Applied Date:</strong>{" "}
                <span className="opacity-70">
                  {new Date(selectedLoan.createdAt).toLocaleDateString()}
                </span>
              </p>
              <div className="divider">Applicant Info</div>
              <p>
                <strong>Name:</strong> {selectedLoan.applicantName}
              </p>
              <p>
                <strong>Email:</strong> {selectedLoan.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedLoan.phone}
              </p>
              <p>
                <strong>Address:</strong> {selectedLoan.address}
              </p>
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