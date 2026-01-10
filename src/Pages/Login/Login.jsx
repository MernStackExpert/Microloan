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
  MdAdminPanelSettings,
  MdPerson,
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
    setValue,
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
      toast.error("Invalid email or password. Please try again.", { id: toastId });
    }
  };

  const handleDemoLogin = async (role) => {
    let email = role === "admin" ? "admin@loanlink.com" : "user@gmail.com";
    let password = "1234Nn";

    setValue("email", email);
    setValue("password", password);

    const toastId = toast.loading(`Logging in as ${role}...`);
    try {
      await signInUser(email, password);
      toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} Login Successful!`, { id: toastId });
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Demo login failed!", { id: toastId });
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
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-0 rounded-[3rem] shadow-2xl overflow-hidden bg-base-100">
        <PageTitle title="Login" />

        <div className="relative flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="mt-3 text-base-content/70">Sign in to manage your microloans</p>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="btn btn-outline btn-sm rounded-full gap-2 border-primary text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <MdAdminPanelSettings /> Demo Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("user")}
                className="btn btn-outline btn-sm rounded-full gap-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all cursor-pointer"
              >
                <MdPerson /> Demo User
              </button>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-4 py-4 rounded-2xl bg-base-200/60 backdrop-blur-md border border-base-300 hover:bg-base-300 transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer"
            >
              <FcGoogle className="text-2xl" />
              <span className="font-semibold">Continue with Google</span>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-base-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-base-100 text-base-content/50 font-medium italic">
                  Or sign in manually
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field with Validation */}
              <div className="space-y-1">
                <div className="relative">
                  <MdOutlineEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`input input-bordered w-full pl-12 rounded-2xl h-14 bg-base-200/30 focus:bg-base-100 transition-all ${
                      errors.email ? "input-error" : ""
                    }`}
                    {...register("email", { 
                      required: "Email address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address format"
                      }
                    })}
                  />
                </div>
                {errors.email && <p className="text-error text-xs font-medium ml-2">{errors.email.message}</p>}
              </div>

              {/* Password Field with Validation */}
              <div className="space-y-1">
                <div className="relative">
                  <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`input input-bordered w-full pl-12 pr-12 rounded-2xl h-14 bg-base-200/30 focus:bg-base-100 transition-all ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long"
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-base-content/40 hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </button>
                </div>
                {errors.password && <p className="text-error text-xs font-medium ml-2">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 shadow-xl cursor-pointer"
              >
                Sign In Now
              </button>
            </form>

            <p className="text-center text-base-content/60 font-medium">
              New to LoanLink?{" "}
              <Link to="/register" className="font-black text-primary hover:text-secondary transition-colors underline underline-offset-4">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side Image Banner */}
        <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-primary to-secondary order-1 lg:order-2">
          <div className="absolute inset-0 bg-black/10"></div>
          <img
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop"
            alt="LoanLink Security"
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute bottom-0 left-0 right-0 p-16 text-white bg-gradient-to-t from-black/60 to-transparent">
            <h1 className="text-5xl font-black mb-6 leading-tight">Fast & Secure<br />Micro-Financing</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;