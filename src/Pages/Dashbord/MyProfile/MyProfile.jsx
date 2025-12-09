import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaClock, FaSignOutAlt, FaUserEdit, FaCloudUploadAlt, FaLink } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import PageTitle from '../../../Components/PageTitle';

const MyProfile = () => {
  const AxiosSecure = useAxiosSecure();
  const { user, signOutUser, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState('url');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    let photo = '';

    try {
      if (uploadType === 'file') {
        const file = form.photoFile.files[0];
        if (file) {
          photo = await uploadImageToImgBB(file);
        } else {
           photo = user?.photoURL; 
        }
      } else {
        photo = form.photoUrl.value;
      }

      await updateUserProfile({ displayName: name, photoURL: photo });
      
      // Update in Database as well (Optional but recommended)
      await AxiosSecure.patch(`/users/${user.email}`, { name, photoURL: photo });

      toast.success("Profile Updated Successfully");
      document.getElementById('edit_profile_modal').close();
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 py-8">
            <PageTitle title="My-Profile" />

      <div className="card w-full max-w-3xl bg-base-100 shadow-2xl border border-base-200">
        
        <div className="h-48 bg-gradient-to-r from-primary to-secondary rounded-t-2xl relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="avatar online">
              <div className="w-32 rounded-full ring-4 ring-base-100 bg-base-100 shadow-xl">
                <img 
                  src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                  alt="Profile" 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body pt-20 items-center text-center">
          <h2 className="text-3xl font-bold text-base-content">
            {user?.displayName || "User Name"}
          </h2>
          <p className="text-base-content/60 font-medium badge badge-ghost mt-2 px-4 py-3">
            {user?.email}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl hover:bg-base-200 transition-colors">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <FaUserCircle className="w-6 h-6" />
              </div>
              <div className="text-left w-full overflow-hidden">
                <p className="text-sm text-base-content/60">User ID</p>
                <p className="font-semibold text-sm md:text-base truncate" title={user?.uid}>
                  {user?.uid}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl hover:bg-base-200 transition-colors">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <FaEnvelope className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm text-base-content/60">Email Status</p>
                <p className={`font-semibold ${user?.emailVerified ? 'text-green-600' : 'text-orange-500'}`}>
                  {user?.emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl hover:bg-base-200 transition-colors">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                <FaCalendarAlt className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm text-base-content/60">Joined On</p>
                <p className="font-semibold">
                  {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl hover:bg-base-200 transition-colors">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <FaClock className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm text-base-content/60">Last Login</p>
                <p className="font-semibold">
                  {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full mt-8 border-t border-base-200 pt-6 flex flex-col md:flex-row justify-center gap-4">
            <button 
              onClick={() => document.getElementById('edit_profile_modal').showModal()}
              className="btn btn-primary w-full md:btn-wide rounded-full shadow-lg text-lg"
            >
              <FaUserEdit /> Edit Profile
            </button>

            <button 
              onClick={handleLogout}
              className="btn btn-error w-full md:btn-wide text-white text-lg rounded-full shadow-lg"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      <dialog id="edit_profile_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-6 text-center text-primary">Update Profile</h3>
          
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input 
                type="text" 
                name="name" 
                defaultValue={user?.displayName} 
                placeholder="Enter your name" 
                className="input input-bordered w-full focus:input-primary" 
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Profile Photo</span>
              </label>
              
              {/* Tab Switcher */}
              <div role="tablist" className="tabs tabs-boxed mb-4 bg-base-200 p-1">
                <a 
                    role="tab" 
                    className={`tab ${uploadType === 'url' ? 'tab-active bg-primary text-white' : ''}`}
                    onClick={() => setUploadType('url')}
                >
                    <FaLink className="mr-2"/> Image URL
                </a>
                <a 
                    role="tab" 
                    className={`tab ${uploadType === 'file' ? 'tab-active bg-primary text-white' : ''}`}
                    onClick={() => setUploadType('file')}
                >
                    <FaCloudUploadAlt className="mr-2"/> Upload File
                </a>
              </div>

              {/* Conditional Inputs */}
              {uploadType === 'url' ? (
                  <input 
                    type="url" 
                    name="photoUrl" 
                    defaultValue={user?.photoURL} 
                    placeholder="https://example.com/photo.jpg" 
                    className="input input-bordered w-full focus:input-primary" 
                    required={uploadType === 'url'}
                  />
              ) : (
                  <input 
                    type="file" 
                    name="photoFile"
                    className="file-input file-input-bordered file-input-primary w-full" 
                    accept="image/*"
                    required={uploadType === 'file'}
                  />
              )}
            </div>

            <div className="modal-action">
              <button 
                type="button" 
                className="btn btn-ghost"
                onClick={() => document.getElementById('edit_profile_modal').close()}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyProfile;