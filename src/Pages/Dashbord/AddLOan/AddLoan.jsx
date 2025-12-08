// src/pages/dashboard/AddLoan.jsx
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const AddLoan = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState('url'); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // Watch for preview
  const imageUrlValue = watch('image');
  const imageFileValue = watch('imageFile');

  // ImgBB Upload Function
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;
      const res = await axios.post(url, formData);
      return res.data.data.url;
    } catch (error) {
      console.error("ImgBB Error:", error);
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Processing Loan Application...");

    try {
      let finalImageUrl = '';

      // 1. Handle Image (File vs URL)
      if (uploadType === 'file' && data.imageFile && data.imageFile[0]) {
        finalImageUrl = await uploadImageToImgBB(data.imageFile[0]);
      } else {
        finalImageUrl = data.image;
      }

      if (!finalImageUrl) {
        throw new Error("Please provide a loan image.");
      }

      // 2. Prepare Data for Backend
      // নাম্বার এবং অ্যারে কনভার্সন করা জরুরি
      const loanData = {
        title: data.title,
        category: data.category,
        description: data.description,
        interestRate: parseFloat(data.interestRate), // Number conversion
        maxLoanLimit: parseFloat(data.maxLoanLimit), // Number conversion
        // Comma separated string কে Array তে কনভার্ট করা
        requirements: data.requiredDocuments.split(',').map(item => item.trim()), 
        emiPlans: data.emiPlans.split(',').map(item => item.trim()),
        loanImage: finalImageUrl,
        managerEmail: user?.email,
        managerName: user?.displayName,
        showOnHome: data.showOnHome || false, // Toggle value
        status: "active", // Default status
      };

      // 3. Post to Database
      const response = await axiosSecure.post('/loans', loanData);

      if (response.data.insertedId) {
        toast.success("Loan Added Successfully!", { id: toastId });
        reset(); // Form clear
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add loan", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-3">Add New Loan</h1>
          <p className="text-base-content/70">Create a new microloan package for borrowers</p>
        </div>

        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* Row 1: Title & Category */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Loan Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Education Loan Pro"
                    className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                    {...register('title', { required: 'Loan title is required' })}
                  />
                  {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Category</span>
                  </label>
                  <select
                    className={`select select-bordered w-full ${errors.category ? 'select-error' : ''}`}
                    {...register('category', { required: 'Please select a category' })}
                  >
                    <option value="">Choose Category</option>
                    <option value="Education Loan">Education Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Agriculture Loan">Agriculture Loan</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Home Loan">Home Loan</option>
                    <option value="Vehicle Loan">Vehicle Loan</option>
                    <option value="Marriage Loan">Marriage Loan</option>
                  </select>
                  {errors.category && <p className="text-error text-sm mt-1">{errors.category.message}</p>}
                </div>
              </div>

              {/* Row 2: Description */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe the purpose and benefits of this loan..."
                  className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
                  {...register('description', { 
                    required: 'Description is required', 
                    minLength: { value: 20, message: 'Minimum 20 characters required' } 
                  })}
                />
                {errors.description && <p className="text-error text-sm mt-1">{errors.description.message}</p>}
              </div>

              {/* Row 3: Interest & Max Limit */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Interest Rate (%)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 5.5"
                    className={`input input-bordered w-full ${errors.interestRate ? 'input-error' : ''}`}
                    {...register('interestRate', { required: 'Interest rate is required', min: 0 })}
                  />
                  {errors.interestRate && <p className="text-error text-sm mt-1">{errors.interestRate.message}</p>}
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Maximum Loan Limit ($)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Amount"
                    className={`input input-bordered w-full ${errors.maxLoanLimit ? 'input-error' : ''}`}
                    {...register('maxLoanLimit', { required: 'Max limit is required', min: 1000 })}
                  />
                  {errors.maxLoanLimit && <p className="text-error text-sm mt-1">{errors.maxLoanLimit.message}</p>}
                </div>
              </div>

              {/* Row 4: Required Documents & EMI Plans */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Required Documents (comma separated)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="NID, Salary Slip, Bank Statement"
                    className="input input-bordered w-full"
                    {...register('requiredDocuments', { required: 'Documents are required' })}
                  />
                  {errors.requiredDocuments && <p className="text-error text-sm mt-1">{errors.requiredDocuments.message}</p>}
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">EMI Plans (months, comma separated)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="6, 12, 18, 24, 36"
                    className="input input-bordered w-full"
                    {...register('emiPlans', { required: 'EMI plans are required' })}
                  />
                  {errors.emiPlans && <p className="text-error text-sm mt-1">{errors.emiPlans.message}</p>}
                </div>
              </div>

              {/* Row 5: Image Upload Section (Dynamic) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Loan Image</span>
                </label>
                
                {/* Switcher */}
                <div className="flex gap-4 mb-3">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input 
                            type="radio" 
                            name="uploadType" 
                            className="radio radio-primary" 
                            checked={uploadType === 'url'}
                            onChange={() => setUploadType('url')}
                        />
                        <span>Image URL</span>
                    </label>
                    <label className="cursor-pointer flex items-center gap-2">
                        <input 
                            type="radio" 
                            name="uploadType" 
                            className="radio radio-primary" 
                            checked={uploadType === 'file'}
                            onChange={() => setUploadType('file')}
                        />
                        <span>Upload File (ImgBB)</span>
                    </label>
                </div>

                {/* Conditional Inputs */}
                {uploadType === 'url' ? (
                     <input
                     type="url"
                     placeholder="https://example.com/loan-image.jpg"
                     className={`input input-bordered w-full ${errors.image ? 'input-error' : ''}`}
                     {...register('image', { required: uploadType === 'url' ? 'Image URL is required' : false })}
                   />
                ) : (
                    <input 
                        type="file" 
                        className="file-input file-input-bordered file-input-primary w-full" 
                        accept="image/*"
                        {...register('imageFile', { required: uploadType === 'file' ? 'Please select a file' : false })}
                    />
                )}
                
                {(errors.image || errors.imageFile) && <p className="text-error text-sm mt-1">Loan image is required</p>}

                {/* Preview Logic */}
                <div className="mt-4">
                  {uploadType === 'url' && imageUrlValue && (
                     <div className="avatar">
                        <div className="w-24 rounded">
                            <img src={imageUrlValue} alt="Preview" />
                        </div>
                     </div>
                  )}
                  {uploadType === 'file' && imageFileValue && imageFileValue[0] && (
                      <div className="avatar">
                        <div className="w-24 rounded">
                             <img src={URL.createObjectURL(imageFileValue[0])} alt="Preview" />
                        </div>
                     </div>
                  )}
                </div>
              </div>

              {/* Row 6: Show on Home Toggle */}
              <div className="form-control w-52">
                <label className="cursor-pointer label">
                  <span className="label-text font-bold text-lg">Show on Home?</span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-success" 
                    {...register('showOnHome')}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-wide text-lg font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? <span className="loading loading-spinner"></span> : "Publish Loan"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLoan;