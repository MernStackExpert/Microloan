import React from 'react';
import { useLocation } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

// Add Publishable Key from .env
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    const { state } = useLocation();
    const { application } = state || {}; 

    if(!application) return <div>No application found</div>

    return (
        <div className="w-full max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8 border border-base-200 mt-10">
            <h2 className="text-3xl font-bold text-primary mb-2">Payment</h2>
            <p className="text-base-content/60 mb-8">Please pay the application fee to process your loan request.</p>
            
            <div className="bg-base-200 p-6 rounded-xl mb-8">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Loan Application Fee</span>
                    <span className="text-2xl font-bold text-secondary">$10.00</span>
                </div>
                <div className="divider"></div>
                <p className="text-sm">Loan Title: <strong>{application.loanTitle}</strong></p>
                <p className="text-sm">Applicant: <strong>{application.applicantName}</strong></p>
            </div>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm application={application} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;