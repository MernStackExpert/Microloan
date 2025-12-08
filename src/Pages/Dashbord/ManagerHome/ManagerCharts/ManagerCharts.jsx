import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ManagerCharts = ({ stats }) => {
    const data = [
        { name: 'Pending', value: stats.totalPending, color: '#FFBB28' },
        { name: 'Approved', value: stats.totalApproved, color: '#00C49F' },
        { name: 'Rejected', value: stats.totalApplications - (stats.totalPending + stats.totalApproved), color: '#FF8042' },
    ];

    // Handle case where total is 0 to avoid empty chart errors
    const hasData = stats.totalApplications > 0;

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 p-6 h-[400px]">
            <h3 className="text-xl font-bold mb-4">Application Status Overview</h3>
            {hasData ? (
                <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie 
                                data={data} 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={60} 
                                outerRadius={100} 
                                paddingAngle={5} 
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex h-full justify-center items-center text-base-content/50">
                    No application data available yet.
                </div>
            )}
        </div>
    );
};

export default ManagerCharts;