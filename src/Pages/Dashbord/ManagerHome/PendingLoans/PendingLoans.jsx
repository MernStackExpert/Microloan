import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PageTitle from "../../../../Components/PageTitle";

const PendingLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  // 1. Fetch Only Pending Applications
  useEffect(() => {
    const fetchPendingLoans = async () => {
      try {
        const res = await axiosSecure.get("/applications?status=pending");
        setApplications(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPendingLoans();
  }, [axiosSecure]);

  // 2. Handle Status Update (Approve/Reject)
  const handleStatusUpdate = (id, newStatus) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${newStatus} this loan application.`,
      icon: newStatus === "approved" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "approved" ? "#36D399" : "#F87272",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${newStatus} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/applications/status/${id}`, {
            status: newStatus,
          });

          if (res.data.modifiedCount > 0) {
            toast.success(`Application ${newStatus} successfully!`);
            // Remove the processed application from the list
            const remaining = applications.filter((app) => app._id !== id);
            setApplications(remaining);
          }
        } catch (error) {
          toast.error("Failed to update status");
        }
      }
    });
  };

  // 3. View Details Handler
  const handleViewDetails = (app) => {
    setSelectedApp(app);
    document.getElementById("application_details_modal").showModal();
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
      <PageTitle title="Pending Loans" />
      <h2 className="text-3xl font-bold text-primary mb-2">
        Pending Applications
      </h2>
      <p className="text-base-content/60 mb-6">
        Review and take action on loan requests.
      </p>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content text-sm uppercase">
            <tr>
              <th>#</th>
              <th>Applicant Info</th>
              <th>Loan Details</th>
              <th>Amount</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={app._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                          <span className="text-xs">
                            {app.applicantName?.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{app.applicantName}</div>
                        <div className="text-xs opacity-50">{app.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold">{app.loanTitle}</div>
                    <div className="badge badge-ghost badge-sm">
                      {app.category}
                    </div>
                  </td>
                  <td className="font-bold text-secondary">
                    ৳{app.loanAmount}
                  </td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(app)}
                        className="btn btn-sm btn-ghost text-blue-600 tooltip"
                        data-tip="View Details"
                      >
                        <FaEye className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, "approved")}
                        className="btn btn-sm btn-success text-white tooltip"
                        data-tip="Approve"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                        className="btn btn-sm btn-error text-white tooltip"
                        data-tip="Reject"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No pending applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden grid grid-cols-1 gap-4">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div
              key={app._id}
              className="card bg-base-100 border border-base-200 shadow-sm p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <FaUser className="text-primary" />
                  <div>
                    <h3 className="font-bold text-base">{app.applicantName}</h3>
                    <p className="text-xs text-base-content/60">{app.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-secondary">৳{app.loanAmount}</p>
                  <p className="text-xs text-base-content/60">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-base-200/50 p-2 rounded-lg mb-4">
                <p className="text-sm font-medium">{app.loanTitle}</p>
                <p className="text-xs opacity-70">{app.category}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleViewDetails(app)}
                  className="btn btn-sm btn-outline btn-ghost w-full"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleStatusUpdate(app._id, "approved")}
                  className="btn btn-sm btn-success text-white w-full"
                >
                  <FaCheck /> Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(app._id, "rejected")}
                  className="btn btn-sm btn-error text-white w-full"
                >
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No pending applications found.
          </div>
        )}
      </div>

      {/* Details Modal */}
      <dialog
        id="application_details_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-primary mb-4 border-b pb-2">
            Applicant Details
          </h3>
          {selectedApp && (
            <div className="space-y-3 text-sm md:text-base">
              <div className="grid grid-cols-2 gap-2">
                <p className="text-base-content/60">Applicant Name:</p>
                <p className="font-semibold text-right">
                  {selectedApp.applicantName}
                </p>

                <p className="text-base-content/60">Email:</p>
                <p className="font-semibold text-right truncate">
                  {selectedApp.email}
                </p>

                <p className="text-base-content/60">Phone:</p>
                <p className="font-semibold text-right">{selectedApp.phone}</p>

                <p className="text-base-content/60">Monthly Income:</p>
                <p className="font-semibold text-right">
                  ৳{selectedApp.monthlyIncome}
                </p>

                <p className="text-base-content/60">NID No:</p>
                <p className="font-semibold text-right">{selectedApp.nid}</p>

                <p className="text-base-content/60">Address :</p>
                <p className="font-semibold text-right">
                  {selectedApp.address}
                </p>
              </div>

              <div className="divider">Loan Request</div>

              <div className="grid grid-cols-2 gap-2">
                <p className="text-base-content/60">Loan Title:</p>
                <p className="font-semibold text-right">
                  {selectedApp.loanTitle}
                </p>

                <p className="text-base-content/60">Requested Amount:</p>
                <p className="font-bold text-secondary text-right">
                  ৳{selectedApp.loanAmount}
                </p>

                <p className="text-base-content/60">Duration:</p>
                <p className="font-semibold text-right">
                  {selectedApp.emiPlans || "N/A"}
                </p>
              </div>

              <div className="mt-4 bg-base-200 p-3 rounded-lg">
                <p className="text-xs font-bold text-base-content/50 uppercase mb-1">
                  Reason for Loan:
                </p>
                <p className="italic">"{selectedApp.reason}"</p>
              </div>
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

export default PendingLoans;
