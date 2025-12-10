import React, { useContext, useEffect, useState } from "react";
import {
  FaHistory,
  FaCalendarAlt,
  FaCreditCard,
  FaSearch,
  FaMoneyBillWave,
} from "react-icons/fa";
import { AuthContext } from "../../../../Provider/AuthContext";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PageTitle from "../../../../Components/PageTitle";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments/${user.email}`)
        .then((res) => {
          setPayments(res.data);
          setFilteredPayments(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  useEffect(() => {
    const result = payments.filter(
      (payment) =>
        payment.transactionId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.loanTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayments(result);
  }, [searchTerm, payments]);

  if (loading) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full bg-base-100 shadow-xl rounded-2xl p-4 md:p-6 border border-base-200">
      <PageTitle title="Payment History" />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-primary/10 p-3 rounded-full hidden md:block">
            <FaHistory className="text-2xl text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Payment History
            </h2>
            <p className="text-sm md:text-base text-base-content/60">
              Track all your fee payments.
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search TrxID or Loan..."
            className="input input-bordered w-full pl-10 focus:input-primary rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full align-middle">
          <thead className="bg-base-200 text-base-content text-sm uppercase">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td className="font-mono text-xs font-bold text-secondary">
                    <div className="flex items-center gap-2">
                      <FaCreditCard /> {payment.transactionId}
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{payment.loanTitle}</div>
                    <div className="text-xs badge badge-ghost badge-sm">
                      {payment.category}
                    </div>
                  </td>
                  <td className="font-bold text-success text-lg">$10.00</td>
                  <td>
                    <div className="flex items-center gap-2 text-sm">
                      <FaCalendarAlt className="opacity-70" />
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleString()
                        : "N/A"}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <div
              key={payment._id}
              className="card bg-base-100 border border-base-200 shadow-sm p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <FaMoneyBillWave />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-base-content">
                      {payment.loanTitle}
                    </h3>
                    <p className="text-xs text-base-content/60">
                      {payment.category}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-lg text-success">$10.00</span>
              </div>

              <div className="bg-base-200/50 p-3 rounded-xl space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-base-content/60 text-xs uppercase font-bold">
                    Trx ID
                  </span>
                  <span className="font-mono text-secondary text-xs break-all">
                    {payment.transactionId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base-content/60 text-xs uppercase font-bold">
                    Date
                  </span>
                  <span className="text-xs">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-base-content/50 bg-base-100 rounded-xl border border-dashed border-base-300">
            No payment history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;