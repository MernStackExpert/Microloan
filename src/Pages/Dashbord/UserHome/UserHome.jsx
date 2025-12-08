import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import UserStats from './UserStats/UserStats';
import MyRecentLoans from './MyRecentLoans/MyRecentLoans';

const UserHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        totalApplied: 0,
        totalPending: 0,
        totalApproved: 0,
        totalRejected: 0
    });
    const [recentApps, setRecentApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/user/stats/${user.email}`)
                .then(res => {
                    setStats(res.data.stats);
                    setRecentApps(res.data.recentApplications);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email, axiosSecure]);

    if (loading) {
        return <div className="flex justify-center pt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-primary">Welcome, {user?.displayName}!</h2>
                <p className="text-base-content/60">Track your loan applications and status here.</p>
            </div>

            <UserStats stats={stats} />
            
            <div className="grid grid-cols-1 gap-8">
                <MyRecentLoans applications={recentApps} />
            </div>
        </div>
    );
};

export default UserHome;