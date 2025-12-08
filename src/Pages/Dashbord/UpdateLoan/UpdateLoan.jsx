import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const UpdateLoan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [loadingData, setLoadingData] = useState(true);
    const [processing, setProcessing] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchLoanData = async () => {
            try {
                const res = await axiosSecure.get(`/loans/${id}`);
                const loanData = res.data;

                const formattedData = {
                    ...loanData,
                    requirements: Array.isArray(loanData.requirements) 
                        ? loanData.requirements.join(", ") 
                        : loanData.requirements,
                    emiPlans: Array.isArray(loanData.emiPlans) 
                        ? loanData.emiPlans.join(", ") 
                        : loanData.emiPlans,
                };

                reset(formattedData);
                setLoadingData(false);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load loan data");
                setLoadingData(false);
            }
        };
        fetchLoanData();
    }, [id, axiosSecure, reset]);

    const onSubmit = async (data) => {
        setProcessing(true);
        const toastId = toast.loading("Updating Loan...");

        try {
            const updatedLoanData = {
                title: data.title,
                category: data.category,
                description: data.description,
                interestRate: parseFloat(data.interestRate),
                maxLoanLimit: parseFloat(data.maxLoanLimit),
                loanImage: data.loanImage || data.image,
                requirements: typeof data.requirements === 'string' 
                    ? data.requirements.split(',').map(item => item.trim()) 
                    : data.requirements,
                emiPlans: typeof data.emiPlans === 'string' 
                    ? data.emiPlans.split(',').map(item => item.trim()) 
                    : data.emiPlans,
            };

            const res = await axiosSecure.put(`/loans/${id}`, updatedLoanData);

            if (res.data.modifiedCount > 0) {
                toast.success("Loan Updated Successfully!", { id: toastId });
                navigate("/dashboard/manage-loans");
            } else {
                toast.success("No changes made.", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update loan", { id: toastId });
        } finally {
            setProcessing(false);
        }
    };

    if (loadingData) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl p-4 md:p-8 border border-base-200">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">Update Loan Offer</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Loan Title</span></label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full focus:input-primary"
                            {...register("title", { required: "Title is required" })} 
                        />
                        {errors.title && <span className="text-error text-sm">{errors.title.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Category</span></label>
                        <select 
                            className="select select-bordered w-full focus:select-primary"
                            {...register("category", { required: "Category is required" })}
                        >
                            <option value="">Select Category</option>
                            <option value="Personal Loan">Personal Loan</option>
                            <option value="Home Loan">Home Loan</option>
                            <option value="Business Loan">Business Loan</option>
                            <option value="Vehicle Loan">Vehicle Loan</option>
                            <option value="Agriculture Loan">Agriculture Loan</option>
                            <option value="Education Loan">Education Loan</option>
                            <option value="Marriage Loan">Marriage Loan</option>
                            <option value="Medical Loan">Medical Loan</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Interest Rate (%)</span></label>
                        <input 
                            type="number" step="0.1"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("interestRate", { required: "Interest rate is required" })} 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Max Loan Limit</span></label>
                        <input 
                            type="number" 
                            className="input input-bordered w-full focus:input-primary"
                            {...register("maxLoanLimit", { required: "Max limit is required" })} 
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">Image URL</span></label>
                        <input 
                            type="url" 
                            className="input input-bordered w-full focus:input-primary"
                            {...register("loanImage", { required: "Image URL is required" })} 
                        />
                    </div>

                    <div className="form-control">
                        <label className="label"><span className="label-text font-semibold">EMI Plans (comma separated)</span></label>
                        <input 
                            type="text" 
                            placeholder="e.g. 6 Months, 12 Months"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("emiPlans", { required: "EMI Plans are required" })} 
                        />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Required Documents (comma separated)</span></label>
                    <input 
                        type="text" 
                        placeholder="e.g. NID, Bank Statement"
                        className="input input-bordered w-full focus:input-primary"
                        {...register("requirements", { required: "Requirements are required" })} 
                    />
                </div>
                
                <div className="form-control">
                    <label className="label"><span className="label-text font-semibold">Description</span></label>
                    <textarea 
                        className="textarea textarea-bordered h-24 focus:textarea-primary" 
                        {...register("description", { required: "Description is required" })}
                    ></textarea>
                </div>

                <div className="form-control mt-6">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="btn btn-primary w-full text-white text-lg"
                    >
                        {processing ? <span className="loading loading-spinner"></span> : "Update Loan Info"}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default UpdateLoan;