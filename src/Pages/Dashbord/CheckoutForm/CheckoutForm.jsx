import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthContext';
import PageTitle from '../../../Components/PageTitle';

const CheckoutForm = ({ application }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    // Fixed Fee: $10
    const price = 10;

    useEffect(() => { 
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error', confirmError);
            setError(confirmError.message);
            setProcessing(false);
        } else {
            if (paymentIntent.status === 'succeeded') {
                // Update Database
                const paymentInfo = {
                    transactionId: paymentIntent.id,
                    price: price,
                    date: new Date(),
                    applicationId: application._id
                }

                try {
                    await axiosSecure.patch(`/applications/payment/${application._id}`, paymentInfo);
                    toast.success(`Payment Successful! Transaction ID: ${paymentIntent.id}`);
                    navigate('/dashboard/my-loans');
                } catch (err) {
                    toast.error("Payment saved failed in database");
                }
            }
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="border p-4 rounded-lg bg-base-100">
                    <PageTitle title="Check-Out" />

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>
            <p className="text-red-500 text-sm mt-2">{error}</p>
            <button 
                className="btn btn-primary btn-wide mt-6" 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? <span className="loading loading-spinner"></span> : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;