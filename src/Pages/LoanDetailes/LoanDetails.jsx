import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import { FaCheckCircle, FaDollarSign, FaPercent, FaArrowLeft, FaMoneyCheckAlt } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/loans/${id}`);
        setLoan(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching loan details:", error);
        setLoading(false);
      }
    };
    fetchLoanData();
  }, [id]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => setRole(res.data?.role))
        .catch(err => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  const handleApply = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    navigate("/loan-application", { state: { loan } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (!loan) {
    return <div className="text-center mt-20 text-2xl text-error">Loan Not Found</div>;
  }

  const isDisabled = role === "admin" || role === "manager";

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        <Link to="/all-loans" className="btn btn-ghost mb-6 gap-2 hover:bg-base-300">
          <FaArrowLeft /> Back to All Loans
        </Link>

        <div className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden border border-base-300">
          
          <figure className="lg:w-1/2 relative h-96 lg:h-auto">
            <img
              src={loan.loanImage || loan.image}
              alt={loan.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
               <span className="badge badge-primary badge-lg p-4 font-bold shadow-lg">
                  {loan.category}
               </span>
            </div>
          </figure>

          <div className="card-body lg:w-1/2 p-8 lg:p-12">
            <h1 className="text-4xl font-extrabold text-base-content mb-4">
              {loan.title}
            </h1>
            
            <p className="text-base-content/70 text-lg leading-relaxed mb-8">
              {loan.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                <div className="flex items-center gap-3 mb-1">
                   <div className="p-2 bg-primary text-white rounded-lg">
                      <FaDollarSign />
                   </div>
                   <span className="text-sm font-semibold text-base-content/60">Max Loan Limit</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                   ৳{loan.maxLoanLimit}
                </p>
              </div>

              <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                <div className="flex items-center gap-3 mb-1">
                   <div className="p-2 bg-secondary text-white rounded-lg">
                      <FaPercent />
                   </div>
                   <span className="text-sm font-semibold text-base-content/60">Interest Rate</span>
                </div>
                <p className="text-2xl font-bold text-secondary">
                   {loan.interestRate}% <span className="text-sm font-normal text-base-content/60">/Year</span>
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <FaMoneyCheckAlt className="text-accent" /> Available EMI Plans
              </h3>
              <div className="flex flex-wrap gap-3">
                {loan.emiPlans && loan.emiPlans.length > 0 ? (
                  loan.emiPlans.map((plan, idx) => (
                    <span key={idx} className="badge badge-outline badge-lg p-4 font-medium hover:bg-base-200 cursor-pointer transition-colors">
                      {plan}
                    </span>
                  ))
                ) : (
                  <span className="text-base-content/60">No specific EMI plans listed.</span>
                )}
              </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Required Documents</h3>
                <ul className="space-y-2">
                    {loan.requirements && loan.requirements.length > 0 ? (
                        loan.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-base-content/80">
                                <FaCheckCircle className="text-success w-5 h-5" /> {req}
                            </li>
                        ))
                    ) : (
                         <li className="text-base-content/60">Contact for requirements.</li>
                    )}
                </ul>
            </div>

            <div className="card-actions justify-end mt-auto pt-6 border-t border-base-200">
              {isDisabled ? (
                <div className="tooltip" data-tip={`${role === 'admin' ? 'Admins' : 'Managers'} cannot apply for loans`}>
                  <button className="btn btn-disabled btn-lg w-full rounded-xl">
                    Apply Now (Restricted)
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleApply}
                  className="btn btn-primary btn-lg w-full rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
                >
                  Apply Now
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;