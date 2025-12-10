import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useRole from '../Hooks/useRole';


const AdminManagerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, roleLoading] = useRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    // Admin অথবা Manager হলে ঢুকতে দিবে
    if (user && (role === 'admin' || role === 'manager')) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminManagerRoute;