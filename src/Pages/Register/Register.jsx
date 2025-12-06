import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { 
  MdOutlineEmail, 
  MdLockOutline, 
  MdPersonOutline, 
  MdImage, 
  MdWorkOutline, 
  MdCloudUpload, 
  MdLink 
} from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../Provider/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [photoType, setPhotoType] = useState('url');

  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm();

  const password = watch("password");
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const { name, email, role, password, photoURL, imageFile } = data;
    const toastId = toast.loading('Creating account...');

    try {
      let finalPhoto = photoURL;

      if (photoType === 'file' && imageFile?.[0]) {
        const formData = new FormData();
        formData.append('image', imageFile[0]);
        const res = await axios.post(image_hosting_api, formData);
        if (res.data.success) {
          finalPhoto = res.data.data.display_url;
        }
      }

      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: finalPhoto });

      toast.success('Registration Successful!', { id: toastId });
      navigate('/');
      
    } catch (error) {
      toast.error(error.message || 'Registration failed.', { id: toastId });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
      toast.success('Google Registration Successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 rounded-3xl shadow-2xl overflow-hidden bg-base-100">
        
        <div className="relative flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="mt-3 text-base-content/70 text-lg">
                Join LoanLink and unlock financial freedom
              </p>
            </div>

            <button
              onClick={handleGoogleRegister}
              className="w-full flex items-center justify-center gap-4 py-4 rounded-2xl bg-base-200/60 backdrop-blur-md border border-base-300 hover:bg-base-300 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-semibold">Continue with Google</span>
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 bg-base-100 text-base-content/60 font-medium">Or use email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <MdPersonOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`input input-bordered w-full pl-12 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all ${
                      errors.name ? 'input-error' : ''
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                </div>

                <div className="relative">
                  <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`input input-bordered w-full pl-12 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all ${
                      errors.email ? 'input-error' : ''
                    }`}
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-base-content/80 mb-3 block">Profile Photo</label>
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPhotoType('url')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      photoType === 'url'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-base-200 hover:bg-base-300'
                    }`}
                  >
                    <MdLink className="inline-block mr-2" /> URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoType('file')}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      photoType === 'file'
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-base-200 hover:bg-base-300'
                    }`}
                  >
                    <MdCloudUpload className="inline-block mr-2" /> Upload
                  </button>
                </div>

                {photoType === 'url' && (
                  <div className="relative">
                    <MdImage className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      className="input input-bordered w-full pl-12 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100"
                      {...register("photoURL", { required: photoType === 'url' && "Photo URL required" })}
                    />
                  </div>
                )}

                {photoType === 'file' && (
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full rounded-xl bg-base-200/50"
                    {...register("imageFile", { required: photoType === 'file' && "Please upload an image" })}
                  />
                )}
              </div>

              <div className="relative">
                <MdWorkOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50 z-10" />
                <select
                  className="select select-bordered w-full pl-12 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100"
                  {...register("role", { required: "Please select a role" })}
                >
                  <option value="">Choose your role</option>
                  <option value="borrower">Borrower (User)</option>
                  <option value="manager">Manager (Loan Officer)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                  <input
                    type="password"
                    placeholder="Password"
                    className={`input input-bordered w-full pl-12 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all ${
                      errors.password ? 'input-error' : ''
                    }`}
                    {...register("password", { 
                      required: "Password required",
                      minLength: { value: 6, message: "Min 6 characters" }
                    })}
                  />
                </div>

                <div className="relative">
                  <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className={`input input-bordered w-full pl-12 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all ${
                      errors.confirmPassword ? 'input-error' : ''
                    }`}
                    {...register("confirmPassword", { 
                      required: "Confirm password",
                      validate: (v) => v === password || "Passwords don't match"
                    })}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-base-content/70">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-primary to-secondary">
          <div className="absolute inset-0 bg-black/20"></div>
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop"
            alt="Financial growth"
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
            <h1 className="text-5xl font-black mb-6 leading-tight">
              Your Financial<br />Future Starts Here
            </h1>
            <p className="text-xl opacity-90 max-w-lg">
              Join thousands who have already taken control of their financial journey with LoanLink.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;