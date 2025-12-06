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
      
      await updateUserProfile({
        displayName: name,
        photoURL: finalPhoto
      });

      toast.success('Registration Successful!', { id: toastId });
      navigate('/');
      
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Registration failed.', { id: toastId });
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithGoogle();
      toast.success('Google Registration Successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-sans">
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 my-auto">
          
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Join LoanLink to manage your finances
            </p>
          </div>

          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Sign up with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or register with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <MdPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              
              <div className="flex bg-gray-100 p-1 rounded-lg mb-2">
                <button
                  type="button"
                  onClick={() => setPhotoType('url')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                    photoType === 'url'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MdLink className="text-lg" /> Image URL
                </button>

                <button
                  type="button"
                  onClick={() => setPhotoType('file')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
                    photoType === 'file'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MdCloudUpload className="text-lg" /> Upload
                </button>
              </div>

              {photoType === 'url' && (
                <div className="relative animate-fade-in">
                  <MdImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                      errors.photoURL ? 'border-red-500' : 'border-gray-300'
                    }`}
                    {...register("photoURL", {
                      required: photoType === 'url' ? "Photo URL is required" : false,
                    })}
                  />
                  {errors.photoURL && (
                    <span className="text-red-500 text-xs">{errors.photoURL.message}</span>
                  )}
                </div>
              )}

              {photoType === 'file' && (
                <div className="animate-fade-in">
                  <input
                    type="file"
                    accept="image/*"
                    className={`w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg p-2 ${
                      errors.imageFile ? 'border-red-500' : ''
                    }`}
                    {...register("imageFile", {
                      required: photoType === 'file' ? "Image file is required" : false,
                    })}
                  />
                  {errors.imageFile && (
                    <span className="text-red-500 text-xs">{errors.imageFile.message}</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Register As</label>
              <div className="relative">
                <MdWorkOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <select
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register("role", { required: "Please select a role" })}
                >
                  <option value="borrower">Borrower (User)</option>
                  <option value="manager">Manager (Loan Officer)</option>
                </select>
              </div>
              {errors.role && <span className="text-red-500 text-xs">{errors.role.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                      message: "Must include uppercase & lowercase letters"
                    }
                  })}
                />
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register("confirmPassword", { 
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop" 
          alt="Registration Background" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-900/80 to-purple-900/60 flex flex-col justify-center items-end px-12 text-right text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-gray-200 max-w-md">
            Start your journey towards financial freedom today. 
            Create an account to access exclusive loan offers.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Register;