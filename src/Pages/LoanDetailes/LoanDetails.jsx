import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { FaCheckCircle, FaDollarSign, FaPercent, FaArrowLeft, FaMoneyCheckAlt, FaInfoCircle, FaThList } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PageTitle from "../../Components/PageTitle";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [loan, setLoan] = useState(null);
  const [relatedLoans, setRelatedLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchLoanData = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/loans/${id}`);
        setLoan(res.data);
        
        // Related Loans Fetching (Requirement 4.4)
        const allLoansRes = await axiosSecure.get('/loans');
        const filtered = allLoansRes.data.filter(l => l.category === res.data.category && l._id !== id);
        setRelatedLoans(filtered.slice(0, 3));
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching loan details:", error);
        setLoading(false);
      }
    };
    fetchLoanData();
  }, [id, axiosSecure]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => setRole(res.data?.role))
        .catch(err => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  const handleApply = () => {
    if (!user) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }
    navigate("/loan-application", { state: { loan } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  const isDisabled = role === "admin" || role === "manager";

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <PageTitle title={loan?.title || "Loan Details"} />

      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6 gap-2 hover:bg-base-300 transition-all">
          <FaArrowLeft /> Back to All Loans
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area (Requirement 4.2.1 & 4.2.2) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Section */}
            <div className="card bg-base-100 shadow-xl overflow-hidden rounded-3xl border border-base-300">
              <figure className="h-[400px] relative">
                <img src={loan.loanImage || loan.image} alt={loan.title} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6">
                  <span className="badge badge-primary badge-lg p-5 font-bold uppercase tracking-wider shadow-2xl">
                    {loan.category}
                  </span>
                </div>
              </figure>
              
              <div className="p-8 lg:p-10">
                <h1 className="text-4xl font-black text-base-content mb-6 leading-tight">{loan.title}</h1>
                
                {/* Description Section (Requirement 4.2.1) */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2 text-primary">
                    <FaInfoCircle /> Overview
                  </h3>
                  <p className="text-base-content/70 text-lg leading-relaxed text-justify">
                    {loan.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications Section (Requirement 4.2.2) */}
            <div className="card bg-base-100 shadow-xl p-8 lg:p-10 rounded-3xl border border-base-300">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-secondary">
                <FaThList /> Key Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4 p-5 bg-base-200 rounded-2xl">
                  <div className="p-3 bg-primary text-white rounded-xl shadow-lg"><FaDollarSign className="text-xl"/></div>
                  <div>
                    <p className="text-sm font-bold text-base-content/50 uppercase">Max Amount</p>
                    <p className="text-2xl font-black text-base-content">৳{loan.maxLoanLimit}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-base-200 rounded-2xl">
                  <div className="p-3 bg-secondary text-white rounded-xl shadow-lg"><FaPercent className="text-xl"/></div>
                  <div>
                    <p className="text-sm font-bold text-base-content/50 uppercase">Interest Rate</p>
                    <p className="text-2xl font-black text-base-content">{loan.interestRate}% <span className="text-sm font-normal">/Year</span></p>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><FaMoneyCheckAlt className="text-accent" /> EMI Plans</h4>
                  <div className="flex flex-wrap gap-2">
                    {loan.emiPlans?.map((plan, i) => (
                      <div key={i} className="badge badge-outline badge-lg p-4 font-semibold">{plan}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-success"><FaCheckCircle /> Documents</h4>
                  <ul className="space-y-2">
                    {loan.requirements?.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-base-content/80 text-sm font-medium italic">
                         — {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area (Apply & Related Loans) */}
          <div className="space-y-8">
            {/* Apply Card */}
            <div className="card bg-base-100 shadow-2xl p-8 rounded-3xl border-t-8 border-primary sticky top-24">
              <h3 className="text-2xl font-bold mb-2">Need this loan?</h3>
              <p className="text-sm text-base-content/60 mb-8">Quick approval within 24 hours.</p>
              
              {isDisabled ? (
                <div className="tooltip w-full" data-tip="Admin/Managers cannot apply">
                  <button className="btn btn-disabled btn-lg w-full rounded-2xl">Application Restricted</button>
                </div>
              ) : (
                <button onClick={handleApply} className="btn btn-primary btn-lg w-full rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all font-black text-white">
                  APPLY NOW
                </button>
              )}
              <div className="mt-6 p-4 bg-info/10 rounded-xl border border-info/20 text-xs italic">
                * Terms and conditions apply based on your bank statement and credit history.
              </div>
            </div>

            {/* Related Loans Section (Requirement 4.4) */}
            {relatedLoans.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold px-2">Related {loan.category}s</h3>
                <div className="space-y-4">
                  {relatedLoans.map(rel => (
                    <Link key={rel._id} to={`/loan-details/${rel._id}`} className="card card-side bg-base-100 shadow-md hover:shadow-xl transition-all border border-base-300 h-24 overflow-hidden group">
                      <figure className="w-24 shrink-0">
                        <img src={rel.loanImage || rel.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                      </figure>
                      <div className="card-body p-3 justify-center">
                        <h4 className="font-bold text-sm line-clamp-1">{rel.title}</h4>
                        <p className="text-primary font-bold text-xs">৳{rel.maxLoanLimit}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;