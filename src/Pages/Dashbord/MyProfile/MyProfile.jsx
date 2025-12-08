import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaClock, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthContext';

const MyProfile = () => {
  const { user, signOutUser, updateUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    try {
      await updateUserProfile({ displayName: name, photoURL: photo });
      toast.success("Profile Updated Successfully");
      document.getElementById('edit_profile_modal').close();
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
      <div className="card w-full max-w-3xl bg-base-100 shadow-2xl border border-base-200">
        
        <div className="h-48 bg-gradient-to-r from-primary to-secondary rounded-t-2xl relative">
          
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="avatar online">
              <div className="w-32 rounded-full ring-4 ring-base-100 bg-base-100">
                <img 
                  src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                  alt="Profile" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-body pt-20 items-center text-center">
          <h2 className="text-3xl font-bold text-base-content">
            {user?.displayName || "User Name"}
          </h2>
          <p className="text-base-content/60 font-medium badge badge-ghost mt-2">
            {user?.email}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
            <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-xl hover:bg-base-200 transition-colors">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <FaUserCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm text-base-content/60">User ID</p>
                <p className="font-semibold text-sm md:text-base truncate w-32 md:w-48" title={user?.uid}>
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
          <h3 className="font-bold text-2xl mb-4 text-center">Update Profile</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
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
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input 
                type="url" 
                name="photo" 
                defaultValue={user?.photoURL} 
                placeholder="https://example.com/photo.jpg" 
                className="input input-bordered w-full focus:input-primary" 
                required
              />
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