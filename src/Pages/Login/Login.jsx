import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineEmail, MdLockOutline } from 'react-icons/md';
import { AuthContext } from '../../Provider/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const toastId = toast.loading('Logging in...');
    try {
      // Firebase login function
      await signInUser(email, password);

      toast.success('Login Successful!', { id: toastId });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Login failed', { id: toastId });
    }
  };

  const handleGoogleLogin = async () => {
    const toastId = toast.loading('Signing in with Google...');
    try {
      await signInWithGoogle();
      toast.success('Google Login Successful!', { id: toastId });
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Google login failed', { id: toastId });
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-sans">
      
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop" 
          alt="Finance Background" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60 flex flex-col justify-center px-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to LoanLink</h2>
          <p className="text-lg text-gray-200">
            Apply for microloans easily and track your approval process in real-time.
            Secure, Fast, and Reliable.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your dashboard panel
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <MdOutlineEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                />
              </div>
              {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
