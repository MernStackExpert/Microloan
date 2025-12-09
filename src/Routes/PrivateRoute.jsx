import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useRole from '../Hooks/useRole';
import { FaBan } from 'react-icons/fa';

const PrivateRoute = ({ children }) => {
    const { user, loading, signOutUser } = useContext(AuthContext);
    const [role, roleLoading, status] = useRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    if (user && status === 'suspended') {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-base-100 space-y-4">
                <FaBan className="text-6xl text-error" />
                <h1 className="text-3xl font-bold text-error">Account Suspended</h1>
                <p className="text-lg text-base-content/70">
                    Your access has been revoked by the administrator.
                </p>
                <button 
                    onClick={() => signOutUser().catch(console.error)} 
                    className="btn btn-error text-white btn-wide rounded-full shadow-lg"
                >
                    Logout
                </button>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;