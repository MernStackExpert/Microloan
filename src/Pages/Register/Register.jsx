import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import {
  MdOutlineEmail,
  MdLockOutline,
  MdPersonOutline,
  MdImage,
  MdWorkOutline,
  MdCloudUpload,
  MdLink,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PageTitle from "../../Components/PageTitle";

const Register = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [photoType, setPhotoType] = useState("url");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const { name, email, role, password, photoURL, imageFile } = data;
    const toastId = toast.loading("Creating account...");

    try {
      let finalPhoto = photoURL;

      if (photoType === "file" && imageFile?.[0]) {
        const formData = new FormData();
        formData.append("image", imageFile[0]);
        const res = await axios.post(image_hosting_api, formData);
        if (res.data.success) {
          finalPhoto = res.data.data.display_url;
        }
      }

      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: finalPhoto });

      const currentUser = {
        displayName: name,
        email,
        role,
        photoURL: finalPhoto,
      };
      await axiosSecure.post("/users", currentUser);

      toast.success("Registration Successful!", { id: toastId });
      navigate("/");
    } catch (error) {
      toast.error( "Registration failed. Plese Try Again", { id: toastId });
    }
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const currentUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "borrower",
        };
        axiosSecure
          .post("/users", currentUser)
          .then(() => {
            toast.success("Google Registration Successful!");
            navigate("/");
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to save user to DB");
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 py-12">
      <PageTitle title="Register" />

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
                <span className="px-6 bg-base-100 text-base-content/60 font-medium">
                  Or use email
                </span>
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
                      errors.name ? "input-error" : ""
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <span className="text-error text-xs mt-1 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

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
              </div>

              <div>
                <label className="text-sm font-semibold text-base-content/80 mb-3 block">
                  Profile Photo
                </label>
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPhotoType("url")}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      photoType === "url"
                        ? "bg-primary text-white shadow-lg"
                        : "bg-base-200 hover:bg-base-300"
                    }`}
                  >
                    <MdLink className="inline-block mr-2" /> URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoType("file")}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                      photoType === "file"
                        ? "bg-primary text-white shadow-lg"
                        : "bg-base-200 hover:bg-base-300"
                    }`}
                  >
                    <MdCloudUpload className="inline-block mr-2" /> Upload
                  </button>
                </div>

                {photoType === "url" && (
                  <div className="relative">
                    <MdImage className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      className={`input input-bordered w-full pl-12 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 ${
                        errors.photoURL ? "input-error" : ""
                      }`}
                      {...register("photoURL", {
                        required: photoType === "url" && "Photo URL required",
                      })}
                    />
                    {errors.photoURL && (
                      <span className="text-error text-xs mt-1 block">
                        {errors.photoURL.message}
                      </span>
                    )}
                  </div>
                )}

                {photoType === "file" && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      className={`file-input file-input-bordered w-full rounded-xl bg-base-200/50 ${
                        errors.imageFile ? "file-input-error" : ""
                      }`}
                      {...register("imageFile", {
                        required:
                          photoType === "file" && "Please upload an image",
                      })}
                    />
                    {errors.imageFile && (
                      <span className="text-error text-xs mt-1 block">
                        {errors.imageFile.message}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <MdWorkOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50 z-10" />
                <select
                  className={`select select-bordered w-full pl-12 rounded-xl h-14 bg-base-200 backdrop-blur-sm focus:bg-base-100 ${
                    errors.role ? "select-error" : ""
                  }`}
                  {...register("role", { required: "Please select a role" })}
                >
                  <option value="borrower">Borrower (User)</option>
                  <option value="manager">Manager (Loan Officer)</option>
                </select>
                {errors.role && (
                  <span className="text-error text-xs mt-1 block">
                    {errors.role.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`input input-bordered w-full pl-12 pr-10 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password required",
                      minLength: { value: 6, message: "Min 6 characters" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                        message:
                          "Must contain Uppercase, Lowercase & min 6 chars",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 z-50 -translate-y-1/2 text-xl text-base-content/50 cursor-pointer"
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

                <div className="relative">
                  <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className={`input input-bordered w-full pl-12 pr-10 rounded-xl h-14 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    {...register("confirmPassword", {
                      required: "Confirm password",
                      validate: (v) =>
                        v === password || "Passwords don't match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-base-content/50 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <MdVisibility />
                    ) : (
                      <MdVisibilityOff />
                    )}
                  </button>
                  {errors.confirmPassword && (
                    <span className="text-error text-xs mt-1 block">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl cursor-pointer"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-primary hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-primary to-secondary">
          <div className="absolute inset-0 bg-black/20"></div>
          <img
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop"
            alt="Secure login"
            className="w-full h-full object-cover mix-blend-overlay"
          />
          <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
            <h1 className="text-5xl font-black mb-6 leading-tight">
              Your Financial
              <br />
              Future Starts Here
            </h1>
            <p className="text-xl opacity-90 max-w-lg">
              Join thousands who have already taken control of their financial
              journey with LoanLink.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;