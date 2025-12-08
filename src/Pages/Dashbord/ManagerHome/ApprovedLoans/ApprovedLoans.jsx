import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEye,
  FaCheckCircle,
  FaMoneyBillWave,
  FaCalendarCheck,
} from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ApprovedLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    const fetchApprovedLoans = async () => {
      try {
        const res = await axiosSecure.get("/applications?status=approved");
        setApplications(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchApprovedLoans();
  }, [axiosSecure]);

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    document.getElementById("approved_details_modal").showModal();
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
      <div className="flex items-center gap-3 mb-6">
        <FaCheckCircle className="text-3xl text-success" />
        <div>
          <h2 className="text-3xl font-bold text-primary">
            Approved Applications
          </h2>
          <p className="text-base-content/60">List of all sanctioned loans.</p>
        </div>
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base-content text-sm uppercase">
            <tr>
              <th>#</th>
              <th>Applicant Info</th>
              <th>Loan Details</th>
              <th>Amount</th>
              <th>Approved Date</th>
              <th className="text-center">Action</th>
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
                        <div className="bg-success text-white rounded-full w-10">
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
                    <div className="badge badge-outline badge-sm">
                      {app.category}
                    </div>
                  </td>
                  <td className="font-bold text-secondary">
                    ৳{app.loanAmount}
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm">
                      <FaCalendarCheck className="text-success" />
                      {app.approvedAt
                        ? new Date(app.approvedAt).toLocaleDateString()
                        : new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleViewDetails(app)}
                      className="btn btn-sm btn-ghost text-blue-600 tooltip"
                      data-tip="View Details"
                    >
                      <FaEye className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No approved applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden grid grid-cols-1 gap-4">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div
              key={app._id}
              className="card bg-base-100 border border-success/30 shadow-sm p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-success/10 rounded-full text-success">
                    <FaUser />
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{app.applicantName}</h3>
                    <p className="text-xs text-base-content/60">{app.email}</p>
                  </div>
                </div>
                <div className="badge badge-success text-white text-xs">
                  Approved
                </div>
              </div>

              <div className="bg-base-200/50 p-3 rounded-lg mb-3 space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs opacity-70">Loan:</span>
                  <span className="text-xs font-bold">{app.loanTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs opacity-70">Amount:</span>
                  <span className="text-xs font-bold text-secondary">
                    ৳{app.loanAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs opacity-70">Date:</span>
                  <span className="text-xs">
                    {app.approvedAt
                      ? new Date(app.approvedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleViewDetails(app)}
                className="btn btn-sm btn-outline btn-success w-full"
              >
                <FaEye /> View Details
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No approved applications found.
          </div>
        )}
      </div>

      <dialog
        id="approved_details_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-success mb-4 flex items-center gap-2">
            <FaCheckCircle /> Loan Approved
          </h3>
          {selectedApp && (
            <div className="space-y-4 text-sm md:text-base">
              <div className="grid grid-cols-2 gap-2 border-b pb-4">
                <p className="text-base-content/60">Applicant:</p>
                <p className="font-semibold text-right">
                  {selectedApp.applicantName}
                </p>
                <p className="text-base-content/60">Email:</p>
                <p className="font-semibold text-right truncate">
                  {selectedApp.email}
                </p>
                <p className="text-base-content/60">Phone:</p>
                <p className="font-semibold text-right">{selectedApp.phone}</p>

                <p className="text-base-content/60">NID No:</p>
                <p className="font-semibold text-right">{selectedApp.nid}</p>

                <p className="text-base-content/60">Address :</p>
                <p className="font-semibold text-right">
                  {selectedApp.address}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <p className="text-base-content/60">Loan Title:</p>
                <p className="font-semibold text-right">
                  {selectedApp.loanTitle}
                </p>
                <p className="text-base-content/60">Amount:</p>
                <p className="font-bold text-secondary text-right text-lg">
                  ৳{selectedApp.loanAmount}
                </p>
                <p className="text-base-content/60">Approved Date:</p>
                <p className="font-semibold text-right text-success">
                  {selectedApp.approvedAt
                    ? new Date(selectedApp.approvedAt).toDateString()
                    : "N/A"}
                </p>
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

export default ApprovedLoans;
