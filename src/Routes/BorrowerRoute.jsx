import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import useRole from '../Hooks/useRole';

const BorrowerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, roleLoading] = useRole();
    const location = useLocation();

    if (loading || roleLoading) {
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    if (user && role === 'borrower') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default BorrowerRoute;