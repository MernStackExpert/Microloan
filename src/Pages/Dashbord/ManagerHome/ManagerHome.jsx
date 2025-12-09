import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import ManagerCharts from './ManagerCharts/ManagerCharts';
import RecentApplications from './RecentApplications/RecentApplications';
import ManagerStats from './ManagerStats/ManagerStats';
import PageTitle from '../../../Components/PageTitle';

const ManagerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        totalLoans: 0,
        totalApplications: 0,
        totalPending: 0,
        totalApproved: 0
    });
    const [recentApps, setRecentApps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/manager/stats/${user.email}`)
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
                <PageTitle title="Manager Home" />
                <h2 className="text-3xl font-bold text-primary">Welcome Back, {user?.displayName}!</h2>
                <p className="text-base-content/60">Here's an overview of your loan portfolio.</p>
            </div>

            <ManagerStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ManagerCharts stats={stats} />
                <RecentApplications applications={recentApps} />
            </div>
        </div>
    );
};

export default ManagerHome;