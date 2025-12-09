import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-6">
            <div className="text-primary mb-4">
                <FaExclamationTriangle className="text-8xl opacity-80 mx-auto" />
            </div>
            
            <h1 className="text-9xl font-black text-base-content opacity-20">404</h1>
            
            <h2 className="text-4xl font-bold text-base-content mb-4">Page Not Found</h2>
            
            <p className="text-lg text-base-content/70 max-w-md mb-8">
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            
            <Link to="/" className="btn btn-primary btn-wide rounded-full shadow-lg text-lg hover:scale-105 transition-transform">
                <FaHome /> Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;