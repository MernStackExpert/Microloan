import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from './../../Provider/AuthContext';
import useAxiosSecure from './../../Hooks/useAxiosSecure';


const DashboardNavigate = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => {
          setRole(res.data?.role);
          setRoleLoading(false);
        })
        .catch(err => {
          console.error(err);
          setRoleLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  if (authLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (role === "admin") {
    return <Navigate to="/dashboard/admin-home" replace />;
  }
  
  if (role === "manager") {
    return <Navigate to="/dashboard/manager-home" replace />;
  }

  // Default to User Home
  return <Navigate to="/dashboard/user-home" replace />;
};

export default DashboardNavigate;