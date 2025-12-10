import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const LoanApplication = () => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { loan } = state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!loan) {
      navigate("/all-loans");
      toast.error("Please select a loan first");
    }
  }, [loan, navigate]);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Submitting Application...");

    const applicationData = {
      loanId: loan._id,
      loanTitle: loan.title,
      category: loan.category,
      interestRate: loan.interestRate,

      email: user?.email,
      applicantName: `${data.firstName} ${data.lastName}`,
      phone: data.phone,
      nid: data.nid,
      address: data.address,
      incomeSource: data.incomeSource,
      monthlyIncome: parseFloat(data.monthlyIncome),
      loanAmount: parseFloat(data.loanAmount),
      reason: data.reason,

      status: "pending",
      feeStatus: "unpaid",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/applications", applicationData);
      if (res.data.insertedId) {
        toast.success("Application Submitted Successfully!", { id: toastId });
        navigate("/dashboard/my-loans");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application", { id: toastId });
    }
  };

  if (!loan) return null;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 flex justify-center items-center">
      <div className="card w-full max-w-4xl bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Loan Application Form
          </h2>
          <p className="text-center text-base-content/60 mb-8">
            Please fill in the details below to apply for{" "}
            <span className="font-bold text-secondary">{loan.title}</span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-base-200 p-4 rounded-xl mb-4">
              <div>
                <label className="label">
                  <span className="label-text font-bold">Loan Category</span>
                </label>
                <input
                  type="text"
                  value={loan.category}
                  readOnly
                  className="input input-bordered w-full bg-base-100"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-bold">Interest Rate</span>
                </label>
                <input
                  type="text"
                  value={`${loan.interestRate}%`}
                  readOnly
                  className="input input-bordered w-full bg-base-100"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-bold">Your Email</span>
                </label>
                <input
                  type="text"
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-base-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className={`input input-bordered w-full ${
                    errors.firstName ? "input-error" : ""
                  }`}
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <span className="text-error text-xs mt-1">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`input input-bordered w-full ${
                    errors.lastName ? "input-error" : ""
                  }`}
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <span className="text-error text-xs mt-1">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Contact Number
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="+8801xxxxxxxxx"
                  className={`input input-bordered w-full ${
                    errors.phone ? "input-error" : ""
                  }`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+]{11,14}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-error text-xs mt-1">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    NID / Passport Number
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Identity Number"
                  className={`input input-bordered w-full ${
                    errors.nid ? "input-error" : ""
                  }`}
                  {...register("nid", { required: "NID is required" })}
                />
                {errors.nid && (
                  <span className="text-error text-xs mt-1">
                    {errors.nid.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Income Source
                  </span>
                </label>
                <select
                  className={`select select-bordered w-full ${
                    errors.incomeSource ? "select-error" : ""
                  }`}
                  {...register("incomeSource", {
                    required: "Select income source",
                  })}
                >
                  <option value="">Select Source</option>
                  <option value="Salary">Salary</option>
                  <option value="Business">Business</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Rent">Rent</option>
                  <option value="Others">Others</option>
                </select>
                {errors.incomeSource && (
                  <span className="text-error text-xs mt-1">
                    {errors.incomeSource.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Monthly Income ($)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 20000"
                  className={`input input-bordered w-full ${
                    errors.monthlyIncome ? "input-error" : ""
                  }`}
                  {...register("monthlyIncome", {
                    required: "Income is required",
                    min: { value: 1, message: "Income must be positive" },
                  })}
                />
                {errors.monthlyIncome && (
                  <span className="text-error text-xs mt-1">
                    {errors.monthlyIncome.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Loan Amount Needed ($)
                </span>
              </label>
              <input
                type="number"
                placeholder={`Max limit: ${loan.maxLoanLimit}`}
                className={`input input-bordered w-full input-lg font-bold text-primary ${
                  errors.loanAmount ? "input-error" : ""
                }`}
                {...register("loanAmount", {
                  required: "Amount is required",
                  max: {
                    value: loan.maxLoanLimit,
                    message: `Cannot exceed ${loan.maxLoanLimit}`,
                  },
                  min: { value: 1000, message: "Minimum loan is 1000" },
                })}
              />
              {errors.loanAmount && (
                <span className="text-error text-sm mt-1">
                  {errors.loanAmount.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Address</span>
              </label>
              <input
                type="text"
                placeholder="Present Address"
                className={`input input-bordered w-full ${
                  errors.address ? "input-error" : ""
                }`}
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className="text-error text-xs mt-1">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Reason for Loan</span>
              </label>
              <textarea
                className={`textarea textarea-bordered h-24  w-full ${
                  errors.reason ? "textarea-error" : ""
                }`}
                placeholder="Why do you need this loan?"
                {...register("reason", { required: "Reason is required" })}
              ></textarea>
              {errors.reason && (
                <span className="text-error text-xs mt-1">
                  {errors.reason.message}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary w-full text-lg shadow-lg">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;