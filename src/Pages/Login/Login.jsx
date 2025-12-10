import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  MdOutlineEmail,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PageTitle from "../../Components/PageTitle";

const Login = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const toastId = toast.loading("Logging in...");
    try {
      await signInUser(email, password);
      toast.success("Login Successful!", { id: toastId });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error( "Login failed Plese Input Valid Information", { id: toastId });
    }
  };

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Signing in with Google...");
    try {
      const result = await signInWithGoogle();
      const firebaseUser = result.user;

      const currentUser = {
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
        role: "borrower",
      };

      await axiosSecure.post("/users", currentUser);

      toast.success("Google Login Successful!", { id: toastId });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 py-12">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 rounded-3xl shadow-2xl overflow-hidden bg-base-100">
        <PageTitle title="Login" />

        <div className="relative flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-3 text-base-content/70 text-lg">
                Sign in to continue your financial journey
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
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
                <span className="px-6 bg-base-100 text-base-content/60 font-medium">
                  Or use email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative">
                <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`input input-bordered w-full pl-12 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-error text-xs mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="relative">
                <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`input input-bordered w-full pl-12 pr-10 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-4 z-50 cursor-pointer top-1/2 -translate-y-1/2 text-xl text-base-content/50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </button>
                {errors.password && (
                  <span className="text-error text-xs mt-1 block">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-base-content/70">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-primary hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-primary to-secondary order-1 lg:order-2">
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop"
            alt="Secure login"
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
            <h1 className="text-5xl font-black mb-6 leading-tight">
              Secure Access
              <br />
              to Your Account
            </h1>
            <p className="text-xl opacity-90 max-w-lg">
              Your financial data is protected with bank-level security. Log in
              with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;