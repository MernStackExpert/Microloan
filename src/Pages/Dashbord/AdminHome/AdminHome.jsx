import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthContext';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import AdminStats from './AdminStats/AdminStats';
import AdminCharts from './AdminCharts/AdminCharts';

const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalLoans: 0,
        totalApplications: 0,
        roleStats: { borrowers: 0, managers: 0, admins: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get('/admin/stats')
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosSecure]);

    if (loading) {
        return <div className="flex justify-center pt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-primary">Admin Dashboard</h2>
                <p className="text-base-content/60">System wide overview and analytics.</p>
            </div>

            <AdminStats stats={stats} />
            <AdminCharts roleStats={stats.roleStats} />
        </div>
    );
};

export default AdminHome;